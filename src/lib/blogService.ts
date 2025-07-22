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
    // Return cached data if still valid
    if (this.cache && Date.now() - this.lastFetch < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      // Fetch list of files from GitHub
      const response = await fetch(GITHUB_API_BASE);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const files = await response.json();
      
      // Filter markdown files only
      const markdownFiles = files.filter((file: any) => 
        file.name.endsWith('.md') && file.name !== '.gitkeep'
      );

      // Fetch content for each markdown file
      const posts = await Promise.all(
        markdownFiles.map(async (file: any) => {
          try {
            const contentResponse = await fetch(`${GITHUB_RAW_BASE}/${file.name}`);
            if (!contentResponse.ok) {
              console.warn(`Failed to fetch ${file.name}`);
              return null;
            }

            const markdownContent = await contentResponse.text();
            const { data: frontmatter, content } = matter(markdownContent);

            // Generate ID from filename
            const id = file.name.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-?/, '');

            return {
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
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            return null;
          }
        })
      );

      // Filter out null results and sort by date (newest first)
      this.cache = posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      this.lastFetch = Date.now();
      return this.cache;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      
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
    this.cache = null;
    this.lastFetch = 0;
  }
}