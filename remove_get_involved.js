const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove exact matches (mostly navigation links)
    content = content.replace(/<li><a href="get-involved\.html">Get Involved<\/a><\/li>/g, '');
    content = content.replace(/<a href="get-involved\.html">Get Involved<\/a>/g, '');
    
    // Some buttons that link to get-involved
    content = content.replace(/<a href="get-involved\.html"[^>]*>.*?<\/a>/g, '');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
});
