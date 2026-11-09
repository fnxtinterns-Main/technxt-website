// TechNxt Next-Gen Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambient Mouse Glow Orb
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursorGlow() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        if (cursorGlow) {
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }
        requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();

    // 2. Spotlight Mouse Tracking for Cards
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    document.addEventListener('mousemove', (e) => {
        spotlightCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. Interactive Hero Canvas: Dynamic Particle Mesh & Constellation
    const canvas = document.getElementById('tech-particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        window.addEventListener('resize', () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        });

        const particles = [];
        const particleCount = Math.min(65, Math.floor((width * height) / 14000));

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.35 ? '#D94B26' : '#171717';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let heroMouseX = null;
        let heroMouseY = null;
        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            heroMouseX = e.clientX - rect.left;
            heroMouseY = e.clientY - rect.top;
        });
        canvas.parentElement.addEventListener('mouseleave', () => {
            heroMouseX = null;
            heroMouseY = null;
        });

        function renderCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Connect lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(23, 23, 23, ${0.07 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor
                if (heroMouseX !== null && heroMouseY !== null) {
                    const mdx = particles[i].x - heroMouseX;
                    const mdy = particles[i].y - heroMouseY;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(heroMouseX, heroMouseY);
                        ctx.strokeStyle = `rgba(217, 75, 38, ${0.35 * (1 - mdist / 140)})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(renderCanvas);
        }
        renderCanvas();
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 5. Service Filter Tabs
    const filterBtns = document.querySelectorAll('.service-filter-btn');
    const serviceCards = document.querySelectorAll('.service-card-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-[#D94B26]', 'text-white', 'border-[#D94B26]');
                b.classList.add('bg-[#262626]', 'text-[#F2EBDD]/70', 'border-white/10');
            });
            btn.classList.add('bg-[#D94B26]', 'text-white', 'border-[#D94B26]');
            btn.classList.remove('bg-[#262626]', 'text-[#F2EBDD]/70', 'border-white/10');

            const category = btn.getAttribute('data-filter');
            serviceCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat.includes(category)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 6. Service Details Modal Data
    const serviceDetails = {
        '01': {
            title: 'Website Development',
            tag: 'Web Engineering & High-Performance UI',
            icon: 'assets/images/icon_service_webdev.png',
            desc: 'We design and build fast, secure and responsive websites and modern web applications tailored to your brand and business goals. Using modern frameworks (React, Next.js, PHP, Tailwind), we ensure your website loads in under 1 second with 100% mobile perfection.',
            features: [
                'Custom Website Development tailored to brand identity',
                'Corporate and Enterprise Business Portals',
                '100% Responsive Mobile-First Design across all devices',
                'E-commerce Development (Cart, Payment Gateways, Order Ops)',
                'PHP and Modern Web Technologies (React, Node.js, Next.js)',
                'Website Redesign, UI Modernization & Core Web Vitals (95+ score)',
                'Custom Web Applications with Scalable Backend Architecture'
            ],
            deliverables: ['Custom Codebase & Architecture', 'Admin Control Panel', 'Full SEO & Performance Optimization', 'Production Deployment & SSL', '30-Day Post-Launch Warranty']
        },
        '02': {
            title: 'Website Maintenance & Management',
            tag: '24/7 Managed Uptime & SLA Support',
            icon: 'assets/images/icon_service_maintenance.png',
            desc: 'Keep your website secure, lightning-fast and up to date with dependable ongoing maintenance and proactive technical support. Our engineers monitor your uptime 24/7 and resolve bugs before your users notice.',
            features: [
                'Regular Website Content & Software Updates',
                'Bug Fixing and Rapid Issue Troubleshooting',
                'Website Security Management & Automated Malware Scanning',
                'Performance & Database Speed Optimization',
                'Automated Daily / Weekly Cloud Backup and Instant Recovery',
                'Hosting, DNS, and Server Management',
                'Dedicated Technical Support with Rapid SLAs'
            ],
            deliverables: ['Monthly Technical Health Audit', 'Real-Time Uptime Monitoring', 'Security Patches & Firewalls', 'Dedicated Developer Hours']
        },
        '03': {
            title: 'Cloud Solutions & Infrastructure',
            tag: 'AWS, Cloud Migration & DevOps',
            icon: 'assets/images/icon_service_cloud.png',
            desc: 'Deploy, host and scale your applications on reliable AWS cloud infrastructure with a relentless focus on security, zero-downtime, and performance. We handle load balancing, containerization, and cost optimization.',
            features: [
                'AWS Cloud Architecture, Provisioning & Migration',
                'High-Availability Cloud Hosting and Deployment Pipelines',
                'Cloud Server Configuration, Load Balancing & SSL Automation',
                'Database Hosting, Replication and Multi-AZ Management',
                'Legacy-to-Cloud Infrastructure Migration',
                '24/7 Server Health, Disk & CPU Resource Monitoring',
                'Scalable Cloud Infrastructure for sudden traffic surges',
                'Cloud Security Hardening, IAM Best Practices & Cost Optimization'
            ],
            deliverables: ['Cloud Architecture Topology Diagram', 'Automated CI/CD Pipeline', 'Security Audit Report', 'Disaster Recovery Playbook']
        },
        '04': {
            title: 'Web Portal Development',
            tag: 'Enterprise Dashboards & Multi-Role Portals',
            icon: 'assets/images/icon_service_portal.png',
            desc: 'Custom web portals and multi-tenant management platforms that streamline complex operations for educational institutions, enterprises, and fast-growing businesses.',
            features: [
                'Custom Business Web Portals with Granular Access Roles',
                'Educational & Student Portals (Admissions, Fee, LMS, Exam engines)',
                'Advanced Admin Management Dashboards with Real-time BI',
                'Customer Self-Service and Employee Workflow Portals',
                'Enterprise User Authentication (SSO, OAuth, Role Permissions)',
                'High-Throughput Database-Driven Web Applications',
                'Custom Management Platforms & Automated Workflows'
            ],
            deliverables: ['Role-Based Permission Matrix', 'Real-time Analytical Dashboards', 'RESTful / GraphQL APIs', 'Staff User Training Guide']
        },
        '05': {
            title: 'AI Integration & Automation',
            tag: 'Custom AI Agents, LLMs & Process Automation',
            icon: 'assets/images/icon_service_ai.png',
            desc: 'Bring intelligent automation and practical AI capabilities into your websites, business workflows, and applications. From conversational AI support agents to predictive analytics and custom model fine-tuning.',
            features: [
                'AI-Powered Website & Business System Integration',
                '24/7 Intelligent AI Chatbots and Conversational Assistants',
                'Business Process Automation (BPA) & Workflow Streamlining',
                'AI-Based Data Analytics & Predictive Insights',
                'Intelligent Semantic Search Systems & RAG Knowledge Retrieval',
                'AI-Powered Business Applications tailored to industry needs',
                'Custom AI/ML Solutions and Model Fine-Tuning'
            ],
            deliverables: ['Trained Chatbot / Custom AI Agent', 'Knowledge Base Sync Pipeline', 'API Integration Specs', 'Automation Trigger Workflows']
        },
        '06': {
            title: 'Digital Marketing & Growth',
            tag: 'High-ROI SEO, Google Ads & Brand Domination',
            icon: 'assets/images/icon_service_marketing.png',
            desc: 'Strengthen your online visibility, customer acquisition, and brand authority with data-driven strategies designed for sustainable digital growth and maximum return on investment.',
            features: [
                'Technical, On-Page & Local Search Engine Optimization (SEO)',
                'Targeted Social Media Marketing & High-Engagement Campaigns',
                'High-ROI Google Ads Campaigns & Performance Search Marketing',
                'Strategic Content Marketing & Conversion Copywriting',
                'Brand Promotion, Visual Identity & Market Positioning',
                'Online Reputation Management (ORM) & Review Curation',
                'Comprehensive Digital Growth Strategies & CRO Audits'
            ],
            deliverables: ['Keyword Ranking Dashboard', 'Ad Spend ROI Analytics', '30-Day Content Calendar', 'Monthly Growth Reports']
        }
    };

    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalDesc = document.getElementById('modal-desc');
    const modalIcon = document.getElementById('modal-icon');
    const modalFeatures = document.getElementById('modal-features');
    const modalDeliverables = document.getElementById('modal-deliverables');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCtaBtn = document.getElementById('modal-cta-btn');

    window.openServiceModal = function(id) {
        const data = serviceDetails[id];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalTag.textContent = data.tag;
        modalDesc.textContent = data.desc;
        modalIcon.src = data.icon;

        modalFeatures.innerHTML = data.features.map(f => `
            <li class="flex items-start space-x-2 text-luxury-cream text-sm">
                <span class="text-[#D94B26] font-bold">✔</span>
                <span>${f}</span>
            </li>
        `).join('');

        modalDeliverables.innerHTML = data.deliverables.map(d => `
            <span class="px-2.5 py-1 text-xs rounded-full bg-[#D94B26]/10 text-[#D94B26] border border-[#D94B26]/30 font-medium">
                ${d}
            </span>
        `).join('');

        modalCtaBtn.onclick = () => {
            closeServiceModal();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const serviceSelect = document.getElementById('contact-service');
                if (serviceSelect) {
                    serviceSelect.value = data.title;
                }
            }
        };

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    window.closeServiceModal = function() {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeServiceModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeServiceModal();
        });
    }

    // 7. Interactive FAQ Accordion
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.faq-icon');
            const isOpen = !content.classList.contains('hidden');

            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

            if (!isOpen) {
                content.classList.remove('hidden');
                if (icon) icon.classList.add('rotate-180');
            }
        });
    });

    // 8. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    function showToast(msg) {
        if (!toast) return;
        toast.querySelector('.toast-text').textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4500);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !phone) {
                alert('Please provide your name and phone number.');
                return;
            }

            const waText = encodeURIComponent(
                `*New Project Requirement for TechNxt:*
` +
                `👤 Name: ${name}
` +
                `📞 Phone: ${phone}
` +
                `✉️ Email: ${email || 'Not specified'}
` +
                `🛠️ Service: ${service}
` +
                `📝 Requirement: ${message || 'I would like to discuss my project with TechNxt.'}`
            );

            window.open(`https://wa.me/919801506511?text=${waText}`, '_blank');
            showToast('Thank you! Redirecting to WhatsApp to send your requirement directly to TechNxt...');
            contactForm.reset();
        });
    }

    // 9. Back To Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('hide');
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
                backToTopBtn.classList.add('hide');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 10. Schedule Call Modal
    const callModal = document.getElementById('call-modal');
    const callModalClose = document.getElementById('call-modal-close');
    const callForm = document.getElementById('call-booking-form');

    window.openCallModal = function() {
        if (callModal) {
            callModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeCallModal = function() {
        if (callModal) {
            callModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (callModalClose) callModalClose.addEventListener('click', closeCallModal);
    if (callModal) {
        callModal.addEventListener('click', (e) => {
            if (e.target === callModal) closeCallModal();
        });
    }

    if (callForm) {
        const dateInput = document.getElementById('call-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }

        callForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('call-name').value.trim();
            const phone = document.getElementById('call-phone').value.trim();
            const date = document.getElementById('call-date').value;
            const slot = document.getElementById('call-slot').value;
            const topic = document.getElementById('call-topic').value;

            if (!name || !phone) {
                alert('Please provide your name and phone number.');
                return;
            }

            const waMsg = encodeURIComponent(
                `*New Strategy Call Booking with TechNxt:*
` +
                `👤 Name: ${name}
` +
                `📞 Phone: ${phone}
` +
                `📅 Preferred Date: ${date}
` +
                `⏰ Time Slot: ${slot}
` +
                `🛠️ Discussion Topic: ${topic}

` +
                `Looking forward to connecting with the TechNxt engineering team!`
            );

            window.open(`https://wa.me/919801506511?text=${waMsg}`, '_blank');
            closeCallModal();
            showToast('Opening WhatsApp to confirm your 15-Minute Strategy Call slot...');
            callForm.reset();
        });
    }

    // 11. Interactive Copy Code in Terminal
    window.copyTerminalCommand = function() {
        const text = 'technxt-deploy --cloud aws --ai enabled';
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied command to clipboard!');
        });
    };

    // 12. Lucide Icons initialization
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 13. Theme Accent Color Switcher
    window.setThemeAccent = function(themeName) {
        document.body.classList.remove('theme-cyan', 'theme-violet', 'theme-emerald');
        document.body.classList.add(`theme-${themeName}`);
        
        document.querySelectorAll('.theme-btn').forEach(b => {
            b.classList.remove('ring-2', 'ring-white', 'scale-110');
        });
        const activeBtn = document.getElementById(`theme-btn-${themeName}`);
        if (activeBtn) activeBtn.classList.add('ring-2', 'ring-white', 'scale-110');

        showToast(`Theme accent changed to ${themeName.toUpperCase()}`);
    };

    // 14. 3D Tilt Effect on Brand Emblem
    const tiltContainers = document.querySelectorAll('.tilt-card-container');
    tiltContainers.forEach(container => {
        const card = container.querySelector('.tilt-card');
        if (!card) return;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // 15. Animated Number Counters
    const counters = document.querySelectorAll('.counter-val');
    let countersStarted = false;

    function runCounters() {
        if (countersStarted) return;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target') || '0');
            const suffix = counter.getAttribute('data-suffix') || '';
            const isFloat = counter.getAttribute('data-float') === 'true';
            let current = 0;
            const step = target / 40;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
            }, 30);
        });
        countersStarted = true;
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            runCounters();
        }
    }, { threshold: 0.2 });

    const statsBar = document.querySelector('.stats-bar-tracker');
    if (statsBar) observer.observe(statsBar);

    // 16. Interactive Terminal Command Runner
    const terminalLogs = document.getElementById('terminal-output');
    const termBtns = document.querySelectorAll('.term-cmd-btn');

    const terminalScripts = {
        'deploy': [
            'user@technxt:~$ technxt-deploy --cloud aws --env prod',
            '✔ Authenticating AWS IAM credentials... OK',
            '✔ ECS Fargate cluster active (2 replicas)',
            '✔ RDS PostgreSQL Aurora: Auto-scaling multi-AZ',
            '✔ SSL/TLS certificate issued · CloudFront CDN active',
            '🚀 STATUS: Live in 410ms · Zero Downtime Guaranteed'
        ],
        'ai': [
            'user@technxt:~$ technxt-ai-agent --init --model custom',
            '✔ Loading knowledge base embeddings into Vector DB...',
            '✔ Context window calibrated: 128k tokens',
            '✔ RAG retrieval latency: 42ms',
            '✔ Webhook connected to WhatsApp API & Web Chat',
            '🤖 STATUS: AI Virtual Assistant Online & Answering'
        ],
        'audit': [
            'user@technxt:~$ technxt-security-audit --deep-scan',
            '✔ OWASP Top 10 Vulnerability Check: 0 Issues found',
            '✔ DDoS Protection: AWS Shield Standard Enabled',
            '✔ Database Encryption: AES-256 at Rest & in Transit',
            '✔ Core Web Vitals Score: Performance 98 / SEO 100',
            '🛡️ STATUS: Enterprise Security Hardening Passed (A+)'
        ]
    };

    window.runTerminalScript = function(scriptKey) {
        if (!terminalLogs) return;
        termBtns.forEach(b => {
            b.classList.remove('text-luxury-orange', 'border-luxury-orange/40', 'bg-luxury-orange/10');
            b.classList.add('text-luxury-cream/60', 'border-luxury-cream/15');
        });
        const activeBtn = document.getElementById(`term-btn-${scriptKey}`);
        if (activeBtn) {
            activeBtn.classList.add('text-luxury-orange', 'border-luxury-orange/40', 'bg-luxury-orange/10');
            activeBtn.classList.remove('text-luxury-cream/60', 'border-luxury-cream/15');
        }

        const lines = terminalScripts[scriptKey] || terminalScripts['deploy'];
        terminalLogs.innerHTML = '';
        let i = 0;

        function addLine() {
            if (i < lines.length) {
                const p = document.createElement('p');
                if (i === 0) {
                    p.className = 'text-luxury-cream font-bold';
                    p.innerHTML = `<span class="text-emerald-400">user@technxt</span>:~$ <span class="text-luxury-orange">${lines[i].split('~$ ')[1]}</span>`;
                } else if (i === lines.length - 1) {
                    p.className = 'text-emerald-400 font-semibold pt-1';
                    p.textContent = lines[i];
                } else {
                    p.className = 'text-luxury-cream/60';
                    p.textContent = lines[i];
                }
                terminalLogs.appendChild(p);
                i++;
                setTimeout(addLine, 180);
            }
        }
        addLine();
    };

    // 17. Live AI Chat Preview Simulation Widget
    const aiChatBox = document.getElementById('ai-chat-messages');
    const aiInput = document.getElementById('ai-chat-input');
    const aiSendBtn = document.getElementById('ai-chat-send');

    const aiKnowledge = {
        'services': 'TechNxt provides 6 core services: 1) Custom Website Development, 2) 24/7 Website Maintenance, 3) AWS Cloud Solutions, 4) Web Portal Development, 5) AI Integration & Chatbots, and 6) Digital Marketing & SEO.',
        'location': 'TechNxt is headquartered at 505, Mahabir Tower, Main Road, Ranchi, Jharkhand – 834001. You can call us directly at +91 9801506511.',
        'timeline': 'A typical startup MVP or website takes 2–3 weeks, while comprehensive web portals or AI integrations take 3–5 weeks with full testing and warranty.',
        'cloud': 'We specialize in AWS cloud architecture, containerized deployments (Docker/ECS), auto-scaling databases, SSL hardening, and zero-downtime server migrations.',
        'default': 'TechNxt empowers businesses through tailored IT and practical AI solutions. Would you like to schedule a free 15-minute consultation with our engineering team?'
    };

    window.askAiPrompt = function(question) {
        if (!aiChatBox) return;
        addChatMessage(question, 'user');
        simulateAiResponse(question);
    };

    function addChatMessage(text, sender) {
        if (!aiChatBox) return;
        const div = document.createElement('div');
        div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} chat-bubble mb-3`;
        div.innerHTML = sender === 'user' 
            ? `<div class="max-w-[80%] rounded-2xl px-4 py-2 text-xs bg-[#D94B26] text-white rounded-tr-none shadow-sm">${text}</div>`
            : `<div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs bg-[#FAF7F2] border border-[#171717]/10 text-[#171717] rounded-tl-none shadow-sm flex items-start gap-2">
                 <span class="w-2 h-2 rounded-full bg-[#D94B26] mt-1 shrink-0"></span>
                 <span>${text}</span>
               </div>`;
        aiChatBox.appendChild(div);
        aiChatBox.scrollTop = aiChatBox.scrollHeight;
    }

    function simulateAiResponse(query) {
        const lower = query.toLowerCase();
        let reply = aiKnowledge['default'];
        if (lower.includes('service') || lower.includes('kya karte') || lower.includes('offer')) {
            reply = aiKnowledge['services'];
        } else if (lower.includes('office') || lower.includes('location') || lower.includes('ranchi') || lower.includes('contact')) {
            reply = aiKnowledge['location'];
        } else if (lower.includes('time') || lower.includes('duration') || lower.includes('kitna time') || lower.includes('mvp')) {
            reply = aiKnowledge['timeline'];
        } else if (lower.includes('cloud') || lower.includes('aws') || lower.includes('server')) {
            reply = aiKnowledge['cloud'];
        }

        // Show Luxury AI Typing Indicator
        const typingId = 'ai-typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'flex justify-start chat-bubble mb-3';
        typingDiv.innerHTML = `<div class="rounded-2xl px-4 py-2.5 bg-[#FAF7F2] border border-[#171717]/10 text-xs flex items-center gap-2 shadow-sm">
            <span class="text-luxury-black/60 font-mono text-[11px]">AI thinking</span>
            <span class="typing-dots"><span></span><span></span><span></span></span>
        </div>`;
        if (aiChatBox) {
            aiChatBox.appendChild(typingDiv);
            aiChatBox.scrollTop = aiChatBox.scrollHeight;
        }

        setTimeout(() => {
            const el = document.getElementById(typingId);
            if (el) el.remove();
            addChatMessage(reply, 'ai');
        }, 600);
    }

    if (aiSendBtn && aiInput) {
        aiSendBtn.addEventListener('click', () => {
            const val = aiInput.value.trim();
            if (!val) return;
            addChatMessage(val, 'user');
            aiInput.value = '';
            simulateAiResponse(val);
        });
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                aiSendBtn.click();
            }
        });
    }


    // 18. Luxury Smooth Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal-init');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });
        reveals.forEach(el => revealObserver.observe(el));
    }

});
