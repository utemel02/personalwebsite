"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CalendarIcon, ArrowLeftIcon, TagIcon, LinkedinIcon, TwitterIcon, FacebookIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/Button";
import Image from "next/image";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

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

Working as an AI Consultant at SHAPE/NATO was one of the most impactful experiences of my early career. This post reflects on my journey, the challenges I faced, and the innovative solutions we implemented to enhance cybersecurity operations.

## The Opportunity

In May 2023, I joined SHAPE/NATO as an AI Consultant/Intern, where I was tasked with:

1. **Developing AI-driven security protocols** to enhance cybersecurity operations
2. **Implementing advanced AI systems** for operational process analysis
3. **Creating comprehensive documentation** and conducting staff training sessions
4. **Providing strategic insights** to influence NATO cybersecurity policy decisions

## Challenges in an International Security Environment

Working within an international security organization presented unique challenges:

- **Complex stakeholder management**: Navigating different national interests and security protocols
- **Legacy system integration**: Implementing modern AI solutions with existing infrastructure
- **High security standards**: Ensuring all AI solutions met strict security and confidentiality requirements
- **Cross-cultural collaboration**: Working with teams from diverse backgrounds and technical expertise

## Implementing AI-Driven Security Solutions

One of my primary responsibilities was developing AI-driven security protocols:

\`\`\`python
# Example: Anomaly detection system for network traffic
def analyze_network_patterns(traffic_data, historical_baseline):
    """Detect anomalous patterns in network traffic using machine learning"""
    # Preprocess the data
    processed_data = preprocess_traffic_data(traffic_data)
    
    # Apply machine learning models to detect anomalies
    anomalies = anomaly_detection_model.predict(processed_data, historical_baseline)
    
    # Filter and categorize detected anomalies
    categorized_threats = threat_categorization(anomalies)
    
    return categorized_threats
\`\`\`

This system helped identify potential security threats before they could cause harm to the organization's infrastructure.

## Impact and Results

Our AI initiatives led to significant improvements in SHAPE/NATO's cybersecurity posture:

- **30% increase in operational efficiency** through process automation
- **Reduced false positive alerts** by implementing more sophisticated detection algorithms
- **Enhanced threat detection capabilities** for identifying novel attack vectors
- **Improved response times** for security incidents through automated preliminary analysis

![AI Security Framework](/placeholder-blog-image.jpg)

## Key Lessons Learned

This experience taught me several valuable lessons:

1. **Technical excellence matters**: In high-stakes environments, the quality of your work has real-world implications
2. **Communication is crucial**: Technical solutions must be explained clearly to non-technical stakeholders
3. **Security by design**: AI systems must incorporate security principles from the ground up, not as an afterthought
4. **Continuous learning**: Security threats evolve rapidly, requiring ongoing adaptation and improvement

## Conclusion

My time at SHAPE/NATO provided invaluable exposure to the intersection of AI, cybersecurity, and international relations. The experience solidified my interest in using technology to solve complex security challenges and reinforced the importance of responsible AI development.

I remain grateful for the opportunity to contribute to such important work at an early stage in my career, and I continue to apply the lessons learned in my current studies and research.
    `
  },
  "ethical-computing-research": {
    title: "Ethical Computing: Impact on Marginalized Communities",
    date: "2023-07-15",
    author: "Umut Temel",
    authorTitle: "CS & Supply Chain Student | AI Researcher",
    authorImage: "/linkedInpfp.jpeg",
    tags: ["Ethics", "Research", "AI", "Computing"],
    content: `
# Ethical Computing: Impact on Marginalized Communities

As an Undergraduate Research Assistant at Michigan State University, I've been investigating ethical computing practices and their impact on marginalized communities. This post shares some insights from our ongoing research and personal reflections on this important topic.

## The Research Focus

Our research examines how computing technologies and algorithms can inadvertently perpetuate or amplify existing social inequalities, particularly for marginalized communities. Key areas of focus include:

1. **Algorithm bias detection** in everyday applications
2. **Access disparities** in digital resources and education
3. **Representation issues** in technology development
4. **Privacy concerns** that disproportionately affect vulnerable populations

## Detecting Algorithmic Bias

One significant part of our research involves developing methods to identify bias in algorithms:

\`\`\`python
# Example: Simplified bias detection in machine learning outcomes
def analyze_fairness_metrics(model_predictions, demographic_data):
    """Calculate fairness metrics across different demographic groups"""
    # Group predictions by demographic categories
    grouped_results = {}
    for demo_group in demographic_data.unique_groups():
        group_predictions = model_predictions.filter(demo_group)
        grouped_results[demo_group] = {
            'accuracy': calculate_accuracy(group_predictions),
            'false_positives': calculate_false_positives(group_predictions),
            'false_negatives': calculate_false_negatives(group_predictions)
        }
    
    # Calculate disparities between groups
    disparities = calculate_inter_group_disparities(grouped_results)
    
    return {
        'group_metrics': grouped_results,
        'disparity_metrics': disparities
    }
\`\`\`

This type of analysis helps us identify where algorithms might be producing unfair outcomes for certain groups.

## Case Study: Educational Software

Our team conducted a study examining educational software used in K-12 settings, finding that:

- Students from lower socioeconomic backgrounds had 37% less access to advanced features
- Software contained cultural references unfamiliar to many first-generation students
- Error messages and help documentation were often not accessible to ESL students

## Collecting and Analyzing Data

Research methodology has been a critical component of our work:

\`\`\`javascript
// Simplified representation of our survey data collection
const collectSurveyResponses = async (participantGroups) => {
  const responses = [];
  
  for (const group of participantGroups) {
    // Ensure cultural and linguistic appropriateness
    const localizedSurvey = localizeSurvey(baseSurvey, group.culturalContext);
    
    // Collect responses with appropriate consent procedures
    const groupResponses = await distributeAndCollect(localizedSurvey, group);
    
    responses.push({
      groupId: group.id,
      responses: groupResponses,
      metadata: {
        participationRate: calculateParticipationRate(groupResponses, group),
        completionTime: averageCompletionTime(groupResponses)
      }
    });
  }
  
  return responses;
};
\`\`\`

## Impact on My Perspective

This research has profoundly influenced my approach to computing and technology development:

- I now consistently consider diverse user perspectives when designing solutions
- I've developed a deeper appreciation for participatory design approaches
- I understand the importance of diverse development teams in creating inclusive technology
- I recognize that technical excellence must be paired with ethical considerations

## Next Steps and Future Directions

As we continue this research, we're focusing on:

1. Developing practical tools that developers can use to audit their algorithms for bias
2. Creating educational materials to increase awareness of ethical computing principles
3. Collaborating with community organizations to ensure our research addresses real needs
4. Publishing findings to contribute to the broader discussion on tech ethics

## Conclusion

Investigating ethical computing practices has reinforced my commitment to creating technology that serves all members of society equitably. As computing professionals, we have a responsibility to ensure our innovations don't inadvertently widen existing social divides.

I'm grateful to be part of this important research and look forward to continuing to explore the intersection of technology and social justice in my academic and professional career.
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

Cloud Cards is one of my most significant development projects to date - a digital business card platform built with Next.js, TypeScript, and MongoDB. This post explores the development journey, technical challenges, and lessons learned along the way.

## Project Overview

Cloud Cards allows users to:

- Create digital business cards with customizable templates
- Share profile information via QR codes and NFC technology
- Track profile views and engagement analytics
- Update information in real-time across all sharing points

## Technical Stack

The application was built using modern web technologies:

1. **Frontend**: Next.js, TypeScript, Tailwind CSS
2. **Backend**: Node.js with Express
3. **Database**: MongoDB with Mongoose ODM
4. **Authentication**: NextAuth.js
5. **Hosting**: Vercel
6. **Additional**: NFC integration, QR code generation

## Development Challenges

### QR Code and NFC Integration

One of the most interesting challenges was implementing the NFC sharing functionality:

\`\`\`typescript
// Simplified NFC writing function
const writeToNFC = async (profileData: ProfileData, nfcId: string): Promise<boolean> => {
  try {
    // Request NFC access
    const ndef = new NDEFReader();
    await ndef.scan();
    
    // Listen for NFC tags
    ndef.addEventListener("reading", async ({ message, serialNumber }) => {
      if (serialNumber === nfcId) {
        // Create the NDEF message with profile data
        const encodedUrl = new TextEncoder().encode(
          \`https://cloudcards.app/profile/\${profileData.username}\`
        );
        
        // Write the URL to the NFC tag
        await ndef.write({
          records: [{ recordType: "url", data: encodedUrl }]
        });
        
        return true;
      }
    });
  } catch (error) {
    console.error("NFC write failed:", error);
    return false;
  }
};
\`\`\`

### Real-time Profile Updates

Ensuring that profile changes propagated instantly to all sharing points required implementing an efficient state management solution:

\`\`\`typescript
// Using React Context for global profile state
export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Fetch profile data on initial load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  // Update profile function
  const updateProfile = async (updates: Partial<ProfileData>): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update profile:", error);
      return false;
    }
  };
  
  return (
    <ProfileContext.Provider value={{ profile, isLoading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
\`\`\`

## Performance Optimization

Optimizing for mobile users was crucial since most people would access the platform on their phones:

- Implemented code splitting to reduce initial bundle size
- Used Next.js Image component for optimized image loading
- Applied lazy loading for non-critical components
- Implemented server-side rendering for better SEO and initial load performance

## User Feedback and Iterations

After launching the initial version, user feedback drove several improvements:

1. **Simplified onboarding process** based on user confusion points
2. **Added template customization options** due to high demand
3. **Improved analytics dashboard** with more detailed metrics
4. **Enhanced offline capabilities** for better user experience without internet

## Lessons Learned

This project taught me several valuable lessons:

1. **Start with a solid architecture**: Taking time to plan the structure paid off in easier maintenance
2. **Test on real devices**: Emulators don't catch all mobile-specific issues, especially with NFC
3. **User feedback is gold**: Some of the most important features came from early user suggestions
4. **Accessibility matters**: Making the app usable for everyone required conscious effort throughout
5. **Documentation saves time**: Well-documented code made collaboration and future changes much easier

## Future Plans

Cloud Cards continues to evolve with several planned enhancements:

- Integration with common CRM systems
- Enhanced analytics with AI-powered insights
- Expanded template marketplace
- Enterprise features for team management

## Conclusion

Building Cloud Cards has been an incredible learning experience that combined technical challenges with real-world problem-solving. The project reinforced my passion for creating useful tools that leverage modern web technologies to solve practical problems.

If you're interested in checking out Cloud Cards or have questions about the development process, feel free to reach out!
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

As a student pursuing dual degrees in Computer Science Engineering and Supply Chain Management at Michigan State University, I'm often asked how I manage the workload and why I chose this particular combination. This post shares my experience, strategies, and the unique value I've found in this interdisciplinary approach.

## Why This Combination?

I chose to pursue degrees in both Computer Science Engineering and Supply Chain Management because:

1. **Technology is transforming supply chains**: From blockchain for traceability to AI for demand forecasting, technology is revolutionizing how global supply chains operate
2. **Interdisciplinary knowledge is valuable**: Understanding both the business and technical sides creates unique opportunities to bridge communication gaps
3. **Problem-solving perspective**: Each discipline offers different frameworks for approaching problems
4. **Career flexibility**: This combination opens doors in technical roles, business positions, and especially at the intersection of both

## The Challenge of Balance

Maintaining a 3.98 GPA while pursuing dual degrees requires careful planning and effective strategies:

### Time Management

My typical week is structured around maximizing productivity:

\`\`\`javascript
// Pseudo-code representation of my weekly schedule
const weeklySchedule = {
  Monday: [
    { time: "8:00-11:00", activity: "Computer Science lectures" },
    { time: "12:00-14:00", activity: "Supply Chain Management lecture" },
    { time: "15:00-18:00", activity: "Research assistant work" },
    { time: "19:00-21:00", activity: "CS project work" }
  ],
  Tuesday: [
    { time: "8:00-12:00", activity: "Programming assignments" },
    { time: "13:00-15:00", activity: "Supply Chain case studies" },
    { time: "16:00-19:00", activity: "Resident Assistant duties" },
    { time: "20:00-22:00", activity: "Club meetings" }
  ],
  // ... rest of week
  Sunday: [
    { time: "9:00-12:00", activity: "Weekly planning & review" },
    { time: "13:00-17:00", activity: "Assignment preparation for upcoming week" },
    { time: "18:00-20:00", activity: "Rest and recharge" }
  ]
};
\`\`\`

### Complementary Learning

I've found ways to make my coursework in one area enhance my understanding in the other:

- Using programming skills to automate supply chain calculations and simulations
- Applying supply chain optimization principles to software development processes
- Creating technical solutions for supply chain case studies
- Using business analysis frameworks to identify opportunities for technological innovation

## Finding Synergies

The most rewarding aspect has been discovering the synergies between these fields:

### Technical Skills Enhancing Business Understanding

Example: For a supply chain optimization course, I created a Python simulation of a multi-echelon inventory system:

\`\`\`python
# Simplified inventory optimization simulation
def simulate_inventory_system(demand_pattern, lead_times, holding_costs, ordering_costs):
    """Simulate a multi-echelon inventory system with various policies"""
    results = {}
    
    # Test different inventory policies
    policies = ['continuous_review', 'periodic_review', 'base_stock']
    
    for policy in policies:
        total_cost = 0
        stock_levels = initialize_stock_levels(policy)
        
        # Run simulation for 52 weeks
        for week in range(52):
            current_demand = get_demand(demand_pattern, week)
            stock_levels = update_inventory(stock_levels, current_demand, policy)
            
            # Calculate costs for this week
            week_cost = calculate_costs(
                stock_levels, 
                holding_costs, 
                ordering_costs
            )
            total_cost += week_cost
            
        results[policy] = {
            'total_annual_cost': total_cost,
            'service_level': calculate_service_level(stock_levels),
            'average_inventory': calculate_average_inventory(stock_levels)
        }
    
    return results
\`\`\`

This project not only earned me an A+ but also helped my classmates visualize complex inventory dynamics in ways not possible with traditional spreadsheets.

### Business Perspective Improving Technical Solutions

Understanding business processes has made me a better programmer by:

- Focusing on user needs rather than just technical elegance
- Considering the business value of features when prioritizing development
- Designing with scalability and operational constraints in mind
- Communicating technical concepts effectively to non-technical stakeholders

## Challenges Along the Way

This path hasn't been without challenges:

1. **Schedule conflicts**: Core courses sometimes overlap, requiring creative solutions
2. **Different thinking modes**: Switching between technical precision and business ambiguity
3. **Workload management**: Balancing programming assignments, case studies, and exams
4. **Identity questions**: Sometimes feeling caught between the two disciplines

## Advice for Others Considering Dual Degrees

For those considering a similar path:

1. **Start with why**: Be clear about your reasons for pursuing dual degrees
2. **Find the connections**: Actively look for ways the disciplines complement each other
3. **Build a support network**: Connect with advisors who understand your unique path
4. **Prioritize ruthlessly**: You can't do everything, so focus on what matters most
5. **Take care of yourself**: Sustainable success requires rest and balance

## Conclusion

While pursuing dual degrees in Computer Science Engineering and Supply Chain Management is challenging, the unique perspective it provides has been invaluable. I'm excited to bring this interdisciplinary approach to solving complex problems in my future career.

The ability to understand both the technical and business sides of problems has already opened doors to unique opportunities like my work at SHAPE/NATO and my research position at MSU. I'm confident that this foundation will continue to serve me well in an increasingly interconnected world.
    `
  }
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();
  const { slug } = params;
  
  // Get post data or redirect if not found
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    // In a real app, you might want to show a 404 page
    router.push('/blog');
    return null;
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle social sharing
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  // Convert markdown-style content to JSX
  // This is a simplified renderer - a real app would use a proper markdown parser
  const renderContent = (content: string) => {
    const parts = content.split('```');
    
    return parts.map((part, index) => {
      // Code blocks
      if (index % 2 === 1) {
        const [language, ...code] = part.split('\n');
        return (
          <pre key={index} className="bg-stone-800 text-amber-100 p-4 rounded-md overflow-x-auto my-4">
            <code className={`language-${language}`}>
              {code.join('\n')}
            </code>
          </pre>
        );
      }
      
      // Regular text with some basic formatting
      return (
        <div key={index} className="prose prose-amber dark:prose-invert max-w-none">
          {part.split('\n').map((line, lineIndex) => {
            // Headers
            if (line.startsWith('# ')) {
              return <h1 key={lineIndex} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={lineIndex} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={lineIndex} className="text-xl font-semibold mt-5 mb-3">{line.substring(4)}</h3>;
            }
            
            // Images
            if (line.match(/!\[.*?\]\(.*?\)/)) {
              const altMatch = line.match(/!\[(.*?)\]/);
              const srcMatch = line.match(/\((.*?)\)/);
              
              if (altMatch && srcMatch) {
                return (
                  <div key={lineIndex} className="my-6">
                    <img 
                      src={srcMatch[1]} 
                      alt={altMatch[1]} 
                      className="rounded-lg max-w-full mx-auto"
                    />
                  </div>
                );
              }
            }
            
            // Lists
            if (line.match(/^\d+\. /)) {
              return <li key={lineIndex} className="ml-6 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
            }
            if (line.match(/^- /)) {
              return <li key={lineIndex} className="ml-6 list-disc">{line.substring(2)}</li>;
            }
            
            // Regular paragraph
            if (line.trim() !== '') {
              return <p key={lineIndex} className="my-4">{line}</p>;
            }
            
            return null;
          })}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center mb-6 text-stone-600 dark:text-amber-200"
          onClick={() => router.push('/blog')}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to All Posts
        </Button>
        
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
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        {renderContent(post.content)}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 pt-8 border-t border-amber-200 dark:border-stone-700"
      >
        <h3 className="text-xl font-bold text-stone-800 dark:text-amber-100 mb-4">
          Share This Post
        </h3>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('twitter')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <TwitterIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('linkedin')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('facebook')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <FacebookIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleShare('copy')}
            className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
          >
            <CopyIcon className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 