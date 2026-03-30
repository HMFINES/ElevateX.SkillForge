const sampleCourses = [
  {
    title: "AI Foundations with Python",
    description:
      "A beginner-friendly ElevateX internal course covering Python basics, prompts, machine learning foundations, and simple AI project building.",
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner",
    provider: "ElevateX",
    duration: "6 hours",
    tags: ["AI", "Python", "ML", "Beginner"],
    isExternal: false,
    badgeText: "Internal Course",
    lessons: [
      {
        lessonId: "ai-1",
        title: "Welcome to AI Foundations",
        description: "Understand how AI tools, models, and workflows fit together.",
        videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
        duration: "18 min",
        order: 1
      },
      {
        lessonId: "ai-2",
        title: "Python for AI Beginners",
        description: "Learn Python essentials you need before moving into machine learning.",
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
        duration: "32 min",
        order: 2
      },
      {
        lessonId: "ai-3",
        title: "Build Your First Mini AI Workflow",
        description: "Connect prompts, logic, and automation into a simple real-world project.",
        videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
        duration: "26 min",
        order: 3
      }
    ]
  },
  {
    title: "Modern Web Development Launchpad",
    description:
      "An ElevateX internal track that helps learners build HTML, CSS, JavaScript, and React confidence through practical projects.",
    category: "Web Dev",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner",
    provider: "ElevateX",
    duration: "7 hours",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    isExternal: false,
    badgeText: "Internal Course",
    lessons: [
      {
        lessonId: "web-1",
        title: "Web Development Roadmap",
        description: "How modern web products are designed, built, and shipped.",
        videoUrl: "https://www.youtube.com/embed/nu_pCVPKzTk",
        duration: "20 min",
        order: 1
      },
      {
        lessonId: "web-2",
        title: "HTML, CSS, and Layout Systems",
        description: "Build strong front-end fundamentals with structure and styling.",
        videoUrl: "https://www.youtube.com/embed/mU6anWqZJcc",
        duration: "30 min",
        order: 2
      },
      {
        lessonId: "web-3",
        title: "JavaScript and React Foundations",
        description: "Move from browser logic to component-based app building.",
        videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
        duration: "34 min",
        order: 3
      }
    ]
  },
  {
    title: "AI Automation Systems Lab",
    description:
      "A premium ElevateX build lab focused on automation architecture, prompt workflows, AI agents, and client-ready delivery systems.",
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    level: "Intermediate",
    provider: "ElevateX Pro",
    duration: "9 hours",
    tags: ["Automation", "AI Agents", "n8n", "Client Systems"],
    isExternal: false,
    access: "pro",
    badgeText: "Pro Lab",
    lessons: [
      {
        lessonId: "auto-1",
        title: "Design an AI Automation Offer",
        description: "Package a real automation service around business pain points and outcomes.",
        videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
        duration: "24 min",
        order: 1
      },
      {
        lessonId: "auto-2",
        title: "Workflow Architecture and Guardrails",
        description: "Map triggers, actions, fallbacks, validation, and monitoring into a safer production flow.",
        videoUrl: "https://www.youtube.com/embed/nu_pCVPKzTk",
        duration: "29 min",
        order: 2
      },
      {
        lessonId: "auto-3",
        title: "Ship a Client-Ready Automation Case Study",
        description: "Turn the system into proof-of-work with a walkthrough, visuals, and business metrics.",
        videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
        duration: "31 min",
        order: 3
      }
    ]
  },
  {
    title: "Coursera AI for Everyone",
    description:
      "A curated external course for learners who want a broad overview of artificial intelligence and business adoption.",
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner",
    provider: "Coursera",
    duration: "Flexible",
    tags: ["Coursera", "AI", "External"],
    isExternal: true,
    externalLink: "https://www.coursera.org/learn/ai-for-everyone",
    badgeText: "Get Certified"
  },
  {
    title: "Udemy Freelancing Accelerator",
    description:
      "An external recommendation for students who want to package their skills, win clients, and launch a freelancing career.",
    category: "Freelancing",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner",
    provider: "Udemy",
    duration: "Flexible",
    tags: ["Udemy", "Freelancing", "External"],
    isExternal: true,
    externalLink: "https://www.udemy.com",
    badgeText: "Get Certified"
  },
  {
    title: "Internshala Business Communication Training",
    description:
      "A business-focused external course recommendation for communication, confidence, and workplace readiness.",
    category: "Business",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    level: "Beginner",
    provider: "Internshala",
    duration: "Flexible",
    tags: ["Internshala", "Business", "External"],
    isExternal: true,
    externalLink: "https://trainings.internshala.com",
    badgeText: "Get Certified"
  }
];

module.exports = sampleCourses;
