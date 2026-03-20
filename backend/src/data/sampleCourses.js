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
