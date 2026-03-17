const fs = require('fs');

const path = 'c:\\AISGPR new website\\impact.html';
let content = fs.readFileSync(path, 'utf8');

// Subtitle
content = content.replace(
  /Moments from our programs, campaigns and community engagements across[\s\r\n]+Bauchi State, Nigeria\./g,
  'Moments from our policy dialogues, strategic summits, and governance engagements across Africa.'
);

// Overlays (using robust regex for spacing/newlines)
const replacements = [
  [/Tree Planting With student in cresent Comprehensive[\s\r\n]+School/i, 'Stakeholder Engagement Meeting in Abuja'],
  [/FXB Project Launch/i, 'Strategic Leadership Fellowship Launch'],
  [/Tree Planting With student in Succes Freinds International[\s\r\n]+Academy School premises/i, 'Policy Research Consultation'],
  [/Climate Education Session In Federal Low Cost Primary School[\s\r\n]+Bauchi/i, 'Executive Strategy Session'],
  [/Tree Planting with Student in Crescent Comprehensive[\s\r\n]+School/i, 'Governance Audit Presentation to Key Leaders'],
  [/Certificate Presentation to Student in Success Friends[\s\r\n]+International Academy School/i, 'Annual Public Policy Dialogue Forum'],
  [/Photo Session with Student in Success Friends[\s\r\n]+International Academy School/i, 'MOU Signing with Institutional Partners'],
  [/Surveying the School Environment in Success Friends[\s\r\n]+International Academy School with Sustainability Club Members/i, 'Governance Research Team in the Field'],
  [/Presentation of Certificate to student of Crescent[\s\r\n]+Comprehensive School/i, 'Civic Tech Workshop for Young Leaders'],
  [/Photo Session with Sustainability Club Members of Bakari[\s\r\n]+Dukku Primary School Bauchi/i, 'Closing Ceremony of Policy Design Training'],
  [/Tree Planting with Student in Success Friends[\s\r\n]+International Academy Schoolwitrh Sustainability Club Members in crescent Comprehensive[\s\r\n]+School Bauchi/i, 'Advisory Board Working Group Session'],
  [/Photo Session With Sustainability Club Members in Federal[\s\r\n]+Low-Cost Primary School Bauchi/i, 'Cross-Sector Coalition Town Hall']
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated impact gallery with regex');
