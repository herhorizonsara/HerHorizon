import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
  Quote,
  Heading2,
  Heading3,
  Minus,
  Sparkles,
  MoreHorizontal,
  Eye,
  Globe,
  FolderOpen,
  ChevronUp,
  ChevronDown,
  ClipboardPaste,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  GripVertical,
  Check,
  Wand2,
  Edit3,
  ArrowRight,
  Bold,
  Italic,
  Unlink,
  ExternalLink
} from 'lucide-react';
import { BlogPost } from '../../types';
import { BLOG_CATEGORIES, calculateReadingTime, slugify } from '../../lib/blogStorage';
import { BlogArticleRenderer } from '../Blog/BlogArticleRenderer';

export interface StoryBlock {
  id: string;
  type: 'paragraph' | 'heading2' | 'heading3' | 'image' | 'quote' | 'callout' | 'divider';
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  linkUrl?: string;
  linkText?: string;
}

interface MediumEditorProps {
  initialPost?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onClose: () => void;
}

// Preset graphics and photos for HerHorizon
const PRESET_GRAPHICS = [
  {
    name: 'Sara Mitchell (Founder Portrait)',
    path: '/author-portrait.png',
    alt: 'Sara Mitchell - Founder of HerHorizon & Trauma-Informed Guide',
  },
  {
    name: '2 A.M. Emergency Anchor Card',
    path: '/cover-free-anchor-card.webp',
    alt: 'HerHorizon 2 A.M. Emergency Anchor Card bedside presentation',
  },
  {
    name: '72-Hour Reset Guide (Cover)',
    path: '/cover-free-reset-guide.webp',
    alt: 'The 72-Hour Nervous System Reset Guide Cover',
  },
  {
    name: 'The Identity Rebuild Roadmap',
    path: '/cover-roadmap.webp',
    alt: 'The Identity Rebuild Roadmap 30-Day Journey Cover',
  },
  {
    name: 'Trauma Bond Protocol Cover',
    path: '/cover-traumabond.webp',
    alt: 'Trauma Bond Biochemical Detachment Cover',
  },
  {
    name: 'Self-Trust Reclaim Cover',
    path: '/cover-selftrust.webp',
    alt: 'Quiet Self-Trust Protocol Cover',
  },
  {
    name: 'Boundary Scripts Cover',
    path: '/cover-boundaryscripts.webp',
    alt: 'Somatic Boundary Scripts Pocket Guide',
  },
  {
    name: 'Step 7 Exclusive Bonuses Mockup',
    path: '/step7-bonuses-mockup.webp',
    alt: 'Trauma Recovery Exclusive Bonus Resources',
  },
];

// Helper to parse markdown into story blocks and optionally extract title/subtitle
export function parseMarkdownToStory(markdown: string): {
  extractedTitle?: string;
  extractedSubtitle?: string;
  blocks: StoryBlock[];
} {
  if (!markdown || !markdown.trim()) {
    return {
      blocks: [{ id: `block-${Date.now()}-1`, type: 'paragraph', content: '' }],
    };
  }

  const rawBlocks = markdown.split(/\n\n+/);
  const blocks: StoryBlock[] = [];
  let extractedTitle: string | undefined;
  let extractedSubtitle: string | undefined;

  rawBlocks.forEach((raw, idx) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Check for H1 as Title (# Title or Title: ...)
    if (!extractedTitle && trimmed.startsWith('# ')) {
      extractedTitle = trimmed.substring(2).trim();
      return;
    }
    if (!extractedTitle && /^title:\s*/i.test(trimmed)) {
      extractedTitle = trimmed.replace(/^title:\s*/i, '').trim();
      return;
    }

    // Check for Subtitle / Hook (Subtitle: ... or *Hook: ...*)
    if (!extractedSubtitle && /^subtitle:\s*/i.test(trimmed)) {
      extractedSubtitle = trimmed.replace(/^subtitle:\s*/i, '').trim();
      return;
    }

    const blockId = `block-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`;

    // Divider
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push({ id: blockId, type: 'divider' });
      return;
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
      blocks.push({
        id: blockId,
        type: 'heading2',
        content: trimmed.substring(3).trim(),
      });
      return;
    }

    // Heading 3, 4, 5, 6 (Handles #### Recommended Resource cleanly!)
    if (trimmed.startsWith('### ')) {
      blocks.push({
        id: blockId,
        type: 'heading3',
        content: trimmed.substring(4).trim(),
      });
      return;
    }
    if (trimmed.startsWith('#### ')) {
      blocks.push({
        id: blockId,
        type: 'heading3',
        content: trimmed.substring(5).trim(),
      });
      return;
    }
    if (trimmed.startsWith('##### ')) {
      blocks.push({
        id: blockId,
        type: 'heading3',
        content: trimmed.substring(6).trim(),
      });
      return;
    }
    if (trimmed.startsWith('###### ')) {
      blocks.push({
        id: blockId,
        type: 'heading3',
        content: trimmed.substring(7).trim(),
      });
      return;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed
        .split('\n')
        .map((l) => l.replace(/^>\s?/, ''))
        .join(' ');
      blocks.push({
        id: blockId,
        type: 'quote',
        content: quoteText.trim(),
      });
      return;
    }

    // Image ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      blocks.push({
        id: blockId,
        type: 'image',
        imageAlt: imgMatch[1],
        imageUrl: imgMatch[2],
      });
      return;
    }

    // Callout (Somatic Note)
    if (
      trimmed.startsWith('⚡') ||
      trimmed.startsWith('🌿') ||
      trimmed.startsWith('💡') ||
      trimmed.startsWith('NOTE:') ||
      trimmed.startsWith('Note:')
    ) {
      blocks.push({
        id: blockId,
        type: 'callout',
        content: trimmed,
      });
      return;
    }

    // Standard Paragraph
    blocks.push({
      id: blockId,
      type: 'paragraph',
      content: trimmed,
    });
  });

  if (blocks.length === 0) {
    blocks.push({ id: `block-${Date.now()}`, type: 'paragraph', content: '' });
  }

  return { extractedTitle, extractedSubtitle, blocks };
}

// Helper to serialize blocks back to markdown
export function serializeBlocksToMarkdown(blocks: StoryBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'heading2':
          return `## ${b.content || ''}`;
        case 'heading3':
          return `### ${b.content || ''}`;
        case 'image':
          return `![${b.imageAlt || 'Illustration'}](${b.imageUrl || '/cover-free-anchor-card.webp'})`;
        case 'quote':
          return `> ${b.content || ''}`;
        case 'callout':
          return b.content || '⚡ **Somatic Anchor Note:**';
        case 'divider':
          return '---';
        case 'paragraph':
        default:
          return b.content || '';
      }
    })
    .filter((s) => s.trim().length > 0)
    .join('\n\n');
}

/**
 * Auto-expanding, non-cutting textarea component.
 * Guarantees 100% full content visibility with no horizontal scrolling and automatic height.
 * Supports forwardRef, onFocus, onBlur, onKeyDown for smooth keyboard line navigation.
 */
interface AutoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onValueChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  minHeight?: number;
}

const AutoTextarea = React.forwardRef<HTMLTextAreaElement, AutoTextareaProps>(
  (
    {
      value,
      onValueChange,
      className = '',
      placeholder,
      minHeight = 36,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (forwardedRef as React.RefObject<HTMLTextAreaElement>) || localRef;

    const resize = () => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = 'auto';
        const newHeight = Math.max(minHeight, el.scrollHeight);
        el.style.height = `${newHeight}px`;
      }
    };

    useEffect(() => {
      resize();
    }, [value]);

    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
          resize();
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        wrap="soft"
        placeholder={placeholder}
        className={`w-full min-w-0 max-w-full box-border border-none outline-none bg-transparent resize-none overflow-hidden whitespace-pre-wrap break-words leading-relaxed p-0 ${className}`}
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
        {...rest}
      />
    );
  }
);
AutoTextarea.displayName = 'AutoTextarea';

export const MediumEditor: React.FC<MediumEditorProps> = ({
  initialPost,
  onSave,
  onClose,
}) => {
  // Story Core Content
  const [title, setTitle] = useState(initialPost?.title || '');
  const [subtitle, setSubtitle] = useState(initialPost?.subtitle || '');
  const [blocks, setBlocks] = useState<StoryBlock[]>(() =>
    parseMarkdownToStory(initialPost?.content || '').blocks
  );
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || '/cover-free-anchor-card.webp');
  const [coverImageAlt, setCoverImageAlt] = useState(initialPost?.coverImageAlt || '');
  const [category, setCategory] = useState(initialPost?.category || 'Nervous System');
  const [tagsInput, setTagsInput] = useState(
    initialPost?.tags?.join(', ') || 'Nervous System, Mental Loops, Recovery'
  );
  const [slug, setSlug] = useState(initialPost?.slug || '');
  
  // Author defaults to Sara Mitchell persona image from landing page
  const [authorName] = useState(initialPost?.author?.name || 'Sara Mitchell');
  const [authorRole] = useState(initialPost?.author?.role || 'Founder & Trauma-Informed Guide');
  const [authorAvatar] = useState('/author-portrait.png');

  // SEO fields
  const [metaTitle, setMetaTitle] = useState(initialPost?.seo?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.seo?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(initialPost?.seo?.focusKeyword || '');

  // Editor View Modes: 'visual' | 'rawMarkdown' | 'preview'
  const [editorMode, setEditorMode] = useState<'visual' | 'rawMarkdown' | 'preview'>('visual');
  const [rawMarkdownDraft, setRawMarkdownDraft] = useState('');

  // UI state for moving (+) button & handles
  // activeBlockIndex: Tracks which line the user currently has focused or clicked
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(0);
  // hoveredBlockIndex: Tracks which line the mouse is hovering over
  const [hoveredBlockIndex, setHoveredBlockIndex] = useState<number | null>(null);
  
  const [openPlusIndex, setOpenPlusIndex] = useState<number | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isPublishDrawerOpen, setIsPublishDrawerOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved');
  const [showCoverPreview, setShowCoverPreview] = useState(true);
  const [copiedNotification, setCopiedNotification] = useState('');

  // Textarea DOM refs for programmatically focusing blocks when user hits Enter
  const blockRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // Modals
  const [activeModal, setActiveModal] = useState<'none' | 'image' | 'preset' | 'link' | 'seo' | 'pasteAi' | 'cover'>('none');
  const [insertTargetIndex, setInsertTargetIndex] = useState<number>(0);
  const [modalInput1, setModalInput1] = useState('');
  const [modalInput2, setModalInput2] = useState('');
  const [pasteAiText, setPasteAiText] = useState('');

  // Auto-save indication effect
  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      setSaveStatus('Saved');
    }, 400);
    return () => clearTimeout(timer);
  }, [title, subtitle, blocks, coverImage]);

  // Auto slugify
  useEffect(() => {
    if (!initialPost && title && !slug) {
      setSlug(slugify(title));
    }
  }, [title, initialPost, slug]);

  const rawSerializedMarkdown = serializeBlocksToMarkdown(blocks);
  const wordCount = rawSerializedMarkdown.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = calculateReadingTime(rawSerializedMarkdown);

  // Sync raw markdown when switching modes
  useEffect(() => {
    if (editorMode === 'rawMarkdown') {
      setRawMarkdownDraft(serializeBlocksToMarkdown(blocks));
    }
  }, [editorMode]);

  // Pop-up toolbar for selected text (Medium / Notion style)
  interface FloatingSelectionToolbarState {
    target: 'block' | 'title' | 'subtitle';
    blockIndex?: number;
    selectedText: string;
    start: number;
    end: number;
    position: { top: number; left: number };
    urlInput: string;
    isExistingLink: boolean;
  }
  const [floatingSelectionToolbar, setFloatingSelectionToolbar] = useState<FloatingSelectionToolbarState | null>(null);

  // Dedicated paste modal fallback for iframes where navigator.clipboard.readText is denied
  interface PasteModalState {
    isOpen: boolean;
    fieldName: string;
    targetField: 'title' | 'subtitle' | 'rawMarkdown' | 'pasteAi';
    value: string;
    suggestions?: string[];
  }
  const [pasteModal, setPasteModal] = useState<PasteModalState>({
    isOpen: false,
    fieldName: '',
    targetField: 'title',
    value: '',
  });

  // Close floating selection toolbar when clicking anywhere outside it
  useEffect(() => {
    const handleDocumentMouseDown = (e: MouseEvent) => {
      const toolbarEl = document.getElementById('floating-selection-toolbar');
      if (toolbarEl && !toolbarEl.contains(e.target as Node)) {
        setFloatingSelectionToolbar(null);
      }
    };
    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  }, []);

  // Text selection detection on mouseup and keyup across textareas
  const handleTextareaSelection = (
    e: React.SyntheticEvent<HTMLTextAreaElement>,
    target: 'block' | 'title' | 'subtitle',
    blockIndex?: number
  ) => {
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start !== null && end !== null && end > start) {
      const rawSelected = textarea.value.slice(start, end);
      const trimmed = rawSelected.trim();
      if (trimmed.length > 0) {
        const rect = textarea.getBoundingClientRect();
        let clientX = rect.left + 80;
        let clientY = rect.top;

        const nativeEvt = e.nativeEvent as unknown as { clientX?: number; clientY?: number };
        if (typeof nativeEvt?.clientX === 'number' && typeof nativeEvt?.clientY === 'number') {
          clientX = nativeEvt.clientX;
          clientY = nativeEvt.clientY;
        }

        const popupWidth = 360;
        const popupHeight = 110; // approximate height of toolbar

        const left = Math.max(12, Math.min(window.innerWidth - popupWidth - 12, clientX - popupWidth / 2));
        
        // If selection is too close to top of viewport (e.g. within top 120px), position pop-up BELOW selection instead
        let top: number;
        if (clientY < 120) {
          top = Math.min(window.innerHeight - popupHeight - 16, clientY + 36);
        } else {
          top = Math.max(16, clientY - popupHeight - 12);
        }

        // Check if selectedText is already a link: [text](url)
        const linkMatch = trimmed.match(/^\[(.*?)\]\((.*?)\)$/);
        const isExistingLink = Boolean(linkMatch);
        const cleanText = linkMatch ? linkMatch[1] : trimmed;
        const existingUrl = linkMatch ? linkMatch[2] : '';

        setFloatingSelectionToolbar({
          target,
          blockIndex,
          selectedText: cleanText,
          start,
          end,
          position: { top, left },
          urlInput: existingUrl,
          isExistingLink,
        });
      }
    }
  };

  // Apply link to the selected text
  const handleApplyInlineLink = () => {
    if (!floatingSelectionToolbar) return;
    const { target, blockIndex, selectedText, start, end, urlInput } = floatingSelectionToolbar;
    let formattedUrl = urlInput.trim();
    if (!formattedUrl) return;

    if (
      !formattedUrl.startsWith('http://') &&
      !formattedUrl.startsWith('https://') &&
      !formattedUrl.startsWith('/') &&
      !formattedUrl.startsWith('#') &&
      !formattedUrl.startsWith('mailto:')
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const markdownLink = `[${selectedText}](${formattedUrl})`;

    if (target === 'block' && typeof blockIndex === 'number') {
      const block = blocks[blockIndex];
      if (block) {
        const content = block.content || '';
        const newContent = content.substring(0, start) + markdownLink + content.substring(end);
        updateBlockContent(blockIndex, newContent);
        showToast(`🔗 Added link to "${selectedText}"!`);
      }
    } else if (target === 'title') {
      const newTitle = title.substring(0, start) + markdownLink + title.substring(end);
      setTitle(newTitle);
      showToast('🔗 Added link to title!');
    } else if (target === 'subtitle') {
      const newSubtitle = subtitle.substring(0, start) + markdownLink + subtitle.substring(end);
      setSubtitle(newSubtitle);
      showToast('🔗 Added link to subtitle!');
    }

    setFloatingSelectionToolbar(null);
  };

  // Remove link from selected text
  const handleRemoveInlineLink = () => {
    if (!floatingSelectionToolbar) return;
    const { target, blockIndex, selectedText, start, end } = floatingSelectionToolbar;

    if (target === 'block' && typeof blockIndex === 'number') {
      const block = blocks[blockIndex];
      if (block) {
        const content = block.content || '';
        const newContent = content.substring(0, start) + selectedText + content.substring(end);
        updateBlockContent(blockIndex, newContent);
        showToast(`Removed link from "${selectedText}"`);
      }
    } else if (target === 'title') {
      setTitle((prev) => prev.substring(0, start) + selectedText + prev.substring(end));
    } else if (target === 'subtitle') {
      setSubtitle((prev) => prev.substring(0, start) + selectedText + prev.substring(end));
    }

    setFloatingSelectionToolbar(null);
  };

  // Toggle inline format (bold, italic, quote)
  const handleToggleInlineFormat = (formatType: 'bold' | 'italic' | 'quote') => {
    if (!floatingSelectionToolbar) return;
    const { target, blockIndex, selectedText, start, end } = floatingSelectionToolbar;

    let formatted = selectedText;
    if (formatType === 'bold') {
      formatted = selectedText.startsWith('**') && selectedText.endsWith('**')
        ? selectedText.slice(2, -2)
        : `**${selectedText}**`;
    } else if (formatType === 'italic') {
      formatted = selectedText.startsWith('*') && selectedText.endsWith('*')
        ? selectedText.slice(1, -1)
        : `*${selectedText}*`;
    } else if (formatType === 'quote') {
      formatted = `"${selectedText.replace(/^["']|["']$/g, '')}"`;
    }

    if (target === 'block' && typeof blockIndex === 'number') {
      const block = blocks[blockIndex];
      if (block) {
        const content = block.content || '';
        const newContent = content.substring(0, start) + formatted + content.substring(end);
        updateBlockContent(blockIndex, newContent);
      }
    } else if (target === 'title') {
      setTitle((prev) => prev.substring(0, start) + formatted + prev.substring(end));
    } else if (target === 'subtitle') {
      setSubtitle((prev) => prev.substring(0, start) + formatted + prev.substring(end));
    }

    setFloatingSelectionToolbar(null);
  };

  // Robust Clipboard Paste Handler (Instantly opens assistant modal with suggestions, while attempting clipboard read in background if allowed)
  const handlePasteIntoField = async (
    targetField: 'title' | 'subtitle' | 'rawMarkdown' | 'pasteAi',
    fieldName: string,
    suggestions?: string[]
  ) => {
    // 1. Immediately launch paste dialog so user gets instantaneous visual feedback on click
    setPasteModal({
      isOpen: true,
      fieldName,
      targetField,
      value: '',
      suggestions:
        suggestions ||
        (targetField === 'title'
          ? [
              'Why You Keep Looking for Proof: The Somatic Cost of Invalidation',
              'The 72-Hour Somatic Reset: Moving Through the Freeze Response',
              'When Your Body Won\'t Let It Go: Breaking Free from Mental Loops',
              'Why Arguments Don\'t Fix It: The Vagus Nerve Detachment Protocol',
              'From Hyper-Vigilance to Grounded Self-Trust: Sara\'s Field Notes',
            ]
          : targetField === 'subtitle'
          ? [
              'A trauma-informed somatic protocol for when your nervous system feels trapped in survival mode.',
              'How to interrupt mental loops without forcing yourself to be positive or arguing with the memory.',
              'Field notes on releasing physical hyper-vigilance through somatic orienting.',
            ]
          : undefined),
    });

    // 2. Also try reading system clipboard directly if permitted by browser
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          const cleaned = text.trim().replace(/^#+\s*/, '').replace(/^["']|["']$/g, '');
          setPasteModal((prev) => ({ ...prev, value: cleaned }));
          showToast(`📋 Clipboard content detected for ${fieldName}!`);
        }
      }
    } catch {
      // If browser/iframe blocks direct read, the modal is already open for instant Ctrl+V or suggestion click!
    }
  };

  const showToast = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(''), 2500);
  };

  // Block Manipulation Methods
  const updateBlockContent = (index: number, content: string) => {
    // Check for inline markdown shortcuts (e.g. typing "## " transforms to H2)
    if (content.startsWith('## ') && blocks[index].type === 'paragraph') {
      changeBlockType(index, 'heading2');
      setBlocks((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], content: content.substring(3) };
        return copy;
      });
      return;
    }
    if ((content.startsWith('### ') || content.startsWith('#### ')) && blocks[index].type === 'paragraph') {
      changeBlockType(index, 'heading3');
      const cut = content.startsWith('#### ') ? 5 : 4;
      setBlocks((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], content: content.substring(cut) };
        return copy;
      });
      return;
    }
    if (content.startsWith('> ') && blocks[index].type === 'paragraph') {
      changeBlockType(index, 'quote');
      setBlocks((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], content: content.substring(2) };
        return copy;
      });
      return;
    }

    setBlocks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], content };
      return copy;
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    setBlocks((prev) => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setOpenMenuIndex(null);
    setActiveBlockIndex(direction === 'up' ? index - 1 : index + 1);
  };

  const changeBlockType = (index: number, newType: StoryBlock['type']) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        type: newType,
        content: copy[index].content || '',
      };
      return copy;
    });
    setOpenMenuIndex(null);
  };

  const duplicateBlock = (index: number) => {
    const target = blocks[index];
    const newBlock: StoryBlock = {
      ...target,
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setBlocks((prev) => {
      const copy = [...prev];
      copy.splice(index + 1, 0, newBlock);
      return copy;
    });
    setOpenMenuIndex(null);
    setActiveBlockIndex(index + 1);
  };

  const removeBlock = (index: number) => {
    if (blocks.length <= 1) {
      setBlocks([{ id: `block-${Date.now()}`, type: 'paragraph', content: '' }]);
      setOpenMenuIndex(null);
      return;
    }
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
    setOpenPlusIndex(null);
    setActiveBlockIndex(Math.max(0, index - 1));
  };

  const insertBlockAt = (index: number, newBlock: StoryBlock, replaceCurrentIfEmpty = false) => {
    setBlocks((prev) => {
      const copy = [...prev];
      if (replaceCurrentIfEmpty && copy[index] && (!copy[index].content || copy[index].content?.trim() === '')) {
        copy[index] = newBlock;
        return copy;
      }
      copy.splice(index + 1, 0, newBlock);
      return copy;
    });
    setOpenPlusIndex(null);
    setOpenMenuIndex(null);
    setActiveBlockIndex(replaceCurrentIfEmpty ? index : index + 1);

    setTimeout(() => {
      const targetEl = blockRefs.current[newBlock.id];
      if (targetEl) {
        targetEl.focus();
      }
    }, 50);
  };

  const triggerInsertModal = (index: number, modalType: 'image' | 'preset' | 'link') => {
    setInsertTargetIndex(index);
    setModalInput1('');
    setModalInput2('');
    setActiveModal(modalType);
    setOpenPlusIndex(null);
    setOpenMenuIndex(null);
  };

  // Fluid keyboard navigation:
  // - Enter splits the current line at cursor or creates an empty line below without friction
  // - Backspace on empty line deletes it and returns focus up
  // - Backspace at position 0 merges text smoothly with the line above
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    // Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const selStart = target.selectionStart ?? (blocks[index].content?.length || 0);
      const fullText = blocks[index].content || '';
      const textBefore = fullText.substring(0, selStart);
      const textAfter = fullText.substring(selStart);

      const newBlockId = `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newBlock: StoryBlock = {
        id: newBlockId,
        type: 'paragraph',
        content: textAfter,
      };

      setBlocks((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          content: textBefore,
        };
        copy.splice(index + 1, 0, newBlock);
        return copy;
      });

      setActiveBlockIndex(index + 1);
      setOpenPlusIndex(null);
      setOpenMenuIndex(null);

      setTimeout(() => {
        const el = blockRefs.current[newBlockId];
        if (el) {
          el.focus();
          try {
            el.setSelectionRange(0, 0);
          } catch {
            // ignore range errors on some input types
          }
        }
      }, 50);
      return;
    }

    // Backspace: handle empty block deletion or merge with previous block
    if (e.key === 'Backspace' && blocks.length > 1) {
      const target = e.currentTarget;
      const selStart = target.selectionStart ?? 0;
      const selEnd = target.selectionEnd ?? 0;
      const isEmpty = !blocks[index].content || blocks[index].content.trim() === '';

      // If empty block, delete it and move up
      if (isEmpty && selStart === 0 && selEnd === 0) {
        e.preventDefault();
        const prevIndex = Math.max(0, index - 1);
        const prevBlock = blocks[prevIndex];

        setBlocks((prev) => prev.filter((_, i) => i !== index));
        setActiveBlockIndex(prevIndex);
        setOpenPlusIndex(null);
        setOpenMenuIndex(null);

        setTimeout(() => {
          if (prevBlock && blockRefs.current[prevBlock.id]) {
            const prevEl = blockRefs.current[prevBlock.id];
            prevEl?.focus();
            const len = prevEl?.value.length || 0;
            try {
              prevEl?.setSelectionRange(len, len);
            } catch {
              // ignore
            }
          }
        }, 50);
        return;
      }

      // If cursor at start (index 0) of a text block and not first block, merge with block above
      if (
        selStart === 0 &&
        selEnd === 0 &&
        index > 0 &&
        ['paragraph', 'heading2', 'heading3'].includes(blocks[index].type)
      ) {
        const prevBlock = blocks[index - 1];
        if (prevBlock && ['paragraph', 'heading2', 'heading3'].includes(prevBlock.type)) {
          e.preventDefault();
          const prevLen = prevBlock.content?.length || 0;
          const mergedText = (prevBlock.content || '') + (blocks[index].content || '');

          setBlocks((prev) => {
            const copy = [...prev];
            copy[index - 1] = {
              ...copy[index - 1],
              content: mergedText,
            };
            copy.splice(index, 1);
            return copy;
          });

          setActiveBlockIndex(index - 1);
          setOpenPlusIndex(null);
          setOpenMenuIndex(null);

          setTimeout(() => {
            const prevEl = blockRefs.current[prevBlock.id];
            if (prevEl) {
              prevEl.focus();
              try {
                prevEl.setSelectionRange(prevLen, prevLen);
              } catch {
                // ignore
              }
            }
          }, 50);
          return;
        }
      }
    }
  };

  // AI Markdown Importer Parser Handler
  const handleApplyAiMarkdown = () => {
    if (!pasteAiText.trim()) return;

    const { extractedTitle, extractedSubtitle, blocks: parsedBlocks } = parseMarkdownToStory(pasteAiText);

    if (extractedTitle && !title) {
      setTitle(extractedTitle);
      if (!slug) setSlug(slugify(extractedTitle));
    }
    if (extractedSubtitle && !subtitle) {
      setSubtitle(extractedSubtitle);
    }

    setBlocks(parsedBlocks);
    setActiveModal('none');
    setPasteAiText('');
    showToast('AI Article formatted into story blocks!');
  };

  const handleApplyRawMarkdownDraft = () => {
    const { extractedTitle, extractedSubtitle, blocks: parsedBlocks } = parseMarkdownToStory(rawMarkdownDraft);
    if (extractedTitle && !title) setTitle(extractedTitle);
    if (extractedSubtitle && !subtitle) setSubtitle(extractedSubtitle);
    setBlocks(parsedBlocks);
    setEditorMode('visual');
    showToast('Markdown synchronized to Visual Blocks!');
  };

  const handleFinalPublish = (publishAs: 'published' | 'draft') => {
    if (!title.trim()) {
      alert('Please enter a story title before publishing.');
      return;
    }

    const finalSlug = slug.trim() ? slugify(slug) : slugify(title);
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const contentMarkdown = serializeBlocksToMarkdown(blocks);
    const excerpt = subtitle.trim() || contentMarkdown.slice(0, 160) || title.trim();

    const postToSave: BlogPost = {
      id: initialPost?.id || `post-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      excerpt,
      content: contentMarkdown,
      category,
      tags,
      coverImage: coverImage.trim() || '/cover-free-anchor-card.webp',
      coverImageAlt: coverImageAlt.trim() || title.trim(),
      author: {
        name: authorName,
        role: authorRole,
        avatar: authorAvatar,
      },
      readingTimeMinutes: readingTime,
      publishedAt: initialPost?.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: publishAs,
      featured: initialPost?.featured || false,
      seo: {
        metaTitle: metaTitle.trim() || `${title.trim()} | HerHorizon`,
        metaDescription: metaDescription.trim() || excerpt.slice(0, 155),
        focusKeyword: focusKeyword.trim() || undefined,
        keywords: tags,
        canonicalUrl: `https://herhorizon.store/blog/${finalSlug}`,
      },
    };

    onSave(postToSave);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col overflow-hidden text-[#242424] font-sans selection:bg-[#E2B072]/30 selection:text-[#2D2A26] animate-in fade-in duration-150">
      
      {/* 1. TOP HEADER (Medium-style Header with Mode Switcher & Publish controls) */}
      <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-[#F0ECE6] flex items-center justify-between shrink-0 bg-white sticky top-0 z-30">
        
        {/* Left: Brand + Author Persona Pill + Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2">
            {/* Sara Mitchell Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E2B072] shadow-2xs shrink-0 bg-[#FAF4EB]">
              <img
                src={authorAvatar}
                alt="Sara Mitchell"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="hidden sm:block text-left">
              <span className="font-serif italic font-bold text-sm text-[#242424] block leading-none">
                Sara Mitchell
              </span>
              <span className="text-[10px] text-[#8C7A74] tracking-wider uppercase font-medium">
                HerHorizon Journal
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs text-[#757575] border-l border-[#E6E6E6] pl-3">
            <span>Draft</span>
            <span className="text-[11px] text-[#A8A8A8]">• {saveStatus}</span>
          </div>
        </div>

        {/* Center: Mode Switcher (Visual Blocks | Raw Markdown | Reader Preview) */}
        <div className="hidden lg:flex items-center bg-[#F7F5F0] p-1 rounded-full border border-[#EBE5DC] text-xs">
          <button
            onClick={() => setEditorMode('visual')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              editorMode === 'visual'
                ? 'bg-white text-[#242424] shadow-xs'
                : 'text-[#757575] hover:text-[#242424]'
            }`}
          >
            Visual Blocks
          </button>
          <button
            onClick={() => setEditorMode('rawMarkdown')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              editorMode === 'rawMarkdown'
                ? 'bg-white text-[#242424] shadow-xs'
                : 'text-[#757575] hover:text-[#242424]'
            }`}
          >
            Raw Markdown
          </button>
          <button
            onClick={() => setEditorMode('preview')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              editorMode === 'preview'
                ? 'bg-white text-[#242424] shadow-xs'
                : 'text-[#757575] hover:text-[#242424]'
            }`}
          >
            Reader Preview
          </button>
        </div>

        {/* Right: Quick Paste AI Button + Full-Width Toggle + Publish */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* PASTE AI MARKDOWN BUTTON */}
          <button
            type="button"
            onClick={() => setActiveModal('pasteAi')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#8C5229] hover:text-[#5E3618] bg-[#FDF5ED] hover:bg-[#F9ECE0] border border-[#EAC9AD] px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
            title="Paste full markdown generated by AI (ChatGPT, Claude, Gemini)"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#BD7469]" />
            <span className="hidden sm:inline">Paste AI Article</span>
            <span className="sm:hidden">Paste AI</span>
          </button>

          {/* Full-Width / Standard Width Toggle */}
          <button
            onClick={() => setIsFullWidth(!isFullWidth)}
            className="hidden md:inline-flex items-center space-x-1 text-xs text-[#6B6B6B] hover:text-[#242424] bg-[#F7F7F7] hover:bg-[#EFEFEF] px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
            title={isFullWidth ? 'Standard View' : 'Full Wide View'}
          >
            {isFullWidth ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Preview Button */}
          <button
            onClick={() => setEditorMode(editorMode === 'preview' ? 'visual' : 'preview')}
            className="lg:hidden p-1.5 text-[#757575] hover:text-[#242424] rounded-full hover:bg-[#F2F2F2]"
            title="Toggle preview"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Green Publish Pill */}
          <button
            onClick={() => setIsPublishDrawerOpen(true)}
            className="inline-flex items-center space-x-1 bg-[#1A8917] hover:bg-[#156F12] active:scale-[0.98] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <span>Publish</span>
          </button>

          {/* More options menu (...) */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-1.5 text-[#757575] hover:text-[#242424] rounded-full hover:bg-[#F2F2F2] transition-colors cursor-pointer"
              title="More settings"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-10 w-64 bg-white border border-[#E6E6E6] rounded-2xl shadow-xl py-2 z-40 text-xs animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => {
                    setActiveModal('pasteAi');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#FDF5ED] flex items-center space-x-2 text-[#8C5229] font-medium"
                >
                  <Wand2 className="w-4 h-4 text-[#BD7469]" />
                  <span>Paste AI Markdown Article</span>
                </button>
                <button
                  onClick={() => {
                    setActiveModal('seo');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F9F9F9] flex items-center space-x-2 text-[#242424]"
                >
                  <Globe className="w-4 h-4 text-[#1A8917]" />
                  <span>SEO &amp; Google Metadata</span>
                </button>
                <button
                  onClick={() => {
                    setActiveModal('preset');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F9F9F9] flex items-center space-x-2 text-[#242424]"
                >
                  <FolderOpen className="w-4 h-4 text-[#757575]" />
                  <span>Change Cover Graphic</span>
                </button>
                <button
                  onClick={() => {
                    setShowCoverPreview(!showCoverPreview);
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F9F9F9] flex items-center space-x-2 text-[#242424]"
                >
                  <ImageIcon className="w-4 h-4 text-[#757575]" />
                  <span>{showCoverPreview ? 'Hide Top Cover Preview' : 'Show Top Cover Preview'}</span>
                </button>
                <div className="h-px bg-[#F2F2F2] my-1" />
                <div className="px-4 py-2 text-[11px] text-[#8C8C8C] space-y-0.5">
                  <div>Author: Sara Mitchell</div>
                  <div>Total Words: {wordCount}</div>
                  <div>Estimated Read: ~{readingTime} min</div>
                  <div>Blocks: {blocks.length}</div>
                </div>
              </div>
            )}
          </div>

          {/* Close Editor Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-[#757575] hover:text-[#242424] rounded-full hover:bg-[#F2F2F2] transition-colors cursor-pointer"
            title="Exit editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* TOAST POPUP NOTIFICATION */}
      {copiedNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-3.5 h-3.5 text-[#E2B072]" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* 2. MAIN SCROLLABLE WRITING CANVAS */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden bg-white"
        onClick={() => {
          setOpenMenuIndex(null);
        }}
      >
        
        {/* MODE A: LIVE READER PREVIEW */}
        {editorMode === 'preview' && (
          <div className={`${isFullWidth ? 'max-w-4xl' : 'max-w-3xl'} mx-auto px-4 sm:px-8 py-12 text-left`}>
            <div className="flex items-center space-x-2 text-xs text-[#757575] mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A8917] bg-[#E8F3E8] px-2.5 py-0.5 rounded-full">
                {category}
              </span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
            
            <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#242424] leading-tight mb-4 break-words">
              {title || 'Untitled Article'}
            </h1>

            {subtitle && (
              <p className="font-serif text-lg sm:text-xl text-[#757575] italic font-light mb-6 break-words">
                {subtitle}
              </p>
            )}

            {/* Author Byline Preview */}
            <div className="flex items-center space-x-3 py-3 border-y border-[#F0ECE6] my-6">
              <img
                src={authorAvatar}
                alt="Sara Mitchell"
                className="w-10 h-10 rounded-full object-cover border border-[#E2B072]"
              />
              <div>
                <div className="text-sm font-semibold text-[#2D2A26]">Sara Mitchell</div>
                <div className="text-xs text-[#8C7A74]">Founder &amp; Trauma-Informed Guide</div>
              </div>
            </div>

            {coverImage && (
              <div className="my-8 rounded-2xl overflow-hidden border border-[#F0F0F0] shadow-sm">
                <img
                  src={coverImage}
                  alt={coverImageAlt || title}
                  className="w-full h-auto max-h-[480px] object-cover"
                />
              </div>
            )}

            <div className="py-4">
              <BlogArticleRenderer content={rawSerializedMarkdown} />
            </div>
          </div>
        )}

        {/* MODE B: RAW MARKDOWN EDITOR (Direct paste or fine editing for AI outputs) */}
        {editorMode === 'rawMarkdown' && (
          <div className={`${isFullWidth ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-4 sm:px-8 py-8 text-left`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0ECE6]">
              <div>
                <h3 className="font-serif italic font-bold text-lg text-[#242424]">
                  Raw Markdown Content
                </h3>
                <p className="text-xs text-[#757575]">
                  Paste AI-generated markdown directly here, or make bulk edits.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handlePasteIntoField('rawMarkdown', 'Markdown Article')}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-[#1A8917] bg-[#E8F3E8] hover:bg-[#DDF0DD] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Paste Clipboard</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyRawMarkdownDraft}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-[#1A8917] hover:bg-[#156F12] px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Sync to Blocks</span>
                </button>
              </div>
            </div>

            <textarea
              value={rawMarkdownDraft}
              onChange={(e) => setRawMarkdownDraft(e.target.value)}
              placeholder="Paste or write your full markdown story here (# Heading, ## Section, > Quote, paragraphs)..."
              rows={24}
              wrap="soft"
              className="w-full p-4 font-mono text-sm leading-relaxed text-[#2D2A26] bg-[#FAF9F6] border border-[#E0D9CF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E2B072] whitespace-pre-wrap break-words"
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
            />
          </div>
        )}

        {/* MODE C: VISUAL CLEAN MEDIUM-STYLE LINE EDITOR */}
        {editorMode === 'visual' && (
          <div className={`${isFullWidth ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-4 sm:px-8 py-10 sm:py-14 text-left`}>
            
            {/* TOP COVER BANNER (Compact & Removable) */}
            {coverImage && showCoverPreview ? (
              <div className="relative mb-8 rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAF8F5] group">
                <img
                  src={coverImage}
                  alt={coverImageAlt || "Story cover"}
                  className="w-full h-40 sm:h-52 object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                  <button
                    onClick={() => setActiveModal('cover')}
                    className="bg-white/95 text-[11px] font-semibold text-[#242424] px-3 py-1.5 rounded-full shadow-md hover:bg-white transition-colors cursor-pointer"
                  >
                    Change Cover
                  </button>
                  <button
                    onClick={() => {
                      setCoverImage('');
                      showToast('Removed cover image (text-only article)');
                    }}
                    className="bg-red-600/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                    title="Remove cover image"
                  >
                    Remove Cover
                  </button>
                  <button
                    onClick={() => setShowCoverPreview(false)}
                    className="bg-black/60 text-white p-1.5 rounded-full hover:bg-black transition-colors cursor-pointer"
                    title="Hide banner preview"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveModal('cover')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#757575] hover:text-[#242424] bg-[#F5F5F5] hover:bg-[#EBEBEB] px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-[#E2E2E2]"
                >
                  <ImageIcon className="w-4 h-4 text-[#1A8917]" />
                  <span>+ Add Cover Image Banner</span>
                </button>
                {coverImage && !showCoverPreview && (
                  <button
                    type="button"
                    onClick={() => setShowCoverPreview(true)}
                    className="text-xs text-[#1A8917] hover:underline font-medium"
                  >
                    Show Cover Preview
                  </button>
                )}
              </div>
            )}

            {/* TITLE HEADER AREA WITH RELIABLE PASTE TITLE BUTTON */}
            <div className="mb-6 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A8A8]">
                  Story Title
                </span>

                {/* PASTE TITLE BUTTON */}
                <button
                  type="button"
                  onClick={() => handlePasteIntoField('title', 'Story Title')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1A8917] hover:text-[#156F12] bg-[#E8F3E8] hover:bg-[#DDF0DD] px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-2xs"
                  title="Paste title from clipboard or open title assistant"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Paste Title</span>
                </button>
              </div>

              {/* Title Auto-Expanding Textarea (Full View, No Cutoffs, Soft Wraps) */}
              <AutoTextarea
                value={title}
                onValueChange={setTitle}
                onMouseUp={(e) => handleTextareaSelection(e, 'title')}
                onKeyUp={(e) => handleTextareaSelection(e, 'title')}
                placeholder="Title..."
                minHeight={52}
                className="font-serif text-3xl sm:text-4xl md:text-[42px] leading-[1.2] text-[#242424] placeholder-[#B3B3B3] font-normal tracking-tight"
              />
            </div>

            {/* SUBTITLE AREA WITH PASTE SUBTITLE BUTTON */}
            <div className="mb-10 relative group pb-5 border-b border-[#F2F2F2]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A8A8]">
                  Subtitle / Hook (Optional)
                </span>

                <button
                  type="button"
                  onClick={() => handlePasteIntoField('subtitle', 'Subtitle')}
                  className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#757575] hover:text-[#242424] bg-[#F5F5F5] hover:bg-[#EBEBEB] px-3 py-1 rounded-full transition-colors cursor-pointer"
                  title="Paste subtitle"
                >
                  <ClipboardPaste className="w-3 h-3" />
                  <span>Paste Subtitle</span>
                </button>
              </div>

              {/* Subtitle AutoTextarea */}
              <AutoTextarea
                value={subtitle}
                onValueChange={setSubtitle}
                onMouseUp={(e) => handleTextareaSelection(e, 'subtitle')}
                onKeyUp={(e) => handleTextareaSelection(e, 'subtitle')}
                placeholder="Tell your reader what field note or realization this is about..."
                minHeight={36}
                className="font-sans text-base sm:text-lg text-[#6B6B6B] placeholder-[#CCCCCC] font-light leading-relaxed"
              />
            </div>

            {/* STORY BLOCKS: THE (+) AND (⋮⋮) BUTTONS MOVE WHEREVER YOU CLICK, HOVER, OR TYPE! */}
            <div className="space-y-4">
              {blocks.map((block, index) => {
                const isCurrentLine = activeBlockIndex === index;
                const isHovered = hoveredBlockIndex === index;
                const isPlusOpen = openPlusIndex === index;
                const isMenuOpen = openMenuIndex === index;

                // The handle is visible on the line where you have your cursor or mouse!
                const showHandles = isCurrentLine || isHovered || isPlusOpen || isMenuOpen;
                const isEmpty = !block.content || !block.content.trim();

                return (
                  <div
                    key={block.id}
                    onMouseEnter={() => setHoveredBlockIndex(index)}
                    onMouseLeave={() => setHoveredBlockIndex((prev) => (prev === index ? null : prev))}
                    onClick={() => setActiveBlockIndex(index)}
                    className="relative group transition-colors duration-150 pl-14 sm:pl-16 min-h-[34px] py-1 hover:bg-[#FAF9F6]/40 rounded-lg"
                  >
                    
                    {/* GUTTER CONTROLS (STRICTLY ON THE LEFT MARGIN - NEVER TOUCHES OR OVERLAYS TEXT) */}
                    <div
                      className={`absolute left-0 top-1.5 flex items-center space-x-1 transition-all duration-150 z-30 select-none ${
                        showHandles
                          ? 'opacity-100 translate-x-0 pointer-events-auto'
                          : 'opacity-0 -translate-x-1 pointer-events-none'
                      }`}
                    >
                      {/* 1. QUIET (+) INLINE INSERTER BUTTON */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveBlockIndex(index);
                          setOpenPlusIndex(isPlusOpen ? null : index);
                          setOpenMenuIndex(null);
                        }}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                          isPlusOpen
                            ? 'rotate-45 border-[#1A8917] bg-[#1A8917] text-white shadow-xs'
                            : 'border-[#D5D0C7] bg-white text-[#6E675F] hover:border-[#1A8917] hover:text-[#1A8917] hover:bg-[#F2FBF2]'
                        }`}
                        title="Add image, link, quote, or heading here"
                      >
                        <Plus className="w-3.5 h-3.5 transition-transform" />
                      </button>

                      {/* 2. QUIET (⋮⋮) MORE OPTIONS BUTTON */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveBlockIndex(index);
                            setOpenMenuIndex(isMenuOpen ? null : index);
                            setOpenPlusIndex(null);
                          }}
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                            isMenuOpen
                              ? 'bg-[#E5DFD5] text-[#242424]'
                              : 'text-[#9C948A] hover:text-[#242424] hover:bg-[#EFEAE2]'
                          }`}
                          title="Line options: Move up/down, duplicate, turn into, delete"
                        >
                          <GripVertical className="w-3.5 h-3.5" />
                        </button>

                        {/* CLICK-AWAY OVERLAY FOR OPTIONS MENU */}
                        {isMenuOpen && (
                          <div
                            className="fixed inset-0 z-40 cursor-default"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuIndex(null);
                            }}
                          />
                        )}

                        {/* POPOVER MENU DROPS CLEANLY BELOW BUTTON (NEVER ON TOP OF TEXT) */}
                        {isMenuOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute left-0 top-7 w-60 bg-white border border-[#DDD6CC] rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100 text-left"
                          >
                            {/* Block Info Badge */}
                            <div className="px-3.5 py-1 mb-1 text-[10px] uppercase font-bold tracking-wider text-[#A0988E] border-b border-[#F0ECE6] flex items-center justify-between">
                              <span>Section {index + 1}</span>
                              <span className="text-[#BD7469] font-semibold">{block.type}</span>
                            </div>

                            {/* Move Up */}
                            <button
                              type="button"
                              onClick={() => moveBlock(index, 'up')}
                              disabled={index === 0}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-between text-[#242424] cursor-pointer"
                            >
                              <div className="flex items-center space-x-2.5">
                                <ChevronUp className="w-4 h-4 text-[#757575]" />
                                <span>Move Section Up</span>
                              </div>
                              <span className="text-[10px] text-[#A8A8A8] font-mono">↑</span>
                            </button>

                            {/* Move Down */}
                            <button
                              type="button"
                              onClick={() => moveBlock(index, 'down')}
                              disabled={index === blocks.length - 1}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-between text-[#242424] cursor-pointer"
                            >
                              <div className="flex items-center space-x-2.5">
                                <ChevronDown className="w-4 h-4 text-[#757575]" />
                                <span>Move Section Down</span>
                              </div>
                              <span className="text-[10px] text-[#A8A8A8] font-mono">↓</span>
                            </button>

                            <div className="h-px bg-[#F0ECE6] my-1" />

                            {/* Insert / Convert to Image directly */}
                            <button
                              type="button"
                              onClick={() => triggerInsertModal(index, 'image')}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] flex items-center space-x-2.5 text-[#1A8917] font-medium cursor-pointer"
                            >
                              <ImageIcon className="w-4 h-4 text-[#1A8917]" />
                              <span>Add Image Here</span>
                            </button>

                            {/* Visual Library */}
                            <button
                              type="button"
                              onClick={() => triggerInsertModal(index, 'preset')}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] flex items-center space-x-2.5 text-[#242424] cursor-pointer"
                            >
                              <FolderOpen className="w-4 h-4 text-[#757575]" />
                              <span>HerHorizon Graphics</span>
                            </button>

                            {/* Insert Link */}
                            <button
                              type="button"
                              onClick={() => triggerInsertModal(index, 'link')}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] flex items-center space-x-2.5 text-[#242424] cursor-pointer"
                            >
                              <LinkIcon className="w-4 h-4 text-[#757575]" />
                              <span>Insert Link</span>
                            </button>

                            {/* Duplicate */}
                            <button
                              type="button"
                              onClick={() => duplicateBlock(index)}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] flex items-center space-x-2.5 text-[#242424] cursor-pointer"
                            >
                              <Copy className="w-4 h-4 text-[#757575]" />
                              <span>Duplicate Section</span>
                            </button>

                            <div className="h-px bg-[#F0ECE6] my-1" />

                            {/* Transform Type */}
                            <div className="px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider text-[#A0988E]">
                              Turn Into
                            </div>
                            <button
                              type="button"
                              onClick={() => changeBlockType(index, 'paragraph')}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-[#FAF8F5] flex items-center space-x-2 text-[#242424] cursor-pointer"
                            >
                              <span className="font-serif font-bold text-xs">¶</span>
                              <span>Paragraph</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => changeBlockType(index, 'heading2')}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-[#FAF8F5] flex items-center space-x-2 text-[#242424] cursor-pointer"
                            >
                              <Heading2 className="w-3.5 h-3.5 text-[#757575]" />
                              <span>Heading 2 (H2)</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => changeBlockType(index, 'heading3')}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-[#FAF8F5] flex items-center space-x-2 text-[#242424] cursor-pointer"
                            >
                              <Heading3 className="w-3.5 h-3.5 text-[#757575]" />
                              <span>Heading 3 (H3)</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => changeBlockType(index, 'quote')}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-[#FAF8F5] flex items-center space-x-2 text-[#242424] cursor-pointer"
                            >
                              <Quote className="w-3.5 h-3.5 text-[#757575]" />
                              <span>Pull Quote</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => changeBlockType(index, 'callout')}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-[#FAF8F5] flex items-center space-x-2 text-[#242424] cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#E2B072]" />
                              <span>Somatic Callout</span>
                            </button>

                            <div className="h-px bg-[#F0ECE6] my-1" />

                            {/* Delete Line */}
                            <button
                              type="button"
                              onClick={() => removeBlock(index)}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#FDF2F0] text-[#C05746] flex items-center space-x-2.5 cursor-pointer font-medium"
                            >
                              <Trash2 className="w-4 h-4 text-[#C05746]" />
                              <span>Delete Section</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* QUICK (+) INLINE INSERTER PALETTE DROPS DIRECTLY BELOW (+) */}
                      {isPlusOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40 cursor-default"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenPlusIndex(null);
                            }}
                          />
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute left-0 ${
                              index > blocks.length - 3 && index > 1 ? 'bottom-8' : 'top-7'
                            } w-72 sm:w-80 bg-white border border-[#DDD6CC] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-left`}
                          >
                            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#F0ECE6]">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0988E]">
                                Insert at this line
                              </span>
                              <button
                                type="button"
                                onClick={() => setOpenPlusIndex(null)}
                                className="p-0.5 text-[#A0988E] hover:text-[#242424] cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-1 text-xs">
                              {/* 1. Add Image URL */}
                              <button
                                type="button"
                                onClick={() => triggerInsertModal(index, 'image')}
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F2FBF2] text-[#242424] hover:text-[#1A8917] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <ImageIcon className="w-4 h-4 text-[#1A8917]" />
                                <span className="font-medium">Image</span>
                              </button>

                              {/* 2. Visual Library */}
                              <button
                                type="button"
                                onClick={() => triggerInsertModal(index, 'preset')}
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F2FBF2] text-[#242424] hover:text-[#1A8917] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <FolderOpen className="w-4 h-4 text-[#1A8917]" />
                                <span className="font-medium">Photo Library</span>
                              </button>

                              {/* 3. Section Heading H2 */}
                              <button
                                type="button"
                                onClick={() =>
                                  insertBlockAt(
                                    index,
                                    { id: `block-${Date.now()}`, type: 'heading2', content: '' },
                                    true
                                  )
                                }
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F2EB] text-[#242424] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <Heading2 className="w-4 h-4 text-[#757575]" />
                                <span className="font-serif font-bold">H2 Heading</span>
                              </button>

                              {/* 4. Subheading H3 */}
                              <button
                                type="button"
                                onClick={() =>
                                  insertBlockAt(
                                    index,
                                    { id: `block-${Date.now()}`, type: 'heading3', content: '' },
                                    true
                                  )
                                }
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F2EB] text-[#242424] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <Heading3 className="w-4 h-4 text-[#757575]" />
                                <span className="font-serif font-bold">H3 Subhead</span>
                              </button>

                              {/* 5. Pull Quote */}
                              <button
                                type="button"
                                onClick={() =>
                                  insertBlockAt(
                                    index,
                                    { id: `block-${Date.now()}`, type: 'quote', content: '' },
                                    true
                                  )
                                }
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F2EB] text-[#242424] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <Quote className="w-4 h-4 text-[#757575]" />
                                <span>Pull Quote</span>
                              </button>

                              {/* 6. Somatic Note */}
                              <button
                                type="button"
                                onClick={() =>
                                  insertBlockAt(
                                    index,
                                    {
                                      id: `block-${Date.now()}`,
                                      type: 'callout',
                                      content: '⚡ **Somatic Anchor Note:** ',
                                    },
                                    true
                                  )
                                }
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FDF5ED] text-[#8C5229] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <Sparkles className="w-4 h-4 text-[#E2B072]" />
                                <span className="font-medium">Somatic Box</span>
                              </button>

                              {/* 7. Link */}
                              <button
                                type="button"
                                onClick={() => triggerInsertModal(index, 'link')}
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F2EB] text-[#242424] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <LinkIcon className="w-4 h-4 text-[#757575]" />
                                <span>Link</span>
                              </button>

                              {/* 8. Divider */}
                              <button
                                type="button"
                                onClick={() =>
                                  insertBlockAt(
                                    index,
                                    { id: `block-${Date.now()}`, type: 'divider' },
                                    false
                                  )
                                }
                                className="p-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F2EB] text-[#242424] flex items-center space-x-2 transition-colors cursor-pointer"
                              >
                                <Minus className="w-4 h-4 text-[#757575]" />
                                <span>Divider</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* CONTENT EDITORS BY BLOCK TYPE (NO CUTOFFS, FULL SOFT-WRAP) */}
                    
                    {/* Paragraph Block */}
                    {block.type === 'paragraph' && (
                      <div>
                        <AutoTextarea
                          ref={(el) => {
                            blockRefs.current[block.id] = el;
                          }}
                          value={block.content || ''}
                          onFocus={() => {
                            setActiveBlockIndex(index);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onMouseUp={(e) => handleTextareaSelection(e, 'block', index)}
                          onKeyUp={(e) => handleTextareaSelection(e, 'block', index)}
                          onValueChange={(val) => updateBlockContent(index, val)}
                          placeholder="Tell your story..."
                          minHeight={32}
                          className="font-serif text-lg sm:text-[20px] leading-[1.8] text-[#242424] placeholder-[#C7C2BA] font-normal"
                        />
                      </div>
                    )}

                    {/* Heading 2 Block */}
                    {block.type === 'heading2' && (
                      <AutoTextarea
                        ref={(el) => {
                          blockRefs.current[block.id] = el;
                        }}
                        value={block.content || ''}
                        onFocus={() => {
                          setActiveBlockIndex(index);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onMouseUp={(e) => handleTextareaSelection(e, 'block', index)}
                        onKeyUp={(e) => handleTextareaSelection(e, 'block', index)}
                        onValueChange={(val) => updateBlockContent(index, val)}
                        placeholder="Section Heading (H2)..."
                        minHeight={36}
                        className="font-serif italic text-2xl sm:text-3xl text-[#242424] font-normal leading-snug pt-2"
                      />
                    )}

                    {/* Heading 3 Block */}
                    {block.type === 'heading3' && (
                      <AutoTextarea
                        ref={(el) => {
                          blockRefs.current[block.id] = el;
                        }}
                        value={block.content || ''}
                        onFocus={() => {
                          setActiveBlockIndex(index);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onMouseUp={(e) => handleTextareaSelection(e, 'block', index)}
                        onKeyUp={(e) => handleTextareaSelection(e, 'block', index)}
                        onValueChange={(val) => updateBlockContent(index, val)}
                        placeholder="Subheading (H3)..."
                        minHeight={32}
                        className="font-serif italic text-xl sm:text-2xl text-[#3D3532] font-medium leading-snug pt-1"
                      />
                    )}

                    {/* Pull Quote Block */}
                    {block.type === 'quote' && (
                      <div className="my-2 pl-4 sm:pl-6 border-l-4 border-[#1A8917] bg-[#F9FAF9] py-3 rounded-r-xl">
                        <AutoTextarea
                          ref={(el) => {
                            blockRefs.current[block.id] = el;
                          }}
                          value={block.content || ''}
                          onFocus={() => {
                            setActiveBlockIndex(index);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onMouseUp={(e) => handleTextareaSelection(e, 'block', index)}
                          onKeyUp={(e) => handleTextareaSelection(e, 'block', index)}
                          onValueChange={(val) => updateBlockContent(index, val)}
                          placeholder="Type pull quote here..."
                          minHeight={36}
                          className="font-serif italic text-lg sm:text-xl text-[#242424] leading-relaxed"
                        />
                      </div>
                    )}

                    {/* Somatic Callout Block */}
                    {block.type === 'callout' && (
                      <div className="my-2 p-4 bg-[#FAF7F2] border border-[#E8DCD5] rounded-2xl flex items-start space-x-3 shadow-2xs">
                        <Sparkles className="w-5 h-5 text-[#E2B072] shrink-0 mt-0.5" />
                        <AutoTextarea
                          ref={(el) => {
                            blockRefs.current[block.id] = el;
                          }}
                          value={block.content || ''}
                          onFocus={() => {
                            setActiveBlockIndex(index);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onMouseUp={(e) => handleTextareaSelection(e, 'block', index)}
                          onKeyUp={(e) => handleTextareaSelection(e, 'block', index)}
                          onValueChange={(val) => updateBlockContent(index, val)}
                          placeholder="Somatic grounding note or practical takeaway..."
                          minHeight={32}
                          className="text-sm sm:text-base text-[#3D3532] leading-relaxed font-sans"
                        />
                      </div>
                    )}

                    {/* Image Block with direct floating controls: Move Up, Move Down, Replace, Delete */}
                    {block.type === 'image' && (
                      <div className="my-3 border border-[#E6E6E6] rounded-2xl overflow-hidden bg-[#FAF8F5] relative group/img shadow-2xs">
                        {/* Floating Image Control Bar */}
                        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/95 backdrop-blur-xs p-1 rounded-full shadow-md border border-[#E0D8CE] z-20">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBlock(index, 'up');
                            }}
                            disabled={index === 0}
                            className="px-2.5 py-1 text-xs font-medium text-[#4A453E] hover:text-[#1A8917] hover:bg-[#F2FBF2] rounded-full disabled:opacity-25 transition-colors cursor-pointer flex items-center space-x-1"
                            title="Move image up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Up</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBlock(index, 'down');
                            }}
                            disabled={index === blocks.length - 1}
                            className="px-2.5 py-1 text-xs font-medium text-[#4A453E] hover:text-[#1A8917] hover:bg-[#F2FBF2] rounded-full disabled:opacity-25 transition-colors cursor-pointer flex items-center space-x-1"
                            title="Move image down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Down</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerInsertModal(index - 1, 'preset');
                            }}
                            className="px-2.5 py-1 text-xs font-medium text-[#1A8917] hover:bg-[#E8F3E8] rounded-full transition-colors cursor-pointer flex items-center space-x-1"
                            title="Change image"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Replace</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBlock(index);
                            }}
                            className="p-1 text-[#9C948A] hover:text-[#C05746] hover:bg-[#FDF2F0] rounded-full transition-colors cursor-pointer"
                            title="Delete image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <img
                          src={block.imageUrl || '/cover-free-anchor-card.webp'}
                          alt={block.imageAlt || 'Article illustration'}
                          className="w-full h-auto max-h-[460px] object-cover"
                        />
                        <div className="p-3 bg-white border-t border-[#F0F0F0] flex items-center justify-between gap-3 text-xs">
                          <input
                            type="text"
                            value={block.imageAlt || ''}
                            onChange={(e) => {
                              const copy = [...blocks];
                              copy[index].imageAlt = e.target.value;
                              setBlocks(copy);
                            }}
                            placeholder="Add image caption / alt text for SEO..."
                            className="flex-1 text-xs text-[#757575] bg-transparent border-none outline-none italic"
                          />
                          <span className="text-[10px] text-[#A69E92] hidden sm:inline">
                            Use Up/Down buttons above to reorder image
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Divider Block */}
                    {block.type === 'divider' && (
                      <div className="py-4 flex items-center justify-center space-x-2 text-[#CCCCCC]">
                        <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
                        <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
                        <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* QUICK BOTTOM ACTIONS (Add Line Below, Add Image Below, Paste AI) */}
            <div className="mt-10 pt-6 border-t border-[#F2F2F2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    insertBlockAt(blocks.length - 1, {
                      id: `block-${Date.now()}`,
                      type: 'paragraph',
                      content: '',
                    })
                  }
                  className="inline-flex items-center space-x-1.5 bg-[#FAF9F6] hover:bg-[#F2ECE3] text-[#242424] border border-[#DDD8CF] px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#1A8917]" />
                  <span>Add Line Below</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerInsertModal(blocks.length - 1, 'image')}
                  className="inline-flex items-center space-x-1.5 bg-[#FAF9F6] hover:bg-[#F2ECE3] text-[#242424] border border-[#DDD8CF] px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#1A8917]" />
                  <span>Add Image Below</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('pasteAi')}
                  className="inline-flex items-center space-x-1.5 bg-[#FDF5ED] hover:bg-[#F8EAE0] text-[#8C5229] border border-[#EAC9AD] px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#BD7469]" />
                  <span>Paste AI Markdown Article</span>
                </button>
              </div>

              <div className="text-[#8C8C8C] flex items-center space-x-3">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>~{readingTime} min read</span>
                <span>•</span>
                <button
                  onClick={() => setActiveModal('seo')}
                  className="text-[#1A8917] hover:underline font-medium cursor-pointer"
                >
                  SEO Metadata
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 3. MODAL: IMPORT FULL AI MARKDOWN ARTICLE */}
      {activeModal === 'pasteAi' && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#FDF5ED] text-[#BD7469] flex items-center justify-center">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif italic text-lg sm:text-xl text-[#242424] font-bold">
                    Paste AI Markdown Article
                  </h3>
                  <p className="text-xs text-[#757575]">
                    Ask AI (ChatGPT, Claude, Gemini) to write an article, and paste it here.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModal('none');
                  setPasteAiText('');
                }}
                className="text-[#757575] hover:text-[#242424] p-1 rounded-full hover:bg-[#F2F2F2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clipboard Paste Quick Action */}
            <div className="py-3 flex items-center justify-between">
              <span className="text-xs text-[#757575]">
                We automatically format headings, quotes, somatic notes, and paragraphs.
              </span>

              <button
                type="button"
                onClick={() => handlePasteIntoField('pasteAi', 'AI Article')}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1A8917] bg-[#E8F3E8] hover:bg-[#DDF0DD] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span>Paste from Clipboard</span>
              </button>
            </div>

            {/* Textarea for pasting */}
            <div className="flex-1 min-h-[220px] mb-4">
              <textarea
                value={pasteAiText}
                onChange={(e) => setPasteAiText(e.target.value)}
                placeholder={`# Article Title\n\nSubtitle: Optional hook\n\nHere is the introductory paragraph...\n\n## 1. Why Your Brain Loops\n\n> "You do not have to prove that they harmed you."\n\n⚡ Somatic Anchor Note: Place bare feet flat on the floor.`}
                wrap="soft"
                className="w-full h-full min-h-[220px] p-4 font-mono text-xs sm:text-sm text-[#2D2A26] bg-[#FAF9F6] border border-[#DDD8CF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E2B072] whitespace-pre-wrap break-words resize-none"
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
              <span className="text-xs text-[#8C8C8C]">
                {pasteAiText.trim().split(/\s+/).filter(Boolean).length} words detected
              </span>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('none');
                    setPasteAiText('');
                  }}
                  className="px-4 py-2 text-xs text-[#757575] hover:bg-[#F5F5F5] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!pasteAiText.trim()}
                  onClick={handleApplyAiMarkdown}
                  className="px-5 py-2 text-xs bg-[#1A8917] hover:bg-[#156F12] disabled:opacity-40 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Format &amp; Convert to Story Blocks</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. MEDIUM PUBLISH DRAWER (Slides in when user clicks "Publish") */}
      {isPublishDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center sm:justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg h-full overflow-y-auto p-6 sm:p-10 flex flex-col justify-between text-left shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0]">
                <div>
                  <h3 className="font-serif italic font-bold text-xl text-[#242424]">
                    Story Preview &amp; Publishing
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <img
                      src={authorAvatar}
                      alt="Sara Mitchell"
                      className="w-5 h-5 rounded-full object-cover border border-[#E2B072]"
                    />
                    <span className="text-xs text-[#757575]">Author: Sara Mitchell</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublishDrawerOpen(false)}
                  className="p-1 text-[#757575] hover:text-[#242424] rounded-full hover:bg-[#F2F2F2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Story Card Preview */}
              <div className="border border-[#E6E6E6] rounded-2xl overflow-hidden bg-[#FAF9F6] shadow-xs">
                {coverImage && (
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A8917]">
                    {category}
                  </span>
                  <h4 className="font-serif italic font-bold text-base text-[#242424] line-clamp-2">
                    {title || 'Untitled Article'}
                  </h4>
                  <p className="text-xs text-[#757575] line-clamp-2">
                    {subtitle || rawSerializedMarkdown.slice(0, 100) || 'Story excerpt...'}
                  </p>
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#242424] uppercase tracking-wider mb-1.5">
                  Select Recovery Topic / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs p-3 bg-white border border-[#D9D9D9] rounded-xl text-[#242424] focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                >
                  {BLOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-semibold text-[#242424] uppercase tracking-wider mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Vagus Nerve, Trauma Bonds, Insomnia"
                  className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl text-[#242424] focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
              </div>

              {/* Custom Slug */}
              <div>
                <label className="block text-xs font-semibold text-[#242424] uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <div className="flex items-center text-xs text-[#757575] bg-[#F7F7F7] border border-[#D9D9D9] rounded-xl px-3">
                  <span>/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 py-2.5 pl-1 bg-transparent text-[#242424] focus:outline-none"
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-xs font-semibold text-[#242424] uppercase tracking-wider mb-1.5">
                  Search Engine Description (SEO)
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  placeholder="Compelling preview snippet that appears on Google search results..."
                  className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl text-[#242424] focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
              </div>

            </div>

            {/* Publish Action Buttons */}
            <div className="pt-6 border-t border-[#F0F0F0] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleFinalPublish('draft')}
                className="flex-1 text-xs text-[#757575] hover:text-[#242424] py-2.5 rounded-full border border-[#D9D9D9] hover:bg-[#F9F9F9] transition-colors font-medium cursor-pointer"
              >
                Save as Draft
              </button>

              <button
                type="button"
                onClick={() => handleFinalPublish('published')}
                className="flex-1 text-xs bg-[#1A8917] hover:bg-[#156F12] text-white py-2.5 rounded-full font-semibold shadow-sm transition-all cursor-pointer text-center"
              >
                Publish Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. MODAL: INSERT CUSTOM IMAGE URL */}
      {activeModal === 'image' && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150">
            <h3 className="font-serif italic text-xl text-[#242424] font-bold mb-2">
              Insert Image
            </h3>
            <p className="text-xs text-[#757575] mb-5">
              Enter an image URL or image path. It will appear directly at this line.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#757575] mb-1">
                  Image URL or Path
                </label>
                <input
                  type="text"
                  value={modalInput1}
                  onChange={(e) => setModalInput1(e.target.value)}
                  placeholder="/cover-roadmap.webp or https://..."
                  className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#757575] mb-1">
                  Image Caption / Alt Text (for SEO)
                </label>
                <input
                  type="text"
                  value={modalInput2}
                  onChange={(e) => setModalInput2(e.target.value)}
                  placeholder="e.g. Somatic cooling protocol for vagus nerve"
                  className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('none');
                    setModalInput1('');
                    setModalInput2('');
                  }}
                  className="px-4 py-2 text-xs text-[#757575] hover:bg-[#F5F5F5] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (modalInput1.trim()) {
                      insertBlockAt(
                        insertTargetIndex,
                        {
                          id: `block-${Date.now()}`,
                          type: 'image',
                          imageUrl: modalInput1.trim(),
                          imageAlt: modalInput2.trim() || 'Illustration',
                        },
                        true
                      );
                    }
                    setActiveModal('none');
                    setModalInput1('');
                    setModalInput2('');
                  }}
                  className="px-5 py-2 text-xs bg-[#1A8917] text-white font-semibold rounded-xl hover:bg-[#156F12] cursor-pointer"
                >
                  Insert Image Here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: COVER IMAGE MANAGER (Direct Link URL, Presets, Remove) */}
      {activeModal === 'cover' && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-[#1A8917]" />
                <h3 className="font-serif italic text-lg font-bold text-[#242424]">
                  Manage Article Cover Image
                </h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="text-[#757575] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#757575] mb-1">
                Direct Image URL (Link)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={modalInput1}
                  onChange={(e) => setModalInput1(e.target.value)}
                  placeholder="https://... or /cover-roadmap.webp"
                  className="flex-1 text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (modalInput1.trim()) {
                      setCoverImage(modalInput1.trim());
                      setActiveModal('none');
                      setModalInput1('');
                      showToast('Cover image updated via link!');
                    }
                  }}
                  className="px-4 py-2 text-xs bg-[#1A8917] hover:bg-[#156F12] text-white font-semibold rounded-xl shrink-0 cursor-pointer"
                >
                  Apply Link
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#757575] mb-2 uppercase tracking-wider">
                Or Choose from HerHorizon Presets:
              </span>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {PRESET_GRAPHICS.map((preset) => (
                  <div
                    key={preset.path}
                    onClick={() => {
                      setCoverImage(preset.path);
                      setActiveModal('none');
                      showToast('Cover image set to preset!');
                    }}
                    className="rounded-xl border border-[#E6E6E6] hover:border-[#1A8917] p-1.5 text-left cursor-pointer transition-all bg-white hover:bg-[#FAF9F6]"
                  >
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#FAF8F5] mb-1">
                      <img src={preset.path} alt={preset.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-medium text-[#242424] line-clamp-1 block">
                      {preset.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
              <button
                type="button"
                onClick={() => {
                  setCoverImage('');
                  setActiveModal('none');
                  showToast('Removed cover image (text-only article)');
                }}
                className="px-4 py-2 text-xs bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Remove Cover (Text Only)
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 text-xs bg-[#F2F2F2] hover:bg-[#EBEBEB] text-[#242424] rounded-xl font-medium cursor-pointer"
              >
                Done / Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: HERHORIZON VISUAL ASSETS & PERSONA PORTRAIT */}
      {activeModal === 'preset' && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif italic text-xl text-[#242424] font-bold">
                Choose Visual Asset
              </h3>
              <button onClick={() => setActiveModal('none')} className="text-[#757575] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#757575] mb-5">
              Select one of HerHorizon's graphics or Sara Mitchell's portrait to insert into your story:
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {PRESET_GRAPHICS.map((preset) => (
                <div
                  key={preset.path}
                  onClick={() => {
                    insertBlockAt(
                      insertTargetIndex,
                      {
                        id: `block-${Date.now()}`,
                        type: 'image',
                        imageUrl: preset.path,
                        imageAlt: preset.alt,
                      },
                      true
                    );
                    setActiveModal('none');
                  }}
                  className="rounded-2xl border border-[#E6E6E6] hover:border-[#1A8917] p-2 text-left cursor-pointer transition-all hover:scale-[1.02] bg-white shadow-2xs"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F5] mb-2">
                    <img src={preset.path} alt={preset.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-medium text-[#242424] line-clamp-1 block">
                    {preset.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  setCoverImage(PRESET_GRAPHICS[1].path);
                  setActiveModal('none');
                }}
                className="text-xs text-[#757575] hover:underline"
              >
                Set Anchor Card as Top Cover
              </button>
              <button
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 text-xs bg-[#F2F2F2] hover:bg-[#EBEBEB] text-[#242424] rounded-xl font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: INSERT LINK */}
      {activeModal === 'link' && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150">
            <h3 className="font-serif italic text-xl text-[#242424] font-bold mb-2">
              Insert Link
            </h3>
            <p className="text-xs text-[#757575] mb-5">
              Add a styled link into your story.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#757575] mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  value={modalInput1}
                  onChange={(e) => setModalInput1(e.target.value)}
                  placeholder="https://... or /free-guide"
                  className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#757575] mb-1">
                  Anchor Text
                </label>
                <input
                  type="text"
                  value={modalInput2}
                  onChange={(e) => setModalInput2(e.target.value)}
                  placeholder="e.g. Download the Free 72-Hour Reset"
                  className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('none');
                    setModalInput1('');
                    setModalInput2('');
                  }}
                  className="px-4 py-2 text-xs text-[#757575] hover:bg-[#F5F5F5] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (modalInput1.trim()) {
                      const linkMarkdown = `[${modalInput2.trim() || modalInput1.trim()}](${modalInput1.trim()})`;
                      insertBlockAt(
                        insertTargetIndex,
                        {
                          id: `block-${Date.now()}`,
                          type: 'paragraph',
                          content: linkMarkdown,
                        },
                        true
                      );
                    }
                    setActiveModal('none');
                    setModalInput1('');
                    setModalInput2('');
                  }}
                  className="px-5 py-2 text-xs bg-[#1A8917] text-white font-semibold rounded-xl hover:bg-[#156F12] cursor-pointer"
                >
                  Insert Link Here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: SEO & GOOGLE PREVIEW */}
      {activeModal === 'seo' && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#1A8917]" />
                <h3 className="font-serif italic text-lg font-bold text-[#242424]">
                  SEO &amp; Google Search Snippet
                </h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="text-[#757575] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Google Search Preview Card */}
            <div className="bg-[#FAF9F6] border border-[#EAE3D9] rounded-2xl p-4 text-xs space-y-1">
              <span className="text-[11px] text-[#5f6368] block">
                https://herhorizon.store › blog › {slug || 'article-slug'}
              </span>
              <h4 className="text-base text-[#1a0dab] font-normal line-clamp-1">
                {metaTitle || `${title || 'Article Title'} | HerHorizon`}
              </h4>
              <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {metaDescription || subtitle || rawSerializedMarkdown.slice(0, 120) || 'Story description...'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#757575] mb-1">
                Google Meta Title (30-60 characters)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={`${title} | HerHorizon`}
                className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#757575] mb-1">
                Google Meta Description (120-160 characters)
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                placeholder="High-converting description that invites readers to click..."
                className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#757575] mb-1">
                Focus Target Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g. phantom courtroom mental loops, vagus nerve"
                className="w-full text-xs p-3 border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1A8917]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-5 py-2 text-xs bg-[#1A8917] text-white font-semibold rounded-xl hover:bg-[#156F12]"
              >
                Save SEO Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. FLOATING TEXT SELECTION LINK TOOLBAR (MEDIUM / NOTION STYLE) */}
      {floatingSelectionToolbar && (
        <div
          id="floating-selection-toolbar"
          style={{
            position: 'fixed',
            top: `${floatingSelectionToolbar.position.top}px`,
            left: `${floatingSelectionToolbar.position.left}px`,
          }}
          className="z-60 bg-[#1C1C1E] text-white rounded-2xl shadow-2xl border border-white/15 p-2 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md w-[360px] max-w-[94vw]"
          onMouseDown={(e) => {
            // Prevent textarea from losing active selection on toolbar interactions
            e.stopPropagation();
          }}
        >
          {/* Header indicator showing selected text snippet */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 px-1 leading-none">
            <span className="truncate max-w-[280px]">
              Link: <strong className="text-white font-serif">&ldquo;{floatingSelectionToolbar.selectedText}&rdquo;</strong>
            </span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setFloatingSelectionToolbar(null)}
              className="text-gray-400 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
              title="Close toolbar"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Top row: Link icon + URL Input + Apply button */}
          <div className="flex items-center space-x-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#2C2C2E] flex items-center justify-center shrink-0 text-[#4ADE80]">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>

            <input
              type="text"
              autoFocus
              value={floatingSelectionToolbar.urlInput}
              onChange={(e) =>
                setFloatingSelectionToolbar((prev) =>
                  prev ? { ...prev, urlInput: e.target.value } : null
                )
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyInlineLink();
                } else if (e.key === 'Escape') {
                  setFloatingSelectionToolbar(null);
                }
              }}
              placeholder="Paste URL (e.g. /landing, #vsl, https://...)"
              className="flex-1 bg-[#2C2C2E] text-white text-xs px-2.5 py-1.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#4ADE80] placeholder-gray-400 font-mono"
            />

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleApplyInlineLink}
              disabled={!floatingSelectionToolbar.urlInput.trim()}
              className="bg-[#1A8917] hover:bg-[#156F12] disabled:opacity-40 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center space-x-1 shrink-0 shadow-xs"
              title="Apply Link (Press Enter)"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Link</span>
            </button>

            {floatingSelectionToolbar.isExistingLink && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleRemoveInlineLink}
                className="bg-red-950/70 hover:bg-red-900 text-red-300 p-1.5 rounded-xl transition-colors cursor-pointer shrink-0"
                title="Remove Link (Unlink)"
              >
                <Unlink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Bottom row: Format toggles & Quick Link presets (All in single compact bar) */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] gap-2">
            {/* Quick Format Toggles */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleToggleInlineFormat('bold')}
                className="w-6 h-5 rounded bg-[#2C2C2E] hover:bg-[#3A3A3C] text-gray-200 font-bold transition-colors cursor-pointer text-xs flex items-center justify-center"
                title="Toggle Bold (**text**)"
              >
                B
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleToggleInlineFormat('italic')}
                className="w-6 h-5 rounded bg-[#2C2C2E] hover:bg-[#3A3A3C] text-gray-200 italic font-serif transition-colors cursor-pointer text-xs flex items-center justify-center"
                title="Toggle Italic (*text*)"
              >
                I
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleToggleInlineFormat('quote')}
                className="w-6 h-5 rounded bg-[#2C2C2E] hover:bg-[#3A3A3C] text-gray-200 transition-colors cursor-pointer text-xs flex items-center justify-center"
                title="Wrap in quotes"
              >
                &ldquo;&rdquo;
              </button>
            </div>

            {/* Quick Link destination shortcuts */}
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-0.5">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 mr-0.5 shrink-0">Quick:</span>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setFloatingSelectionToolbar((prev) =>
                    prev ? { ...prev, urlInput: '/landing' } : null
                  );
                }}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] transition-colors cursor-pointer whitespace-nowrap"
              >
                Reset Page
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setFloatingSelectionToolbar((prev) =>
                    prev ? { ...prev, urlInput: '#vsl-section' } : null
                  );
                }}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] transition-colors cursor-pointer whitespace-nowrap"
              >
                VSL
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setFloatingSelectionToolbar((prev) =>
                    prev ? { ...prev, urlInput: '/free-trial' } : null
                  );
                }}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] transition-colors cursor-pointer whitespace-nowrap"
              >
                Free Trial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. MODAL: ROBUST PASTE TITLE & FIELD ASSISTANT (Guaranteed 100% Reliable in Iframes) */}
      {pasteModal.isOpen && (
        <div className="fixed inset-0 z-70 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 text-left">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E6E6E6] shadow-2xl text-left animate-in zoom-in-95 duration-150 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8F3E8] text-[#1A8917] flex items-center justify-center">
                  <ClipboardPaste className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif italic text-lg sm:text-xl text-[#242424] font-bold">
                    Paste {pasteModal.fieldName}
                  </h3>
                  <p className="text-xs text-[#757575]">
                    Paste your text below (Ctrl+V / ⌘+V), or select from recommended titles.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPasteModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-[#757575] hover:text-[#242424] p-1 rounded-full hover:bg-[#F2F2F2] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Paste Input Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#757575] uppercase tracking-wider">
                  {pasteModal.fieldName} Text
                </label>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      if (navigator.clipboard && navigator.clipboard.readText) {
                        const text = await navigator.clipboard.readText();
                        if (text) {
                          setPasteModal((prev) => ({ ...prev, value: text }));
                          showToast('Pasted from clipboard!');
                        }
                      }
                    } catch {
                      // Handled by user manual paste
                    }
                  }}
                  className="text-[11px] text-[#1A8917] hover:underline font-medium cursor-pointer"
                >
                  Try Clipboard Read
                </button>
              </div>

              <textarea
                autoFocus
                rows={3}
                value={pasteModal.value}
                onChange={(e) => {
                  const val = e.target.value;
                  setPasteModal((prev) => ({ ...prev, value: val }));
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (pasteModal.value.trim()) {
                      const cleaned = pasteModal.value
                        .trim()
                        .replace(/^#+\s*/, '')
                        .replace(/^["']|["']$/g, '');
                      if (pasteModal.targetField === 'title') setTitle(cleaned);
                      else if (pasteModal.targetField === 'subtitle') setSubtitle(cleaned);
                      else if (pasteModal.targetField === 'rawMarkdown') setRawMarkdownDraft(cleaned);
                      else if (pasteModal.targetField === 'pasteAi') setPasteAiText(cleaned);
                      setPasteModal((prev) => ({ ...prev, isOpen: false }));
                      showToast(`Set ${pasteModal.fieldName}!`);
                    }
                  }
                }}
                placeholder="Click here and press Ctrl+V / ⌘+V to paste..."
                className="w-full p-3 font-serif text-base sm:text-lg text-[#242424] bg-[#FAF9F6] border border-[#DDD8CF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A8917] resize-none"
              />
            </div>

            {/* Preset Suggestions (if available) */}
            {pasteModal.suggestions && pasteModal.suggestions.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-[#8C8C8C] block mb-1.5 uppercase tracking-wider">
                  Or select a recommended option:
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {pasteModal.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setPasteModal((prev) => ({ ...prev, value: suggestion }));
                      }}
                      className="w-full text-left p-2 rounded-xl text-xs text-[#4A453E] hover:text-[#1A8917] hover:bg-[#E8F3E8] border border-transparent hover:border-[#CDE3CD] transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <span className="line-clamp-1">{suggestion}</span>
                      <span className="text-[10px] text-[#1A8917] opacity-0 group-hover:opacity-100 font-semibold shrink-0 ml-2">
                        Use
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
              <button
                type="button"
                onClick={() => setPasteModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs text-[#757575] hover:bg-[#F5F5F5] rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!pasteModal.value.trim()}
                onClick={() => {
                  const cleaned = pasteModal.value
                    .trim()
                    .replace(/^#+\s*/, '')
                    .replace(/^["']|["']$/g, '');
                  if (pasteModal.targetField === 'title') setTitle(cleaned);
                  else if (pasteModal.targetField === 'subtitle') setSubtitle(cleaned);
                  else if (pasteModal.targetField === 'rawMarkdown') setRawMarkdownDraft(cleaned);
                  else if (pasteModal.targetField === 'pasteAi') setPasteAiText(cleaned);
                  setPasteModal((prev) => ({ ...prev, isOpen: false }));
                  showToast(`Set ${pasteModal.fieldName}!`);
                }}
                className="px-5 py-2 text-xs bg-[#1A8917] hover:bg-[#156F12] disabled:opacity-40 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply {pasteModal.fieldName}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
