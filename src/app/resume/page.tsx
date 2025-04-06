"use client";

import React from "react";
import { motion } from "framer-motion";
import { DownloadIcon, BriefcaseIcon, GraduationCapIcon, CodeIcon, AwardIcon, BookOpenIcon } from "lucide-react";
import { Button } from "@/components/Button";

export default function ResumePage() {
  // Handler for downloading résumé PDF
  const handleDownloadResume = () => {
    window.open("/Umut Temel Resume 5.11.pdf", "_blank");
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
            Computer Science Engineering and Supply Chain Management student at Michigan State University with experience in AI consulting,
            undergraduate research, and full-stack development. Strong academic performance with a 3.98 GPA and involvement in student leadership
            as a Resident Assistant. Seeking opportunities to apply technical knowledge in challenging software engineering roles.
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
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University, Broad College of Business</h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Bachelor of Arts, Supply Chain Management</p>
              <p className="text-stone-500 dark:text-stone-400">Expected May 2026</p>
            </div>
            
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">Michigan State University</h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Bachelor of Science, Computer Science Engineering</p>
              <p className="text-stone-500 dark:text-stone-400">Expected May 2026</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Cumulative GPA: 3.98/4.00</li>
                <li>• Dean's List: 4 Semesters</li>
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
                SHAPE/NATO
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">AI Consultant/Intern</p>
              <p className="text-stone-500 dark:text-stone-400">June 2024 - August 2024</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Enhanced the cybersecurity operations by developing and implementing new AI-driven security protocols, resulting in significantly improved overall security measures.</li>
                <li>• Assisted in documenting technical projects, ensuring clear and detailed records, which improved project execution efficiency and facilitated better knowledge transfer within the team.</li>
                <li>• Consulted with division members, offering strategic AI insights to strengthen initiatives, enhancing the effectiveness of cyber strategies and contributing to more robust solutions.</li>
                <li>• Contributed to both technical and management aspects of projects by leveraging AI technologies and participating in project management activities, leading to more cohesive and effective project outcomes.</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">
                Michigan State University
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Undergraduate Research Assistant</p>
              <p className="text-stone-500 dark:text-stone-400">September 2022 - June 2024</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Promoted Computer Science, STEM and Robotics to elementary school students with Prof. Aman Yadav as a part of a team.</li>
                <li>• Researched the ethical problems around computing, and collected data using questionnaires and examined them using Excel.</li>
                <li>• Utilized WordPress to make the website for our lab, increasing exposure to our research and allowed us to share our work easily.</li>
                <li>• Gained knowledge in responsible conduct and professional development through participation in Collaborative Institutional Training Initiative (CITI) and professional development seminar for Research Assistants.</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-amber-400 dark:border-amber-600 pl-4">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-amber-100">
                Michigan State University
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium">Resident Assistant</p>
              <p className="text-stone-500 dark:text-stone-400">August 2023 - Present</p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-amber-200">
                <li>• Managed a floor of 48 residents in a 2500 student community and determined residential student conduct with a focus on academic achievement and community safety.</li>
                <li>• Provided crisis intervention and support in a 2 person team as part of a 24-hour on-call rotation for the 2500 student community.</li>
                <li>• Collaborated with colleagues to program events leveraging our campus partners and university resources leading to a community with genuine intentions and relationships.</li>
                <li>• Helped conduct drills to model the evacuation patterns for the building to improve safety of residents and students.</li>
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
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100">Cloud Cards | Full Stack Developer</h3>
              <p className="text-stone-600 dark:text-amber-200">
                Architected and developed a full-stack digital business card platform using Next.js 13, TypeScript, MongoDB, and NextAuth.js, 
                resulting in a scalable application with seamless NFC-enabled profile sharing and 100+ active users. Implemented comprehensive 
                user features including RESTful APIs for profile management, Stripe payment processing for premium subscriptions, and custom 
                analytics dashboard with Chart.js. Engineered a responsive frontend with Tailwind CSS and Framer Motion animations, incorporating 
                dark mode support and accessibility features, leading to consistent user experience across all devices and increased user retention.
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
                {["Java", "Excel", "Word", "LoggerPro", "Python", "C++", "C#", "HTML/CSS", "SQL", "JavaScript", "TypeScript", "Next.js"].map(skill => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-xs text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">Intermediate</h3>
              <div className="flex flex-wrap gap-2">
                {["SPSS", "Google Cloud", "Google Firebase", "Amazon AWS"].map(skill => (
                  <span key={skill} className="bg-amber-100 dark:bg-stone-700 px-3 py-1 rounded-full text-xs text-stone-700 dark:text-amber-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Activities Section */}
        <motion.section 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4"
        >
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4 flex items-center">
            <BookOpenIcon className="mr-2 h-5 w-5" />
            Activities
          </h2>
          
          <ul className="space-y-2 text-stone-600 dark:text-amber-200">
            <li>• Spartan Hackers, Member (September 2022 - Present)</li>
            <li>• Artificial Intelligence Club, Member (September 2022 - Present)</li>
            <li>• Research Assistant (September 2022 - May 2024)</li>
            <li>• Residential Assistant (September 2023 - Present)</li>
          </ul>
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