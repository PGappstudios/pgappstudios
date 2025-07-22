import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  slug: string;
  metaDescription: string;
  metaKeywords: string;
  content: string;
}

const GITHUB_API_BASE = 'https://api.github.com/repos/PGappstudios/pgappstudios/contents/content/posts';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/PGappstudios/pgappstudios/main/content/posts';

export class BlogService {
  private static cache: BlogPost[] | null = null;
  private static lastFetch: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static async getAllPosts(): Promise<BlogPost[]> {
    console.log('🔍 BlogService: Starting getAllPosts()');
    
    // Return cached data if still valid
    if (this.cache && Date.now() - this.lastFetch < this.CACHE_DURATION) {
      console.log('📦 BlogService: Returning cached data', this.cache.length, 'posts');
      return this.cache;
    }

    try {
      console.log('🌐 BlogService: Fetching from GitHub API:', GITHUB_API_BASE);
      
      // Fetch list of files from GitHub
      const response = await fetch(GITHUB_API_BASE);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const files = await response.json();
      console.log('📁 BlogService: Found', files.length, 'files total');
      
      // Filter markdown files only
      const markdownFiles = files.filter((file: any) => 
        file.name.endsWith('.md') && file.name !== '.gitkeep'
      );
      console.log('📝 BlogService: Found', markdownFiles.length, 'markdown files');
      console.log('📝 BlogService: Markdown files:', markdownFiles.map((f: any) => f.name));

      // Fetch content for each markdown file
      const posts = await Promise.all(
        markdownFiles.map(async (file: any) => {
          try {
            console.log('📥 BlogService: Fetching content for:', file.name);
            
            // Properly encode the filename for the URL
            const encodedFileName = encodeURIComponent(file.name);
            const rawUrl = `${GITHUB_RAW_BASE}/${encodedFileName}`;
            console.log('🔗 BlogService: Raw URL:', rawUrl);
            
            const contentResponse = await fetch(rawUrl);
            if (!contentResponse.ok) {
              console.warn(`❌ BlogService: Failed to fetch ${file.name}: ${contentResponse.status}`);
              return null;
            }

            const markdownContent = await contentResponse.text();
            console.log('✅ BlogService: Successfully fetched content for:', file.name, 'Length:', markdownContent.length);
            
            const { data: frontmatter, content } = matter(markdownContent);
            console.log('📋 BlogService: Parsed frontmatter for:', file.name, frontmatter);

            // Generate ID from filename - clean up the filename for use as ID/slug
            const cleanFileName = file.name.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-?/, '');
            const id = cleanFileName.toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
              .trim();

            const post = {
              id,
              title: frontmatter.title || 'Untitled',
              excerpt: frontmatter.excerpt || '',
              author: frontmatter.author || 'PG App Studios',
              date: frontmatter.publishDate || frontmatter.date || new Date().toISOString().split('T')[0],
              readTime: frontmatter.readTime || 5,
              tags: frontmatter.tags || [],
              category: frontmatter.category || 'Apps',
              featured: frontmatter.featured || false,
              slug: frontmatter.slug || id,
              metaDescription: frontmatter.metaDescription || frontmatter.excerpt || '',
              metaKeywords: frontmatter.metaKeywords || '',
              content
            } as BlogPost;
            
            console.log('✨ BlogService: Created post object:', { title: post.title, id: post.id, slug: post.slug });
            return post;
          } catch (error) {
            console.error(`💥 BlogService: Error processing ${file.name}:`, error);
            return null;
          }
        })
      );

      // Filter out null results and sort by date (newest first)
      this.cache = posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      console.log('🎉 BlogService: Successfully processed', this.cache.length, 'posts');
      console.log('🎉 BlogService: Post titles:', this.cache.map(p => p.title));

      this.lastFetch = Date.now();
      return this.cache;
    } catch (error) {
      console.error('💥 BlogService: Error fetching blog posts:', error);
      
      // Return empty array on error, but don't cache it
      return [];
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();
    return posts.find(post => post.slug === slug || post.id === slug) || null;
  }

  static async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }

  static async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.featured);
  }

  static clearCache(): void {
    console.log('🗑️ BlogService: Clearing cache');
    this.cache = null;
    this.lastFetch = 0;
  }
}