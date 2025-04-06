"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, ExternalLinkIcon, CodeIcon, GithubIcon } from "lucide-react";
import { Button } from "@/components/Button";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  image: string;
  demoLink?: string;
  codeLink?: string;
  expanded: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "cloud-cards",
      title: "Cloud Cards",
      tagline: "Digital Business Card Platform",
      description: 
        "Architected and developed a full-stack digital business card platform using Next.js 13, TypeScript, MongoDB, and NextAuth.js, resulting in a scalable application with seamless NFC-enabled profile sharing and 100+ active users. Implemented comprehensive user features including RESTful APIs for profile management, Stripe payment processing for premium subscriptions, and custom analytics dashboard with Chart.js. Engineered a responsive frontend with Tailwind CSS and Framer Motion animations, incorporating dark mode support and accessibility features, leading to consistent user experience across all devices and increased user retention.",
      techStack: ["Next.js 13", "TypeScript", "MongoDB", "NextAuth.js", "Stripe", "Chart.js", "Tailwind CSS", "Framer Motion"],
      image: "/cloud_whitelogo.png",
      demoLink: "https://www.cloud-cards.link/umut",
      codeLink: "https://github.com/username/cloud-cards",
      expanded: false
    }
  ]);

  const toggleExpand = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, expanded: !project.expanded } : project
    ));
  };

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-4"
      >
        Featured Project
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-stone-600 dark:text-amber-200 mb-12"
      >
        Featured project: Cloud Cards - a full-stack digital business card platform showcasing my expertise in modern web development with Next.js and TypeScript.
      </motion.p>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-8"
      >
        {projects.map(project => (
          <motion.div 
            key={project.id}
            variants={item}
            className="bg-amber-50 dark:bg-stone-800 rounded-lg overflow-hidden border border-amber-200 dark:border-stone-700 hover:shadow-md transition-shadow"
          >
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-stone-200 dark:bg-stone-700">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-1">{project.title}</h2>
                <p className="text-amber-600 dark:text-amber-400 font-medium mb-4">{project.tagline}</p>
                
                <p className="text-stone-600 dark:text-amber-200 mb-4">
                  {project.expanded ? project.description : `${project.description.slice(0, 200)}...`}
                </p>
                
                <button 
                  onClick={() => toggleExpand(project.id)}
                  className="text-amber-600 dark:text-amber-400 font-medium mb-4 hover:underline"
                >
                  {project.expanded ? "Show less" : "Read more"}
                </button>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-xs text-stone-700 dark:text-amber-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.demoLink && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => window.open(project.demoLink, "_blank")}
                    >
                      View Demo
                      <ExternalLinkIcon className="ml-2 h-3 w-3" />
                    </Button>
                  )}
                  {project.codeLink && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => window.open(project.codeLink, "_blank")}
                    >
                      View Code
                      <GithubIcon className="ml-2 h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 