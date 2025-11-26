import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsArticle, getCachedNews, getStoredArticleById, fetchAllNews } from "@/lib/news";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!id) return;
      setIsLoading(true);
      // Try IndexedDB first
      const fromDB = await getStoredArticleById(id);
      if (!cancelled && fromDB) {
        setArticle(fromDB);
        setIsLoading(false);
        return;
      }
      // Try localStorage cache
      const cached = getCachedNews();
      const found = cached?.find(a => a.id === id) || null;
      if (!cancelled && found) {
        setArticle(found);
        setIsLoading(false);
        return;
      }
      // Network fetch as last resort
      const all = await fetchAllNews(true, false);
      const netFound = all.find(a => a.id === id) || null;
      if (!cancelled) {
        setArticle(netFound);
        setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-fluid py-24">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-fluid py-24">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <p className="text-muted-foreground">Article not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${article.title} | News | UnifyO`} 
        description={article.excerpt}
        url={`https://unifyo.com/news/${article.id}`}
      />
      <Navbar />
      <main className="section-py">
        <div className="container-fluid content-width container-px">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {article.category && <Badge variant="secondary">{article.category}</Badge>}
              {article.source && <span className="text-sm text-muted-foreground">• {article.source}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{article.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime || '5 min read'}</span>
              </div>
            </div>

            {article.image && (
              <div className="rounded-xl overflow-hidden border mt-4">
                <img src={article.image} alt={article.title} className="w-full h-[320px] sm:h-[420px] object-cover" loading="eager" />
              </div>
            )}

            <article className="prose prose-neutral dark:prose-invert max-w-none">
              {article.contentHTML ? (
                <div dangerouslySetInnerHTML={{ __html: article.contentHTML }} />
              ) : (
                <p>{article.excerpt}</p>
              )}
            </article>

            {article.link && (
              <div className="pt-6">
                <Button variant="ghost" className="gap-2" onClick={() => window.open(article.link, '_blank')}>
                  View original source <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;


