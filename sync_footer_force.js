const fs = require('fs');

const programsPath = 'c:\\AISGPR new website\\programs.html';
const impactPath = 'c:\\AISGPR new website\\impact.html';

const programsHtml = fs.readFileSync(programsPath, 'utf8');
let impactHtml = fs.readFileSync(impactPath, 'utf8');

const startIdx = programsHtml.indexOf('<!-- FOOTER -->');
const endIdx = programsHtml.indexOf('</footer>') + 9;

if (startIdx !== -1 && endIdx !== -1) {
    const footerHtml = programsHtml.substring(startIdx, endIdx);
    
    // There was no footer, append it!
    const insertionPoint = impactHtml.lastIndexOf('</body>');
    if (insertionPoint !== -1) {
        impactHtml = impactHtml.slice(0, insertionPoint) + '\n    ' + footerHtml + '\n' + impactHtml.slice(insertionPoint);
        fs.writeFileSync(impactPath, impactHtml, 'utf8');
        console.log('Appended footer successfully.');
    } else {
        console.log('Could not find </body> in impact.html');
    }
}
