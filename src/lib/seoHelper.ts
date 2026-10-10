import { BlogPost } from '../types';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  articleData?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    section: string;
    tags: string[];
  };
}

const DEFAULT_TITLE = 'HerHorizon | Identity Restoration After Toxic Relationships';
const DEFAULT_DESC = 'A clinical, somatic roadmap to heal identity collapse, stop 2 A.M. trauma loops, and rebuild self-trust after emotional abuse.';
const DEFAULT_IMAGE = 'https://herhorizon.store/cover-roadmap.png';
const DEFAULT_URL = 'https://herhorizon.store';

function setMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

function setJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

/**
 * Update meta tags, social sharing cards, and Schema.org structured data for the whole document
 */
export function updateDocumentSeo(props: SeoProps) {
  // 1. Title
  document.title = props.title;

  // 2. Meta description & keywords
  setMetaTag('description', props.description);
  if (props.keywords && props.keywords.length > 0) {
    setMetaTag('keywords', props.keywords.join(', '));
  }

  // 3. Canonical URL
  const canonical = props.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : DEFAULT_URL);
  setCanonical(canonical);

  // 4. OpenGraph
  setMetaTag('og:title', props.title, true);
  setMetaTag('og:description', props.description, true);
  setMetaTag('og:url', canonical, true);
  setMetaTag('og:type', props.ogType || 'website', true);
  setMetaTag('og:site_name', 'HerHorizon', true);

  const ogImg = props.ogImage || DEFAULT_IMAGE;
  const absoluteImg = ogImg.startsWith('http')
    ? ogImg
    : `${window.location.origin}${ogImg.startsWith('/') ? '' : '/'}${ogImg}`;
  setMetaTag('og:image', absoluteImg, true);

  // 5. Twitter
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', props.title);
  setMetaTag('twitter:description', props.description);
  setMetaTag('twitter:image', absoluteImg);

  // 6. Article specific metadata
  if (props.articleData) {
    setMetaTag('article:published_time', props.articleData.publishedTime, true);
    if (props.articleData.modifiedTime) {
      setMetaTag('article:modified_time', props.articleData.modifiedTime, true);
    }
    setMetaTag('article:author', props.articleData.author, true);
    setMetaTag('article:section', props.articleData.section, true);
  }
}

/**
 * Configure dedicated Schema.org and SEO for a specific Blog Article
 */
export function applyBlogPostSeo(post: BlogPost) {
  const postUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${post.slug}`
    : `https://herhorizon.store/blog/${post.slug}`;

  const coverImg = post.coverImage
    ? (post.coverImage.startsWith('http') ? post.coverImage : `${window.location.origin}${post.coverImage.startsWith('/') ? '' : '/'}${post.coverImage}`)
    : DEFAULT_IMAGE;

  updateDocumentSeo({
    title: `${post.seo.metaTitle || post.title} | HerHorizon`,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords,
    canonicalUrl: post.seo.canonicalUrl || postUrl,
    ogType: 'article',
    ogImage: coverImg,
    articleData: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      author: post.author.name,
      section: post.category,
      tags: post.tags,
    },
  });

  // Inject BlogPosting JSON-LD
  setJsonLd('schema-blog-post', {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.seo.metaDescription || post.excerpt,
    image: [coverImg],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: 'https://herhorizon.store',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerHorizon',
      url: 'https://herhorizon.store',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herhorizon.store/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.seo.keywords.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    inLanguage: 'en-US',
  });
}

/**
 * Configure SEO for the Blog Library / Index
 */
export function applyBlogIndexSeo() {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog` : 'https://herhorizon.store/blog';

  updateDocumentSeo({
    title: 'The Rebuild Journal – Trauma-Informed Articles & Somatic Notes | HerHorizon',
    description: 'Explore trauma-informed articles, somatic nervous system recovery tools, and practical guidance to halt mental loops and reclaim self-trust.',
    keywords: ['relationship recovery blog', 'trauma bond articles', 'nervous system healing journal', 'somatic healing notes', 'healing from narcissism'],
    canonicalUrl: url,
    ogType: 'website',
  });

  setJsonLd('schema-blog-index', {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'HerHorizon Rebuild Journal',
    description: 'Trauma-informed field notes, somatic grounding protocols, and guidance for breaking trauma bonds and reclaiming self-trust.',
    url,
    publisher: {
      '@type': 'Organization',
      name: 'HerHorizon',
      url: 'https://herhorizon.store',
    },
  });
}

export const HOME_FAQ_DATA = [
  {
    question: 'What is identity collapse?',
    answer:
      'Identity collapse is a clinical and somatic state where prolonged emotional invalidation, chronic appeasement, or emotional abuse systematically erodes your internal self-concept. In toxic dynamics, you are conditioned to subordinate your instincts, preferences, and feelings to survive or avoid conflict. Over time, your nervous system suppresses your authentic impulses, leaving you feeling completely unmoored, unable to make simple decisions, and asking "Who was I before this?" The HerHorizon roadmap provides somatic practices to rebuild self-trust and restore your identity from the nervous system up.',
  },
  {
    question: 'How do I stop overthinking after a toxic relationship?',
    answer:
      'Overthinking after a toxic relationship—especially 2 A.M. mental loops and imaginary courtroom arguments—is not an intellectual failure; it is nervous system hypervigilance. Your brain encodes unacknowledged truth and unresolved emotional betrayal as active physical danger, obsessively litigating conversations to regain safety. Because this state is regulated by your autonomic nervous system (vagus nerve), cognitive logic alone cannot stop it. You need physiological circuit breakers: somatic temperature shifts (mammalian dive reflex), sensory grounding, and physical reality anchors that signal to your nervous system that the threat is over.',
  },
  {
    question: 'What is the Fawn response?',
    answer:
      'The Fawn response is the fourth autonomic survival strategy identified alongside Fight, Flight, and Freeze. When standing up (fight) or fleeing (flight) is dangerous in a high-conflict relationship, your nervous system defaults to appeasement—preemptively accommodating the other person\'s moods, over-apologizing, and sacrificing your boundaries to maintain safety. Often mistaken for simple "people-pleasing," fawning is an instinctive survival defense. Healing requires somatic re-patterning to teach your body that setting boundaries and tolerating someone else\'s disappointment will not result in abandonment or danger.',
  },
  {
    question: 'I’m exhausted. Will this take hours?',
    answer:
      'No. I designed this for women in the "messy middle." You only need 10 minutes a day. It’s built to give you energy, not take it.',
  },
  {
    question: 'Is this just another journal?',
    answer:
      'No. It is a guided reconstruction system. It combines somatic (body) tools, psychological reframes, and actual scripts for real-life conversations.',
  },
  {
    question: 'What if I’m still in the relationship?',
    answer:
      'That is okay. This system helps you build the internal foundation of self-trust so you can find the clarity and strength you need for your safety.',
  },
];

export function applyHomeFaqSchema() {
  setJsonLd('schema-faq-page', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}

/**
 * Reset SEO back to Home landing page defaults
 */
export function resetHomeSeo() {
  removeJsonLd('schema-blog-post');
  removeJsonLd('schema-blog-index');

  updateDocumentSeo({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    canonicalUrl: DEFAULT_URL,
    ogType: 'website',
  });

  applyHomeFaqSchema();
}
