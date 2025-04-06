"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CalendarIcon, ArrowLeftIcon, TagIcon, LinkedinIcon, TwitterIcon, FacebookIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/Button";
import Image from "next/image";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Sample blog post data - in a real app, this would be fetched from a CMS or database
const blogPosts = {
  "securing-ai-systems": {
    title: "Securing AI Systems Against Modern Threats",
    date: "2023-07-15",
    author: "Umut Temel",
    authorTitle: "AI & Cybersecurity Specialist",
    authorImage: "/linkedInpfp.jpeg",
    tags: ["AI", "Cybersecurity", "Machine Learning"],
    content: `
# Securing AI Systems Against Modern Threats

As AI systems become more prevalent in critical infrastructure, ensuring their security against sophisticated attacks is paramount. This post explores emerging threats and defense strategies for AI systems in production.

## The Evolving Threat Landscape

AI systems face unique security challenges compared to traditional software:

1. **Model Extraction Attacks**: Adversaries can query a model extensively to create a replica, potentially exposing proprietary algorithms or training data.
2. **Data Poisoning**: Malicious actors may contaminate training data to influence model behavior in subtle ways.
3. **Adversarial Examples**: Specially crafted inputs designed to fool AI models into making incorrect predictions.

## Defensive Strategies

Protecting AI systems requires a multi-layered approach:

\`\`\`python
# Example: Implementing input validation for ML model
def validate_input(input_data, expected_range):
    """Validate input to ensure it falls within expected parameters"""
    if not all(expected_range[0] <= x <= expected_range[1] for x in input_data):
        raise ValueError("Input contains values outside expected range")
    
    # Additional validation checks
    # ...
    
    return input_data
\`\`\`

### Model Monitoring

Continuous monitoring for unusual patterns or performance degradation can help detect attacks in progress:

\`\`\`javascript
// Simplified monitoring setup
const monitorPrediction = (model, input, prediction) => {
  const confidenceScore = model.getConfidence(prediction);
  
  if (confidenceScore < CONFIDENCE_THRESHOLD) {
    logSuspiciousActivity({
      input,
      prediction,
      confidence: confidenceScore,
      timestamp: new Date()
    });
  }
};
\`\`\`

### Access Control and Authentication

Strong access controls limit who can interact with your AI systems:

- Implement robust authentication for API endpoints
- Rate limiting to prevent model extraction
- Input validation to filter malicious content
- Audit logging of all interactions

## Recent Case Studies

The 2022 attack on Company X's recommendation system highlights the importance of these protections. Attackers were able to manipulate the AI to promote certain products by systematically poisoning the feedback mechanism.

![AI Security Framework](/placeholder-blog-image.jpg)

## Conclusion

Securing AI systems requires specialized knowledge of both machine learning and cybersecurity principles. By implementing the strategies outlined in this post, organizations can better protect their AI assets against emerging threats.

Remember that security is an ongoing process - what works today may not be sufficient tomorrow as attackers develop new techniques.
    `
  },
  // Additional blog posts would be defined here
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();
  const { slug } = params;
  
  // Get post data or redirect if not found
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    // In a real app, you might want to show a 404 page
    router.push('/blog');
    return null;
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle social sharing
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  // Convert markdown-style content to JSX
  // This is a simplified renderer - a real app would use a proper markdown parser
  const renderContent = (content: string) => {
    const parts = content.split('```');
    
    return parts.map((part, index) => {
      // Code blocks
      if (index % 2 === 1) {
        const [language, ...code] = part.split('\n');
        return (
          <pre key={index} className="bg-stone-800 text-amber-100 p-4 rounded-md overflow-x-auto my-4">
            <code className={`language-${language}`}>
              {code.join('\n')}
            </code>
          </pre>
        );
      }
      
      // Regular text with some basic formatting
      return (
        <div key={index} className="prose prose-amber dark:prose-invert max-w-none">
          {part.split('\n').map((line, lineIndex) => {
            // Headers
            if (line.startsWith('# ')) {
              return <h1 key={lineIndex} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={lineIndex} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={lineIndex} className="text-xl font-semibold mt-5 mb-3">{line.substring(4)}</h3>;
            }
            
            // Images
            if (line.match(/!\[.*?\]\(.*?\)/)) {
              const altMatch = line.match(/!\[(.*?)\]/);
              const srcMatch = line.match(/\((.*?)\)/);
              
              if (altMatch && srcMatch) {
                return (
                  <div key={lineIndex} className="my-6">
                    <img 
                      src={srcMatch[1]} 
                      alt={altMatch[1]} 
                      className="rounded-lg max-w-full mx-auto"
                    />
                  </div>
                );
              }
            }
            
            // Lists
            if (line.match(/^\d+\. /)) {
              return <li key={lineIndex} className="ml-6 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
            }
            if (line.match(/^- /)) {
              return <li key={lineIndex} className="ml-6 list-disc">{line.substring(2)}</li>;
            }
            
            // Regular paragraph
            if (line.trim() !== '') {
              return <p key={lineIndex} className="my-4">{line}</p>;
            }
            
            return null;
          })}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center mb-6 text-stone-600 dark:text-amber-200"
          onClick={() => router.push('/blog')}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to All Posts
        </Button>
        
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
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        {renderContent(post.content)}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 pt-8 border-t border-amber-200 dark:border-stone-700"
      >
        <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-4">
          Share This Post
        </h3>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('twitter')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <TwitterIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('linkedin')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('facebook')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <FacebookIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('copy')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <CopyIcon className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 