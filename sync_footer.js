const fs = require('fs');

const programsPath = 'c:\\AISGPR new website\\programs.html';
const impactPath = 'c:\\AISGPR new website\\impact.html';

const programsHtml = fs.readFileSync(programsPath, 'utf8');
let impactHtml = fs.readFileSync(impactPath, 'utf8');

const startIdx = programsHtml.indexOf('<!-- FOOTER -->');
const endIdx = programsHtml.indexOf('</footer>') + 9;

if (startIdx !== -1 && endIdx !== -1) {
    const footerHtml = programsHtml.substring(startIdx, endIdx);
    
    // Impact html currently ends with:
    //     </script>
    // </body>
    // </html>
    
    // We want to insert it right before the inline <script> block, or just before </body>.
    // Let's insert it right before </body>.
    
    // But since there might be whitespace, let's simply replace </body> with footerHtml + '\n</body>'
    if (!impactHtml.includes('<footer')) {
        impactHtml = impactHtml.replace('</body>', '\n' + footerHtml + '\n</body>');
        fs.writeFileSync(impactPath, impactHtml, 'utf8');
        console.log('Appended footer. Length:', footerHtml.length);
    } else {
        console.log('Footer already exists in impactHtml!');
    }
} else {
    console.log('Could not find footer in programs.html', startIdx, endIdx);
}
