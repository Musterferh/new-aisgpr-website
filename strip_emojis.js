const fs = require('fs');
const path = require('path');

// Regular expression to match emojis.
// We use Emoji_Presentation and Extended_Pictographic which reliably matches emojis in modern Node.js.
// Also removing the Variation Selector-16 (\uFE0F) which sometimes gets left behind.
const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]/gu;

function stripEmojis(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        // Skip hidden folders or node_modules
        if (stat.isDirectory() && !fullPath.includes('.git') && !fullPath.includes('node_modules')) {
            stripEmojis(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            // Only modify relevant files
            let content = fs.readFileSync(fullPath, 'utf8');
            if (emojiRegex.test(content)) {
                // Keep a copy of the old content to check if it really changed
                const newContent = content.replace(emojiRegex, '');
                if (newContent !== content) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`Cleaned emojis from ${fullPath}`);
                }
            }
        }
    });
}

stripEmojis('c:\\African Institute for Strategic Governance and Policy Research');
console.log('Done stripping emojis.');
