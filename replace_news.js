const fs = require('fs');

const newsFile = 'c:/AISGPR new website/news.html';
let html = fs.readFileSync(newsFile, 'utf8');

const featuredRegex = /<!-- FEATURED ARTICLE -->([\s\S]*?)<!-- NEWS GRID -->/i;
const newFeatured = `<!-- FEATURED ARTICLE -->
        <section>
            <div class="container">
                <div class="news-featured reveal">
                    <div class="news-featured-img">
                        <img src="images/stragetic.jpg" alt="Strategic Leadership Fellowship Launch" loading="lazy" />
                        <span class="news-cat">Fellowship</span>
                    </div>
                    <div class="news-featured-body">
                        <span class="chip"> Top Story</span>
                        <h2>Strategic Leadership Fellowship Launch</h2>
                        <p>We officially launched our flagship Strategic Leadership Fellowship, welcoming the first cohort of dynamic African leaders dedicated to policy innovation and institutional reform. The inaugural session was led by key experts across the continent.</p>
                        <div class="news-meta">
                            <span> Feb 14, 2026</span>
                            <span> AISGPR Core Team</span>
                            <span> 5 min read</span>
                        </div>
                        <a href="article.html?id=1" onclick="localStorage.setItem('cw_article','1')"
                            class="btn btn-neon" style="margin-top:8px">Read Full Story →</a>
                    </div>
                </div>
            </div>
        </section>

        `;
html = html.replace(featuredRegex, newFeatured + '<!-- NEWS GRID -->');

const gridRegex = /<!-- NEWS GRID -->([\s\S]*?)<\/main>/i;
const newGrid = `<!-- NEWS GRID -->
        <section class="bg-alt">
            <div class="container">
                <div class="text-center" style="margin-bottom:48px">
                    <span class="chip reveal"> More Stories</span>
                    <h2 class="section-title reveal">Recent <span class="accent">News</span></h2>
                </div>
                <div class="news-grid">

                    <article class="news-card glass-card reveal delay-1">
                        <div class="news-card-img">
                            <img src="images/closing.jpg" alt="Closing Ceremony" loading="lazy" />
                            <span class="news-cat">Training</span>
                        </div>
                        <div class="news-card-body">
                            <h3>Closing Ceremony of Policy Design Training</h3>
                            <p>The intensive six-week Policy Design Training concluded today. Participants presented their final policy briefs, demonstrating rigorous analytical frameworks designed to tackle regional governance challenges.</p>
                            <div class="news-meta">
                                <span> July 7, 2025</span>
                                <span> 3 min read</span>
                            </div>
                            <a href="article.html?id=2" onclick="localStorage.setItem('cw_article','2')"
                                class="news-readmore">Read More →</a>
                        </div>
                    </article>

                    <article class="news-card glass-card reveal delay-2">
                        <div class="news-card-img">
                            <img src="images/annual.jpg" alt="Public Policy Dialogue" loading="lazy" />
                            <span class="news-cat">Conferences</span>
                        </div>
                        <div class="news-card-body">
                            <h3>Annual Public Policy Dialogue Forum</h3>
                            <p>AISGPR hosted its Annual Public Policy Dialogue Forum, bringing together policymakers, academics, and civic leaders to discuss collaborative strategies for strengthening democratic institutions across the continent.</p>
                            <div class="news-meta">
                                <span> May 15, 2025</span>
                                <span> 3 min read</span>
                            </div>
                            <a href="article.html?id=3" onclick="localStorage.setItem('cw_article','3')"
                                class="news-readmore">Read More →</a>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    `;
html = html.replace(gridRegex, newGrid + '</main>');

fs.writeFileSync(newsFile, html, 'utf8');
console.log('news.html updated successfully.');
