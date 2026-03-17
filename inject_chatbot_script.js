const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\AISGPR new website';
const filesToUpdate = ['index.html', 'about.html', 'programs.html', 'impact.html', 'contact.html', 'news.html', 'publications.html', 'videos.html'];

filesToUpdate.forEach(file => {
    const filePath = path.join(directoryPath, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if script is already injected
    if (!content.includes('js/chatbot.js')) {
        // Insert right before closing body tag
        const insertionPoint = content.lastIndexOf('</body>');
        if (insertionPoint !== -1) {
            const scriptTag = '\n    <!-- AI Assistant Chatbot -->\n    <script src="js/chatbot.js" defer></script>\n';
            content = content.slice(0, insertionPoint) + scriptTag + content.slice(insertionPoint);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully injected into ${file}`);
        } else {
            console.log(`Could not find </body> in ${file}, skipping.`);
        }
    } else {
        console.log(`Chatbot script already exists in ${file}`);
    }
});
