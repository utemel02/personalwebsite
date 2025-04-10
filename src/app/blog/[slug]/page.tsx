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

Working as an AI Consultant at SHAPE/NATO was one of the most impactful experiences of my early career. This post reflects on my journey through corporate procedures, technical documentation, and risk assessment in an international security organization.

## The Corporate Environment

When I joined SHAPE/NATO in May 2023, I was immediately immersed in a highly structured corporate environment that required:

- Adherence to strict security protocols and clearance procedures
- Following detailed documentation standards for all technical work
- Participating in formal review processes for all implementations
- Coordinating with multiple departments and stakeholders
- Learning military communication protocols and terminology

## Working with Legacy Systems

A significant part of my role involved working directly with HTML and legacy systems:

- Analyzing and documenting existing system architectures
- Creating technical documentation in raw HTML format for internal systems
- Developing compatibility layers between modern AI solutions and legacy infrastructure
- Maintaining strict version control and change management procedures
- Ensuring backward compatibility while implementing new features

## Risk Assessment Framework

One of my key contributions was developing a comprehensive risk assessment framework for AI implementation:

### Immediate Risks
- Security vulnerabilities in AI models
- Data privacy concerns in international contexts
- Integration challenges with existing systems
- Training data quality and bias issues

### Future Risks
- Long-term AI system maintenance requirements
- Potential adversarial attacks on AI models
- Evolution of AI capabilities and security implications
- Cross-border data governance challenges

## Documentation and Compliance

My role required extensive documentation work:

- Creating detailed technical specifications in HTML format
- Developing standard operating procedures (SOPs)
- Writing implementation guides for security teams
- Maintaining compliance documentation for international standards
- Producing risk assessment reports for stakeholders

## Impact and Results

Our systematic approach to AI implementation led to:

- Establishment of clear AI governance procedures
- Development of comprehensive risk assessment protocols
- Creation of standardized documentation templates
- Implementation of secure AI testing environments
- Improved cross-department collaboration processes

## Key Lessons Learned

This experience taught me valuable lessons about working in a large international organization:

- **Process Matters**: Following established procedures ensures security and consistency
- **Documentation is Critical**: Clear, detailed documentation is essential for complex systems
- **Risk Management**: Proactive risk assessment is crucial for AI implementation
- **International Collaboration**: Working across cultures requires clear communication
- **Legacy Integration**: Modern solutions must work with existing infrastructure

## Looking Forward

The experience at SHAPE/NATO has shaped my approach to AI implementation in several ways:

- Emphasizing thorough documentation and process adherence
- Prioritizing security and risk assessment in all projects
- Understanding the importance of stakeholder communication
- Appreciating the complexity of international collaboration
- Recognizing the value of systematic approach to innovation

I continue to apply these lessons in my current work, always keeping in mind the importance of balancing innovation with security and proper procedure.
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

Cloud Cards represents my venture into modernizing professional networking through digital business cards. This project combines cutting-edge web technologies with practical business applications, creating a platform that's caught the attention of major organizations.

## Project Overview

- Built with Next.js, TypeScript, and MongoDB for robust performance and scalability
- Implemented NFC technology for seamless contact sharing
- Designed with a focus on user experience and modern aesthetics
- Created both web platform and mobile-responsive interfaces
- Integrated secure payment processing and user authentication

## Technical Implementation

- Utilized Next.js App Router for optimized page routing and server-side rendering
- Implemented TypeScript for enhanced code reliability and maintainability
- Designed a scalable MongoDB database structure for user profiles and analytics
- Created custom API endpoints for seamless data management
- Integrated Tailwind CSS for responsive and modern UI design
- Developed secure authentication flow using NextAuth.js
- Implemented real-time analytics for card usage tracking

## Key Features

- One-tap NFC sharing capability for instant profile exchange
- Customizable digital business card templates
- Real-time analytics dashboard for tracking card usage
- QR code generation for easy profile sharing
- Integrated contact management system
- Mobile-first responsive design
- Dark mode support for better accessibility

## MSU Athletics Presentation

One of our most exciting opportunities came when we presented Cloud Cards to the Michigan State University coaching staff:

- Demonstrated the platform to MSU Football coaching staff
- Received enthusiastic feedback about potential recruitment applications
- Discussed customization options for team-specific branding
- Explored integration possibilities with existing recruitment processes
- Generated significant interest in bulk purchase options for the entire coaching staff

## Business Impact

- Successfully launched beta version with positive user feedback
- Attracted interest from multiple university departments
- Established potential partnership opportunities with MSU Athletics
- Created scalable pricing model for individual and enterprise users
- Developed custom solutions for organizational needs

## Technical Challenges Overcome

- Optimized NFC communication for various device types
- Implemented secure data handling for sensitive contact information
- Created efficient caching system for improved performance
- Developed cross-platform compatibility solutions
- Enhanced security measures for enterprise-level usage

## Future Development Plans

- Expanding enterprise-level features for large organizations
- Implementing advanced analytics capabilities
- Developing additional customization options
- Creating integrated CRM functionalities
- Planning iOS and Android native apps

## Try It Out

Want to see Cloud Cards in action? Visit my personal digital business card: https://www.cloud-cards.link/umut

## Looking Forward

Cloud Cards continues to evolve based on user feedback and market demands. The positive response from MSU Athletics has opened new possibilities for expanding into the sports recruitment sector, while maintaining our focus on providing a versatile digital networking solution for professionals across all industries.
    `
  },
  "dual-degree-journey": {
    title: "Balancing Dual Degrees in Tech and Business",
    date: "2023-03-18",
    author: "Umut Temel",
    authorTitle: "CS & Supply Chain Student | AI Researcher",
    authorImage: "/linkedInpfp.jpeg",
    tags: ["Education", "Computer Science", "Supply Chain", "Personal"],
    content: `
# Balancing Dual Degrees in Tech and Business

Pursuing dual degrees in Computer Science Engineering and Supply Chain Management at Michigan State University has been both challenging and incredibly rewarding. This post shares my journey, strategies, and insights for successfully navigating these two distinct yet complementary fields.

## The Power of Interdisciplinary Education

- Combining technical expertise from Computer Science with business acumen from Supply Chain Management creates a unique skill set
- Understanding both the technical and operational aspects of businesses provides a holistic perspective
- Developing both analytical and strategic thinking abilities enhances problem-solving capabilities
- Building versatility for a rapidly changing job market where tech and business increasingly overlap
- Creating opportunities to bridge communication gaps between technical and business teams

## Why Michigan State University

- MSU boasts the #1 ranked Supply Chain Management program in the United States
- The program offers unparalleled industry connections and experiential learning opportunities
- Cutting-edge research in supply chain technology provides insights into emerging trends
- Strong emphasis on practical applications through case studies and industry partnerships
- Access to advanced logistics and operations research facilities and technologies
- Complementary strength in Computer Science with focus on applied technology

## Foundation from the International Baccalaureate Program

- My IB experience in high school created a critical foundation for managing the dual-degree workload
- The program's rigorous curriculum taught advanced time management and prioritization skills
- IB's emphasis on independent research prepared me for self-directed university learning
- Development of strong writing and analytical skills transferable across both technical and business courses
- Experience with balanced workloads across multiple subjects created mental frameworks for handling diverse coursework
- The international perspective provided valuable context for understanding global supply chains

## Daily Challenges and Solutions

- Juggling programming assignments with supply chain case studies requires strategic scheduling
- Using digital tools to create structured study plans and track progress across both disciplines
- Finding synergies between courses where technical skills can enhance business projects
- Leveraging different types of thinking (logical vs. strategic) to maintain mental freshness
- Building in flexibility to accommodate intensive project periods in either program
- Creating distinct work environments for different types of coursework to enhance focus

## Career Advantages of the Dual-Degree Approach

- Standing out to employers seeking candidates who understand both technological implementation and business operations
- Ability to work in technical roles with business insights or business roles with technical understanding
- Preparation for specialized careers in supply chain technology, logistics optimization, and ERP implementation
- Foundation for entrepreneurial ventures that leverage both technical innovation and operational efficiency
- Versatility to pivot between sectors as market demands and personal interests evolve
- Capacity to identify technological solutions to business problems others might miss

## Key Lessons Learned

- Balance is achievable with proper planning and realistic expectations
- Finding connections between seemingly disparate fields enhances learning in both
- Building a support network of peers in both programs provides valuable perspective
- Communicating effectively with professors about dual-degree challenges helps secure needed flexibility
- Taking opportunities to apply computer science skills to supply chain problems creates unique academic contributions
- Maintaining physical and mental well-being is essential to sustaining long-term academic performance

## Looking Forward

As I progress through my dual-degree journey, I continue to discover new ways that these fields complement each other. The future of both supply chain management and computer science is increasingly intertwined, with innovations like blockchain for supply chain transparency, AI for demand forecasting, and advanced analytics for logistics optimization.

I'm excited to be positioned at this intersection, with the skills and knowledge to contribute to the technological transformation of global supply chains.
    `
  }
};

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Ensure params is fully resolved before accessing properties
  const { slug } = params;
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

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Ensure params is fully resolved before accessing properties
  const { slug } = params;
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