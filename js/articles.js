/* ============================================================
   AFRICAN INSTITUTE FOR STRATEGIC GOVERNANCE AND POLICY RESEARCH — articles.js
   All news articles data + dynamic renderer for article.html
   ============================================================ */

const ARTICLES = [
  {
    id: 1,
    category: 'Fellowship',
    title: 'Strategic Leadership Fellowship Launch',
    date: 'Feb 14, 2026',
    author: 'AISGPR Core Team',
    readTime: '5 min read',
    image: 'images/stragetic.jpg',
    imageCaption: 'The inaugural session of the Strategic Leadership Fellowship.',
    body: `
      <p>We officially launched our flagship Strategic Leadership Fellowship, welcoming the first cohort of dynamic African leaders dedicated to policy innovation and institutional reform. The inaugural session was led by key experts across the continent.</p>
      <h2>A New Era of Governance</h2>
      <p>Our curriculum focuses on empowering leaders with the necessary tools to navigate complex governance challenges. Fellows engaged in rigorous analytical frameworks and collaborative problem-solving exercises.</p>
      <h2>Looking Ahead</h2>
      <p>This is just the beginning. We anticipate profound impacts on regional policy frameworks as these leaders return to their respective institutions armed with strategic insights and a powerful network.</p>
    `
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
    body: `
      <p>The intensive six-week Policy Design Training concluded today. Participants presented their final policy briefs, demonstrating rigorous analytical frameworks designed to tackle regional governance challenges.</p>
      <h2>From Theory to Action</h2>
      <p>Each presentation showcased innovative approaches to deeply entrenched systemic issues. Our faculty praised the depth of research and the practical viability of the proposed policy reforms.</p>
      <p>The cohort will now transition into our alumni network, where they will continue to receive support as they advocate for these policies at structural levels.</p>
    `
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
    body: `
      <p>AISGPR hosted its Annual Public Policy Dialogue Forum, bringing together policymakers, academics, and civic leaders to discuss collaborative strategies for strengthening democratic institutions across the continent.</p>
      <h2>Fostering Cross-Sector Collaboration</h2>
      <p>The forum provided a crucial platform for debate on pressing governance issues. Keynote speakers emphasized the necessity of bridging the gap between theoretical research and actionable legislation.</p>
      <h2>Outcomes and Next Steps</h2>
      <p>Several working groups were formed out of the discussions, tasked with drafting white papers on actionable governance reforms to be presented at the next legislative assembly.</p>
    `
  },
  {
    id: 4,
    category: 'Consultation',
    title: 'Policy Research Consultation',
    date: 'August 12, 2025',
    author: 'AISGPR Research Team',
    readTime: '4 min read',
    image: 'images/consultation.jpg',
    imageCaption: 'Stakeholders at the Policy Research Consultation.',
    body: `
      <p>AISGPR recently concluded a high-level policy research consultation with key stakeholders, gathering empirical insights to drive evidence-based governance frameworks and institutional reform.</p>
      <h2>Evidence-Based Strategies</h2>
      <p>The consultation focused on bridging data gaps in local governance, empowering decision-makers with accurate research to formulate responsive policies.</p>
      <h2>Next Steps</h2>
      <p>The insights gathered will inform our upcoming publications and strategic briefs designed to guide sustainable community development.</p>
    `
  }
];

/* ── Render article on article.html ───────────────────────────── */
(function renderArticle() {
  const root = document.getElementById('article-root');
  if (!root) return;

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = parseInt(urlParams.get('id'), 10);
  const id = !isNaN(paramId) ? paramId : parseInt(localStorage.getItem('cw_article') || '0', 10);

  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    root.innerHTML = `
      <section class="page-hero">
        <div class="container" style="position:relative;z-index:2;text-align:center">
          <h1>Article Not Found</h1>
          <p>This article doesn't exist or may have been moved.</p>
          <a href="news.html" class="btn btn-neon" style="margin-top:24px">← Back to News</a>
        </div>
      </section>`;
    return;
  }

  document.title = article.title + ' — African Institute for Strategic Governance and Policy Research';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = article.title;

  const sidebarLinks = ARTICLES
    .filter(a => a.id !== id)
    .slice(0, 4)
    .map(a => `
          <a href="article.html" onclick="localStorage.setItem('cw_article','${a.id}')" style="display:block;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.06);text-decoration:none">
            <span style="font-family:'Inter',sans-serif;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:var(--green-neon)">${a.category}</span>
            <p style="font-family:'Inter',sans-serif;font-size:.83rem;color:rgba(255,255,255,.8);line-height:1.4;margin:4px 0 0">${a.title}</p>
          </a>`)
    .join('');

  root.innerHTML = `
    <section class="page-hero" style="min-height:340px">
      <div class="container" style="position:relative;z-index:2">
        <nav class="breadcrumb">
          <a href="index.html">Home</a><span>›</span>
          <a href="news.html">News</a><span>›</span>
          <span>${article.category}</span>
        </nav>
        <span class="chip" style="display:inline-flex;margin-bottom:16px">${article.category}</span>
        <h1 style="max-width:780px;font-size:clamp(1.5rem,3.5vw,2.4rem);line-height:1.25">${article.title}</h1>
        <div class="news-meta" style="margin-top:16px">
          <span> ${article.date}</span>
          <span> ${article.author}</span>
          <span> ${article.readTime}</span>
        </div>
      </div>
    </section>

    <div class="container" style="margin-top:-48px;position:relative;z-index:3">
      <div style="border-radius:20px;overflow:hidden;border:1px solid var(--green-border);position:relative">
        <img src="${article.image}" alt="${article.imageCaption}"
          style="width:100%;height:460px;object-fit:cover;display:block" loading="lazy" />
        <p style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.6);
          color:rgba(255,255,255,.7);font-family:'Inter',sans-serif;font-size:.78rem;
          padding:8px 16px;margin:0">${article.imageCaption}</p>
      </div>
    </div>

    <section>
      <div class="container">
        <div class="article-layout">
          <article class="article-body">${article.body}</article>
          <aside class="article-sidebar">
            <div class="glass-card" style="padding:24px;border-radius:16px;margin-bottom:24px">
              <h4 style="font-family:'Poppins',sans-serif;font-size:.95rem;color:#fff;margin-bottom:16px">More Stories</h4>
              ${sidebarLinks}
            </div>
            <div class="glass-card" style="padding:24px;border-radius:16px">
              <h4 style="font-family:'Poppins',sans-serif;font-size:.95rem;color:#fff;margin-bottom:8px">Get Involved</h4>
              <p style="font-family:'Inter',sans-serif;font-size:.82rem;color:var(--text-muted);line-height:1.6;margin-bottom:16px">Join African Institute for Strategic Governance and Policy Research as a policy researcher, institutional partner or supporter.</p>
              <a href="contact.html" class="btn btn-neon" style="width:100%;justify-content:center">Contact Us</a>
            </div>
          </aside>
        </div>
        <div style="margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,.08)">
          <a href="news.html" class="btn btn-glass">← Back to All News</a>
        </div>
      </div>
    </section>`;
})();
