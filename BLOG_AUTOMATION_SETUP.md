# Make.com Blog Automation Setup Guide
## PG App Studios Blog Integration

This guide explains how to set up automated blog post creation using Make.com, GitHub API, and Vercel auto-deployment for the PG App Studios website.

---

## 🚀 Overview

**What this automation does:**
- Creates daily blog posts automatically via Make.com
- Stores posts as Markdown files in GitHub (`content/posts/`)
- Automatically deploys to Vercel when new posts are added
- Maintains your existing UI while making content dynamic
- Version control for all blog content

**Category:** All blog posts will be categorized as "Apps" to match your website focus.

---

## 📁 Project Structure

Blog posts are stored as Markdown files in:
```
content/posts/YYYY-MM-DD-blog-post-title.md
```

**Examples:**
- `content/posts/2024-06-10-best-ios-development-tools.md`
- `content/posts/2024-06-11-app-store-optimization-guide.md`
- `content/posts/2024-06-12-swiftui-best-practices.md`

---

## 🔧 Step 1: GitHub Personal Access Token Setup

1. **Go to GitHub Settings:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Token Settings:**
   - **Name:** `Make.com Blog Automation`
   - **Expiration:** No expiration (or set desired expiration)
   - **Scopes:** Select these permissions:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
4. **Generate Token** and copy it immediately
5. **Store Securely:** Save the token - you'll need it in Make.com

---

## 🤖 Step 2: Make.com Scenario Setup

### Module 1: Timer (Trigger)
- **Module:** Timer
- **Schedule:** Daily at your preferred time (e.g., 8:00 AM)
- **Purpose:** Triggers daily blog post creation

### Module 2: OpenAI Content Generation
- **Module:** OpenAI > Create a Chat Completion
- **Model:** `gpt-4` or `gpt-4-turbo`
- **System Message:**
```
You are an expert app development and technology content writer. Create engaging, informative blog posts about iOS development, app creation, technology trends, and mobile app best practices. Use markdown formatting with proper headers, lists, and emphasis. Include practical tips, code examples where relevant, and expert advice for app developers and tech enthusiasts.
```

- **User Message:**
```
Write a comprehensive blog post about app development or technology. 
- Focus on iOS development, app creation, or mobile technology
- Include practical tips and best practices
- Use proper markdown formatting with headers (##, ###, ####)
- Write 1000-1500 words
- Include specific tool recommendations when relevant
- Add code examples or technical details where appropriate
- Structure with clear headers and subheaders
- End with actionable takeaways
- Make it valuable for app developers and tech enthusiasts

Generate a catchy, SEO-friendly title and comprehensive content.
```

### Module 3: Content Preparation
- **Module:** Tools > Set Variable
- **Variable Name:** `markdown_content`
- **Value:**
```markdown
---
title: "{{2.choices[0].message.content.split('\n')[0].replace('# ', '')}}"
excerpt: "Expert insights and practical tips for app developers and tech enthusiasts"
author: "PG App Studios"
publishDate: "{{formatDate(now; "YYYY-MM-DD")}}"
readTime: {{ceil(length(split(2.choices[0].message.content; " ")) / 200)}}
tags: ["Apps", "iOS", "Development", "Technology"]
category: "Apps"
featured: false
slug: "{{formatDate(now; "YYYY-MM-DD")}}-{{replace(replace(lower(2.choices[0].message.content.split('\n')[0].replace('# ', '')); "[^a-z0-9\s]"; ""); "\s+"; "-")}}"
metaDescription: "{{substring(2.choices[0].message.content; 0; 150)}}..."
metaKeywords: "apps, iOS development, mobile apps, technology, programming"
---

{{2.choices[0].message.content}}
```

### Module 4: Base64 Encoding
- **Module:** Tools > Compose a String
- **Text:** `{{base64(3.markdown_content)}}`

### Module 5: GitHub File Creation via HTTP
- **Module:** HTTP > Make a Request
- **URL:** 
```
https://api.github.com/repos/PGappstudios/pgappstudios/contents/content/posts/{{formatDate(now; "YYYY-MM-DD")}}-blog-post.md
```
- **Method:** `PUT`

**Headers (Add each separately):**
1. **Header 1:**
   - Name: `Authorization`
   - Value: `Bearer YOUR_GITHUB_TOKEN_HERE`

2. **Header 2:**
   - Name: `Accept`
   - Value: `application/vnd.github.v3+json`

3. **Header 3:**
   - Name: `User-Agent`
   - Value: `Make.com-Bot`

**Body Settings:**
- **Body Type:** Raw
- **Content Type:** JSON (application/json)

**Request Content:**
```json
{
  "message": "Add new blog post via Make.com automation",
  "content": "{{4.text}}"
}
```

---

## 📝 Step 3: Markdown Template Requirements

### Frontmatter Structure
All blog posts MUST include this YAML frontmatter:

```yaml
---
title: "Your Blog Post Title"
excerpt: "Short description (150-160 characters for SEO)"
author: "PG App Studios"
publishDate: "2024-06-10"
readTime: 8
tags: ["Apps", "iOS", "Development", "Technology"]
category: "Apps"
featured: false
slug: "your-blog-post-slug"
metaDescription: "SEO meta description (150-160 characters)"
metaKeywords: "apps, iOS, development, technology"
---
```

### Content Structure Guidelines
- **H1 (#):** Main title (only one per post)
- **H2 (##):** Major sections (8-12 sections recommended)
- **H3 (###):** Subsections within H2 sections
- **H4 (####):** Detailed topics and specific tips
- **Lists:** Use `*` for bullet points
- **Emphasis:** Use `**bold text**` for important terms
- **Minimum Length:** 1000-1500 words per post

### Content Topics for Apps Category
**Daily Topic Suggestions:**
- Monday: iOS Development Monday - Swift/SwiftUI techniques
- Tuesday: Tool Tuesday - Development tools and resources
- Wednesday: Design Wednesday - UI/UX best practices
- Thursday: Tech Thursday - Latest technology trends
- Friday: Feature Friday - App features and functionality
- Saturday: Success Saturday - App store optimization
- Sunday: Sunday Stories - Development experiences and tips

---

## 🔄 Step 4: Testing Your Setup

### Simple Test Version
For initial testing, use this simplified approach:

**Static Test Content (Base64 encoded):**
```json
{
  "message": "Test blog post creation",
  "content": "LS0tCnRpdGxlOiAiVGVzdCBCbG9nIFBvc3QiCmV4Y2VycHQ6ICJUaGlzIGlzIGEgdGVzdCBibG9nIHBvc3QgZm9yIE1ha2UuY29tIGF1dG9tYXRpb24iCmF1dGhvcjogIlBHIEFwcCBTdHVkaW9zIgpwdWJsaXNoRGF0ZTogIjIwMjQtMDYtMTAiCnJlYWRUaW1lOiA1CnRhZ3M6IFsiQXBwcyIsICJUZXN0Il0KY2F0ZWdvcnk6ICJBcHBzIgpmZWF0dXJlZDogZmFsc2UKc2x1ZzogInRlc3QtYmxvZy1wb3N0IgptZXRhRGVzY3JpcHRpb246ICJUZXN0IGJsb2cgcG9zdCBmb3IgYXV0b21hdGlvbiIKbWV0YUtleXdvcmRzOiAidGVzdCwgYXBwcywgYXV0b21hdGlvbiIKLS0tCgojIFRlc3QgQmxvZyBQb3N0CgpUaGlzIGlzIGEgdGVzdCBibG9nIHBvc3QgY3JlYXRlZCB2aWEgTWFrZS5jb20gYXV0b21hdGlvbi4KCiMjIFRlc3QgU2VjdGlvbgoKVGhpcyBpcyBhIHRlc3Qgc2VjdGlvbiB0byB2ZXJpZnkgdGhlIGF1dG9tYXRpb24gd29ya3MgY29ycmVjdGx5Lg=="
}
```

### Testing Steps
1. **Start Simple:** Use the static test content first
2. **Verify Token:** Ensure your GitHub token has correct permissions
3. **Check Repository:** Verify the repository name `PGappstudios/pgappstudios` is correct
4. **Test Path:** Ensure the `content/posts/` directory exists in your repo
5. **Add Dynamic Content:** Once basic version works, add AI-generated content

---

## 🎯 Step 5: Content Strategy

### Daily App Development Topics

**Monday - Development Techniques:**
- Swift programming best practices
- SwiftUI advanced techniques
- iOS architecture patterns
- Code optimization tips

**Tuesday - Tools & Resources:**
- Xcode tips and tricks
- Third-party libraries
- Development tools review
- Testing frameworks

**Wednesday - UI/UX Design:**
- Interface design principles
- User experience best practices
- Accessibility in apps
- Design system creation

**Thursday - Technology Trends:**
- Latest iOS updates
- Emerging technologies
- Industry news and analysis
- Future of mobile development

**Friday - App Features:**
- Implementing specific features
- Integration tutorials
- API usage guides
- Performance optimization

**Saturday - App Store Success:**
- App Store Optimization (ASO)
- Marketing strategies
- Monetization techniques
- User acquisition

**Sunday - Development Stories:**
- Case studies
- Lessons learned
- Development challenges
- Success stories

---

## 🚀 Step 6: Advanced Setup Options

### Dynamic Topic Generation
Add a topic selection module before OpenAI:

**Module:** Tools > Set Variable
**Variable Name:** `daily_topic`
**Value:**
```
{{switch(formatDate(now; "e"); 
  "1"; "iOS Development Techniques and Best Practices";
  "2"; "Essential Development Tools and Resources";
  "3"; "UI/UX Design for Mobile Apps";
  "4"; "Latest Technology Trends in App Development";
  "5"; "Advanced App Features and Implementation";
  "6"; "App Store Optimization and Marketing";
  "7"; "Development Stories and Case Studies"
)}}
```

### Error Handling
Add error handling modules:
- **Router:** Check if HTTP request was successful
- **Email:** Send notification if automation fails
- **Retry:** Attempt to recreate failed posts

---

## 📊 Step 7: Monitoring and Maintenance

### What to Monitor
- **Daily Post Creation:** Check that posts are created daily
- **Content Quality:** Review generated content periodically
- **GitHub Commits:** Verify files are being committed correctly
- **Website Updates:** Ensure Vercel deployments are working

### Maintenance Tasks
- **Weekly:** Review and edit generated content if needed
- **Monthly:** Update OpenAI prompts for better content
- **Quarterly:** Review and update topic rotation
- **As Needed:** Update GitHub token before expiration

---

## 🔧 Troubleshooting

### Common Issues

**GitHub API Errors:**
- Verify token permissions include `repo` scope
- Check repository name is correct
- Ensure `content/posts/` directory exists

**Make.com Errors:**
- Check all headers are added individually (not as JSON)
- Verify Base64 encoding is working correctly
- Test with static content first

**Content Issues:**
- Review OpenAI system prompt for clarity
- Adjust content length requirements
- Check markdown formatting

### Quick Fixes

**Token Issues:**
```
Error: Bad credentials
Solution: Generate new GitHub token with correct permissions
```

**Path Issues:**
```
Error: Not Found
Solution: Create content/posts/ directory in repository
```

**Encoding Issues:**
```
Error: Invalid content
Solution: Verify Base64 encoding module is working correctly
```

---

## ✅ Checklist

Before going live, ensure:

- [ ] GitHub Personal Access Token created with `repo` permissions
- [ ] `content/posts/` directory exists in repository
- [ ] Make.com scenario configured with all 5 modules
- [ ] Headers added individually (not as JSON object)
- [ ] Test post created successfully
- [ ] Vercel auto-deployment working
- [ ] Content quality meets standards
- [ ] Daily schedule configured correctly

---

## 🎉 Success!

Once set up, your blog will:
- ✅ Generate high-quality app development content daily
- ✅ Automatically commit to GitHub with version control
- ✅ Deploy automatically to your website
- ✅ Maintain consistent posting schedule
- ✅ Focus on "Apps" category content
- ✅ Preserve your existing website UI

Your blog automation is now ready to create engaging content for your PG App Studios audience!

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all steps were completed correctly
3. Test with simplified static content first
4. Review Make.com execution logs for errors

Remember: Start simple, test thoroughly, then add complexity!