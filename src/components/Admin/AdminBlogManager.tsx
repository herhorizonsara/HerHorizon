import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
  BookOpen,
  Sparkles,
  Globe,
  Clock,
  Heart,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { BlogPost } from '../../types';
import {
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  resetDefaultBlogPosts,
  BLOG_CATEGORIES,
} from '../../lib/blogStorage';
import { MediumEditor } from './MediumEditor';

interface AdminBlogManagerProps {
  onViewLiveArticle: (slug: string) => void;
  triggerToast: (msg: string) => void;
}

export const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({
  onViewLiveArticle,
  triggerToast,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const loadPosts = () => {
    setPosts(getBlogPosts(true));
  };

  useEffect(() => {
    loadPosts();
    const handleUpdate = () => loadPosts();
    window.addEventListener('herhorizon_blog_updated', handleUpdate);
    return () => window.removeEventListener('herhorizon_blog_updated', handleUpdate);
  }, []);

  const handleCreateNew = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      triggerToast(`Deleted article "${title}"`);
      loadPosts();
    }
  };

  const handleToggleStatus = (post: BlogPost) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    saveBlogPost({ ...post, status: nextStatus });
    triggerToast(`Article moved to ${nextStatus.toUpperCase()}`);
    loadPosts();
  };

  const handleSavePost = (savedPost: BlogPost) => {
    saveBlogPost(savedPost);
    setIsEditorOpen(false);
    setEditingPost(null);
    triggerToast(savedPost.status === 'published' ? 'Article published live!' : 'Draft saved successfully!');
    loadPosts();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset articles to original 4 trauma-informed default articles?')) {
      resetDefaultBlogPosts();
      triggerToast('Restored default articles');
      loadPosts();
    }
  };

  // Metrics
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftsCount = posts.filter((p) => p.status === 'draft').length;
  const totalWords = posts.reduce((sum, p) => sum + p.content.split(/\s+/).filter(Boolean).length, 0);

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus =
      statusFilter === 'all' || post.status === statusFilter;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.slug.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Blog Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#BD7469] block">
              Total Articles
            </span>
            <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
              {totalPosts}
            </div>
            <span className="text-[11px] text-[#7A746C] mt-0.5 block">
              In your content repository
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#BD7469]/15 text-[#BD7469] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7C59] block">
              Live Published
            </span>
            <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
              {publishedCount}
            </div>
            <span className="text-[11px] text-[#7A746C] mt-0.5 block">
              Indexed for readers &amp; SEO
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#4A7C59]/15 text-[#4A7C59] flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E3A88D] block">
              Drafts in Progress
            </span>
            <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
              {draftsCount}
            </div>
            <span className="text-[11px] text-[#7A746C] mt-0.5 block">
              Unpublished works
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E3A88D]/20 text-[#C05746] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A373] block">
              Total Editorial Words
            </span>
            <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
              {totalWords.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#7A746C] mt-0.5 block">
              Rich SEO content volume
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D4A373]/20 text-[#A8584D] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="bg-white border border-[#E8E3DA] rounded-3xl p-5 shadow-luxe flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center space-x-2 bg-[#BD7469] hover:bg-[#9E4D43] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article (Medium-Style)</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center space-x-1.5 text-xs text-[#736E67] hover:text-[#BD7469] bg-[#FAF9F6] border border-[#DDD8CF] px-3 py-2 rounded-xl transition-colors cursor-pointer"
            title="Restore original default articles"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#8C7A74] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#DDD8CF] bg-[#FAF9F6] text-[#2D2A26] focus:outline-none focus:ring-1 focus:ring-[#E2B072]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-[#DDD8CF] bg-[#FAF9F6] text-[#2D2A26]"
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs py-2 px-3 rounded-xl border border-[#DDD8CF] bg-[#FAF9F6] text-[#2D2A26]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Articles Table & Cards */}
      <div className="bg-white border border-[#E8E3DA] rounded-3xl overflow-hidden shadow-luxe">
        <div className="px-6 py-4 border-b border-[#EAE5DC] flex items-center justify-between">
          <h3 className="font-serif italic text-lg font-bold text-[#2D2A26]">
            Articles Repository ({filteredPosts.length})
          </h3>
          <span className="text-xs text-[#7A746C]">
            Click any article to edit in the Medium-like editor
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-[#736E67]">
            <BookOpen className="w-10 h-10 mx-auto text-[#DECAC0] mb-3" />
            <p className="font-serif text-base mb-1">No articles found</p>
            <p className="text-xs text-[#8C7A74] mb-4">
              Try adjusting your search criteria or create your first article.
            </p>
            <button
              onClick={handleCreateNew}
              className="text-xs bg-[#BD7469] text-white px-4 py-2 rounded-xl font-semibold"
            >
              Write First Article
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#EFE8DF]">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 sm:p-6 hover:bg-[#FAF9F6] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail and info */}
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#DECAC0] shrink-0">
                    <img
                      src={post.coverImage || '/cover-free-anchor-card.webp'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] bg-[#FAF2EB] px-2 py-0.5 rounded-full border border-[#E8DCD5]">
                        {post.category}
                      </span>

                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border cursor-pointer transition-colors ${
                          post.status === 'published'
                            ? 'bg-[#EBF5ED] text-[#367A48] border-[#CFE7D5] hover:bg-[#DDF0E1]'
                            : 'bg-[#FAF2EB] text-[#A8584D] border-[#E8DCD5] hover:bg-[#F5ECE3]'
                        }`}
                        title="Click to toggle Draft / Published"
                      >
                        {post.status.toUpperCase()}
                      </button>

                      <span className="text-[11px] text-[#8C7A74] flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#E2B072]" />
                        <span>{post.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    <h4
                      onClick={() => handleEdit(post)}
                      className="font-serif italic font-semibold text-base sm:text-lg text-[#2D2A26] hover:text-[#BD7469] cursor-pointer truncate"
                      title={post.title}
                    >
                      {post.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C7A74] mt-1">
                      <code className="text-[11px] text-[#A8584D] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8DCD5]">
                        /blog/{post.slug}
                      </code>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <img
                          src="/author-portrait.png"
                          alt="Sara Mitchell"
                          className="w-3.5 h-3.5 rounded-full object-cover border border-[#E2B072]"
                        />
                        <span>By {post.author.name}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onViewLiveArticle(post.slug)}
                    className="inline-flex items-center space-x-1 text-xs text-[#736E67] hover:text-[#2D2A26] bg-white border border-[#DDD8CF] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    title="View live in reader"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View Live</span>
                  </button>

                  <button
                    onClick={() => handleEdit(post)}
                    className="inline-flex items-center space-x-1 text-xs bg-[#FAF4EB] hover:bg-[#F2E7DC] text-[#BD7469] border border-[#E8DCD5] px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-1.5 text-[#A0938D] hover:text-[#BD7469] rounded-xl hover:bg-[#FAF4EB] transition-colors cursor-pointer"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medium Editor Modal */}
      {isEditorOpen && (
        <MediumEditor
          initialPost={editingPost}
          onSave={handleSavePost}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );
};
