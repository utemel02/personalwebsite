"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { ArrowRightIcon, ExternalLinkIcon, DownloadIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [descriptorIndex, setDescriptorIndex] = useState(0);
  const descriptors = ["AI Engineer", "Cybersecurity Researcher", "Full-Stack Developer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setDescriptorIndex((prevIndex) => (prevIndex + 1) % descriptors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-16"
      >
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-amber-100 mb-4">
            Hello, I'm Umut Temel
          </h1>
          <div className="h-8 mb-6">
            <motion.p
              key={descriptors[descriptorIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl text-amber-600 dark:text-amber-400 font-semibold"
            >
              {descriptors[descriptorIndex]}
            </motion.p>
          </div>
          <p className="text-stone-600 dark:text-amber-200 mb-8">
            I'm passionate about developing innovative solutions at the intersection of AI and cybersecurity. 
            With experience from my NATO internship and success with Cloud Cards, I build secure and 
            intelligent applications that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => router.push('/projects')}
              className="flex items-center"
            >
              View Projects
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => router.push('/resume')}
              variant="outline"
              className="flex items-center"
            >
              View Résumé
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => router.push('/contact')}
              variant="outline"
              className="flex items-center"
            >
              Contact Me
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-amber-200 dark:border-stone-700 shadow-lg"
          >
            <Image
              src="/linkedInpfp.jpeg"
              alt="Umut Temel"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-3">AI Innovation</h3>
          <p className="text-stone-600 dark:text-amber-200">
            Developing cutting-edge AI solutions for complex problems in security and automation.
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-3">Cybersecurity</h3>
          <p className="text-stone-600 dark:text-amber-200">
            Implementing secure systems and researching advanced security techniques for modern applications.
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-3">Full-Stack Development</h3>
          <p className="text-stone-600 dark:text-amber-200">
            Building end-to-end applications with modern frameworks like Next.js, React, and Node.js.
          </p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-amber-50 dark:bg-stone-800 p-8 rounded-lg border border-amber-200 dark:border-stone-700 mb-16"
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Latest Blog Posts</h2>
        <p className="text-stone-600 dark:text-amber-200 mb-4">
          Check out my latest thoughts on AI, cybersecurity, and development.
        </p>
        <Button onClick={() => router.push('/blog')} className="flex items-center">
          View All Posts
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
