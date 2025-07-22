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

// Updated to use correct repository name
const GITHUB_API_BASE = 'https://api.github.com/repos/PGappstudios/pgappstudios/contents/content/posts';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/PGappstudios/pgappstudios/main/content/posts';

// Local development posts - these will be used when GitHub API is not available
const localPosts: BlogPost[] = [
  {
    id: "ultimate-ios-development-guide-2025",
    title: "The Ultimate iOS Development Guide for 2025",
    excerpt: "Master iOS development with the latest Swift features, SwiftUI best practices, and essential tools every developer needs to know",
    author: "PG App Studios",
    date: "2024-12-15",
    readTime: 8,
    tags: ["iOS", "Swift", "SwiftUI", "Development", "Apps"],
    category: "Apps",
    featured: true,
    slug: "ultimate-ios-development-guide-2025",
    metaDescription: "Complete iOS development guide covering Swift 6, SwiftUI, Xcode tips, and best practices for building amazing apps in 2025",
    metaKeywords: "iOS development, Swift programming, SwiftUI, Xcode, mobile apps, app development",
    content: `# The Ultimate iOS Development Guide for 2025

iOS development continues to evolve rapidly, with new tools, frameworks, and best practices emerging each year. Whether you're just starting your iOS development journey or looking to update your skills for 2025, this comprehensive guide covers everything you need to know.

## Getting Started with iOS Development

### Essential Tools and Setup

Before diving into code, ensure you have the right development environment:

- **Xcode 15+**: Apple's official IDE with the latest iOS SDK
- **Swift 6**: The latest version brings improved concurrency and performance
- **iOS Simulator**: Test your apps across different devices and OS versions
- **TestFlight**: For beta testing and app distribution

### Swift Fundamentals

Swift has matured significantly, and understanding its core concepts is crucial:

**Value Types vs Reference Types**
- Prefer structs and enums over classes when possible
- Use classes for reference semantics and inheritance
- Leverage protocols for flexible, testable code

Start building your next great iOS app today, and remember that every expert was once a beginner. The iOS development community is welcoming and supportive, so don't hesitate to ask questions and share your knowledge with others.

*Ready to start your iOS development journey? Download Xcode and begin building your first SwiftUI app today!*`
  },
  {
    id: "swiftui-performance-optimization-techniques",
    title: "SwiftUI Performance Optimization: 10 Essential Techniques",
    excerpt: "Boost your SwiftUI app's performance with these proven optimization techniques and best practices for smooth, responsive user interfaces",
    author: "PG App Studios",
    date: "2024-12-10",
    readTime: 6,
    tags: ["SwiftUI", "Performance", "Optimization", "iOS", "Development"],
    category: "Apps",
    featured: false,
    slug: "swiftui-performance-optimization-techniques",
    metaDescription: "Learn essential SwiftUI performance optimization techniques to create smooth, responsive iOS apps that users love",
    metaKeywords: "SwiftUI performance, iOS optimization, app performance, SwiftUI best practices",
    content: `# SwiftUI Performance Optimization: 10 Essential Techniques

Creating smooth, responsive SwiftUI apps requires understanding performance optimization techniques. Here are the most effective strategies to ensure your SwiftUI apps run flawlessly across all devices.

## 1. Minimize View Body Computations

Keep your view's \`body\` property lightweight by moving expensive computations outside the view.

Remember to always profile your app's performance and make data-driven optimization decisions. Focus on the most impactful improvements first, and don't optimize prematurely without evidence of performance issues.

*Start implementing these techniques in your SwiftUI apps today and watch your app's performance soar!*`
  },
  {
    id: "app-store-optimization-complete-guide",
    title: "App Store Optimization: Complete Guide to ASO Success",
    excerpt: "Master App Store Optimization with proven strategies to improve your app's visibility, downloads, and ranking in the App Store",
    author: "PG App Studios",
    date: "2024-12-05",
    readTime: 10,
    tags: ["ASO", "App Store", "Marketing", "Apps", "Optimization"],
    category: "Apps",
    featured: false,
    slug: "app-store-optimization-complete-guide",
    metaDescription: "Complete App Store Optimization guide covering keywords, screenshots, ratings, and proven ASO strategies to boost app downloads",
    metaKeywords: "app store optimization, ASO, app marketing, app store ranking, mobile app marketing",
    content: `# App Store Optimization: Complete Guide to ASO Success

App Store Optimization (ASO) is crucial for your app's success in the crowded marketplace. With over 2 million apps on the App Store, standing out requires strategic optimization across multiple elements.

## Understanding App Store Optimization

ASO is the process of improving your app's visibility in app store search results. The higher your app ranks in search results, the more likely users are to discover and download it.

Start implementing these ASO strategies today, and watch your app's organic visibility and downloads grow over time. Great ASO takes patience and persistence, but the results are worth the investment.

*Ready to boost your app's visibility? Begin with keyword research and work your way through each optimization element systematically.*`
  }
];

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
      
      // Add headers for better API access
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };
      
      // Add GitHub token if available (for higher rate limits)
      const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
      }
      
      // Fetch list of files from GitHub
      const response = await fetch(GITHUB_API_BASE, { headers });
      
      if (!response.ok) {
        console.warn(`⚠️ GitHub API error: ${response.status} ${response.statusText}`);
        
        // Check for rate limiting
        if (response.status === 403) {
          const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
          if (rateLimitRemaining === '0') {
            console.warn('⚠️ GitHub API rate limit exceeded, falling back to local posts');
          }
        }
        
        return this.fallbackToLocalPosts();
      }

      const files = await response.json();
      console.log('📁 BlogService: Found', files.length, 'files total');
      
      // Filter markdown files only
      const markdownFiles = files.filter((file: any) => 
        file.name.endsWith('.md') && file.name !== '.gitkeep'
      );
      console.log('📝 BlogService: Found', markdownFiles.length, 'markdown files');
      console.log('📝 BlogService: Markdown files:', markdownFiles.map((f: any) => f.name));

      if (markdownFiles.length === 0) {
        console.warn('⚠️ No markdown files found, falling back to local posts');
        return this.fallbackToLocalPosts();
      }

      // Fetch content for each markdown file
      const posts = await Promise.all(
        markdownFiles.map(async (file: any) => {
          try {
            console.log('📥 BlogService: Fetching content for:', file.name);
            
            // Use the download_url provided by GitHub API for better reliability
            const rawUrl = file.download_url || `${GITHUB_RAW_BASE}/${encodeURIComponent(file.name)}`;
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
      console.log('🔄 BlogService: Falling back to local posts');
      return this.fallbackToLocalPosts();
    }
  }

  private static fallbackToLocalPosts(): BlogPost[] {
    console.log('📱 BlogService: Using local development posts');
    console.log('📱 BlogService: localPosts array:', localPosts);
    console.log('📱 BlogService: localPosts.length:', localPosts.length);
    this.cache = localPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log('📱 BlogService: Sorted and cached posts:', this.cache);
    this.lastFetch = Date.now();
    return this.cache;
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
