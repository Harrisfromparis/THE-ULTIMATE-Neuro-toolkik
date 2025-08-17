// tools/update-image-paths.js
// Updates program imageUrl fields to use the sausage-dog images we imported

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'programs.js');

// List of available sausage dog images
const images = [
  'sausage-dog-01.jpg', 'sausage-dog-02.jpg', 'sausage-dog-03.jpg', 'sausage-dog-04.jpg',
  'sausage-dog-05.jpg', 'sausage-dog-06.jpg', 'sausage-dog-07.jpg', 'sausage-dog-08.jpg',
  'sausage-dog-09.jpg', 'sausage-dog-10.jpg', 'sausage-dog-11.jpg', 'sausage-dog-12.jpg',
  'sausage-dog-13.jpg', 'sausage-dog-14.jpg', 'sausage-dog-15.jpg', 'sausage-dog-16.jpg',
  'sausage-dog-17.jpg', 'sausage-dog-18.jpg', 'sausage-dog-19.jpg', 'sausage-dog-20.jpg',
  'sausage-dog-21.jpg'
];

function updateImagePaths() {
  let content = fs.readFileSync(DATA_FILE, 'utf8');
  
  // Replace imageUrl paths with sausage dog images cycling through the list
  let imageIndex = 0;
  
  // Find and replace imageUrl: "/images/programs/..." patterns
  content = content.replace(/imageUrl:\s*"\/images\/programs\/[^"]+"/g, () => {
    const image = images[imageIndex % images.length];
    imageIndex++;
    return `imageUrl: "/images/programs/${image}"`;
  });
  
  fs.writeFileSync(DATA_FILE, content, 'utf8');
  console.log(`Updated ${imageIndex} imageUrl entries to use sausage-dog images.`);
  console.log('Programs now cycle through:', images.slice(0, Math.min(imageIndex, images.length)).join(', '));
}

updateImagePaths();
