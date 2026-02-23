import fs from 'fs';

let content = fs.readFileSync('src/data/projectsData.ts', 'utf8');

// The string to replace is very long because it caught the entire header and footer.
// Let's just use regex to replace the description field.
content = content.replace(/"description": "0[\s\S]*?",\n\s*"gallery"/g, '"description": "",\n        "gallery"');

// Manually add the description for Project Zero back
content = content.replace(/"id": 1,\n\s*"title": "Project Zero",\n\s*"url": "[^"]*",\n\s*"description": "",/, `"id": 1,
        "title": "Project Zero",
        "url": "https://www.asimmetrika.co.uk/portfolio-/project-nine",
        "description": "This striking 500-square-meter modern villa in Spain is a testament to our comprehensive approach. From managing finances and securing planning permissions to designing and constructing the property, our team oversaw every detail of this €4 million project. The result is a seamless blend of contemporary style and functional living, reflecting our commitment to delivering exceptional, end-to-end service.",`);

fs.writeFileSync('src/data/projectsData.ts', content);
console.log("Cleaned projects data!");
