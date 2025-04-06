"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MailIcon, LinkedinIcon, GithubIcon, CheckCircleIcon, AlertCircleIcon, InstagramIcon } from "lucide-react";
import { Button } from "@/components/Button";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message is too short";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send an email to umuttemel2004@gmail.com
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-amber-200 dark:border-stone-700 shadow-lg"
        >
          <Image
            src="/linkedInpfp.jpeg"
            alt="Umut Temel"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div>
          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-4xl font-bold text-stone-800 dark:text-amber-100 mb-4"
          >
            Get in Touch
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-stone-600 dark:text-amber-200 max-w-2xl"
          >
            I'm always interested in hearing about new opportunities, collaborations, or just connecting with fellow technology enthusiasts. 
            Feel free to reach out using the form below or through any of my direct contact channels.
          </motion.p>
        </div>
      </div>
      
      <div className="md:flex md:gap-12">
        {/* Contact Form */}
        <motion.div 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-2/3 mb-12 md:mb-0"
        >
          <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-6">
              Send a Message
            </h2>
            
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <span>Your message has been sent! I'll get back to you soon.</span>
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex items-center">
                <AlertCircleIcon className="h-5 w-5 mr-2" />
                <span>There was an error sending your message. Please try again.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-stone-700 dark:text-amber-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-amber-100 
                    ${formErrors.name ? 'border-red-500 dark:border-red-400' : 'border-amber-200 dark:border-stone-600'}`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-stone-700 dark:text-amber-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-amber-100 
                    ${formErrors.email ? 'border-red-500 dark:border-red-400' : 'border-amber-200 dark:border-stone-600'}`}
                  placeholder="Your email address"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-stone-700 dark:text-amber-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full p-3 border rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-amber-100 
                    ${formErrors.message ? 'border-red-500 dark:border-red-400' : 'border-amber-200 dark:border-stone-600'}`}
                  placeholder="Your message"
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                {/* Hidden honeypot field to prevent spam */}
                <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />
              </div>
              
              <Button 
                type="submit" 
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </motion.div>
        
        {/* Direct Contact Info */}
        <motion.div 
          {...fadeIn} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:w-1/3"
        >
          <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg border border-amber-200 dark:border-stone-700 sticky top-24">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-6">
              Direct Contact
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">
                  Email
                </h3>
                <a 
                  href="mailto:umuttemel2004@gmail.com" 
                  className="flex items-center text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <MailIcon className="h-5 w-5 mr-2" />
                  umuttemel2004@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">
                  LinkedIn
                </h3>
                <a 
                  href="https://linkedin.com/in/umut-temel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <LinkedinIcon className="h-5 w-5 mr-2" />
                  linkedin.com/in/umut-temel
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">
                  GitHub
                </h3>
                <a 
                  href="https://github.com/utemel02" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <GithubIcon className="h-5 w-5 mr-2" />
                  github.com/utemel02
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-100 mb-2">
                  Instagram
                </h3>
                <a 
                  href="https://www.instagram.com/umut.temelll/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <InstagramIcon className="h-5 w-5 mr-2" />
                  @umut.temelll
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-amber-200 dark:border-stone-700">
              <p className="text-stone-600 dark:text-amber-200 mb-4">
                Looking forward to connecting with you!
              </p>
              <p className="text-stone-600 dark:text-amber-200 text-sm">
                Response time: usually within 24-48 hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 