document.addEventListener('DOMContentLoaded', () => {
    console.log('[LOG] Script principal (main.js) démarré.');

    // --- LOGIQUE POUR LES STATUTS SERVEUR ---
    const SERVER_IDS = {
        vanilla: '35478470',
        modded:  '35479290'
    };
    const updateServerDisplay = (serverKey, serverData) => {
        const serverBox = document.getElementById(`server-${serverKey}`);
        if (!serverBox) return;
        const statusDot = serverBox.querySelector('.status-dot');
        const playersSpan = serverBox.querySelector('.players');
        const maxPlayersSpan = serverBox.querySelector('.max-players');
        if (serverData.status === 'online') {
            statusDot.classList.remove('offline'); statusDot.classList.add('online');
            playersSpan.textContent = serverData.players; maxPlayersSpan.textContent = serverData.maxPlayers;
        } else {
            statusDot.classList.remove('online'); statusDot.classList.add('offline');
            playersSpan.textContent = 'HORS'; maxPlayersSpan.textContent = 'LIGNE';
        }
    };
    const fetchServerStatus = async () => {
        for (const key in SERVER_IDS) {
            const id = SERVER_IDS[key]; if (id.includes('METTEZ') || id.includes('ID_DE')) continue;
            const apiUrl = `https://api.battlemetrics.com/servers/${id}`;
            try {
                const response = await fetch(apiUrl); if (!response.ok) throw new Error('API Response not OK');
                const data = await response.json();
                const serverInfo = { status: data.data.attributes.status, players: data.data.attributes.players, maxPlayers: data.data.attributes.maxPlayers };
                updateServerDisplay(key, serverInfo);
            } catch (error) {
                console.error(`Erreur fetch pour serveur ${key}:`, error);
                updateServerDisplay(key, { status: 'offline' });
            }
        }
    };
    fetchServerStatus();
    setInterval(fetchServerStatus, 60000);

    // --- LOGIQUE POUR LES ONGLETS DU RÈGLEMENT ---
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.rules-content');
    if (tabs.length > 0) {
        console.log('[LOG] Système d\'onglets initialisé.');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('active'));
                contents.forEach(item => item.classList.remove('active'));
                const target = document.getElementById(tab.dataset.tab);
                tab.classList.add('active');
                target.classList.add('active');
            });
        });
    }

    // --- LOGIQUE POUR LE MENU HAMBURGER ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    if (hamburger && mainNav) {
        console.log('[LOG] Menu hamburger initialisé.');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
        });
    }

    // --- LOGIQUE POUR L'ACCORDÉON (PAGE MODS) ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        console.log('[LOG] Accordéon initialisé.');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            header.addEventListener('click', () => {
                const isActive = header.classList.contains('active');
                accordionItems.forEach(otherItem => {
                    otherItem.querySelector('.accordion-header').classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                });
                if (!isActive) {
                    header.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    // --- LOGIQUE POUR L'EFFET TYPEWRITER (PAGE GULFCOAST) ---
    const typewriterTarget = document.getElementById('typewriter-target');
    if (typewriterTarget) {
        console.log('[LOG] Cible typewriter trouvée. Tentative d\'initialisation.');
        try {
            const options = {
                strings: ["Nouveau théâtre d'opérations : GULF COAST.^1000\nUne carte 2x plus grande qu'Everon.^500\nPlus de points d'intérêts,^500 plus de lieux,^500 plus immersive.^1000\n\nFactions engagées : OTAN vs. URSS.^1000\n\nDe nouveaux atouts matériels sont autorisés.^500\nConsultez la liste ci-dessous pour le briefing complet.^1000\n\nFIN DE TRANSMISSION."],
                typeSpeed: 40,
                startDelay: 500,
                loop: false,
                showCursor: true,
                cursorChar: '_',
            };
            new Typed(typewriterTarget, options);
            console.log('[SUCCESS] Animation Typed.js lancée !');
        } catch (e) {
            console.error('[ERREUR FATALE] Échec du lancement de Typed.js. La librairie est-elle bien chargée ?', e);
        }
    }
});