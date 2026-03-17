const fs = require('fs');
const file = 'c:/AISGPR new website/videos.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<p>Follow our team and students through a full year of programs[\s\S]*?what youth-led climate action looks like in Bauchi State\.<\/p>/;
const newText = `<p>Follow our team and emerging leaders through a full year of programs — from inaugural policy design workshops to high-level strategic dialogues that brought together key stakeholders. An honest look at what strategic governance and policy innovation looks like across Africa.</p>`;

content = content.replace(regex, newText);
fs.writeFileSync(file, content, 'utf8');
console.log('Video description updated successfully.');
