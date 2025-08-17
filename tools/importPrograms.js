// tools/importPrograms.js - Tool to help you import your 300+ programs

/*
To add your 300+ programs, you can:

1. UPDATE THE PROGRAMS ARRAY in /data/programs.js with this format:

{
  id: 1,
  title: "Program Name",
  description: "Brief description of what this program offers",
  category: "Sensory|Social|Education|Employment|Healthcare|Family Support|Technology|Recreation|Advocacy|Research",
  country: "Country name",
  imageUrl: "/images/programs/program-image.jpg",
  website: "https://program-website.com",
  featured: true|false,
  tags: ["tag1", "tag2", "tag3"]
}

2. BULK IMPORT OPTIONS:

Option A - CSV Import:
- Create a CSV file with columns: title, description, category, country, website, featured, tags
- Use the convertCSVToPrograms() function below

Option B - JSON Import:
- If you have data in JSON format, modify the structure to match our schema

Option C - Manual Entry:
- Add programs one by one to the programs array

3. IMAGES:
- Add program images to: /public/images/programs/
- Use descriptive filenames: sensory-program-1.jpg, social-skills-uk.jpg, etc.
- Supported formats: jpg, png, gif, svg, webp
*/

// Helper function to convert CSV data to programs array
export function convertCSVToPrograms(csvData) {
  // Split CSV into lines and parse
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',');
    return {
      id: index + 1,
      title: values[0]?.trim() || '',
      description: values[1]?.trim() || '',
      category: values[2]?.trim() || 'Other',
      country: values[3]?.trim() || 'Unknown',
      imageUrl: `/images/programs/${values[0]?.trim().toLowerCase().replace(/\s+/g, '-')}.jpg`,
      website: values[4]?.trim() || '',
      featured: values[5]?.trim().toLowerCase() === 'true',
      tags: values[6]?.split('|').map(tag => tag.trim()) || []
    };
  });
}

// Example of how to structure your data
export const examplePrograms = [
  {
    id: 1,
    title: "Temple Grandin Sensory Garden",
    description: "Interactive sensory experiences for autism spectrum individuals",
    category: "Sensory",
    country: "Ireland",
    imageUrl: "/images/programs/temple-grandin-garden.jpg",
    website: "https://example.com",
    featured: true,
    tags: ["sensory", "garden", "therapeutic", "outdoor"]
  },
  {
    id: 2,
    title: "Social Stories Digital Library",
    description: "Collection of social stories to help with daily situations",
    category: "Social",
    country: "UK",
    imageUrl: "/images/programs/social-stories.jpg",
    website: "https://example.com",
    featured: false,
    tags: ["social", "stories", "digital", "communication"]
  }
  // ... continue for all 300+ programs
];

console.log("Import tool loaded. See comments above for instructions on adding your 300+ programs.");
