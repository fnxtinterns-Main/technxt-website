// ===================================================================
// CLEAN URL ENGINE: Strip /about/ -> / and remove all trailing slashes
// ===================================================================
(function cleanAddressBar() {
    try {
        if (window.history && window.history.replaceState && window.location.protocol.startsWith('http')) {
            const loc = window.location;
            let path = loc.pathname;

            // 1. If on about page (/about, /about/, /about.html), normalize to root /
            if (path === '/about' || path === '/about/' || path === '/about.html') {
                window.history.replaceState(null, '', '/' + loc.search + loc.hash);
                return;
            }

            // 2. Remove .html if present
            if (path.endsWith('.html')) {
                path = path.replace(/\.html$/, '');
            }

            // 3. Remove trailing /index
            if (path.endsWith('/index')) {
                path = path.replace(/\/index$/, '') || '/';
            }

            // 4. Remove trailing slash on any other page (e.g. /services/ -> /services)
            if (path.length > 1 && path.endsWith('/')) {
                path = path.replace(/\/+$/, '');
            }

            if (path !== loc.pathname) {
                window.history.replaceState(null, '', (path || '/') + loc.search + loc.hash);
            }
        }
    } catch (e) {}
})();


        if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }

        // -------------------------------------------------------------
        // Mobile Hamburger Navigation Drawer
        // -------------------------------------------------------------
        window.toggleMobileMenu = function() {
            const drawer = document.getElementById('mobile-nav-drawer');
            const iconOpen = document.getElementById('hamburger-icon-open');
            const iconClose = document.getElementById('hamburger-icon-close');
            if (!drawer) return;
            const isHidden = drawer.classList.contains('hidden');
            if (isHidden) {
                drawer.classList.remove('hidden');
                if (iconOpen) iconOpen.classList.add('hidden');
                if (iconClose) iconClose.classList.remove('hidden');
            } else {
                drawer.classList.add('hidden');
                if (iconOpen) iconOpen.classList.remove('hidden');
                if (iconClose) iconClose.classList.add('hidden');
            }
            if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        // -------------------------------------------------------------
        // Custom Laser Cursor
        // -------------------------------------------------------------
        const cursorDot = document.getElementById('laser-cursor-dot');
        const cursorRing = document.getElementById('laser-cursor-ring');
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDot) {
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
            }
        });

        function renderCursorRing() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            if (cursorRing) {
                cursorRing.style.left = ringX + 'px';
                cursorRing.style.top = ringY + 'px';
            }
            requestAnimationFrame(renderCursorRing);
        }
        renderCursorRing();

        const clickables = document.querySelectorAll('a, button, input, select, textarea, .tilt-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });

        // 3D Perspective Tilt for Cards
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotX = -(y / rect.height) * 12;
                const rotY = (x / rect.width) * 12;
                card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

                // -------------------------------------------------------------
        // Three.js 3D Quantum Core Engine (Zero Blue Policy)
        // -------------------------------------------------------------
        function initThreeScene() {
            if (typeof THREE === 'undefined') {
                setTimeout(initThreeScene, 60);
                return;
            }

            const canvas = document.getElementById('webgl-canvas');
            if (!canvas) return;

            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x020406, 0.045);

            const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.set(0, 0, 11);

            let renderer;
            try {
                renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: "default" });
            } catch (e) {
                try {
                    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
                } catch (e2) {
                    console.error("WebGL initialization error:", e2);
                    return;
                }
            }

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const quantumGroup = new THREE.Group();
            scene.add(quantumGroup);

            // Geodesic Wireframe
            const outerGeo = new THREE.IcosahedronGeometry(2.35, 2);
            const outerMat = new THREE.MeshBasicMaterial({ color: 0x00FF87, wireframe: true, transparent: true, opacity: 0.35 });
            const outerMesh = new THREE.Mesh(outerGeo, outerMat);
            quantumGroup.add(outerMesh);

            // Faceted Core
            const innerGeo = new THREE.DodecahedronGeometry(1.35, 0);
            const innerMat = new THREE.MeshStandardMaterial({ color: 0xFFD166, roughness: 0.15, metalness: 0.85, flatShading: true });
            const innerCore = new THREE.Mesh(innerGeo, innerMat);
            quantumGroup.add(innerCore);

            // Singularity Sphere
            const singularityGeo = new THREE.SphereGeometry(0.4, 32, 32);
            const singularityMat = new THREE.MeshBasicMaterial({ color: 0x00FF87 });
            const singularity = new THREE.Mesh(singularityGeo, singularityMat);
            quantumGroup.add(singularity);

            // Gyro Rings
            const torusMat1 = new THREE.MeshBasicMaterial({ color: 0x00FF87, wireframe: true });
            const torusMat2 = new THREE.MeshBasicMaterial({ color: 0xFFD166, wireframe: true });
            const torusMat3 = new THREE.MeshBasicMaterial({ color: 0x00FF87, wireframe: true });

            const gyroRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.02, 16, 100), torusMat1);
            const gyroRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.02, 16, 100), torusMat2);
            const gyroRing3 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.02, 16, 100), torusMat3);

            gyroRing1.rotation.x = Math.PI / 4;
            gyroRing2.rotation.y = Math.PI / 3;
            gyroRing3.rotation.z = Math.PI / 6;

            quantumGroup.add(gyroRing1);
            quantumGroup.add(gyroRing2);
            quantumGroup.add(gyroRing3);

            // Vortex Particle Field
            const particleCount = 1200;
            const particleGeo = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const colorEmerald = new THREE.Color(0x00FF87);
            const colorGold = new THREE.Color(0xFFD166);

            for (let i = 0; i < particleCount; i++) {
                const radius = 2.5 + Math.random() * 6.0;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);

                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = radius * Math.cos(phi);

                const pickedColor = (i % 2 === 0) ? colorEmerald : colorGold;
                colors[i * 3] = pickedColor.r;
                colors[i * 3 + 1] = pickedColor.g;
                colors[i * 3 + 2] = pickedColor.b;
            }

            particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particleMat = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            const particleSystem = new THREE.Points(particleGeo, particleMat);
            scene.add(particleSystem);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0x111612, 1.2);
            scene.add(ambientLight);

            const keyGoldLight = new THREE.DirectionalLight(0xFFD166, 2.5);
            keyGoldLight.position.set(5, 7, 5);
            scene.add(keyGoldLight);

            const emeraldPointLight = new THREE.PointLight(0x00FF87, 3, 20);
            emeraldPointLight.position.set(0, 0, 0);
            scene.add(emeraldPointLight);

            function adjustCoreLayout() {
                if (window.innerWidth < 1024) {
                    quantumGroup.position.set(0, 0.2, -1);
                    quantumGroup.scale.set(0.75, 0.75, 0.75);
                } else {
                    // Positioned in hero right zone, comfortably below top navbar
                    quantumGroup.position.set(3.4, -0.6, 0);
                    quantumGroup.scale.set(0.9, 0.9, 0.9);
                }
            }
            adjustCoreLayout();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                adjustCoreLayout();
            });

            let clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);
                const time = clock.getElapsedTime();

                outerMesh.rotation.x += 0.003;
                outerMesh.rotation.y += 0.005;

                innerCore.rotation.x -= 0.008;
                innerCore.rotation.y += 0.012;

                gyroRing1.rotation.x += 0.015;
                gyroRing2.rotation.y += 0.02;
                gyroRing3.rotation.z += 0.018;

                const pulse = 1 + Math.sin(time * 3) * 0.15;
                singularity.scale.set(pulse, pulse, pulse);

                particleSystem.rotation.y = time * 0.04;

                const targetX = (mouseX / window.innerWidth - 0.5) * 1.5;
                const targetY = -(mouseY / window.innerHeight - 0.5) * 1.5;
                camera.position.x += (targetX - camera.position.x) * 0.05;
                camera.position.y += (targetY - camera.position.y) * 0.05;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            }
            animate();
        }
        initThreeScene();

        // -------------------------------------------------------------
        // Services Filter Logic
        // -------------------------------------------------------------
        window.filterServices = function(category) {
            document.querySelectorAll('.service-tab-btn').forEach(btn => {
                if (btn.getAttribute('data-filter') === category) {
                    btn.className = 'service-tab-btn px-4 py-2 rounded-full border border-cyber-emerald bg-cyber-emerald text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.4)]';
                } else {
                    btn.className = 'service-tab-btn px-4 py-2 rounded-full border border-slate-800 bg-obsidian-void text-slate-300 hover:border-champagne-gold hover:text-champagne-gold';
                }
            });

            document.querySelectorAll('.service-card-item').forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        // -------------------------------------------------------------
        // Service Details Modal Data & Handlers
        // -------------------------------------------------------------
        const serviceModalData = {
            '01': {
                tag: 'Service 01 · Web Engineering',
                title: 'Website Development',
                desc: 'We engineer blazing fast, responsive, and secure custom websites tailored to your exact business goals. Built with modern web standards to convert visitors into loyal clients.',
                features: ['Custom Frontend & Backend Architecture', 'Corporate, Startup & Brand Portals', 'Mobile-First Responsive Layouts', 'High-Converting E-Commerce Stores', 'PHP, React, Next.js & Modern Frameworks'],
                deliverables: ['Production-ready Source Code', 'Responsive Cross-Browser Testing', 'SEO Foundation & Core Web Vitals', 'SSL Certificate & Domain Deployment']
            },
            '02': {
                tag: 'Service 02 · Reliability',
                title: 'Website Maintenance & Management',
                desc: 'Keep your digital systems secure, error-free, and operating at peak performance with proactive ongoing maintenance and rapid troubleshooting.',
                features: ['Continuous Updates & Framework Patches', 'Speed Optimization & Caching Tuning', 'Malware Scanning & Security Hardening', 'Automated Database Backups', 'Zero-Downtime Bug Fixing'],
                deliverables: ['Monthly Health Audit Reports', 'SLA Response Guarantee', '24/7 Server Health Monitoring', 'Automated Cloud Snapshot Vault']
            },
            '03': {
                tag: 'Service 03 · Cloud',
                title: 'Cloud Solutions & Infrastructure',
                desc: 'Deploy and scale your applications with high-availability cloud architecture on Amazon Web Services (AWS) with automated scaling and enterprise security.',
                features: ['AWS Architecture & Migration', 'Multi-AZ Database Replication', 'Docker & Container Cluster Deployment', 'CloudFront Global CDN & Caching', 'Enterprise Disaster Recovery'],
                deliverables: ['Production AWS Topology Map', 'Terraform / CloudFormation Configs', 'IAM Security Hardening Policy', 'Automated Alerting & CloudWatch Alarms']
            },
            '04': {
                tag: 'Service 04 · Enterprise Portals',
                title: 'Web Portal Development',
                desc: 'Centralized enterprise platforms that streamline workflows for educational campuses, healthcare operations, corporate teams, and member communities.',
                features: ['Multi-Tenant User Roles & RBAC', 'Student & Employee Dashboards', 'Payment Gateway Integration', 'Automated Invoicing & SMS/WhatsApp APIs', 'Custom Data Visualizations'],
                deliverables: ['Modular Full-Stack Web Portal', 'Comprehensive API Documentation', 'Staff Training & Admin Manual', 'Dedicated Production Deployment']
            },
            '05': {
                tag: 'Service 05 · AI & Automation',
                title: 'AI Integration & Automation',
                desc: 'Integrate deterministic AI agent swarms, vector RAG knowledge retrieval, and business process automation to eliminate manual repetitive labor.',
                features: ['Proprietary RAG Vector Knowledge Base', '24/7 Autonomous WhatsApp & Web Agents', 'Automated Document OCR & Summarization', 'Webhook Integrations with CRM & ERP', 'Predictive Analytics & Smart Funnels'],
                deliverables: ['Trained Custom AI Agent Model', 'Vector Embeddings Pipeline', 'WhatsApp Business Webhook Integration', 'Monitoring Dashboard with Latency Telemetry']
            },
            '06': {
                tag: 'Service 06 · Growth',
                title: 'Digital Marketing & Growth',
                desc: 'Generate predictable revenue with data-backed search engine optimization, conversion rate optimization (CRO), and targeted acquisition campaigns.',
                features: ['Technical & On-Page SEO Architecture', 'High-Converting Google Search Ads', 'Targeted B2B & B2C Social Campaigns', 'Content Marketing & Authority Building', 'Online Reputation Management (ORM)'],
                deliverables: ['Target Keyword Ranking Reports', 'Ad Campaign Setup & A/B Copy Testing', 'Google Analytics 4 & Conversion Tracking', 'Monthly ROI & Attribution Telemetry']
            }
        };

        window.openServiceModal = function(id) {
            const data = serviceModalData[id];
            if (!data) return;

            const svgMap = {
                '01': `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF87" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
                '02': `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
                '03': `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF87" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
                '04': `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
                '05': `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#00FF87" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
                '06': `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`
            };
            const iconCont = document.getElementById('modal-icon-container');
            if (iconCont) {
                iconCont.innerHTML = svgMap[id] || svgMap['01'];
            }

            document.getElementById('modal-tag').textContent = data.tag;
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-desc').textContent = data.desc;

            const feats = document.getElementById('modal-features');
            feats.innerHTML = data.features.map(f => `<li class="flex items-center gap-2"><span class="text-cyber-emerald">✔</span> ${f}</li>`).join('');

            const dels = document.getElementById('modal-deliverables');
            dels.innerHTML = data.deliverables.map(d => `<span class="px-2.5 py-1 rounded bg-obsidian-void border border-slate-800 text-slate-300">${d}</span>`).join('');

            document.getElementById('service-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeServiceModal = function() {
            document.getElementById('service-modal').classList.add('hidden');
        };

        // -------------------------------------------------------------
        // Strategy Call Modal
        // -------------------------------------------------------------
        window.openCallModal = function() {
            document.getElementById('call-modal').classList.remove('hidden');
        };

        window.closeCallModal = function() {
            document.getElementById('call-modal').classList.add('hidden');
        };

        // -------------------------------------------------------------
        // FAQ Accordion Toggle
        // -------------------------------------------------------------
        window.toggleFaq = function(btn) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isHidden = content.classList.contains('hidden');

            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

            if (isHidden) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(45deg)';
            }
        };

        // -------------------------------------------------------------
        // AI Demo Chatbot Logic
        // -------------------------------------------------------------
        const aiChatBox = document.getElementById('ai-chat-messages');
        const aiInput = document.getElementById('ai-chat-input');
        const aiSendBtn = document.getElementById('ai-chat-send');

        const aiResponses = {
            'services': "TechNxt delivers 6 core IT disciplines: 1) Custom Website Development, 2) Website Maintenance, 3) AWS Cloud Architecture, 4) Enterprise Web Portals, 5) AI Integration & Automation, and 6) Digital Marketing & Growth.",
            'location': "TechNxt's registered headquarters is located at 505, Mahabir Tower, Main Road, Ranchi, Jharkhand – 834001, India.",
            'mvp': "Our agile MVP delivery timeline typically ranges from 2 to 4 weeks depending on architectural complexity, with continuous weekly milestone staging.",
            'default': "Hello! I am the TechNxt AI Assistant. We engineer bespoke web platforms, AWS cloud microservices, and autonomous AI workflows with zero downtime."
        };

        function addChatMessage(text, sender) {
            if (!aiChatBox) return;
            const div = document.createElement('div');
            div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} chat-bubble mb-3`;
            div.innerHTML = sender === 'user' 
                ? `<div class="max-w-[80%] rounded-2xl px-4 py-2 text-xs bg-cyber-emerald text-black font-semibold rounded-tr-none shadow-sm">${text}</div>`
                : `<div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs bg-obsidian-void border border-slate-800 text-slate-200 rounded-tl-none shadow-sm flex items-start gap-2">
                     <span class="w-2 h-2 rounded-full bg-cyber-emerald mt-1 shrink-0"></span>
                     <span>${text}</span>
                   </div>`;
            aiChatBox.appendChild(div);
            aiChatBox.scrollTop = aiChatBox.scrollHeight;
        }

        window.askAiPrompt = function(query) {
            addChatMessage(query, 'user');
            const lower = query.toLowerCase();
            let reply = aiResponses['default'];
            if (lower.includes('service') || lower.includes('offer')) reply = aiResponses['services'];
            else if (lower.includes('office') || lower.includes('location') || lower.includes('ranchi')) reply = aiResponses['location'];
            else if (lower.includes('mvp') || lower.includes('time') || lower.includes('turnaround')) reply = aiResponses['mvp'];

            setTimeout(() => addChatMessage(reply, 'ai'), 450);
        };

        if (aiSendBtn && aiInput) {
            aiSendBtn.addEventListener('click', () => {
                const val = aiInput.value.trim();
                if (!val) return;
                aiInput.value = '';
                askAiPrompt(val);
            });
            aiInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    aiSendBtn.click();
                }
            });
        }

        // -------------------------------------------------------------
        // Contact Form Submission (WhatsApp Integration)
        // -------------------------------------------------------------
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('contact-name').value;
                const phone = document.getElementById('contact-phone').value;
                const email = document.getElementById('contact-email').value;
                const service = document.getElementById('contact-service').value;
                const msg = document.getElementById('contact-message').value;

                const text = `*New TechNxt Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Service:* ${encodeURIComponent(service)}%0A*Message:* ${encodeURIComponent(msg)}`;
                window.open(`https://wa.me/919801506511?text=${text}`, '_blank');
            });
        }

        const callForm = document.getElementById('call-booking-form');
        if (callForm) {
            callForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('call-name').value;
                const phone = document.getElementById('call-phone').value;
                const date = document.getElementById('call-date').value;
                const slot = document.getElementById('call-slot').value;

                const text = `*Strategy Call Booking*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Date:* ${encodeURIComponent(date)}%0A*Slot:* ${encodeURIComponent(slot)}`;
                window.open(`https://wa.me/919801506511?text=${text}`, '_blank');
            });
        }

        // =====================================================================
        // DPDP ACT 2026: CONSENT MANAGEMENT, PREFERENCES & DATA RIGHTS JS
        // =====================================================================
        // Purge old blocking keys so it reliably appears on entry
        try {
            localStorage.removeItem('technxt_dpdp_banner_dismissed');
            sessionStorage.removeItem('technxt_dpdp_session_seen');
        } catch(e) {}

        window.addEventListener('DOMContentLoaded', () => {
            const formalConsent = localStorage.getItem('technxt_dpdp_consent');
            const banner = document.getElementById('dpdp-banner');

            if (!banner) return;

            // If user has already formally accepted/rejected, keep it hidden
            if (formalConsent) {
                banner.classList.add('hidden');
                return;
            }

            // Check if user is navigating/switching between internal pages
            const isPageSwitch = sessionStorage.getItem('technxt_page_switched');

            if (isPageSwitch) {
                // User is navigating internal pages -> do not pop up again on page switch
                banner.classList.add('hidden');
            } else {
                // Initial entrance to the site -> Show the banner smoothly after 500ms!
                setTimeout(() => {
                    banner.classList.remove('hidden');
                    // Force reflow
                    void banner.offsetWidth;
                    banner.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-8');
                    banner.classList.add('opacity-100', 'translate-y-0');
                }, 500);
            }
        });

        // Track internal page navigation so banner doesn't repeatedly pop up on every page click
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                const href = link.getAttribute('href') || '';
                if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                    sessionStorage.setItem('technxt_page_switched', 'true');
                }
            }
        });

        window.dismissDpdpBanner = function() {
            const banner = document.getElementById('dpdp-banner');
            if (banner) {
                banner.classList.remove('opacity-100', 'translate-y-0');
                banner.classList.add('opacity-0', 'pointer-events-none', 'translate-y-8');
                setTimeout(() => banner.classList.add('hidden'), 400);
            }
            // Mark so it will not pop up on page switch
            sessionStorage.setItem('technxt_page_switched', 'true');
        };

        window.acceptAllDpdp = function() {
            localStorage.setItem('technxt_dpdp_consent', 'accepted');
            localStorage.setItem('technxt_dpdp_timestamp', new Date().toISOString());
            dismissDpdpBanner();
        };

        window.rejectNonEssentialDpdp = function() {
            localStorage.setItem('technxt_dpdp_consent', 'essential_only');
            localStorage.setItem('technxt_dpdp_timestamp', new Date().toISOString());
            dismissDpdpBanner();
        };

        
        // =====================================================================
        // CORPORATE & LEGAL MODALS JS (TERMS, REFUND, SUPPORT)
        // =====================================================================
        window.openTermsModal = function() {
            document.getElementById('terms-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeTermsModal = function() {
            document.getElementById('terms-modal').classList.add('hidden');
        };

        window.openRefundModal = function() {
            document.getElementById('refund-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeRefundModal = function() {
            document.getElementById('refund-modal').classList.add('hidden');
        };

        window.openSupportModal = function() {
            document.getElementById('support-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeSupportModal = function() {
            document.getElementById('support-modal').classList.add('hidden');
        };

        window.openDpdpModal = function() {
            document.getElementById('dpdp-policy-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeDpdpModal = function() {
            document.getElementById('dpdp-policy-modal').classList.add('hidden');
        };

        window.openDataRightsModal = function() {
            document.getElementById('dpdp-rights-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeDataRightsModal = function() {
            document.getElementById('dpdp-rights-modal').classList.add('hidden');
        };

        window.openPreferencesModal = function() {
            document.getElementById('dpdp-pref-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closePreferencesModal = function() {
            document.getElementById('dpdp-pref-modal').classList.add('hidden');
        };

        window.openDpoModal = function() {
            document.getElementById('dpdp-dpo-modal').classList.remove('hidden');
            if (window.lucide) if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch(e) {} }
        };

        window.closeDpoModal = function() {
            document.getElementById('dpdp-dpo-modal').classList.add('hidden');
        };

        window.saveCustomPreferences = function() {
            const comm = document.getElementById('pref-comm')?.checked;
            const tele = document.getElementById('pref-telemetry')?.checked;
            localStorage.setItem('technxt_dpdp_consent', JSON.stringify({ essential: true, communications: comm, telemetry: tele }));
            localStorage.setItem('technxt_dpdp_timestamp', new Date().toISOString());
            closePreferencesModal();
            dismissDpdpBanner();
            alert('Your DPDP Act 2026 consent preferences have been updated.');
        };

        window.revokeAllConsent = function() {
            localStorage.removeItem('technxt_dpdp_consent');
            localStorage.removeItem('technxt_dpdp_timestamp');
            closePreferencesModal();
            const banner = document.getElementById('dpdp-banner');
            if (banner) banner.classList.remove('hidden');
            alert('All non-essential consent has been revoked under Section 6(4) of the DPDP Act.');
        };

        window.handleDataRightsSubmit = function(e) {
            e.preventDefault();
            const type = document.getElementById('rights-type').value;
            const name = document.getElementById('rights-name').value;
            const email = document.getElementById('rights-email').value;
            const phone = document.getElementById('rights-phone').value;
            const details = document.getElementById('rights-details').value;

            const ticketId = 'DPDP-' + Math.floor(1000 + Math.random() * 9000);
            const ticketElem = document.getElementById('rights-ticket-id');
            if (ticketElem) ticketElem.textContent = '#' + ticketId;

            const successMsg = document.getElementById('rights-success-msg');
            if (successMsg) successMsg.classList.remove('hidden');

            // Dispatch notice via WhatsApp direct link option
            const whatsappSummary = `*DPDP Act 2026 Statutory Request*%0A*Ticket ID:* %23${ticketId}%0A*Right:* ${encodeURIComponent(type)}%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Details:* ${encodeURIComponent(details)}`;
            setTimeout(() => {
                window.open(`https://wa.me/919801506511?text=${whatsappSummary}`, '_blank');
            }, 1000);
        };

    