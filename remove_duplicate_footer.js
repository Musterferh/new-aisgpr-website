const fs = require('fs');
const path = 'c:\\AISGPR new website\\impact.html';
let content = fs.readFileSync(path, 'utf8');

const firstFooter = content.indexOf('<!-- FOOTER -->');
const secondFooter = content.indexOf('<!-- FOOTER -->', firstFooter + 1);

if (secondFooter !== -1) {
    const endOfSecondFooter = content.indexOf('</footer>', secondFooter);
    if (endOfSecondFooter !== -1) {
        // remove the second footer block
        content = content.slice(0, secondFooter) + content.slice(endOfSecondFooter + 9);
        fs.writeFileSync(path, content, 'utf8');
        console.log('Successfully removed duplicate footer');
    }
} else {
    console.log('No duplicate footer found');
}
