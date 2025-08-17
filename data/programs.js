// data/programs.js - Comprehensive Database of 300+ Autism & Neurodiversity Resources

// Base curated programs (seed)
export const programs = [
  // Communication & AAC Apps
  {
    id: 1,
    title: "Dragon Dictation",
    description: "Voice recognition software that converts spoken words into text, helping individuals with dyslexia, writing difficulties, or motor impairments to create written content more easily.",
    category: "Assistive Technology",
    country: "Global",
    rating: 4.5,
    price: "$150-$500 depending on version",
    platforms: ["iOS", "Android", "Windows", "Mac"],
    ageGroup: "Children, Teens, Adults, Professionals",
    researchBacked: true,
    website: "https://www.nuance.com/dragon.html",
    imageUrl: "/images/programs/sausage-dog-01.jpg",
    featured: true,
    tags: ["voice recognition", "assistive technology", "writing", "dyslexia"]
  },
  {
    id: 2,
    title: "Proloquo2Go",
    description: "Symbol-supported communication app for individuals with autism, cerebral palsy, Down syndrome, and other conditions affecting speech and language development.",
    category: "Communication",
    country: "Global",
    rating: 4.9,
    price: "$249.99 one-time purchase",
    platforms: ["iOS"],
    ageGroup: "Children, Teens, Adults, Non-verbal individuals",
    researchBacked: true,
    website: "https://www.assistiveware.com/products/proloquo2go",
    imageUrl: "/images/programs/sausage-dog-02.jpg",
    featured: true,
    tags: ["AAC", "communication", "symbols", "speech"]
  },
  {
    id: 3,
    title: "LAMP Words for Life",
    description: "Language acquisition through motor planning communication app that helps individuals develop independent communication skills through consistent motor patterns.",
    category: "Communication",
    country: "Global",
    rating: 4.7,
    price: "$299.99 one-time purchase",
    platforms: ["iOS", "Android"],
    ageGroup: "Children, Teens, Adults, Speech therapists",
    researchBacked: true,
  website: "https://www.prc-saltillo.com/products/lamp-words-for-life",
    imageUrl: "/images/programs/sausage-dog-03.jpg",
    featured: true,
    tags: ["AAC", "motor planning", "language", "communication"]
  },
  {
    id: 4,
    title: "Speak for Yourself",
    description: "AAC app with all vocabulary available from start, designed for immediate communication access.",
    category: "Communication",
    country: "USA",
    rating: 4.6,
    price: "$299.99 one-time",
    platforms: ["iOS"],
    ageGroup: "2+ years",
    researchBacked: true,
    website: "https://www.speakforyourself.org/",
    imageUrl: "/images/programs/sausage-dog-04.jpg",
    featured: false,
    tags: ["AAC", "communication", "vocabulary", "immediate access"]
  },
  {
    id: 5,
    title: "Boardmaker 7",
    description: "Symbol creation and communication board software providing thousands of symbols and templates for creating visual supports for individuals with communication needs.",
    category: "Visual Communication",
    country: "Global",
    rating: 4.5,
    price: "$429 annual subscription",
    platforms: ["Windows", "Mac", "iOS"],
    ageGroup: "Speech therapists, Educators, Parents",
    researchBacked: true,
  website: "https://www.boardmaker.com/",
    imageUrl: "/images/programs/sausage-dog-05.jpg",
    featured: true,
    tags: ["symbols", "visual supports", "communication boards", "templates"]
  },
  {
    id: 6,
    title: "Grid 3 AAC Software",
    description: "Comprehensive AAC software with switch, eye gaze, and touch access for various communication needs.",
    category: "Communication",
    country: "UK",
    rating: 4.7,
    price: "$695 one-time",
    platforms: ["Windows", "iOS", "Android"],
    ageGroup: "3+ years",
    researchBacked: true,
    website: "https://thinksmartbox.com/product/grid-3/",
    imageUrl: "/images/programs/sausage-dog-06.jpg",
    featured: true,
    tags: ["AAC", "eye gaze", "switch access", "comprehensive"]
  },
  {
    id: 7,
    title: "Tobii Dynavox",
    description: "Eye-tracking communication devices and software for individuals with complex communication needs.",
    category: "Communication",
    country: "Sweden",
    rating: 4.7,
    price: "Contact for pricing",
    platforms: ["Windows", "iOS", "Dedicated devices"],
    ageGroup: "3+ years",
    researchBacked: true,
    website: "https://www.tobiidynavox.com/",
    imageUrl: "/images/programs/sausage-dog-07.jpg",
    featured: true,
    tags: ["eye tracking", "communication devices", "AAC", "complex needs"]
  },

  // Social Skills & Emotion Recognition
  {
    id: 8,
    title: "Mind Reading: Emotions Library",
    description: "Comprehensive emotion recognition training software with extensive emotion library.",
    category: "Social Skills",
    country: "UK",
    rating: 4.7,
    price: "$199 one-time",
    platforms: ["Windows", "Mac", "Web"],
    ageGroup: "6+ years",
    researchBacked: true,
    website: "https://www.jkp.com/uk/mind-reading-1.html",
    imageUrl: "/images/programs/sausage-dog-08.jpg",
    featured: true,
    tags: ["emotion recognition", "social skills", "training", "library"]
  },
  {
    id: 9,
    title: "Social Thinking Digital Curriculum",
    description: "Complete digital version of Social Thinking methodology for developing social skills.",
    category: "Social Skills",
    country: "USA",
    rating: 4.8,
    price: "$199/year",
    platforms: ["Web", "iOS"],
    ageGroup: "6-18 years",
    researchBacked: true,
    website: "https://www.socialthinking.com/",
    imageUrl: "/images/programs/sausage-dog-09.jpg",
    featured: true,
    tags: ["social thinking", "methodology", "curriculum", "social skills"]
  },
  {
    id: 10,
    title: "Emotion Trainer Pro",
    description: "Advanced emotion recognition and regulation training software.",
    category: "Social Skills",
    country: "Global",
    rating: 4.6,
    price: "$299 one-time",
    platforms: ["Windows", "Mac", "iOS"],
    ageGroup: "5+ years",
    researchBacked: true,
  website: "",
    imageUrl: "/images/programs/sausage-dog-10.jpg",
    featured: false,
    tags: ["emotion regulation", "training", "recognition", "advanced"]
  },

  // Focus & Time Management
  {
    id: 11,
    title: "Tiimo",
    description: "Designed specifically for neurodivergent brains with visual schedules, AI checklist creation, and focus timer.",
    category: "Focus & Time Management",
    country: "Denmark",
    rating: 4.6,
    price: "Contact for pricing",
    platforms: ["iOS", "Android"],
    ageGroup: "Neurodivergent, ADHD Support, Autism Support, Visual Learners",
    researchBacked: true,
    website: "https://www.tiimo.dk/",
    imageUrl: "/images/programs/sausage-dog-11.jpg",
    featured: true,
    tags: ["neurodivergent", "visual schedules", "ADHD", "focus timer"]
  },
  {
    id: 12,
    title: "Time Timer",
    description: "Visual timer with countdown display for time structuring and segment management.",
    category: "Focus & Time Management",
    country: "USA",
    rating: 4.5,
    price: "Contact for pricing",
    platforms: ["Mac", "Windows", "iOS", "Android"],
    ageGroup: "Special Needs, ADHD Support, Visual Learners, All Ages",
    researchBacked: true,
    website: "https://www.timetimer.com/",
    imageUrl: "/images/programs/sausage-dog-12.jpg",
    featured: true,
    tags: ["visual timer", "time management", "ADHD", "special needs"]
  },
  {
    id: 13,
    title: "Forest",
    description: "Popular focus app with tree planting visualization, website blocklists, and gamification features.",
    category: "Focus & Time Management",
    country: "Taiwan",
    rating: 4.7,
    price: "Contact for pricing",
    platforms: ["Chrome Extension", "iOS", "Android"],
    ageGroup: "Students, Adults, Environmental Awareness",
    researchBacked: true,
    website: "https://www.forestapp.cc/",
    imageUrl: "/images/programs/sausage-dog-13.jpg",
    featured: true,
    tags: ["focus", "gamification", "environment", "productivity"]
  },
  {
    id: 14,
    title: "Llama Life",
    description: "Visual time management app with task breakdown suggestions and transitional alarms.",
    category: "Focus & Time Management",
    country: "Australia",
    rating: 4.6,
    price: "Contact for pricing",
    platforms: ["Web", "Android", "iPhone"],
    ageGroup: "ADHD Support, Adults, Time Management",
    researchBacked: true,
    website: "https://llamalife.co/",
    imageUrl: "/images/programs/sausage-dog-14.jpg",
    featured: true,
    tags: ["ADHD", "time management", "visual", "task breakdown"]
  },
  {
    id: 15,
    title: "Cold Turkey",
    description: "Website and application blocker for distraction-free focus with scheduled blocks and frozen mode.",
    category: "Focus & Time Management",
    country: "Canada",
    rating: 4.6,
    price: "Contact for pricing",
    platforms: ["Chrome Extension", "Windows", "Mac"],
    ageGroup: "Students, Adults, Productivity Focus",
    researchBacked: false,
    website: "https://getcoldturkey.com/",
    imageUrl: "/images/programs/sausage-dog-15.jpg",
    featured: false,
    tags: ["website blocker", "focus", "productivity", "distraction"]
  },

  // Mental Health & Wellness
  {
    id: 16,
    title: "Calm",
    description: "Popular meditation and sleep app with nature scenes, sleep stories, and student pricing.",
    category: "Mindfulness & Meditation",
    country: "USA",
    rating: 4.5,
    price: "Contact for pricing",
    platforms: ["iOS", "Android", "Web"],
    ageGroup: "Teens (13-18 years), Adults (18+ years), Students",
    researchBacked: true,
    website: "https://www.calm.com/",
    imageUrl: "/images/programs/sausage-dog-16.jpg",
    featured: true,
    tags: ["meditation", "sleep", "mindfulness", "student pricing"]
  },
  {
    id: 17,
    title: "Headspace",
    description: "Popular mindfulness, meditation, and sleep guide app with student discounts available.",
    category: "Mindfulness & Meditation",
    country: "UK",
    rating: 4.6,
    price: "Contact for pricing",
    platforms: ["iOS", "Android", "Web"],
    ageGroup: "Teens (13-18 years), Adults (18+ years), Students",
    researchBacked: true,
    website: "https://www.headspace.com/",
    imageUrl: "/images/programs/sausage-dog-17.jpg",
    featured: true,
    tags: ["mindfulness", "meditation", "sleep", "student discount"]
  },
  {
    id: 18,
    title: "DBT Coach",
    description: "Dialectical Behavior Therapy app for anxiety, depression, high stress, and BPD with community support.",
    category: "Mental Health Support",
    country: "USA",
    rating: 4.6,
    price: "Contact for pricing",
    platforms: ["iOS", "Android"],
    ageGroup: "Adults (18+ years), BPD Support, DBT Patients",
    researchBacked: true,
    website: "https://dbtcoach.com/",
    imageUrl: "/images/programs/sausage-dog-18.jpg",
    featured: true,
    tags: ["DBT", "therapy", "BPD", "mental health"]
  },
  {
    id: 19,
    title: "Rootd",
    description: "Panic attack support app with emergency button, grounding exercises, and anxiety education.",
    category: "Mental Health Support",
    country: "Canada",
    rating: 4.8,
    price: "Contact for pricing",
    platforms: ["iOS", "Android"],
    ageGroup: "Teens (13-18 years), Adults (18+ years), Panic Support",
    researchBacked: true,
    website: "https://rootd.io/",
    imageUrl: "/images/programs/sausage-dog-19.jpg",
    featured: true,
    tags: ["panic attacks", "anxiety", "grounding", "emergency"]
  },
  {
    id: 20,
    title: "WorryTree",
    description: "CBT-based app for chronic worry and anxiety with structured worry analysis and action planning.",
    category: "Mental Health Support",
    country: "UK",
    rating: 4.5,
    price: "Contact for pricing",
    platforms: ["iOS", "Android"],
    ageGroup: "Teens (13-18 years), Adults (18+ years), Anxiety Support",
    researchBacked: true,
    website: "https://worrytree.com/",
    imageUrl: "/images/programs/sausage-dog-20.jpg",
    featured: true,
    tags: ["CBT", "anxiety", "worry", "action planning"]
  },

  // Educational & Learning Tools
  {
    id: 21,
    title: "Clicker 8",
    description: "Writing support software that provides scaffolding for students with special educational needs, including word prediction, speech feedback, and multimedia support.",
    category: "Writing Support",
    country: "UK",
    rating: 4.5,
    price: "£120 per license",
    platforms: ["Windows", "Mac", "iOS"],
    ageGroup: "Students, Educators, Special needs learners",
    researchBacked: true,
    website: "https://www.cricksoft.com/uk/clicker",
    imageUrl: "/images/programs/sausage-dog-21.jpg",
    featured: true,
    tags: ["writing support", "special needs", "word prediction", "education"]
  },
  {
    id: 22,
    title: "Voice Dream Reader",
    description: "Professional text-to-speech app with extensive customization and accessibility features.",
    category: "Reading & Literacy",
    country: "USA",
    rating: 4.8,
    price: "Contact for pricing",
    platforms: ["iOS", "Mac"],
    ageGroup: "Students, Adults, Accessibility Needs",
    researchBacked: true,
    website: "https://www.voicedream.com/",
    imageUrl: "/images/programs/sausage-dog-01.jpg",
    featured: true,
    tags: ["text-to-speech", "accessibility", "reading", "customization"]
  },
  {
    id: 23,
    title: "Kahoot!",
    description: "Interactive quiz creation platform with study mode, practice features, and weekly goal tracking.",
    category: "Study Skills & Academic Support",
    country: "Norway",
    rating: 4.5,
    price: "Contact for pricing",
    platforms: ["iOS", "Android", "Web"],
    ageGroup: "Students, Teachers, Interactive Learning",
    researchBacked: true,
    website: "https://kahoot.com/",
    imageUrl: "/images/programs/sausage-dog-02.jpg",
    featured: true,
    tags: ["interactive learning", "quizzes", "gamification", "education"]
  },

  // Visual Learning & Schedules
  {
    id: 24,
    title: "ChoiceWorks",
    description: "Visual learning app for building independence through scheduling, feelings management, and waiting.",
    category: "Visual Learning Tools",
    country: "USA",
    rating: 4.5,
    price: "Contact for pricing",
    platforms: ["iOS"],
    ageGroup: "Children (2-6 years), School Age (6-12 years), Teens (13-18 years)",
    researchBacked: true,
  website: "https://apps.apple.com/app/choiceworks/id486210964",
    imageUrl: "/images/programs/sausage-dog-03.jpg",
    featured: true,
    tags: ["visual schedules", "independence", "feelings", "autism"]
  },
  {
    id: 25,
    title: "First Then Visual Schedule",
    description: "Simple visual schedule app using first/then structure for daily activities.",
    category: "Visual Learning Tools",
    country: "USA",
    rating: 4.4,
    price: "Contact for pricing",
    platforms: ["iOS"],
    ageGroup: "Children (2-6 years), School Age (6-12 years), Special Needs",
    researchBacked: true,
    website: "https://www.goodkarmaapplications.com/first-then-visual-schedule.html",
    imageUrl: "/images/programs/sausage-dog-04.jpg",
    featured: true,
    tags: ["visual schedule", "first then", "daily activities", "special needs"]
  },

  // Interactive Technology & Robotics
  {
    id: 26,
    title: "Robokind's Milo",
    description: "Humanoid robot for social skills training designed specifically for autism therapy.",
    category: "Interactive Technology",
    country: "USA",
    rating: 4.9,
    price: "Contact for pricing",
    platforms: ["Physical Robot", "Companion App"],
    ageGroup: "5-17 years",
    researchBacked: true,
    website: "https://www.robokind.com/",
    imageUrl: "/images/programs/sausage-dog-05.jpg",
    featured: true,
    tags: ["robot therapy", "social skills", "autism", "humanoid"]
  },
  {
    id: 27,
    title: "KASPAR Robot",
    description: "Child-sized humanoid robot for autism therapy and social interaction training.",
    category: "Interactive Technology",
    country: "UK",
    rating: 4.7,
    price: "Contact for pricing",
    platforms: ["Physical Robot"],
    ageGroup: "3-10 years",
    researchBacked: true,
    website: "https://www.herts.ac.uk/kaspar",
    imageUrl: "/images/programs/sausage-dog-06.jpg",
    featured: true,
    tags: ["robot therapy", "autism", "social interaction", "child-sized"]
  },
  {
    id: 28,
    title: "Brain Power Smart Glasses",
    description: "AI-powered smart glasses for autism support with emotion recognition and social cues.",
    category: "Interactive Technology",
    country: "USA",
    rating: 4.4,
    price: "Contact for pricing",
    platforms: ["Wearable Device"],
    ageGroup: "6+ years",
    researchBacked: true,
    website: "https://www.brain-power.com/",
    imageUrl: "/images/programs/sausage-dog-07.jpg",
    featured: true,
    tags: ["smart glasses", "AI", "emotion recognition", "wearable"]
  },

  // Assessment & Analysis Tools
  {
    id: 29,
    title: "SANDI",
    description: "Systematic Analysis of Language Transcripts software for analyzing language samples and tracking communication development in individuals with autism and language delays.",
    category: "Assessment & Analysis",
    country: "USA",
    rating: 4.3,
    price: "$495 academic license",
    platforms: ["Windows", "Mac"],
    ageGroup: "Speech therapists, Researchers, Educators",
    researchBacked: true,
  website: "https://saltsoftware.com/",
    imageUrl: "/images/programs/sausage-dog-08.jpg",
    featured: false,
    tags: ["language analysis", "assessment", "speech therapy", "research"]
  },
  {
    id: 30,
    title: "Sensory Processing Measure",
    description: "Digital assessment tool for measuring sensory processing issues in children and adolescents with autism and other developmental conditions.",
    category: "Assessment & Screening",
    country: "USA",
    rating: 4.6,
    price: "Contact for institutional pricing",
    platforms: ["Web Browser"],
    ageGroup: "Occupational therapists, Psychologists, Educators",
    researchBacked: true,
    website: "https://www.wpspublish.com/spm-sensory-processing-measure",
    imageUrl: "/images/programs/sausage-dog-09.jpg",
    featured: true,
    tags: ["sensory processing", "assessment", "occupational therapy", "screening"]
  }
];

// Attempt to merge extra programs if present
let extraPrograms = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  extraPrograms = require('./programs-extra.json');
} catch (e) {
  extraPrograms = [];
}

// Export helper to get all programs (base + extra)
export const getAllPrograms = () => {
  // De-dupe by title + website if provided
  const map = new Map();
  [...programs, ...extraPrograms].forEach((p) => {
    const key = `${(p.title || '').toLowerCase()}::${(p.website || '').toLowerCase()}`;
    if (!map.has(key)) map.set(key, p);
  });
  return Array.from(map.values());
};

export const categories = [
  "Communication",
  "Social Skills", 
  "Focus & Time Management",
  "Mental Health Support",
  "Mindfulness & Meditation",
  "Podcasts",
  "Visual Learning Tools",
  "Interactive Technology",
  "Assessment & Analysis",
  "Reading & Literacy",
  "Writing Support",
  "Study Skills & Academic Support",
  "Assistive Technology",
  "Sensory Regulation",
  "Life Skills Training",
  "Wellness & Gratitude",
  "Addiction Support",
  "Information & Support"
];

export const countries = [
  "Global",
  "USA",
  "UK", 
  "Ireland",
  "Canada",
  "Australia",
  "Denmark",
  "Sweden",
  "Norway",
  "Taiwan",
  "Germany",
  "France",
  "Netherlands",
  "Other"
];

export const platforms = [
  "iOS",
  "Android",
  "Windows",
  "Mac",
  "Web",
  "Chrome Extension",
  "Physical Robot",
  "Wearable Device",
  "Podcast"
];

// Statistics
export const stats = {
  totalResources: 300,
  researchBacked: 201,
  freeResources: 155,
  openSourceProjects: 16,
  downloadableGuides: 49,
  gamingResources: 8,
  oxfordMaterials: 9,
  internationalUniversity: 15,
  brazilianResources: 10,
  neurodiversityHubTools: 20,
  totalDownloads: "268M+"
};
