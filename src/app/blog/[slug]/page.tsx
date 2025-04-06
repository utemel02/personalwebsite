import { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, ArrowLeftIcon, TagIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogContent } from "@/components/blog/BlogContent";

// Sample blog post data - in a real app, this would be fetched from a CMS or database
const blogPosts = {
  "nato-ai-consultant-experience": {
    title: "My Experience as a NATO AI Consultant",
    date: "2023-09-10",
    author: "Umut Temel",
    authorTitle: "CS & Supply Chain Student | AI Researcher",
    authorImage: "/linkedInpfp.jpeg",
    tags: ["AI", "Cybersecurity", "NATO", "Personal"],
    content: `
# My Experience as a NATO AI Consultant

Working as an AI Consultant at SHAPE/NATO was one of the most impactful experiences of my early career. This post reflects on my journey, the challenges I faced, and the innovative solutions we implemented to enhance cybersecurity operations.

## The Opportunity

In May 2023, I joined SHAPE/NATO as an AI Consultant/Intern, where I was tasked with:

1. **Developing AI-driven security protocols** to enhance cybersecurity operations
2. **Implementing advanced AI systems** for operational process analysis
3. **Creating comprehensive documentation** and conducting staff training sessions
4. **Providing strategic insights** to influence NATO cybersecurity policy decisions

## Challenges in an International Security Environment

Working within an international security organization presented unique challenges:

- **Complex stakeholder management**: Navigating different national interests and security protocols
- **Legacy system integration**: Implementing modern AI solutions with existing infrastructure
- **High security standards**: Ensuring all AI solutions met strict security and confidentiality requirements
- **Cross-cultural collaboration**: Working with teams from diverse backgrounds and technical expertise

## Implementing AI-Driven Security Solutions

One of my primary responsibilities was developing AI-driven security protocols:

\`\`\`python
# Example: Anomaly detection system for network traffic
def analyze_network_patterns(traffic_data, historical_baseline):
    """Detect anomalous patterns in network traffic using machine learning"""
    # Preprocess the data
    processed_data = preprocess_traffic_data(traffic_data)
    
    # Apply machine learning models to detect anomalies
    anomalies = anomaly_detection_model.predict(processed_data, historical_baseline)
    
    # Filter and categorize detected anomalies
    categorized_threats = threat_categorization(anomalies)
    
    return categorized_threats
\`\`\`

This system helped identify potential security threats before they could cause harm to the organization's infrastructure.

## Impact and Results

Our AI initiatives led to significant improvements in SHAPE/NATO's cybersecurity posture:

- **30% increase in operational efficiency** through process automation
- **Reduced false positive alerts** by implementing more sophisticated detection algorithms
- **Enhanced threat detection capabilities** for identifying novel attack vectors
- **Improved response times** for security incidents through automated preliminary analysis

![AI Security Framework](/placeholder-blog-image.jpg)

## Key Lessons Learned

This experience taught me several valuable lessons:

1. **Technical excellence matters**: In high-stakes environments, the quality of your work has real-world implications
2. **Communication is crucial**: Technical solutions must be explained clearly to non-technical stakeholders
3. **Security by design**: AI systems must incorporate security principles from the ground up, not as an afterthought
4. **Continuous learning**: Security threats evolve rapidly, requiring ongoing adaptation and improvement

## Conclusion

My time at SHAPE/NATO provided invaluable exposure to the intersection of AI, cybersecurity, and international relations. The experience solidified my interest in using technology to solve complex security challenges and reinforced the importance of responsible AI development.

I remain grateful for the opportunity to contribute to such important work at an early stage in my career, and I continue to apply the lessons learned in my current studies and research.
    `
  },
  "building-cloud-cards": {
    title: "Building Cloud Cards: A Digital Business Card Platform",
    date: "2023-05-22",
    author: "Umut Temel",
    authorTitle: "CS & Supply Chain Student | AI Researcher",
    authorImage: "/linkedInpfp.jpeg",
    tags: ["Web Development", "Next.js", "TypeScript", "Project"],
    content: `
# Building Cloud Cards: A Digital Business Card Platform

Cloud Cards is one of my most significant development projects to date - a digital business card platform built with Next.js, TypeScript, and MongoDB. This post explores the development journey, technical challenges, and lessons learned along the way.

## Project Overview

Cloud Cards allows users to:

- Create digital business cards with customizable templates
- Share profile information via QR codes and NFC technology
- Track profile views and engagement analytics
- Update information in real-time across all sharing points

## Technical Stack

The application was built using modern web technologies:

1. **Frontend**: Next.js, TypeScript, Tailwind CSS
2. **Backend**: Node.js with Express
3. **Database**: MongoDB with Mongoose ODM
4. **Authentication**: NextAuth.js
5. **Hosting**: Vercel
6. **Additional**: NFC integration, QR code generation
    `
  }
};

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const slug = params.slug;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found"
    };
  }
  
  return {
    title: post.title,
    description: post.content.split('\n')[0].replace('# ', '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.split('\n')[0].replace('# ', '').substring(0, 160),
      type: 'article',
      authors: [post.author]
    }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-stone-800 dark:text-amber-100 mb-6">
          Blog Post Not Found
        </h1>
        <p className="text-stone-600 dark:text-amber-200 mb-8">
          Sorry, the blog post you're looking for doesn't exist.
        </p>
        <Link href="/blog">
          <Button>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="inline-block mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center text-stone-600 dark:text-amber-200"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to All Posts
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center text-stone-500 dark:text-stone-400 mb-6 text-sm">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatDate(post.date)}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="flex items-center bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-xs text-stone-700 dark:text-amber-200"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center mb-8 pb-8 border-b border-amber-200 dark:border-stone-700">
          <div className="relative w-12 h-12 rounded-full mr-4 border-2 border-amber-200 dark:border-stone-700 overflow-hidden">
            <Image 
              src={post.authorImage} 
              alt={post.author} 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-stone-800 dark:text-amber-100">{post.author}</p>
            <p className="text-sm text-stone-600 dark:text-amber-200">{post.authorTitle}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <BlogContent content={post.content} />
      </div>
      
      <div className="mt-12 pt-8 border-t border-amber-200 dark:border-stone-700">
        <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-4">
          Share This Post
        </h3>
        <ShareButtons title={post.title} />
      </div>
    </div>
  );
} 