import { supabase } from './supabaseClient';
import { NewsItem } from '../hooks/useNewsData';

export interface CreateNewsArticleData {
  title: string;
  description?: string;
  content: string;
  url: string;
  source: string;
  impact: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
  keywords: string[];
  author?: string;
  category?: string;
  relatedSecurities?: Array<{
    securityType: 'comic' | 'creator' | 'publisher' | 'option';
    symbol: string;
    name: string;
  }>;
}

export interface UpdateNewsArticleData {
  title?: string;
  description?: string;
  content?: string;
  url?: string;
  source?: string;
  impact?: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
  keywords?: string[];
  author?: string;
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  isFeatured?: boolean;
}

class NewsService {
  async getNewsArticles(options: {
    limit?: number;
    offset?: number;
    category?: string;
    impact?: string;
    source?: string;
    featured?: boolean;
    status?: string;
  } = {}): Promise<{ data: NewsItem[] | null; error: any }> {
    try {
      let query = supabase
        .from('news_articles')
        .select(`
          *,
          related_securities (
            security_type,
            symbol,
            name
          )
        `)
        .eq('status', options.status || 'published')
        .order('published_at', { ascending: false });

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      if (options.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }

      if (options.impact && options.impact !== 'all') {
        query = query.eq('impact', options.impact);
      }

      if (options.source && options.source !== 'all') {
        query = query.eq('source', options.source);
      }

      if (options.featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching news articles:', error);
        return { data: null, error };
      }

      // Transform database results to NewsItem format
      const newsItems: NewsItem[] = (data || []).map(article => ({
        id: article.id,
        title: article.title,
        description: article.description,
        content: article.content,
        publishedAt: new Date(article.published_at),
        url: article.url,
        source: article.source,
        impact: article.impact,
        imageUrl: article.image_url,
        keywords: article.keywords || [],
        relatedSecurity: article.related_securities?.[0] ? {
          type: article.related_securities[0].security_type,
          symbol: article.related_securities[0].symbol,
          name: article.related_securities[0].name
        } : undefined
      }));

      return { data: newsItems, error: null };
    } catch (error) {
      console.error('News service error:', error);
      return { data: null, error };
    }
  }

  async getNewsArticleById(id: string): Promise<{ data: NewsItem | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select(`
          *,
          related_securities (
            security_type,
            symbol,
            name
          )
        `)
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error) {
        return { data: null, error };
      }

      const newsItem: NewsItem = {
        id: data.id,
        title: data.title,
        description: data.description,
        content: data.content,
        publishedAt: new Date(data.published_at),
        url: data.url,
        source: data.source,
        impact: data.impact,
        imageUrl: data.image_url,
        keywords: data.keywords || [],
        relatedSecurity: data.related_securities?.[0] ? {
          type: data.related_securities[0].security_type,
          symbol: data.related_securities[0].symbol,
          name: data.related_securities[0].name
        } : undefined
      };

      // Increment view count
      await this.incrementViewCount(id);

      return { data: newsItem, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async createNewsArticle(articleData: CreateNewsArticleData): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert({
          title: articleData.title,
          description: articleData.description,
          content: articleData.content,
          url: articleData.url,
          source: articleData.source,
          impact: articleData.impact,
          image_url: articleData.imageUrl,
          keywords: articleData.keywords,
          author: articleData.author,
          category: articleData.category || 'general'
        })
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      // Add related securities if provided
      if (articleData.relatedSecurities && articleData.relatedSecurities.length > 0) {
        const relatedSecuritiesData = articleData.relatedSecurities.map(security => ({
          news_article_id: data.id,
          security_type: security.securityType,
          symbol: security.symbol,
          name: security.name
        }));

        await supabase
          .from('related_securities')
          .insert(relatedSecuritiesData);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async updateNewsArticle(id: string, updates: UpdateNewsArticleData): Promise<{ data: any; error: any }> {
    try {
      const updateData: any = {};
      
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.content !== undefined) updateData.content = updates.content;
      if (updates.url !== undefined) updateData.url = updates.url;
      if (updates.source !== undefined) updateData.source = updates.source;
      if (updates.impact !== undefined) updateData.impact = updates.impact;
      if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
      if (updates.keywords !== undefined) updateData.keywords = updates.keywords;
      if (updates.author !== undefined) updateData.author = updates.author;
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.isFeatured !== undefined) updateData.is_featured = updates.isFeatured;

      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('news_articles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async deleteNewsArticle(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      return { error };
    } catch (error) {
      return { error };
    }
  }

  async incrementViewCount(id: string): Promise<void> {
    try {
      await supabase.rpc('increment_news_view_count', { article_id: id });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  async searchNewsArticles(query: string, options: {
    limit?: number;
    category?: string;
    impact?: string;
  } = {}): Promise<{ data: NewsItem[] | null; error: any }> {
    try {
      let searchQuery = supabase
        .from('news_articles')
        .select(`
          *,
          related_securities (
            security_type,
            symbol,
            name
          )
        `)
        .eq('status', 'published')
        .textSearch('title', query, { type: 'websearch' })
        .order('published_at', { ascending: false });

      if (options.limit) {
        searchQuery = searchQuery.limit(options.limit);
      }

      if (options.category && options.category !== 'all') {
        searchQuery = searchQuery.eq('category', options.category);
      }

      if (options.impact && options.impact !== 'all') {
        searchQuery = searchQuery.eq('impact', options.impact);
      }

      const { data, error } = await searchQuery;

      if (error) {
        return { data: null, error };
      }

      const newsItems: NewsItem[] = (data || []).map(article => ({
        id: article.id,
        title: article.title,
        description: article.description,
        content: article.content,
        publishedAt: new Date(article.published_at),
        url: article.url,
        source: article.source,
        impact: article.impact,
        imageUrl: article.image_url,
        keywords: article.keywords || [],
        relatedSecurity: article.related_securities?.[0] ? {
          type: article.related_securities[0].security_type,
          symbol: article.related_securities[0].symbol,
          name: article.related_securities[0].name
        } : undefined
      }));

      return { data: newsItems, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getUserNewsSubscription(userId: string): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from('news_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async updateNewsSubscription(userId: string, updates: {
    keywords?: string[];
    notificationEnabled?: boolean;
    emailEnabled?: boolean;
  }): Promise<{ data: any; error: any }> {
    try {
      const updateData: any = { updated_at: new Date().toISOString() };
      
      if (updates.keywords !== undefined) updateData.keywords = updates.keywords;
      if (updates.notificationEnabled !== undefined) updateData.notification_enabled = updates.notificationEnabled;
      if (updates.emailEnabled !== undefined) updateData.email_enabled = updates.emailEnabled;

      const { data, error } = await supabase
        .from('news_subscriptions')
        .upsert({
          user_id: userId,
          ...updateData
        })
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getLatestNews(limit: number = 1): Promise<{ data: NewsItem[] | null; error: any }> {
    return this.getNewsArticles({ limit, status: 'published' });
  }

  async getFeaturedNews(): Promise<{ data: NewsItem[] | null; error: any }> {
    return this.getNewsArticles({ featured: true, limit: 5 });
  }

  async getNewsByCategory(category: string, limit: number = 10): Promise<{ data: NewsItem[] | null; error: any }> {
    return this.getNewsArticles({ category, limit });
  }
}

export const newsService = new NewsService();
export default newsService;