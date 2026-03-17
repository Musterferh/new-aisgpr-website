const fs = require('fs');

const path = 'c:\\African Institute for Strategic Governance and Policy Research\\about.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div class="team-grid">[\s\S]*?<\/section>/;

const replacement = `<div class="team-grid">
                    <div class="glass-card team-card reveal delay-1">
                        <div class="team-header"
                            style="background:linear-gradient(135deg,rgba(0,230,118,.15),rgba(34,197,94,.08))">‍
                        </div>
                        <div class="team-body" style="text-align: center;">
                            <h4>Ahmad Musa Yusuf</h4><span class="team-role">Executive Director</span>
                        </div>
                    </div>
                    <div class="glass-card team-card reveal delay-2">
                        <div class="team-header"
                            style="background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(96,165,250,.08))">‍
                        </div>
                        <div class="team-body" style="text-align: center;">
                            <h4>Fatima Al-Amin</h4><span class="team-role">Programs Director</span>
                        </div>
                    </div>
                    <div class="glass-card team-card reveal delay-3">
                        <div class="team-header"
                            style="background:linear-gradient(135deg,rgba(245,158,11,.15),rgba(252,211,77,.08))">‍
                        </div>
                        <div class="team-body" style="text-align: center;">
                            <h4>Ibrahim Shuaibu</h4><span class="team-role">Research &amp; M&amp;E Lead</span>
                        </div>
                    </div>
                    <div class="glass-card team-card reveal delay-4">
                        <div class="team-header"
                            style="background:linear-gradient(135deg,rgba(168,85,247,.15),rgba(192,132,252,.08))">‍
                        </div>
                        <div class="team-body" style="text-align: center;">
                            <h4>Zainab Abubakar</h4><span class="team-role">Communications Lead</span>
                        </div>
                    </div>
                    <div class="glass-card team-card reveal delay-5">
                        <div class="team-header"
                            style="background:linear-gradient(135deg,rgba(236,72,153,.15),rgba(244,114,182,.08))">‍
                        </div>
                        <div class="team-body" style="text-align: center;">
                            <h4>Member 5</h4><span class="team-role">Strategy & Outreach</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated the Team section.');
} else {
    console.log('Could not find the target section.');
}
