"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const skills = {
    programming: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "TensorFlow", "PyTorch"],
    tools: ["Git", "Docker", "AWS", "Azure", "GCP", "Kubernetes"],
    cybersecurity: ["Penetration Testing", "Network Security", "Cryptography", "Secure Coding", "Threat Modeling"]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-8"
      >
        About Me
      </motion.h1>

      {/* Background Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Background</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            I'm Umut Temel, a dedicated computer scientist with a passion for AI and cybersecurity. My journey in technology 
            began during my undergraduate years at Michigan State University, where I developed a strong foundation in 
            computer science principles while simultaneously pursuing specialized knowledge in artificial intelligence 
            and information security.
          </p>
          <p className="text-stone-600 dark:text-amber-200">
            Throughout my academic and professional career, I've been driven by a desire to create innovative solutions 
            that leverage cutting-edge AI techniques while maintaining robust security measures. This dual focus has 
            allowed me to develop a unique perspective on modern software development, where intelligence and security 
            are not competing priorities but complementary aspects of truly excellent systems.
          </p>
        </div>
      </motion.section>

      {/* Technical Skills Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Technical Skills</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100 mb-2">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.programming.map((skill) => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-sm text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100 mb-2">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-sm text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100 mb-2">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-sm text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100 mb-2">Cybersecurity</h3>
              <div className="flex flex-wrap gap-2">
                {skills.cybersecurity.map((skill) => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-sm text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Education</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">Master of Science in Computer Science</p>
            <p className="text-stone-600 dark:text-amber-200">2020 - 2022</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Specialization in Artificial Intelligence and Machine Learning. GPA: 3.9/4.0
            </p>
            <p className="text-stone-600 dark:text-amber-200">
              Dean's List all semesters. Recipient of the Outstanding Graduate Student Award.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">Bachelor of Science in Computer Science</p>
            <p className="text-stone-600 dark:text-amber-200">2016 - 2020</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Minor in Cybersecurity. GPA: 3.8/4.0
            </p>
            <p className="text-stone-600 dark:text-amber-200">
              Dean's List all semesters. President of the MSU Cybersecurity Club.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Professional Experience Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Professional Experience</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">NATO Cooperative Cyber Defence Centre of Excellence</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">AI Security Research Intern</p>
            <p className="text-stone-600 dark:text-amber-200">Summer 2021</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Conducted research on AI-driven threat detection systems for critical infrastructure protection. Developed a 
              prototype system that improved detection rates by 27% compared to traditional signature-based methods.
            </p>
            <p className="text-stone-600 dark:text-amber-200">
              Collaborated with international security experts to identify potential vulnerabilities in AI systems and 
              develop countermeasures against emerging threats.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">Research Assistant - AI Ethics Lab</p>
            <p className="text-stone-600 dark:text-amber-200">2019 - 2022</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Worked on ethical computing initiatives, focusing on bias detection and mitigation in machine learning models. 
              Published two papers in peer-reviewed conferences on fairness in AI systems.
            </p>
            <p className="text-stone-600 dark:text-amber-200">
              Developed Cloud Cards, an innovative tool for visualizing and addressing bias in dataset labels, which was 
              adopted by multiple research institutions.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Personal Philosophy Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Personal Philosophy</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            I believe that the most effective technology is created at the intersection of innovation and responsibility. 
            In all my work, I strive to build systems that not only push technical boundaries but also respect user 
            privacy, security, and accessibility.
          </p>
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            As artificial intelligence becomes increasingly integrated into our digital infrastructure, I'm committed to 
            ensuring that these systems are developed with robust security measures and ethical considerations from the 
            ground up.
          </p>
          <p className="text-stone-600 dark:text-amber-200">
            Outside of technology, I enjoy hiking, playing chess, and contributing to open-source projects. I'm a firm 
            believer in lifelong learning and continuously seek out new challenges that allow me to grow both personally 
            and professionally.
          </p>
        </div>
      </motion.section>
    </div>
  );
} 