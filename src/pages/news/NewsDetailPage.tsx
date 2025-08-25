import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ExternalLink, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useNewsArticle } from '../../hooks/useNewsData';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Loader } from '../../components/common/Loader';
import { format } from 'date-fns';

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { article, isLoading, error } = useNewsArticle(id || '');

  if (isLoading) {
    return <Loader label="Loading article..." />;
  }

  if (error || !article) {
    return (
      <div className="space-y-6">
        <Breadcrumbs overrides={[
          { name: 'News', path: '/news' },
          { name: 'Article Not Found' }
        ]} />
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Article Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
          <Link 
            to="/news"
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>
    );
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-900/50 text-green-200 border-green-700/50';
      case 'negative':
        return 'bg-red-900/50 text-red-200 border-red-700/50';
      default:
        return 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50';
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'News', path: '/news' },
        { name: article.title }
      ]} />

      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        {/* Article Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getImpactColor(article.impact)}`}>
              <div className="flex items-center space-x-1">
                {getImpactIcon(article.impact)}
                <span className="capitalize">{article.impact} Impact</span>
              </div>
            </span>
            {article.relatedSecurity && (
              <Link
                to={`/${article.relatedSecurity.type}/${article.relatedSecurity.symbol}`}
                className="px-3 py-1 bg-indigo-900/50 text-indigo-200 rounded-full text-sm border border-indigo-700/50 hover:bg-indigo-900/70 transition-colors"
              >
                {article.relatedSecurity.name}
              </Link>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
          
          {article.description && (
            <p className="text-xl text-gray-300 mb-4">{article.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{format(article.publishedAt, 'MMMM d, yyyy • h:mm a')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.source}</span>
            </div>
            {article.url.startsWith('http') && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Original Source</span>
              </a>
            )}
          </div>
        </div>

        {/* Article Image */}
        {article.imageUrl && (
          <div className="mb-6">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-6">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Keywords */}
        {article.keywords.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Security */}
        {article.relatedSecurity && (
          <div className="mb-6 bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
            <h3 className="text-sm font-medium text-white mb-2">Related Asset</h3>
            <Link
              to={`/${article.relatedSecurity.type}/${article.relatedSecurity.symbol}`}
              className="inline-flex items-center space-x-2 text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              <span>{article.relatedSecurity.name} ({article.relatedSecurity.symbol})</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        )}

        {/* Back Button */}
        <div className="pt-6 border-t border-slate-700/50">
          <Link
            to="/news"
            className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsDetailPage;