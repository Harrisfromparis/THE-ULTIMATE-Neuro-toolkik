// tools/generate-more-programs.js
// Creates additional autism support programs to reach 300 total

const fs = require('fs');
const path = require('path');

const EXTRA_FILE = path.join(__dirname, '..', 'data', 'programs-extra.json');

// Additional autism support programs to reach 300 total
const additionalPrograms = [
  // Communication & AAC Apps (continued)
  {
    id: 1002,
    title: "TouchChat HD",
    description: "Comprehensive AAC app with word prediction and phrase storage for individuals with autism and communication challenges.",
    category: "Communication",
    country: "USA",
    rating: 4.7,
    price: "$149.99",
    platforms: ["iOS"],
    ageGroup: "Children, Teens, Adults",
    researchBacked: true,
    website: "https://www.prentrom.com/touchchat",
    imageUrl: "/images/programs/sausage-dog-02.jpg",
    featured: true,
    tags: ["AAC", "communication", "word prediction", "autism"]
  },
  {
    id: 1003,
    title: "Avaz AAC",
    description: "Picture and text-based communication app designed for non-verbal individuals with autism.",
    category: "Communication",
    country: "India",
    rating: 4.5,
    price: "$79.99",
    platforms: ["iOS", "Android"],
    ageGroup: "Children, Teens, Adults",
    researchBacked: true,
    website: "https://www.avazapp.com",
    imageUrl: "/images/programs/sausage-dog-03.jpg",
    featured: false,
    tags: ["AAC", "communication", "pictures", "non-verbal"]
  },
  {
    id: 1004,
    title: "ISAAC Communication",
    description: "International Society for Augmentative and Alternative Communication resources and training materials.",
    category: "Communication",
    country: "Global",
    rating: 4.8,
    price: "Free",
    platforms: ["Web"],
    ageGroup: "Professionals, Therapists",
    researchBacked: true,
    website: "https://www.isaac-online.org",
    imageUrl: "/images/programs/sausage-dog-04.jpg",
    featured: true,
    tags: ["ISAAC", "AAC", "training", "professional"]
  },
  {
    id: 1005,
    title: "Pictello",
    description: "Story creation app using pictures, text, and audio for individuals with autism to practice communication.",
    category: "Communication",
    country: "USA",
    rating: 4.6,
    price: "$18.99",
    platforms: ["iOS"],
    ageGroup: "Children, Teens",
    researchBacked: true,
    website: "https://www.assistiveware.com/products/pictello",
    imageUrl: "/images/programs/sausage-dog-05.jpg",
    featured: false,
    tags: ["stories", "communication", "pictures", "autism"]
  },
  // Social Skills & Emotion Recognition (continued)
  {
    id: 1006,
    title: "Zones of Regulation",
    description: "Self-regulation curriculum helping individuals identify emotions and develop coping strategies.",
    category: "Social Skills",
    country: "USA",
    rating: 4.9,
    price: "$29.99",
    platforms: ["iOS", "Web"],
    ageGroup: "Children, Teens",
    researchBacked: true,
    website: "https://www.zonesofregulation.com",
    imageUrl: "/images/programs/sausage-dog-06.jpg",
    featured: true,
    tags: ["zones", "regulation", "emotions", "self-control"]
  },
  {
    id: 1007,
    title: "Superflexr",
    description: "Social thinking app teaching flexible thinking and problem-solving skills for autism.",
    category: "Social Skills",
    country: "USA",
    rating: 4.4,
    price: "$9.99",
    platforms: ["iOS"],
    ageGroup: "Children, Teens",
    researchBacked: true,
    website: "https://apps.apple.com/app/superflex/id505536876",
    imageUrl: "/images/programs/sausage-dog-07.jpg",
    featured: false,
    tags: ["flexible thinking", "social skills", "problem solving", "autism"]
  },
  {
    id: 1008,
    title: "Model Me Going Places",
    description: "Video modeling app showing appropriate behavior in various community settings.",
    category: "Social Skills",
    country: "USA",
    rating: 4.3,
    price: "$49.99",
    platforms: ["iOS"],
    ageGroup: "Children, Teens",
    researchBacked: true,
    website: "https://www.modelmegoingplaces.com",
    imageUrl: "/images/programs/sausage-dog-08.jpg",
    featured: false,
    tags: ["video modeling", "community skills", "behavior", "autism"]
  },
  {
    id: 1009,
    title: "Social Stories Creator",
    description: "Tool for creating personalized social stories to teach appropriate social responses.",
    category: "Social Skills",
    country: "USA",
    rating: 4.5,
    price: "$9.99",
    platforms: ["iOS"],
    ageGroup: "Children, Teens",
    researchBacked: true,
    website: "https://apps.apple.com/app/social-stories-creator/id588180598",
    imageUrl: "/images/programs/sausage-dog-09.jpg",
    featured: true,
    tags: ["social stories", "personalized", "social responses", "autism"]
  },
  // Focus & Time Management (continued)
  {
    id: 1010,
    title: "Focus Keeper",
    description: "Pomodoro technique timer app with customizable work and break intervals.",
    category: "Focus & Time Management",
    country: "Global",
    rating: 4.4,
    price: "Free",
    platforms: ["iOS", "Android"],
    ageGroup: "Teens, Adults",
    researchBacked: false,
    website: "https://apps.apple.com/app/focus-keeper/id867374917",
    imageUrl: "/images/programs/sausage-dog-10.jpg",
    featured: false,
    tags: ["pomodoro", "focus", "timer", "productivity"]
  }
];

// Read existing extra programs
let existingPrograms = [];
try {
  existingPrograms = JSON.parse(fs.readFileSync(EXTRA_FILE, 'utf8'));
} catch (e) {
  existingPrograms = [];
}

// Merge and write back
const allPrograms = [...existingPrograms, ...additionalPrograms];
fs.writeFileSync(EXTRA_FILE, JSON.stringify(allPrograms, null, 2), 'utf8');

console.log(`Added ${additionalPrograms.length} new programs to ${EXTRA_FILE}`);
console.log(`Total programs in extra file: ${allPrograms.length}`);
console.log('Run "node tools/status-programs.js" to see updated counts.');
