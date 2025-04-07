"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CalendarIcon, TagIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/Button";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

export default function BlogPage() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sample blog post data - in a real app, this would come from a CMS or database
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "My Experience as a NATO AI Consultant",
      date: "2023-09-10",
      excerpt: "A personal reflection on my role as an AI Consultant at SHAPE/NATO, focusing on cybersecurity challenges and implementing AI-driven security protocols in an international organization.",
      tags: ["AI", "Cybersecurity", "NATO", "Personal"],
      slug: "nato-ai-consultant-experience"
    },
    {
      id: "3",
      title: "Building Cloud Cards: A Digital Business Card Platform",
      date: "2023-05-22",
      excerpt: "A technical deep dive into the development of Cloud Cards, discussing the challenges of creating a digital business card platform with Next.js, TypeScript, and MongoDB.",
      tags: ["Web Development", "Next.js", "TypeScript", "Project"],
      slug: "building-cloud-cards"
    },
    {
      id: "4",
      title: "Balancing Dual Degrees in Tech and Business",
      date: "2023-03-18",
      excerpt: "Insights and strategies for successfully managing dual degrees in Computer Science Engineering and Supply Chain Management while maintaining academic excellence.",
      tags: ["Education", "Computer Science", "Supply Chain", "Personal"],
      slug: "dual-degree-journey"
    }
  ];

  // Filter posts by tag if a tag is selected
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  // Get unique tags from all posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="md:flex md:gap-8">
        {/* Main content */}
        <div className="md:w-3/4">
          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-4"
          >
            Blog
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-stone-600 dark:text-amber-200 mb-8"
          >
            Thoughts, insights, and tutorials on AI, cybersecurity, and technology.
          </motion.p>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {filteredPosts.map(post => (
              <motion.article 
                key={post.id}
                variants={item}
                className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700 hover:shadow-md transition-shadow"
              >
                <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-2">
                  {post.title}
                </h2>
                
                <div className="flex items-center text-stone-500 dark:text-stone-400 mb-4 text-sm">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                <p className="text-stone-600 dark:text-amber-200 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                      className={`flex items-center px-3 py-1 rounded-full text-xs ${
                        tag === selectedTag 
                          ? 'bg-amber-500 text-white dark:bg-amber-600' 
                          : 'bg-amber-100 text-stone-700 dark:bg-stone-700 dark:text-amber-200'
                      }`}
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  Read Full Post
                  <ArrowRightIcon className="ml-2 h-3 w-3" />
                </Button>
              </motion.article>
            ))}
          </motion.div>
        </div>
        
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:w-1/4 mt-8 md:mt-0"
        >
          <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700 sticky top-24">
            <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-4">
              About the Author
            </h3>
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 rounded-full mr-4 border-2 border-amber-200 dark:border-stone-700 overflow-hidden">
                <Image 
                  src="/linkedInpfp.jpeg" 
                  alt="Umut Temel" 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-stone-800 dark:text-amber-100">Umut Temel</p>
                <p className="text-sm text-stone-600 dark:text-amber-200">CS & Supply Chain Student | AI Researcher</p>
              </div>
            </div>
            <p className="text-stone-600 dark:text-amber-200 text-sm mb-6">
              I write about my experiences in AI consulting, cybersecurity research, and education as a dual-degree student at Michigan State University.
            </p>
            
            <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-3">
              Filter by Tag
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`flex items-center px-3 py-1 rounded-full text-xs ${
                    tag === selectedTag 
                      ? 'bg-amber-500 text-white dark:bg-amber-600' 
                      : 'bg-amber-100 text-stone-700 dark:bg-stone-700 dark:text-amber-200'
                  }`}
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-amber-600 dark:text-amber-400 text-xs hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 