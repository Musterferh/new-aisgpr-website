const fs = require('fs');

const path = 'c:\\AISGPR new website\\impact.html';
let content = fs.readFileSync(path, 'utf8');

// Replace Description
content = content.replace(
  'Moments from our programs, campaigns and community engagements across\n                        Bauchi State, Nigeria.',
  'Moments from our policy dialogues, strategic summits, and governance engagements across\n                        Africa.'
);
content = content.replace(
  'Moments from our programs, campaigns and community engagements across Bauchi State, Nigeria.',
  'Moments from our policy dialogues, strategic summits, and governance engagements across Africa.'
);

// Replace Overlays
const replacements = [
  ['Tree Planting With student in cresent Comprehensive\n                                School', 'Stakeholder Engagement Meeting in Abuja\n                                '],
  ['Tree Planting With student in cresent Comprehensive School', 'Stakeholder Engagement Meeting in Abuja'],
  
  ['FXB Project Launch', 'Strategic Leadership Fellowship Launch'],
  
  ['Tree Planting With student in Succes Freinds International\n                                Academy School premises', 'Policy Research Consultation\n                                '],
  ['Tree Planting With student in Succes Freinds International Academy School premises', 'Policy Research Consultation'],
  
  ['Climate Education Session In Federal Low Cost Primary School\n                                Bauchi', 'Executive Strategy Session\n                                '],
  ['Climate Education Session In Federal Low Cost Primary School Bauchi', 'Executive Strategy Session'],
  
  ['Tree Planting with Student in Crescent Comprehensive\n                                School', 'Governance Audit Presentation to Key Leaders\n                                '],
  ['Tree Planting with Student in Crescent Comprehensive School', 'Governance Audit Presentation to Key Leaders'],
  
  ['Certificate Presentation to Student in Success Friends\n                                International Academy School', 'Annual Public Policy Dialogue Forum\n                                '],
  ['Certificate Presentation to Student in Success Friends International Academy School', 'Annual Public Policy Dialogue Forum'],
  
  ['Photo Session with Student in Success Friends\n                                International Academy School', 'MOU Signing with Institutional Partners\n                                '],
  ['Photo Session with Student in Success Friends International Academy School', 'MOU Signing with Institutional Partners'],
  
  ['Surveying the School Environment in Success Friends\n                                International Academy School with Sustainability Club Members', 'Governance Research Team in the Field\n                                '],
  ['Surveying the School Environment in Success Friends International Academy School with Sustainability Club Members', 'Governance Research Team in the Field'],
  
  ['Presentation of Certificate to student of Crescent\n                                Comprehensive School', 'Civic Tech Workshop for Young Leaders\n                                '],
  ['Presentation of Certificate to student of Crescent Comprehensive School', 'Civic Tech Workshop for Young Leaders'],
  
  ['Photo Session with Sustainability Club Members of Bakari\n                                Dukku Primary School Bauchi', 'Closing Ceremony of Policy Design Training\n                                '],
  ['Photo Session with Sustainability Club Members of Bakari Dukku Primary School Bauchi', 'Closing Ceremony of Policy Design Training'],
  
  ['Tree Planting with Student in Success Friends\n                                International Academy Schoolwitrh Sustainability Club Members in crescent Comprehensive\n                                School Bauchi', 'Advisory Board Working Group Session\n                                \n                                '],
  ['Tree Planting with Student in Success Friends International Academy Schoolwitrh Sustainability Club Members in crescent Comprehensive School Bauchi', 'Advisory Board Working Group Session'],
  
  ['Photo Session With Sustainability Club Members in Federal\n                                Low-Cost Primary School Bauchi', 'Cross-Sector Coalition Town Hall\n                                '],
  ['Photo Session With Sustainability Club Members in Federal Low-Cost Primary School Bauchi', 'Cross-Sector Coalition Town Hall']
];

for (let i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated impact gallery');
