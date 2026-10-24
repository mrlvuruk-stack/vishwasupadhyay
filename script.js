/* ==========================================================================
   INTERACTIVE MECHANISMS & SIMULATORS FOR VISHWAS UPADHYAY PORTFOLIO
   ========================================================================== */

function init() {
  
  /* ==========================================================================
     1. DARK/LIGHT THEME SWITCHER
     ========================================================================== */
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
    });
  }

  /* ==========================================================================
     2. NAVIGATION SCROLL SPY & MOBILE MENU TOGGLE
     ========================================================================== */
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const navbarMenu = document.getElementById("navbar-menu");
  
  if (menuToggleBtn && navbarMenu) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navbarMenu.classList.toggle("show");
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", () => {
      navbarMenu.classList.remove("show");
    });
  }

  // Scrollspy: update active link in navbar on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link-item");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 100; // Offset for sticky nav

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    if (currentId) {
      navItems.forEach(item => {
        item.classList.remove("active");
        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${currentId}`) {
          item.classList.add("active");
        }
      });
    }
  });

  /* ==========================================================================
     3. TYPEWRITER HERO SUBTITLE ANIMATION
     ========================================================================== */
  const typewriterText = document.getElementById("typewriter-text");
  const subtitles = [
    "Smart Contract Engineering",
    "Decentralized Applications",
    "Local AI Agent Deployments",
    "Health-Tech IoT Gateways"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typewriterText) return;
    
    const currentWord = subtitles[wordIndex];
    if (isDeleting) {
      // Remove characters
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add characters
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % subtitles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typewriter loops
  setTimeout(type, 1000);

  /* ==========================================================================
     4. SKILLS PROGRESS ANIMATION ON SCROLL
     ========================================================================== */
  const skillsSection = document.getElementById("tech");
  const progressBars = document.querySelectorAll(".skill-progress-fill");

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetPct = bar.getAttribute("data-pct");
          bar.style.width = `${targetPct}%`;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  /* ==========================================================================
     5. ABOUT SECTION ACCORDION LOGIC
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains("active");
      
      // Close all accordion panels
      document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("active");
      });

      // Toggle active state
      if (!isActive) {
        parent.classList.add("active");
      }
    });
  });

  // Pulse button badge action
  const knowMoreBtn = document.getElementById("know-more-btn");
  const pulseBadgeMsg = document.getElementById("pulse-badge-msg");
  if (knowMoreBtn && pulseBadgeMsg) {
    let telemetryCount = 0;
    knowMoreBtn.addEventListener("click", () => {
      telemetryCount++;
      pulseBadgeMsg.textContent = `Telemetry Handshake Active! Ping #${telemetryCount} verified.`;
      pulseBadgeMsg.style.color = "var(--color-secondary)";
      setTimeout(() => {
        pulseBadgeMsg.style.color = "var(--text-secondary)";
      }, 1000);
    });
  }

  /* ==========================================================================
     6. RETRO TERMINAL SHELL EMULATOR
     ========================================================================== */
  const cmdInput = document.getElementById("terminal-cmd-input");
  const historyContainer = document.getElementById("terminal-history");
  const screenContainer = document.getElementById("terminal-screen");

  if (screenContainer && cmdInput) {
    screenContainer.addEventListener("click", (e) => {
      if (e.target !== cmdInput) {
        cmdInput.focus();
      }
    });
  }

  function logToTerminal(text, type = "default") {
    if (!historyContainer || !screenContainer) return;
    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    line.innerHTML = text;
    historyContainer.appendChild(line);
    screenContainer.scrollTop = screenContainer.scrollHeight;
  }

  const commandOutputs = {
    help: `
Available commands:
  <span style="color: var(--color-primary);">about</span>       - Print brief professional bio
  <span style="color: var(--color-primary);">blockchain</span>  - Manually mine a new block hash
  <span style="color: var(--color-primary);">skills</span>      - Print technical core competencies
  <span style="color: var(--color-primary);">projects</span>    - List all technical projects
  <span style="color: var(--color-primary);">experience</span>  - Show professional history
  <span style="color: var(--color-primary);">education</span>   - Display college credentials
  <span style="color: var(--color-primary);">contact</span>     - View developer contact methods
  <span style="color: var(--color-primary);">clear</span>       - Clear the screen buffer
    `,
    about: `
<strong>VISHWAS UPADHYAY (Mr. LV)</strong>
B.Tech Computer Science student focused heavily on Blockchain development, smart contracts,
decentralized application structures, and local AI agent tools.
Conferred CSI Programming Excellence Award (2025).
    `,
    skills: `
<strong>Technical Skills Inventory:</strong>
- <strong>Languages & Core:</strong> Python, Solidity, JavaScript (ES6+), Dart, C++, Java, SQL, HTML5, CSS3.
- <strong>Blockchain & Web3:</strong> Smart Contracts, Ethereum, Web3.js, DeFi, NFT Development, IPFS.
- <strong>AI & LLMs:</strong> Supervised Fine-Tuning (SFT), LLM Post-Training, TPU Optimization, TensorFlow, Pandas.
- <strong>Web & Mobile:</strong> React.js, Node.js, Express.js, Flutter, React Native, REST APIs.
- <strong>Tools & Business:</strong> Git, AWS/GCP, Firebase, Google Analytics, SEO/SEM, Kaggle.
    `,
    projects: `
<strong>Technical Projects Portfolio (18 Individual Projects):</strong>

<u>Blockchain & Web3:</u>
- <strong>HealthChain</strong> [Solidity, Ethereum, IPFS] - Medical records with RBAC.
- <strong>Zero-Trust MFA Gateway</strong> [Solidity, Node.js, OAuth2] - Web3 wallet signatures gateway.

<u>AI & Automation:</u>
- <strong>Kali AI</strong> [Python, Ollama, LangChain] - Offline assistant with local RAG.
- <strong>Brand Architect AI</strong> [Python, OpenAI API, LangChain] - Generative content workflow.
- <strong>Autonomous CRM</strong> [Node.js, Express, Postgres] - Prospecting & outreach system.
- <strong>Content Calendar Agent</strong> [Python, Streamlit, LLMs] - Content strategist agent.

<u>Analytics & ML:</u>
- <strong>ExplainLLM</strong> [Python, Google TPU, TensorFlow] - Post-training explainable reasoning.
- <strong>Toxic Tweet Classifier</strong> [Python, Scikit-Learn, Pandas] - High-accuracy NLP classifier.
- <strong>Titanic Survival ML</strong> [Python, Scikit-Learn, Pandas] - Kaggle ensemble classification.
- <strong>Sentiment Retention Agent</strong> [Node.js, TFJS, Websockets] - Chat sentiment detector.
- <strong>Financial Intel Dashboard</strong> [Python, Streamlit, Prophet] - Investment Prophet forecasts.
- <strong>Supply Chain Resilience</strong> [Python, NetworkX, Pandas] - Graph logistics failure simulator.

<u>Health & Advanced:</u>
- <strong>URUK Ecosystem</strong> [Next.js, React, SVGs] - ICU vitals telemetry monitor.
- <strong>Svastra AI</strong> [Next.js, Three.js, GSAP] - Immersive 3D WebGL investor portal.
- <strong>MedAI Diagnostics</strong> [Python, TensorFlow, Streamlit] - Biometric diagnostic risk calculator.
- <strong>CV Medical Assistant</strong> [Python, OpenCV, PyTorch] - CNN anomaly highlight tool.
- <strong>RAG Knowledge Graph</strong> [Neo4j, LlamaIndex, Python] - Structured vector-graph indexing.
    `,
    experience: `
<strong>Professional Work Journey:</strong>
- <strong>Chief Marketing Manager</strong> @ Pooja Enterprise (2021 - 2022)
  * Spearheaded SEO/SEM and CRM operations scaling brand visibility by 40%.
  * Improved customer retention by 25% via custom loyalty databases.
  * Managed cross-functional teams of 15+; administered a 5L+ campaign budget.
- <strong>State Football Player & Captain</strong> @ Uttar Pradesh Team / College (2022)
  * Selected for Uttar Pradesh State football squad.
  * Appointed college captain, leading team coordination and strategy.
    `,
    education: `
<strong>Education & Credentials:</strong>
- <strong>B.Tech in Computer Science &amp; Engineering</strong>
  * SKC LNCT College, Indore (2025 - 2029 Expected)
  * Focus: Blockchain systems, cryptography, healthcare telemetry edge computing.
- <strong>CSI Programming Excellence Award</strong> (May 2025)
  * Awarded for outstanding coding skills by the Computer Society of India.
- <strong>IIT Delhi Mentorship</strong> (2025)
  * Recognized for UPI encrypted database and secure routing protocols research.
    `,
    contact: `
<strong>Developer Contact Methods:</strong>
- <strong>Primary Email:</strong> vishwasupadhyay2026@gmail.com
- <strong>Founder Email:</strong> mrlv.uruk@gmail.com
- <strong>WhatsApp/Call:</strong> +91 9109475522
- <strong>LinkedIn:</strong> linkedin.com/in/mr-lv-uruk-594455257
- <strong>GitHub:</strong> github.com/mrlv-max
    `
  };

  if (cmdInput) {
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const inputVal = cmdInput.value.trim();
        const cleanCmd = inputVal.toLowerCase();
        
        logToTerminal(`mrlv@solidity:~$ ${inputVal}`, "cmd-prompt");
        
        if (cleanCmd !== "") {
          if (cleanCmd === "clear") {
            if (historyContainer) historyContainer.innerHTML = "";
          } else if (cleanCmd === "blockchain") {
            mineBlockNode();
          } else if (commandOutputs[cleanCmd]) {
            logToTerminal(commandOutputs[cleanCmd].trim());
          } else {
            logToTerminal(`Command not found: '${inputVal}'. Type 'help' for a list of available command sets.`, "error-msg");
          }
        }
        
        cmdInput.value = "";
      }
    });
  }

  /* ==========================================================================
     7. BLOCKCHAIN BLOCK MINER SIMULATOR
     ========================================================================== */
  const blockContainer = document.getElementById("block-tracker-container");
  const sidebarBlockCount = document.getElementById("sidebar-block-count");
  let blockHeight = 2489;

  function generateBlockHash() {
    const chars = "0123456789abcdef";
    let hash = "0x";
    for (let i = 0; i < 8; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    hash += "...";
    for (let i = 0; i < 4; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  }

  function mineBlockNode(isAuto = false) {
    blockHeight++;
    if (sidebarBlockCount) {
      sidebarBlockCount.textContent = blockHeight;
    }

    if (blockContainer) {
      // Create block connector link arrow
      const link = document.createElement("div");
      link.className = "block-link";
      link.textContent = "➔";
      blockContainer.appendChild(link);

      // Create new block visual node
      const block = document.createElement("div");
      block.className = "block-node";
      block.innerHTML = `
        <div>BLOCK #${blockHeight}</div>
        <div class="block-node-hash">${generateBlockHash()}</div>
      `;
      blockContainer.appendChild(block);

      // Scroll block log view to the right
      blockContainer.scrollLeft = blockContainer.scrollWidth;

      // Maintain reasonable DOM limit by cleaning old nodes
      if (blockContainer.children.length > 9) {
        blockContainer.removeChild(blockContainer.firstChild); // remove link
        blockContainer.removeChild(blockContainer.firstChild); // remove node
      }

      if (!isAuto) {
        logToTerminal(`Mined Block #${blockHeight} successfully! Gas fee: 21,000. Hash: ${generateBlockHash()}`, "success-msg");
      }
    }
  }

  // Periodic automatic block mining loop every 7 seconds
  setInterval(() => {
    mineBlockNode(true);
  }, 7000);

  /* ==========================================================================
     8. ECG REAL-TIME TELEMETRY GRAPH
     ========================================================================== */
  const ecgPath = document.getElementById("ecg-line-path");
  const sidebarHR = document.getElementById("sidebar-hr-count");
  const telemetryHR = document.getElementById("telemetry-hr-val");
  
  let animationFrameId = null;
  const width = 1000;
  const height = 100;
  const centerY = height / 2;
  const points = [];
  
  for (let i = 0; i < width; i += 2) {
    points.push({ x: i, y: centerY });
  }

  let index = 0;
  let heartRate = 72;
  
  setInterval(() => {
    heartRate = 70 + Math.floor(Math.random() * 8);
    const hrString = `${heartRate} BPM`;
    if (sidebarHR) sidebarHR.textContent = hrString;
    if (telemetryHR) telemetryHR.textContent = hrString;
  }, 3500);

  function drawECG() {
    index = (index + 4) % width;
    
    for (let i = 0; i < 4; i++) {
      const idx = (index + i) % points.length;
      const x = points[idx].x;
      const cycleTime = 160;
      const cyclePos = idx % cycleTime;
      
      let deltaY = 0;
      
      if (cyclePos > 30 && cyclePos <= 38) {
        // P Wave
        deltaY = -4 * Math.sin(((cyclePos - 30) / 8) * Math.PI);
      } else if (cyclePos > 42 && cyclePos <= 45) {
        // Q Wave
        deltaY = 3 * Math.sin(((cyclePos - 42) / 3) * Math.PI);
      } else if (cyclePos > 45 && cyclePos <= 50) {
        // R Wave
        deltaY = -35 * Math.sin(((cyclePos - 45) / 5) * Math.PI);
      } else if (cyclePos > 50 && cyclePos <= 54) {
        // S Wave
        deltaY = 12 * Math.sin(((cyclePos - 50) / 4) * Math.PI);
      } else if (cyclePos > 58 && cyclePos <= 72) {
        // T Wave
        deltaY = -7 * Math.sin(((cyclePos - 58) / 14) * Math.PI);
      }
      
      const noise = (Math.random() - 0.5) * 1.2;
      points[idx].y = centerY + deltaY + noise;
    }
    
    let pathString = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathString += ` L ${points[i].x} ${points[i].y}`;
    }
    
    if (ecgPath) {
      ecgPath.setAttribute("d", pathString);
    }
    
    animationFrameId = requestAnimationFrame(drawECG);
  }
  
  drawECG();

  window.addEventListener("resize", () => {
    // Optional recalculations
  });

  /* ==========================================================================
     9. PROJECTS FILTERING FUNCTIONALITY
     ========================================================================== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
