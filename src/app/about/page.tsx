"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-300 dark:border-stone-600 shadow-xl flex-shrink-0 mx-auto md:mx-0"
        >
          <Image
            src="/linkedInpfp.jpeg"
            alt="Umut Temel"
            fill
            className="object-cover"
            priority
            quality={95}
          />
        </motion.div>
        <div>
          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-4"
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-stone-600 dark:text-amber-200"
          >
            Hello! I'm Umut Temel, a dual-degree student at Michigan State University pursuing a Bachelor of Science in Computer Science Engineering 
            and a Bachelor of Arts in Supply Chain Management, set to graduate in May 2026. I'm maintaining a 3.98 GPA 
            while balancing academic excellence with practical experience.
          </motion.p>
        </div>
      </div>

      {/* Background Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Background</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            My professional journey includes working as an AI Consultant/Intern at SHAPE/NATO, where I enhanced cybersecurity 
            operations by developing cutting-edge AI-driven security protocols. I also serve as an Undergraduate Research Assistant 
            at Michigan State University, investigating ethical computing practices and their impact on marginalized communities.
          </p>
          <p className="text-stone-600 dark:text-amber-200">
            Beyond my technical endeavors, I'm a Resident Assistant at Michigan State University, where I manage a floor of 48 residents, 
            promoting a positive living environment while developing my leadership and conflict resolution skills.
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
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100 mb-2">Proficient</h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "C++", "C#", "HTML/CSS", "SQL", "JavaScript", "TypeScript", "Next.js", "Excel", "Word"].map((skill) => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-sm text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100 mb-2">Intermediate</h3>
              <div className="flex flex-wrap gap-2">
                {["SPSS", "Google Cloud", "Google Firebase", "Amazon AWS", "LoggerPro"].map((skill) => (
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
            <p className="text-amber-600 dark:text-amber-400 font-medium">B.S. Computer Science Engineering</p>
            <p className="text-stone-600 dark:text-amber-200">
              Expected Graduation: May 2026<br />
              GPA: 3.98/4.00<br />
              Dean's List: Fall 2022, Spring 2023, Fall 2023, Spring 2024
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">B.A. Supply Chain Management</p>
            <p className="text-stone-600 dark:text-amber-200">
              Expected Graduation: May 2026<br />
              GPA: 3.98/4.00<br />
              Relevant Coursework: Supply Chain Analysis, Operations Management
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
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">SHAPE/NATO</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">AI Consultant/Intern</p>
            <p className="text-stone-600 dark:text-amber-200">May 2023 - August 2023</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Enhanced cybersecurity operations by developing AI-driven security protocols
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">Undergraduate Research Assistant</p>
            <p className="text-stone-600 dark:text-amber-200">January 2023 - Present</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Investigating ethical computing practices and their impact on marginalized communities
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">Resident Assistant</p>
            <p className="text-stone-600 dark:text-amber-200">August 2022 - Present</p>
            <p className="text-stone-600 dark:text-amber-200 mt-2">
              Managing a floor of 48 residents, promoting a positive living and learning environment
            </p>
          </div>
        </div>
      </motion.section>

      {/* Personal Philosophy Section */}
      <motion.section 
        {...fadeIn} 
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">Activities</h2>
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            <span className="font-medium">Spartan Hackers, Member</span> | September 2022 - Present
          </p>
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            <span className="font-medium">Artificial Intelligence Club, Member</span> | September 2022 - Present
          </p>
          <p className="text-stone-600 dark:text-amber-200 mb-4">
            <span className="font-medium">Research Assistant</span> | September 2022 - May 2024
          </p>
          <p className="text-stone-600 dark:text-amber-200">
            <span className="font-medium">Residential Assistant</span> | September 2023 - Present
          </p>
        </div>
      </motion.section>
    </div>
  );
} 