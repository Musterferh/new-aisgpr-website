const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

const oldProgramsList = `<nav class="footer-col">
                    <h4>Programs</h4>
                    <a href="programs.html#education">Climate Education</a>
                    <a href="programs.html#clubs">Sustainability Clubs</a>
                    <a href="programs.html#leadership">Youth Leadership</a>
                    <a href="programs.html#campaigns">Community Campaigns</a>
                </nav>`;

const newProgramsList = `<nav class="footer-col">
                    <h4>Programs</h4>
                    <a href="programs.html#research">Research & Analysis</a>
                    <a href="programs.html#training">Training & Fellowship</a>
                    <a href="programs.html#advisory">Advisory & Consulting</a>
                    <a href="programs.html#conferences">Policy Dialogues</a>
                    <a href="programs.html#implementation">Project Implementation</a>
                    <a href="programs.html#partnerships">Partnerships</a>
                </nav>`;

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace exact block
    content = content.replace(oldProgramsList, newProgramsList);
    
    // Fallback regex replacement in case of spacing issues
    content = content.replace(/<nav class="footer-col">\s*<h4>Programs<\/h4>\s*<a href="programs\.html#education">[^<]*<\/a>[\s\S]*?<\/nav>/, newProgramsList);

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated programs in footer for ${file}`);
});
