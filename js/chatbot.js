document.addEventListener("DOMContentLoaded", () => {
    // Inject the chatbot HTML structure into the body
    const chatbotHTML = `
        <button class="chatbot-toggle" aria-label="Open AI Assistant">
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
            </svg>
        </button>

        <div class="chatbot-window">
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2H2v2h2v6H2v2h2v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2v-2h-2V9h2zm-4 10H6V5h12v14zM8 9h8v2H8V9zm0 4h8v2H8v-2z"></path>
                        </svg>
                    </div>
                    <div>
                        <h4 class="chat-title">AISGPR AI Assistant</h4>
                        <p class="chat-subtitle">Institutional Knowledge</p>
                    </div>
                </div>
                <button class="chat-close" aria-label="Close chat">×</button>
            </div>
            
            <div class="chat-body" id="chat-body">
                <div class="chat-msg bot">Hello! I am the AISGPR Institutional Knowledge Assistant. How can I help you today?</div>
            </div>

            <div class="chat-options">
                <button class="chat-pill" data-topic="mission">Mission</button>
                <button class="chat-pill" data-topic="vision">Vision</button>
                <button class="chat-pill" data-topic="programs">Programs</button>
                <button class="chat-pill" data-topic="fellowship">Fellowship</button>
                <button class="chat-pill" data-topic="contact">Contact</button>
            </div>
            
            <form class="chat-input-area" id="chat-form">
                <input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off" />
                <button type="submit" aria-label="Send message">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                    </svg>
                </button>
            </form>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const toggleBtn = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.chat-close');
    const chatBody = document.getElementById('chat-body');
    const optionPills = document.querySelectorAll('.chat-pill');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    // Bot Responses Data
    const responses = {
        'mission': `Our mission at the African Institute for Strategic Governance and Policy Research is to foster strategic governance and policy innovation. We are dedicated to providing research-driven insights that empower leaders across Africa. <a href="about.html">Read more in About Us</a>`,
        
        'vision': `Our vision is a transformed Africa governed by strategic, proactive, and data-driven policies that ensure inclusive and sustainable development for all its citizens. <a href="about.html">Read more in About Us</a>`,
        
        'programs': `We implement several core programs to achieve our goals:<br><br>
        • <strong>Research & Analysis:</strong> Data-driven insights.<br>
        • <strong>Training & Fellowship:</strong> Capacity building for leaders.<br>
        • <strong>Advisory & Consulting:</strong> Policy guidance.<br>
        • <strong>Policy Dialogues:</strong> Forums for strategic discussions.<br>
        • <strong>Project Implementation:</strong> Real-world execution.<br>
        • <strong>Partnerships:</strong> Collaborative efforts.<br><br>
        <a href="programs.html">View our Programs</a>`,
        
        'fellowship': `Our <strong>Strategic Leadership Fellowship</strong> is a core initiative aimed at equipping the next generation of African leaders with the tools to formulate dynamic and effective governance policies. <a href="programs.html#training">Learn more about our Training & Fellowship</a>`,
        
        'contact': `We would love to hear from you! You can reach the AISGPR team at:<br><br>
        📍 <strong>Location:</strong> Abuja, Nigeria<br>
        ✉️ <strong>Email:</strong> info@aisgpr.org<br>
        📞 <strong>Phone:</strong> +234 (0) XXXXXXXX<br><br>
        <a href="contact.html">Send us a message here</a>`
    };

    const fallbackResponse = `I only have information about the institute (Mission, Vision, Programs, Fellowship, and Contact). Please select one of the topics above or contact the institute directly for more specific inquiries.`;

    // Toggle Chat
    function toggleChat() {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            setTimeout(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 50);
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

    // Option Click Handling
    optionPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const topic = pill.getAttribute('data-topic');
            const topicText = pill.textContent;
            
            // Append User Message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.textContent = topicText;
            chatBody.appendChild(userMsg);

            // Hide the pills to prevent spamming
            const optionsContainer = document.querySelector('.chat-options');
            optionsContainer.style.display = 'none';

            // Simulate typing delay
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-msg bot';
                botMsg.innerHTML = responses[topic];
                chatBody.appendChild(botMsg);
                
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Show options again after response
                setTimeout(() => {
                    optionsContainer.style.display = 'flex';
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 500);

            }, 600);
            
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    });

    // Handle text input
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // Clear input
        chatInput.value = '';

        // Append User Message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);

        // Hide the pills to prevent spamming
        const optionsContainer = document.querySelector('.chat-options');
        optionsContainer.style.display = 'none';

        // Simulate typing delay
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg bot';
            botMsg.innerHTML = fallbackResponse;
            chatBody.appendChild(botMsg);
            
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Show options again after response
            setTimeout(() => {
                optionsContainer.style.display = 'flex';
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 500);

        }, 600);
        
        chatBody.scrollTop = chatBody.scrollHeight;
    });
});
