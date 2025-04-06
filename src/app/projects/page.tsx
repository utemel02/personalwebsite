"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, ExternalLinkIcon, CodeIcon, GithubIcon } from "lucide-react";
import { Button } from "@/components/Button";

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
      tagline: "AI Dataset Bias Visualization Tool",
      description: 
        "Cloud Cards is an interactive tool designed to help AI researchers and developers identify and address bias in dataset labels. By providing intuitive visualizations of label distributions across different demographic groups, Cloud Cards enables more ethical and fair AI development. The tool was adopted by multiple research institutions and has been cited in several publications on AI ethics. I designed and implemented the frontend visualization components using React and D3.js, while also contributing to the backend analytics engine built with Python and TensorFlow.",
      techStack: ["React", "D3.js", "Python", "TensorFlow", "Flask", "AWS"],
      image: "/placeholder-project1.jpg",
      demoLink: "https://example.com/cloud-cards",
      codeLink: "https://github.com/username/cloud-cards",
      expanded: false
    },
    {
      id: "nato-ai",
      title: "NATO AI Security Framework",
      tagline: "Threat Detection for Critical Infrastructure",
      description: 
        "During my internship at the NATO Cooperative Cyber Defence Centre of Excellence, I contributed to the development of an AI-driven threat detection system for critical infrastructure protection. This project implemented advanced machine learning algorithms to identify potential cyber threats in real-time, improving detection rates by 27% compared to traditional signature-based methods. I was responsible for designing and implementing the anomaly detection module using supervised and unsupervised learning techniques, as well as conducting rigorous testing against simulated attack scenarios.",
      techStack: ["Python", "TensorFlow", "Cybersecurity", "Anomaly Detection", "Docker"],
      image: "/placeholder-project2.jpg",
      expanded: false
    },
    {
      id: "ethical-computing",
      title: "Ethical Computing Framework",
      tagline: "Bias Mitigation in Machine Learning Systems",
      description: 
        "As part of my research at Michigan State University's AI Ethics Lab, I developed a comprehensive framework for detecting and mitigating bias in machine learning systems. This project involved creating tools to analyze training data, model architectures, and output distributions to identify potential sources of unfairness. The framework includes both technical components (statistical analysis tools, model auditing systems) and process guidelines for development teams. This work resulted in two peer-reviewed publications and has been integrated into curriculum materials for computer science ethics courses.",
      techStack: ["Python", "Fairness Metrics", "Statistical Analysis", "Jupyter", "Scikit-learn"],
      image: "/placeholder-project3.jpg",
      codeLink: "https://github.com/username/ethical-computing",
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
        Projects
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-stone-600 dark:text-amber-200 mb-12"
      >
        Here are some of the key projects I've worked on, showcasing my experience in AI, cybersecurity, and full-stack development.
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
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden bg-stone-200 dark:bg-stone-700">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-1">{project.title}</h2>
                <p className="text-amber-600 dark:text-amber-400 font-medium mb-4">{project.tagline}</p>
                
                <p className="text-stone-600 dark:text-amber-200 mb-4 line-clamp-3">
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