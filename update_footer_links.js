const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove Tiktok Link
    content = content.replace(/href="https:\/\/www\.tiktok\.com\/@climate\.warden[^"]*"/g, 'href="#"');
    
    // Remove WhatsApp Link
    content = content.replace(/href="https:\/\/wa\.me\/2347038154504"[ \n\r]*class="soc-btn"/g, 'href="#" class="soc-btn"');
    
    // Remove Facebook Link
    content = content.replace(/href="https:\/\/www\.facebook\.com\/share\/17yFts8kGH\/"/g, 'href="#"');
    
    // Remove LinkedIn Link
    content = content.replace(/href="https:\/\/www\.linkedin\.com\/company\/african-institute-for-strategic-governance-and-policy-research\/"/g, 'href="#"');
    
    // Remove Instagram Link
    content = content.replace(/href="https:\/\/www\.instagram\.com\/musterferh_\?igsh=MWl0NHE3NjFrNmg1Zw=="/g, 'href="#"');

    // Update 'Stay Updated' text
    content = content.replace(/Get program updates &amp;[\s\n\r]*climate news\./g, 'Get policy updates &amp; research news.');
    content = content.replace(/Get program updates &[\s\n\r]*climate news\./g, 'Get policy updates & research news.');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated footer in ${file}`);
});
