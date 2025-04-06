"use client";

import React from "react";
import { motion } from "framer-motion";
import { DownloadIcon, BriefcaseIcon, GraduationCapIcon, CodeIcon, AwardIcon, BookOpenIcon } from "lucide-react";
import { Button } from "@/components/Button";

export default function ResumePage() {
  // Handler for downloading résumé PDF
  const handleDownloadResume = () => {
    // In a real application, this would download a PDF file
    // For this demo, we'll just link to a placeholder
    window.open("/resume-umut-temel.pdf", "_blank");
  };
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-4 md:mb-0"
        >
          Résumé
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            onClick={handleDownloadResume} 
            className="flex items-center"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </motion.div>
      </div>
      
      {/* Print-friendly wrapper */}
      <div className="bg-white dark:bg-stone-800 p-8 rounded-lg border border-amber-200 dark:border-stone-700 print:border-none print:p-4 print:shadow-none">
        {/* Summary Section */}
        <motion.section 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4 flex items-center">
            <BookOpenIcon className="mr-2 h-5 w-5" />
            Summary
          </h2>
          <p className="text-stone-600 dark:text-amber-200">
            AI Engineer and Cybersecurity Specialist with a strong background in developing secure, intelligent applications. 
            Experience includes research at NATO's Cyber Defence Centre and Michigan State University's AI Ethics Lab. 
            Passionate about creating ethical AI solutions with robust security measures. Skilled in full-stack development, 
            machine learning, and information security.
          </p>
        </motion.section>
        
        {/* Education Section */}
        <motion.section 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4 flex items-center">
            <GraduationCapIcon className="mr-2 h-5 w-5" />
            Education
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Master of Science in Computer Science</p>
              <p className="text-stone-500 dark:text-stone-400">2020 - 2022</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Specialization in Artificial Intelligence and Machine Learning</li>
                <li>• GPA: 3.9/4.0</li>
                <li>• Dean's List all semesters</li>
                <li>• Recipient of the Outstanding Graduate Student Award</li>
                <li>• Thesis: "Ethical Considerations in AI-Driven Security Systems"</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Bachelor of Science in Computer Science</p>
              <p className="text-stone-500 dark:text-stone-400">2016 - 2020</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Minor in Cybersecurity</li>
                <li>• GPA: 3.8/4.0</li>
                <li>• Dean's List all semesters</li>
                <li>• President of the MSU Cybersecurity Club</li>
              </ul>
            </div>
          </div>
        </motion.section>
        
        {/* Experience Section */}
        <motion.section 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4 flex items-center">
            <BriefcaseIcon className="mr-2 h-5 w-5" />
            Experience
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">
                NATO Cooperative Cyber Defence Centre of Excellence
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">AI Security Research Intern</p>
              <p className="text-stone-500 dark:text-stone-400">Summer 2021</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Developed an AI-driven threat detection system for critical infrastructure protection</li>
                <li>• Implemented machine learning algorithms that improved detection rates by 27%</li>
                <li>• Collaborated with international security experts on AI vulnerability countermeasures</li>
                <li>• Presented research findings at the Centre's quarterly security symposium</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">
                Michigan State University - AI Ethics Lab
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Research Assistant</p>
              <p className="text-stone-500 dark:text-stone-400">2019 - 2022</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Conducted research on bias detection and mitigation in machine learning models</li>
                <li>• Developed Cloud Cards, a visualization tool for identifying bias in dataset labels</li>
                <li>• Published two papers in peer-reviewed conferences on fairness in AI systems</li>
                <li>• Led a team of 3 undergraduate students on dataset diversity initiatives</li>
                <li>• Created educational materials on ethical AI development for computer science courses</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">
                Tech Innovation Labs
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Software Engineering Intern</p>
              <p className="text-stone-500 dark:text-stone-400">Summer 2019</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Developed features for a secure document management system using React and Node.js</li>
                <li>• Implemented encryption protocols for sensitive data storage</li>
                <li>• Conducted security audits and vulnerability assessments</li>
                <li>• Created automated testing suites using Jest and Cypress</li>
              </ul>
            </div>
          </div>
        </motion.section>
        
        {/* Projects Section */}
        <motion.section 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4 flex items-center">
            <CodeIcon className="mr-2 h-5 w-5" />
            Projects
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100">Cloud Cards</h3>
              <p className="text-stone-600 dark:text-amber-200">
                An interactive visualization tool for AI researchers to identify and address bias in dataset labels.
                Frontend built with React and D3.js, backend analytics with Python and TensorFlow.
                Adopted by multiple research institutions for ethical AI development.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100">Secure ML Pipeline Framework</h3>
              <p className="text-stone-600 dark:text-amber-200">
                Open-source framework for creating secure machine learning pipelines with built-in safeguards against
                adversarial attacks and data poisoning. Implements robust validation, anomaly detection, and
                monitoring capabilities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100">Ethical Computing Research Initiative</h3>
              <p className="text-stone-600 dark:text-amber-200">
                Led research examining the ethical implications of AI in decision-making systems.
                Created guidelines and assessment tools for development teams to evaluate potential biases
                and negative impacts of AI applications.
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* Skills Section */}
        <motion.section 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4"
        >
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4 flex items-center">
            <AwardIcon className="mr-2 h-5 w-5" />
            Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">Proficient</h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js", "TensorFlow", 
                  "Cybersecurity", "Machine Learning", "AI Ethics", "Git", "Docker"].map(skill => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-xs text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">Intermediate</h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "C++", "AWS", "Azure", "PyTorch", "GraphQL", "Docker", "Kubernetes", 
                  "SQL", "NoSQL", "CI/CD"].map(skill => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-xs text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Bottom download button - visible on longer resumes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center print:hidden"
      >
        <Button 
          onClick={handleDownloadResume} 
          className="flex items-center mx-auto"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download PDF Résumé
        </Button>
      </motion.div>
    </div>
  );
} 