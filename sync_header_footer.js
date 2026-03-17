const fs = require('fs');

const programsPath = 'c:\\AISGPR new website\\programs.html';
const impactPath = 'c:\\AISGPR new website\\impact.html';

const programsHtml = fs.readFileSync(programsPath, 'utf8');
let impactHtml = fs.readFileSync(impactPath, 'utf8');

// 1. Extract Header from programs.html
const headerRegex = /<header class="navbar" role="banner">[\s\S]*?<\/header>/i;
const headerMatch = programsHtml.match(headerRegex);

if (headerMatch) {
    let newHeader = headerMatch[0];
    
    // Fix active states for Impact page
    // For desktop nav
    newHeader = newHeader.replace(/<a href="programs\.html" class="active">Programs<\/a>/g, '<a href="programs.html">Programs</a>');
    newHeader = newHeader.replace(/<a href="impact\.html">Impact<\/a>/g, '<a href="impact.html" class="active">Impact</a>');

    // Replace header in impact.html
    impactHtml = impactHtml.replace(headerRegex, newHeader);
}

// 2. Extract Footer from programs.html
const footerRegex = /<!-- FOOTER -->[\s\S]*?<footer class="footer">[\s\S]*?<\/footer>/i;
const footerMatch = programsHtml.match(footerRegex);

if (footerMatch) {
    const newFooter = footerMatch[0];
    
    // Check if impact.html has a footer
    if (/<footer class="footer">/i.test(impactHtml)) {
        impactHtml = impactHtml.replace(/<footer class="footer">[\s\S]*?<\/footer>/i, newFooter);
    } else {
        // Insert right before script source or </body>
        // Assuming there's a script tag or just </body> at the end
        if (impactHtml.includes('</body>')) {
            impactHtml = impactHtml.replace('</body>', `\n    ${newFooter}\n</body>`);
        }
    }
}

fs.writeFileSync(impactPath, impactHtml, 'utf8');
console.log('Successfully synced header and footer to impact.html');
