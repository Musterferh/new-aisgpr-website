const fs = require('fs');

const path = 'c:/AISGPR new website/js/articles.js';
let content = fs.readFileSync(path, 'utf8');

const regex = /const ARTICLES = \[[\s\S]*?\];/;
const newArticlesArray = `const ARTICLES = [
  {
    id: 1,
    category: 'Fellowship',
    title: 'Strategic Leadership Fellowship Launch',
    date: 'Feb 14, 2026',
    author: 'AISGPR Core Team',
    readTime: '5 min read',
    image: 'images/stragetic.jpg',
    imageCaption: 'The inaugural session of the Strategic Leadership Fellowship.',
    body: \`
      <p>We officially launched our flagship Strategic Leadership Fellowship, welcoming the first cohort of dynamic African leaders dedicated to policy innovation and institutional reform. The inaugural session was led by key experts across the continent.</p>
      <h2>A New Era of Governance</h2>
      <p>Our curriculum focuses on empowering leaders with the necessary tools to navigate complex governance challenges. Fellows engaged in rigorous analytical frameworks and collaborative problem-solving exercises.</p>
      <h2>Looking Ahead</h2>
      <p>This is just the beginning. We anticipate profound impacts on regional policy frameworks as these leaders return to their respective institutions armed with strategic insights and a powerful network.</p>
    \`
  },
  {
    id: 2,
    category: 'Training',
    title: 'Closing Ceremony of Policy Design Training',
    date: 'July 7, 2025',
    author: 'AISGPR Faculty',
    readTime: '3 min read',
    image: 'images/closing.jpg',
    imageCaption: 'Participants presenting at the Policy Design Training closing ceremony.',
    body: \`
      <p>The intensive six-week Policy Design Training concluded today. Participants presented their final policy briefs, demonstrating rigorous analytical frameworks designed to tackle regional governance challenges.</p>
      <h2>From Theory to Action</h2>
      <p>Each presentation showcased innovative approaches to deeply entrenched systemic issues. Our faculty praised the depth of research and the practical viability of the proposed policy reforms.</p>
      <p>The cohort will now transition into our alumni network, where they will continue to receive support as they advocate for these policies at structural levels.</p>
    \`
  },
  {
    id: 3,
    category: 'Conferences',
    title: 'Annual Public Policy Dialogue Forum',
    date: 'May 15, 2025',
    author: 'AISGPR Events Team',
    readTime: '3 min read',
    image: 'images/annual.jpg',
    imageCaption: 'Panel discussion at the Annual Public Policy Dialogue Forum.',
    body: \`
      <p>AISGPR hosted its Annual Public Policy Dialogue Forum, bringing together policymakers, academics, and civic leaders to discuss collaborative strategies for strengthening democratic institutions across the continent.</p>
      <h2>Fostering Cross-Sector Collaboration</h2>
      <p>The forum provided a crucial platform for debate on pressing governance issues. Keynote speakers emphasized the necessity of bridging the gap between theoretical research and actionable legislation.</p>
      <h2>Outcomes and Next Steps</h2>
      <p>Several working groups were formed out of the discussions, tasked with drafting white papers on actionable governance reforms to be presented at the next legislative assembly.</p>
    \`
  }
];`;

content = content.replace(regex, newArticlesArray);
fs.writeFileSync(path, content, 'utf8');
console.log('Articles array updated successfully.');
