// Immediately invoked function expression to create a secure scope
(function() {
    'use strict';
    
    // Anti-debugging techniques
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.key === 'u') ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 's') ||
            (e.metaKey && e.altKey && 'I'.charCodeAt(0) === 73) ||
            (e.metaKey && e.altKey && 'J'.charCodeAt(0) === 74) ||
            (e.metaKey && e.altKey && 'C'.charCodeAt(0) === 67)
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    
    // DevTools detection
    let devtools = { open: false, orientation: null };
    const threshold = 160;
    
    setInterval(function() {
        if (
            window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold
        ) {
            if (!devtools.open) {
                devtools.open = true;
                showDevToolsWarning();
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // Console clearing and warning
    console.clear();
    console.log("%cStop!", "color: red; font-size: 40px; font-weight: bold;");
    console.log("%cThis is a browser feature intended for developers. Do not enter any code here or you may be compromised.", "color: black; font-size: 20px;");
    
    // Show warning when console is opened
    let consoleOpened = false;
    const devtoolsDetector = document.querySelector('.devtools-detector');
    
    const checkConsole = setInterval(function() {
        if (
            window.console.firebug || 
            window.console.log.toString().includes('native code') === false ||
            devtoolsDetector.offsetHeight === 0 || 
            devtoolsDetector.offsetWidth === 0
        ) {
            if (!consoleOpened) {
                consoleOpened = true;
                showDevToolsWarning();
            }
        }
    }, 1000);
    
    // Show DevTools warning
    function showDevToolsWarning() {
        const warning = document.getElementById('console-warning');
        warning.style.display = 'flex';
        
        // Log the violation
        const violation = {
            timestamp: new Date().toISOString(),
            action: 'DevTools opened',
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // In a real application, you would send this to your server
        console.log('Security violation:', violation);
        
        // Play warning sound if enabled
        if (typeof soundEnabled !== 'undefined' && soundEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAA');
            audio.play();
        }
    }
    
    // Close warning button
    document.getElementById('close-warning').addEventListener('click', function() {
        document.getElementById('console-warning').style.display = 'none';
        // In a real application, you might log this action or take other measures
    });
    
    // Disable inspect element on images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });
    
    // Obfuscate critical functions
    const secureFunctions = {
        initApp: function() {
            // Original initApp code
        },
        updateBalance: function() {
            // Original updateBalance code
        }
        // Add other critical functions here
    };
    
    // Rest of your existing JavaScript code
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize app
        initApp();
    });
    
    // Global variables
    let balance = 10000;
    let currentGame = 'crash';
    let gameHistory = [];
    let soundEnabled = true;
    let musicEnabled = false;
    let notificationsEnabled = true;
    let animationSpeed = 'normal';
    let theme = 'dark';
    let crashGameActive = false;
    let crashMultiplier = 1.00;
    let crashInterval;
    let crashChart;
    let profitChart;
    let userStats = {
        totalWagered: 0,
        totalWon: 0,
        gamesPlayed: 0,
        profitHistory: []
    };
    
    // Initialize the app
    function initApp() {
        // Load saved data
        loadUserData();
        
        // Update UI
        updateBalance();
        updateStats();
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize games
        initGames();
        
        // Initialize charts
        initCharts();
        
        // Start live stats updates
        startLiveStatsUpdates();
        
        // Show home page by default
        showPage('home');
    }
    
    // Load user data from localStorage
    function loadUserData() {
        const savedBalance = localStorage.getItem('steakBalance');
        const savedGameHistory = localStorage.getItem('steakGameHistory');
        const savedUserStats = localStorage.getItem('steakUserStats');
        const savedSettings = localStorage.getItem('steakSettings');
        
        if (savedBalance) {
            balance = parseInt(savedBalance);
        }
        
        if (savedGameHistory) {
            gameHistory = JSON.parse(savedGameHistory);
        }
        
        if (savedUserStats) {
            userStats = JSON.parse(savedUserStats);
        }
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
            musicEnabled = settings.musicEnabled !== undefined ? settings.musicEnabled : false;
            notificationsEnabled = settings.notificationsEnabled !== undefined ? settings.notificationsEnabled : true;
            animationSpeed = settings.animationSpeed || 'normal';
            theme = settings.theme || 'dark';
            
            // Apply theme
            applyTheme(theme);
            
            // Update settings UI
            document.getElementById('sound-toggle').checked = soundEnabled;
            document.getElementById('music-toggle').checked = musicEnabled;
            document.getElementById('notification-toggle').checked = notificationsEnabled;
            document.getElementById('animation-speed').value = animationSpeed;
            document.getElementById('theme-select').value = theme;
        }
    }
    
    // Save user data to localStorage
    function saveUserData() {
        localStorage.setItem('steakBalance', balance);
        localStorage.setItem('steakGameHistory', JSON.stringify(gameHistory));
        localStorage.setItem('steakUserStats', JSON.stringify(userStats));
        
        const settings = {
            soundEnabled,
            musicEnabled,
            notificationsEnabled,
            animationSpeed,
            theme
        };
        localStorage.setItem('steakSettings', JSON.stringify(settings));
    }
    
    // Initialize event listeners
    function initEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                showPage(page);
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Game selection
        document.querySelectorAll('.game-item').forEach(item => {
            item.addEventListener('click', function() {
                const game = this.getAttribute('data-game');
                selectGame(game);
            });
        });
        
        // User menu
        document.querySelector('.user-avatar').addEventListener('click', function() {
            document.querySelector('.user-dropdown').classList.toggle('active');
        });
        
        // Close user menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu')) {
                document.querySelector('.user-dropdown').classList.remove('active');
            }
        });
        
        // Deposit button
        document.getElementById('deposit-btn').addEventListener('click', function() {
            openModal('deposit-modal');
        });
        
        // Withdraw button
        document.getElementById('withdraw-btn').addEventListener('click', function() {
            openModal('withdraw-modal');
            document.getElementById('withdraw-balance').textContent = `$${balance.toLocaleString()}`;
        });
        
        // Settings button
        document.getElementById('settings-btn').addEventListener('click', function() {
            openModal('settings-modal');
        });
        
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to logout? Your progress will be saved.')) {
                saveUserData();
                showNotification('You have been logged out successfully.', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        });
        
        // Play Now button
        document.getElementById('play-now-btn').addEventListener('click', function() {
            showPage('games');
            document.querySelector('.nav-link[data-page="games"]').click();
        });
        
        // Learn More button
        document.getElementById('learn-more-btn').addEventListener('click', function() {
            showPage('responsible');
            document.querySelector('.nav-link[data-page="responsible"]').click();
        });
        
        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal.id);
            });
        });
        
        // Modal background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this.id);
                }
            });
        });
        
        // Deposit options
        document.querySelectorAll('.deposit-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.deposit-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('custom-amount').value = '';
            });
        });
        
        // Custom deposit amount
        document.getElementById('custom-amount').addEventListener('input', function() {
            document.querySelectorAll('.deposit-option').forEach(o => o.classList.remove('selected'));
        });
        
        // Confirm deposit
        document.getElementById('confirm-deposit').addEventListener('click', function() {
            const selectedOption = document.querySelector('.deposit-option.selected');
            let amount = 0;
            
            if (selectedOption) {
                amount = parseInt(selectedOption.getAttribute('data-amount'));
            } else {
                amount = parseInt(document.getElementById('custom-amount').value) || 0;
            }
            
            if (amount > 0) {
                balance += amount;
                updateBalance();
                saveUserData();
                showNotification(`Successfully deposited $${amount.toLocaleString()}!`, 'success');
                closeModal('deposit-modal');
            } else {
                showNotification('Please enter a valid amount.', 'error');
            }
        });
        
        // Confirm withdrawal
        document.getElementById('confirm-withdraw').addEventListener('click', function() {
            const amount = parseInt(document.getElementById('withdraw-amount').value) || 0;
            
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                updateBalance();
                saveUserData();
                showNotification(`Successfully withdrew $${amount.toLocaleString()}!`, 'success');
                closeModal('withdraw-modal');
            } else if (amount > balance) {
                showNotification('Insufficient balance.', 'error');
            } else {
                showNotification('Please enter a valid amount.', 'error');
            }
        });
        
        // Save settings
        document.getElementById('save-settings').addEventListener('click', function() {
            soundEnabled = document.getElementById('sound-toggle').checked;
            musicEnabled = document.getElementById('music-toggle').checked;
            notificationsEnabled = document.getElementById('notification-toggle').checked;
            animationSpeed = document.getElementById('animation-speed').value;
            theme = document.getElementById('theme-select').value;
            
            applyTheme(theme);
            saveUserData();
            showNotification('Settings saved successfully!', 'success');
            closeModal('settings-modal');
        });
        
        // Chat functionality
        document.getElementById('chat-send').addEventListener('click', sendChatMessage);
        document.getElementById('chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
        
        // Chat toggle
        document.getElementById('chat-toggle').addEventListener('click', function() {
            const chatContainer = document.querySelector('.chat-container');
            const chatMessages = document.querySelector('.chat-messages');
            const chatInput = document.querySelector('.chat-input-container');
            
            if (chatMessages.style.display === 'none') {
                chatMessages.style.display = 'block';
                chatInput.style.display = 'flex';
                this.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                chatMessages.style.display = 'none';
                chatInput.style.display = 'none';
                this.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
        
        // Assessment button
        document.getElementById('assess-btn').addEventListener('click', function() {
            const answers = [];
            for (let i = 1; i <= 5; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`);
                answers.push(selected ? selected.value : 'no');
            }
            
            const yesCount = answers.filter(answer => answer === 'yes').length;
            const resultDiv = document.getElementById('assessment-result');
            
            resultDiv.style.display = 'block';
            
            if (yesCount === 0) {
                resultDiv.className = 'assessment-result low-risk';
                resultDiv.innerHTML = '<h4>Low Risk</h4><p>Your gaming habits appear to be healthy. Continue to monitor your gaming activity and remember to play responsibly.</p>';
            } else if (yesCount <= 2) {
                resultDiv.className = 'assessment-result medium-risk';
                resultDiv.innerHTML = '<h4>Medium Risk</h4><p>You may be at risk of developing unhealthy gaming habits. Consider setting limits on your gaming time and spending.</p>';
            } else {
                resultDiv.className = 'assessment-result high-risk';
                resultDiv.innerHTML = '<h4>High Risk</h4><p>Your responses indicate a high risk of problem gambling. We strongly recommend seeking help from a professional. Please visit the resources listed on this page.</p>';
            }
        });
    }
    
    // Initialize games
    function initGames() {
        // Initialize Crash game
        initCrashGame();
        
        // Initialize Roulette game
        initRouletteGame();
        
        // Initialize Blackjack game
        initBlackjackGame();
        
        // Initialize Slots game
        initSlotsGame();
        
        // Initialize Dice game
        initDiceGame();
    }
    
    // Initialize Crash game
    function initCrashGame() {
        const crashContainer = document.createElement('div');
        crashContainer.className = 'crash-game';
        crashContainer.innerHTML = `
            <div class="crash-graph">
                <canvas id="crash-chart"></canvas>
                <div class="crash-multiplier" id="crash-multiplier-display">1.00x</div>
            </div>
            <div class="crash-controls">
                <div class="bet-input-container">
                    <input type="number" class="bet-input" id="crash-bet-amount" placeholder="Bet Amount" min="10" max="${balance}" value="100">
                    <div class="bet-buttons">
                        <button class="bet-button" data-amount="10">+10</button>
                        <button class="bet-button" data-amount="100">+100</button>
                        <button class="bet-button" data-amount="1000">+1K</button>
                        <button class="bet-button" data-amount="10000">All In</button>
                    </div>
                </div>
                <div class="auto-cashout-container">
                    <label class="auto-cashout-toggle">
                        <input type="checkbox" id="auto-cashout-toggle">
                        <span class="auto-cashout-slider"></span>
                    </label>
                    <span>Auto Cashout at:</span>
                    <input type="number" class="auto-cashout-input" id="auto-cashout-amount" placeholder="2.00" min="1.01" step="0.01" value="2.00">
                </div>
                <button class="crash-action-button bet" id="crash-action-button">Place Bet</button>
            </div>
            <div class="crash-history">
                <h3>Crash History</h3>
                <div class="crash-history-items" id="crash-history-items">
                    <!-- Crash history items will be added here dynamically -->
                </div>
            </div>
        `;
        
        // Add event listeners
        crashContainer.querySelectorAll('.bet-button').forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.getAttribute('data-amount'));
                const betInput = crashContainer.querySelector('#crash-bet-amount');
                
                if (amount === 10000) {
                    betInput.value = balance;
                } else {
                    betInput.value = parseInt(betInput.value || 0) + amount;
                }
            });
        });
        
        crashContainer.querySelector('#crash-action-button').addEventListener('click', function() {
            if (this.classList.contains('bet')) {
                startCrashGame();
            } else if (this.classList.contains('cashout')) {
                cashoutCrashGame();
            }
        });
        
        // Store the crash container
        window.crashGameContainer = crashContainer;
    }
    
    // Initialize Roulette game
    function initRouletteGame() {
        const rouletteContainer = document.createElement('div');
        rouletteContainer.className = 'roulette-game';
        rouletteContainer.innerHTML = `
            <div class="roulette-wheel-container">
                <div class="roulette-wheel" id="roulette-wheel">
                    <div class="roulette-ball" id="roulette-ball"></div>
                    <div class="roulette-pointer"></div>
                </div>
            </div>
            <div class="roulette-betting">
                <div class="roulette-betting-grid">
                    <div class="roulette-bet-option red" data-bet="red">Red</div>
                    <div class="roulette-bet-option black" data-bet="black">Black</div>
                    <div class="roulette-bet-option green" data-bet="green">Green</div>
                </div>
                <div class="roulette-number-grid" id="roulette-number-grid">
                    <!-- Roulette numbers will be added here dynamically -->
                </div>
                <div class="roulette-controls">
                    <div class="bet-input-container">
                        <input type="number" class="bet-input" id="roulette-bet-amount" placeholder="Bet Amount" min="10" max="${balance}" value="100">
                        <div class="bet-buttons">
                            <button class="bet-button" data-amount="10">+10</button>
                            <button class="bet-button" data-amount="100">+100</button>
                            <button class="bet-button" data-amount="1000">+1K</button>
                            <button class="bet-button" data-amount="10000">All In</button>
                        </div>
                    </div>
                    <button class="btn primary-btn" id="roulette-spin-button">Spin</button>
                </div>
            </div>
        `;
        
        // Add roulette numbers
        const rouletteNumbers = [
            { number: 0, color: 'green' },
            { number: 32, color: 'red' },
            { number: 15, color: 'black' },
            { number: 19, color: 'red' },
            { number: 4, color: 'black' },
            { number: 21, color: 'red' },
            { number: 2, color: 'black' },
            { number: 25, color: 'red' },
            { number: 17, color: 'black' },
            { number: 34, color: 'red' },
            { number: 6, color: 'black' },
            { number: 27, color: 'red' },
            { number: 13, color: 'black' },
            { number: 36, color: 'red' },
            { number: 11, color: 'black' },
            { number: 30, color: 'red' },
            { number: 8, color: 'black' },
            { number: 23, color: 'red' },
            { number: 10, color: 'black' },
            { number: 5, color: 'red' },
            { number: 24, color: 'black' },
            { number: 16, color: 'red' },
            { number: 33, color: 'black' },
            { number: 1, color: 'red' },
            { number: 20, color: 'black' },
            { number: 14, color: 'red' },
            { number: 31, color: 'black' },
            { number: 9, color: 'red' },
            { number: 22, color: 'black' },
            { number: 18, color: 'red' },
            { number: 29, color: 'black' },
            { number: 7, color: 'red' },
            { number: 28, color: 'black' },
            { number: 12, color: 'red' },
            { number: 35, color: 'black' },
            { number: 3, color: 'red' },
            { number: 26, color: 'black' }
        ];
        
        const numberGrid = rouletteContainer.querySelector('#roulette-number-grid');
        rouletteNumbers.forEach(num => {
            const numberDiv = document.createElement('div');
            numberDiv.className = `roulette-number ${num.color}`;
            numberDiv.textContent = num.number;
            numberDiv.setAttribute('data-number', num.number);
            numberDiv.setAttribute('data-color', num.color);
            numberGrid.appendChild(numberDiv);
        });
        
        // Add event listeners
        rouletteContainer.querySelectorAll('.bet-button').forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.getAttribute('data-amount'));
                const betInput = rouletteContainer.querySelector('#roulette-bet-amount');
                
                if (amount === 10000) {
                    betInput.value = balance;
                } else {
                    betInput.value = parseInt(betInput.value || 0) + amount;
                }
            });
        });
        
        rouletteContainer.querySelectorAll('.roulette-bet-option').forEach(option => {
            option.addEventListener('click', function() {
                // Toggle selection
                this.classList.toggle('selected');
                
                // Deselect numbers if color bet is selected
                if (this.classList.contains('selected')) {
                    rouletteContainer.querySelectorAll('.roulette-number').forEach(num => {
                        num.classList.remove('selected');
                    });
                }
            });
        });
        
        rouletteContainer.querySelectorAll('.roulette-number').forEach(number => {
            number.addEventListener('click', function() {
                // Toggle selection
                this.classList.toggle('selected');
                
                // Deselect color bets if number bet is selected
                if (this.classList.contains('selected')) {
                    rouletteContainer.querySelectorAll('.roulette-bet-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                }
            });
        });
        
        rouletteContainer.querySelector('#roulette-spin-button').addEventListener('click', spinRoulette);
        
        // Store the roulette container
        window.rouletteGameContainer = rouletteContainer;
    }
    
    // Initialize Blackjack game
    function initBlackjackGame() {
        const blackjackContainer = document.createElement('div');
        blackjackContainer.className = 'blackjack-game';
        blackjackContainer.innerHTML = `
            <div class="blackjack-table">
                <div class="blackjack-dealer">
                    <div class="blackjack-hand" id="dealer-hand">
                        <!-- Dealer cards will be added here dynamically -->
                    </div>
                    <div class="blackjack-score">Dealer: <span id="dealer-score">0</span></div>
                </div>
                <div class="blackjack-player">
                    <div class="blackjack-hand" id="player-hand">
                        <!-- Player cards will be added here dynamically -->
                    </div>
                    <div class="blackjack-score">Player: <span id="player-score">0</span></div>
                </div>
            </div>
            <div class="blackjack-controls">
                <div class="blackjack-bet-container">
                    <input type="number" class="bet-input" id="blackjack-bet-amount" placeholder="Bet Amount" min="10" max="${balance}" value="100">
                    <div class="bet-buttons">
                        <button class="bet-button" data-amount="10">+10</button>
                        <button class="bet-button" data-amount="100">+100</button>
                        <button class="bet-button" data-amount="1000">+1K</button>
                        <button class="bet-button" data-amount="10000">All In</button>
                    </div>
                </div>
                <div>
                    <button class="blackjack-action-button hit" id="blackjack-hit-button">Hit</button>
                    <button class="blackjack-action-button stand" id="blackjack-stand-button">Stand</button>
                    <button class="blackjack-action-button double" id="blackjack-double-button">Double</button>
                    <button class="btn primary-btn" id="blackjack-deal-button">Deal</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        blackjackContainer.querySelectorAll('.bet-button').forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.getAttribute('data-amount'));
                const betInput = blackjackContainer.querySelector('#blackjack-bet-amount');
                
                if (amount === 10000) {
                    betInput.value = balance;
                } else {
                    betInput.value = parseInt(betInput.value || 0) + amount;
                }
            });
        });
        
        blackjackContainer.querySelector('#blackjack-deal-button').addEventListener('click', dealBlackjack);
        blackjackContainer.querySelector('#blackjack-hit-button').addEventListener('click', hitBlackjack);
        blackjackContainer.querySelector('#blackjack-stand-button').addEventListener('click', standBlackjack);
        blackjackContainer.querySelector('#blackjack-double-button').addEventListener('click', doubleBlackjack);
        
        // Initially disable action buttons
        blackjackContainer.querySelector('#blackjack-hit-button').disabled = true;
        blackjackContainer.querySelector('#blackjack-stand-button').disabled = true;
        blackjackContainer.querySelector('#blackjack-double-button').disabled = true;
        
        // Store the blackjack container
        window.blackjackGameContainer = blackjackContainer;
        
        // Initialize game state
        window.blackjackGameState = {
            deck: [],
            playerHand: [],
            dealerHand: [],
            gameActive: false,
            playerTurn: false
        };
    }
    
    // Initialize Slots game
    function initSlotsGame() {
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'slots-game';
        slotsContainer.innerHTML = `
            <div class="slots-machine">
                <div class="slots-reels">
                    <div class="slots-reel">
                        <div class="slots-reel-inner" id="slots-reel-1">
                            <div class="slots-symbol">🍒</div>
                            <div class="slots-symbol">🍋</div>
                            <div class="slots-symbol">🍊</div>
                            <div class="slots-symbol">🍇</div>
                            <div class="slots-symbol">🔔</div>
                            <div class="slots-symbol">⭐</div>
                            <div class="slots-symbol">7️⃣</div>
                        </div>
                    </div>
                    <div class="slots-reel">
                        <div class="slots-reel-inner" id="slots-reel-2">
                            <div class="slots-symbol">🍒</div>
                            <div class="slots-symbol">🍋</div>
                            <div class="slots-symbol">🍊</div>
                            <div class="slots-symbol">🍇</div>
                            <div class="slots-symbol">🔔</div>
                            <div class="slots-symbol">⭐</div>
                            <div class="slots-symbol">7️⃣</div>
                        </div>
                    </div>
                    <div class="slots-reel">
                        <div class="slots-reel-inner" id="slots-reel-3">
                            <div class="slots-symbol">🍒</div>
                            <div class="slots-symbol">🍋</div>
                            <div class="slots-symbol">🍊</div>
                            <div class="slots-symbol">🍇</div>
                            <div class="slots-symbol">🔔</div>
                            <div class="slots-symbol">⭐</div>
                            <div class="slots-symbol">7️⃣</div>
                        </div>
                    </div>
                </div>
                <div class="slots-paylines">
                    <div class="slots-payline">
                        <div class="slots-payline-indicator active"></div>
                        <span>Payline 1 (x2)</span>
                    </div>
                    <div class="slots-payline">
                        <div class="slots-payline-indicator active"></div>
                        <span>Payline 2 (x3)</span>
                    </div>
                    <div class="slots-payline">
                        <div class="slots-payline-indicator active"></div>
                        <span>Payline 3 (x5)</span>
                    </div>
                </div>
            </div>
            <div class="slots-controls">
                <div class="slots-bet-container">
                    <input type="number" class="bet-input" id="slots-bet-amount" placeholder="Bet Amount" min="10" max="${balance}" value="100">
                    <div class="bet-buttons">
                        <button class="bet-button" data-amount="10">+10</button>
                        <button class="bet-button" data-amount="100">+100</button>
                        <button class="bet-button" data-amount="1000">+1K</button>
                        <button class="bet-button" data-amount="10000">All In</button>
                    </div>
                </div>
                <button class="slots-spin-button" id="slots-spin-button">SPIN</button>
            </div>
        `;
        
        // Add event listeners
        slotsContainer.querySelectorAll('.bet-button').forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.getAttribute('data-amount'));
                const betInput = slotsContainer.querySelector('#slots-bet-amount');
                
                if (amount === 10000) {
                    betInput.value = balance;
                } else {
                    betInput.value = parseInt(betInput.value || 0) + amount;
                }
            });
        });
        
        slotsContainer.querySelector('#slots-spin-button').addEventListener('click', spinSlots);
        
        // Store the slots container
        window.slotsGameContainer = slotsContainer;
    }
    
    // Initialize Dice game
    function initDiceGame() {
        const diceContainer = document.createElement('div');
        diceContainer.className = 'dice-game';
        diceContainer.innerHTML = `
            <div class="dice-container">
                <div class="dice dice-1" id="dice-1">
                    <div class="dice-dot"></div>
                </div>
                <div class="dice dice-1" id="dice-2">
                    <div class="dice-dot"></div>
                </div>
            </div>
            <div class="dice-controls">
                <div class="dice-bet-container">
                    <input type="number" class="bet-input" id="dice-bet-amount" placeholder="Bet Amount" min="10" max="${balance}" value="100">
                    <div class="bet-buttons">
                        <button class="bet-button" data-amount="10">+10</button>
                        <button class="bet-button" data-amount="100">+100</button>
                        <button class="bet-button" data-amount="1000">+1K</button>
                        <button class="bet-button" data-amount="10000">All In</button>
                    </div>
                </div>
                <div>
                    <label>
                        <input type="radio" name="dice-bet-type" value="over" checked> Over 7
                    </label>
                    <label>
                        <input type="radio" name="dice-bet-type" value="under"> Under 7
                    </label>
                    <label>
                        <input type="radio" name="dice-bet-type" value="seven"> Exactly 7
                    </label>
                </div>
                <button class="dice-roll-button" id="dice-roll-button">Roll Dice</button>
                <div class="dice-result" id="dice-result"></div>
            </div>
        `;
        
        // Add event listeners
        diceContainer.querySelectorAll('.bet-button').forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.getAttribute('data-amount'));
                const betInput = diceContainer.querySelector('#dice-bet-amount');
                
                if (amount === 10000) {
                    betInput.value = balance;
                } else {
                    betInput.value = parseInt(betInput.value || 0) + amount;
                }
            });
        });
        
        diceContainer.querySelector('#dice-roll-button').addEventListener('click', rollDice);
        
        // Store the dice container
        window.diceGameContainer = diceContainer;
    }
    
    // Initialize charts
    function initCharts() {
        // Initialize profit chart
        const profitCtx = document.getElementById('profit-chart').getContext('2d');
        profitChart = new Chart(profitCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Profit/Loss',
                    data: [],
                    borderColor: '#e30022',
                    backgroundColor: 'rgba(227, 0, 34, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0b8',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0b8'
                        }
                    }
                }
            }
        });
        
        // Update profit chart with user data
        updateProfitChart();
    }
    
    // Update profit chart
    function updateProfitChart() {
        if (userStats.profitHistory.length > 0) {
            const labels = userStats.profitHistory.map((_, index) => `Game ${index + 1}`);
            const data = userStats.profitHistory.map(profit => profit);
            
            profitChart.data.labels = labels;
            profitChart.data.datasets[0].data = data;
            profitChart.update();
        }
    }
    
    // Show page
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(`${pageId}-page`).classList.add('active');
        
        // Update stats if stats page is shown
        if (pageId === 'stats') {
            updateStatsPage();
        }
    }
    
    // Select game
    function selectGame(gameId) {
        currentGame = gameId;
        
        // Update active game item
        document.querySelectorAll('.game-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.game-item[data-game="${gameId}"]`).classList.add('active');
        
        // Show games page
        showPage('games');
        document.querySelector('.nav-link[data-page="games"]').click();
        
        // Load game
        loadGame(gameId);
    }
    
    // Load game
    function loadGame(gameId) {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';
        
        switch (gameId) {
            case 'crash':
                gameContainer.appendChild(window.crashGameContainer);
                initCrashChart();
                break;
            case 'roulette':
                gameContainer.appendChild(window.rouletteGameContainer);
                break;
            case 'blackjack':
                gameContainer.appendChild(window.blackjackGameContainer);
                break;
            case 'slots':
                gameContainer.appendChild(window.slotsGameContainer);
                break;
            case 'dice':
                gameContainer.appendChild(window.diceGameContainer);
                break;
        }
    }
    
    // Initialize Crash chart
    function initCrashChart() {
        const ctx = document.getElementById('crash-chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (crashChart) {
            crashChart.destroy();
        }
        
        crashChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [0],
                datasets: [{
                    label: 'Multiplier',
                    data: [1],
                    borderColor: '#e30022',
                    backgroundColor: 'rgba(227, 0, 34, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0b8',
                            callback: function(value) {
                                return value.toFixed(2) + 'x';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0b8'
                        }
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });
    }
    
    // Start Crash game
    function startCrashGame() {
        const betAmount = parseInt(document.getElementById('crash-bet-amount').value);
        
        if (isNaN(betAmount) || betAmount < 10) {
            showNotification('Minimum bet is $10', 'error');
            return;
        }
        
        if (betAmount > balance) {
            showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Deduct bet amount from balance
        balance -= betAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWagered += betAmount;
        userStats.gamesPlayed++;
        
        // Reset game state
        crashGameActive = true;
        crashMultiplier = 1.00;
        
        // Update UI
        document.getElementById('crash-action-button').textContent = 'Cash Out';
        document.getElementById('crash-action-button').classList.remove('bet');
        document.getElementById('crash-action-button').classList.add('cashout');
        document.getElementById('crash-bet-amount').disabled = true;
        
        // Initialize chart
        initCrashChart();
        
        // Start game loop
        crashInterval = setInterval(() => {
            // Generate random crash point
            const crashPoint = Math.random() * 10 + 1; // Between 1 and 11
            
            // Update multiplier
            crashMultiplier += 0.01;
            
            // Update chart
            const time = crashChart.data.labels.length;
            crashChart.data.labels.push(time);
            crashChart.data.datasets[0].data.push(crashMultiplier);
            crashChart.update('none');
            
            // Update multiplier display
            document.getElementById('crash-multiplier-display').textContent = crashMultiplier.toFixed(2) + 'x';
            
            // Check if game should crash
            if (crashMultiplier >= crashPoint) {
                endCrashGame(false);
            }
            
            // Check for auto cashout
            const autoCashoutEnabled = document.getElementById('auto-cashout-toggle').checked;
            const autoCashoutAmount = parseFloat(document.getElementById('auto-cashout-amount').value);
            
            if (autoCashoutEnabled && crashMultiplier >= autoCashoutAmount) {
                cashoutCrashGame();
            }
        }, 100);
    }
    
    // Cashout Crash game
    function cashoutCrashGame() {
        if (!crashGameActive) return;
        
        endCrashGame(true);
    }
    
    // End Crash game
    function endCrashGame(cashedOut) {
        // Clear interval
        clearInterval(crashInterval);
        crashGameActive = false;
        
        // Get bet amount
        const betAmount = parseInt(document.getElementById('crash-bet-amount').value);
        
        // Calculate win amount
        let winAmount = 0;
        let profit = 0;
        
        if (cashedOut) {
            winAmount = Math.floor(betAmount * crashMultiplier);
            profit = winAmount - betAmount;
            
            // Add win amount to balance
            balance += winAmount;
            updateBalance();
            
            // Update user stats
            userStats.totalWon += winAmount;
            
            // Show notification
            showNotification(`Cashed out at ${crashMultiplier.toFixed(2)}x! Won $${winAmount.toLocaleString()}`, 'success');
        } else {
            profit = -betAmount;
            
            // Show notification
            showNotification(`Crashed at ${crashMultiplier.toFixed(2)}x! Lost $${betAmount.toLocaleString()}`, 'error');
        }
        
        // Add to game history
        addToGameHistory('Crash', betAmount, crashMultiplier, profit);
        
        // Update profit history
        userStats.profitHistory.push(profit);
        updateProfitChart();
        
        // Add to crash history
        addToCrashHistory(crashMultiplier);
        
        // Update UI
        document.getElementById('crash-action-button').textContent = 'Place Bet';
        document.getElementById('crash-action-button').classList.remove('cashout');
        document.getElementById('crash-action-button').classList.add('bet');
        document.getElementById('crash-bet-amount').disabled = false;
        
        // Save user data
        saveUserData();
    }
    
    // Add to Crash history
    function addToCrashHistory(multiplier) {
        const historyContainer = document.getElementById('crash-history-items');
        
        const historyItem = document.createElement('div');
        
        if (multiplier < 2) {
            historyItem.className = 'crash-history-item low';
        } else if (multiplier < 5) {
            historyItem.className = 'crash-history-item medium';
        } else {
            historyItem.className = 'crash-history-item high';
        }
        
        historyItem.textContent = multiplier.toFixed(2) + 'x';
        
        // Add to beginning of history
        historyContainer.insertBefore(historyItem, historyContainer.firstChild);
        
        // Keep only last 10 items
        while (historyContainer.children.length > 10) {
            historyContainer.removeChild(historyContainer.lastChild);
        }
    }
    
    // Spin Roulette
    function spinRoulette() {
        const betAmount = parseInt(document.getElementById('roulette-bet-amount').value);
        
        if (isNaN(betAmount) || betAmount < 10) {
            showNotification('Minimum bet is $10', 'error');
            return;
        }
        
        if (betAmount > balance) {
            showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Get selected bets
        const selectedBets = [];
        
        // Check color bets
        document.querySelectorAll('.roulette-bet-option.selected').forEach(option => {
            selectedBets.push({
                type: 'color',
                value: option.getAttribute('data-bet'),
                payout: option.getAttribute('data-bet') === 'green' ? 14 : 2
            });
        });
        
        // Check number bets
        document.querySelectorAll('.roulette-number.selected').forEach(number => {
            selectedBets.push({
                type: 'number',
                value: parseInt(number.getAttribute('data-number')),
                payout: 36
            });
        });
        
        if (selectedBets.length === 0) {
            showNotification('Please select at least one bet', 'error');
            return;
        }
        
        // Deduct bet amount from balance
        balance -= betAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWagered += betAmount;
        userStats.gamesPlayed++;
        
        // Disable spin button
        document.getElementById('roulette-spin-button').disabled = true;
        
        // Generate random result
        const rouletteNumbers = [
            { number: 0, color: 'green' },
            { number: 32, color: 'red' },
            { number: 15, color: 'black' },
            { number: 19, color: 'red' },
            { number: 4, color: 'black' },
            { number: 21, color: 'red' },
            { number: 2, color: 'black' },
            { number: 25, color: 'red' },
            { number: 17, color: 'black' },
            { number: 34, color: 'red' },
            { number: 6, color: 'black' },
            { number: 27, color: 'red' },
            { number: 13, color: 'black' },
            { number: 36, color: 'red' },
            { number: 11, color: 'black' },
            { number: 30, color: 'red' },
            { number: 8, color: 'black' },
            { number: 23, color: 'red' },
            { number: 10, color: 'black' },
            { number: 5, color: 'red' },
            { number: 24, color: 'black' },
            { number: 16, color: 'red' },
            { number: 33, color: 'black' },
            { number: 1, color: 'red' },
            { number: 20, color: 'black' },
            { number: 14, color: 'red' },
            { number: 31, color: 'black' },
            { number: 9, color: 'red' },
            { number: 22, color: 'black' },
            { number: 18, color: 'red' },
            { number: 29, color: 'black' },
            { number: 7, color: 'red' },
            { number: 28, color: 'black' },
            { number: 12, color: 'red' },
            { number: 35, color: 'black' },
            { number: 3, color: 'red' },
            { number: 26, color: 'black' }
        ];
        
        const resultIndex = Math.floor(Math.random() * rouletteNumbers.length);
        const result = rouletteNumbers[resultIndex];
        
        // Spin wheel
        const wheel = document.getElementById('roulette-wheel');
        const ball = document.getElementById('roulette-ball');
        
        // Calculate rotation
        const baseRotation = 360 * 5; // 5 full rotations
        const segmentAngle = 360 / rouletteNumbers.length;
        const targetRotation = baseRotation + (resultIndex * segmentAngle);
        
        // Apply rotation
        wheel.style.transform = `rotate(${targetRotation}deg)`;
        
        // Move ball
        const ballAngle = 180 + (resultIndex * segmentAngle);
        const ballRadius = 130;
        const ballX = Math.cos(ballAngle * Math.PI / 180) * ballRadius;
        const ballY = Math.sin(ballAngle * Math.PI / 180) * ballRadius;
        
        ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
        
        // Wait for animation to complete
        setTimeout(() => {
            // Check wins
            let totalWin = 0;
            let winningBets = [];
            
            selectedBets.forEach(bet => {
                if (bet.type === 'color' && bet.value === result.color) {
                    const winAmount = Math.floor(betAmount / selectedBets.length * bet.payout);
                    totalWin += winAmount;
                    winningBets.push(`${bet.value} (${bet.payout}x)`);
                } else if (bet.type === 'number' && bet.value === result.number) {
                    const winAmount = Math.floor(betAmount / selectedBets.length * bet.payout);
                    totalWin += winAmount;
                    winningBets.push(`Number ${bet.value} (${bet.payout}x)`);
                }
            });
            
            // Calculate profit
            const profit = totalWin - betAmount;
            
            // Add win amount to balance
            balance += totalWin;
            updateBalance();
            
            // Update user stats
            userStats.totalWon += totalWin;
            
            // Add to game history
            addToGameHistory('Roulette', betAmount, totalWin / betAmount, profit);
            
            // Update profit history
            userStats.profitHistory.push(profit);
            updateProfitChart();
            
            // Show result
            if (totalWin > 0) {
                showNotification(`Number ${result.number} ${result.color}! Won $${totalWin.toLocaleString()}`, 'success');
            } else {
                showNotification(`Number ${result.number} ${result.color}! Lost $${betAmount.toLocaleString()}`, 'error');
            }
            
            // Enable spin button
            document.getElementById('roulette-spin-button').disabled = false;
            
            // Save user data
            saveUserData();
        }, 4000);
    }
    
    // Deal Blackjack
    function dealBlackjack() {
        const betAmount = parseInt(document.getElementById('blackjack-bet-amount').value);
        
        if (isNaN(betAmount) || betAmount < 10) {
            showNotification('Minimum bet is $10', 'error');
            return;
        }
        
        if (betAmount > balance) {
            showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Deduct bet amount from balance
        balance -= betAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWagered += betAmount;
        userStats.gamesPlayed++;
        
        // Create and shuffle deck
        const deck = [];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        for (const suit of suits) {
            for (const value of values) {
                let numericValue = parseInt(value);
                
                if (value === 'J' || value === 'Q' || value === 'K') {
                    numericValue = 10;
                } else if (value === 'A') {
                    numericValue = 11; // Will adjust for aces later
                }
                
                deck.push({
                    suit,
                    value,
                    numericValue,
                    color: suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black'
                });
            }
        }
        
        // Shuffle deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        
        // Deal initial cards
        const playerHand = [deck.pop(), deck.pop()];
        const dealerHand = [deck.pop(), deck.pop()];
        
        // Update game state
        window.blackjackGameState = {
            deck,
            playerHand,
            dealerHand,
            gameActive: true,
            playerTurn: true,
            betAmount
        };
        
        // Clear hands
        document.getElementById('player-hand').innerHTML = '';
        document.getElementById('dealer-hand').innerHTML = '';
        
        // Display player cards
        playerHand.forEach(card => {
            displayCard('player-hand', card);
        });
        
        // Display dealer cards (first card hidden)
        displayCard('dealer-hand', dealerHand[0]);
        displayCard('dealer-hand', null, true); // Hidden card
        
        // Update scores
        updateBlackjackScores();
        
        // Enable action buttons
        document.getElementById('blackjack-hit-button').disabled = false;
        document.getElementById('blackjack-stand-button').disabled = false;
        document.getElementById('blackjack-double-button').disabled = false;
        document.getElementById('blackjack-deal-button').disabled = true;
        
        // Check for blackjack
        const playerScore = calculateBlackjackScore(playerHand);
        if (playerScore === 21) {
            // Player has blackjack, check dealer
            setTimeout(() => {
                const dealerScore = calculateBlackjackScore(dealerHand);
                
                if (dealerScore === 21) {
                    // Push
                    endBlackjackGame('push');
                } else {
                    // Player wins with blackjack
                    endBlackjackGame('blackjack');
                }
            }, 1000);
        }
    }
    
    // Hit in Blackjack
    function hitBlackjack() {
        if (!window.blackjackGameState.gameActive || !window.blackjackGameState.playerTurn) return;
        
        // Deal card to player
        const card = window.blackjackGameState.deck.pop();
        window.blackjackGameState.playerHand.push(card);
        
        // Display card
        displayCard('player-hand', card);
        
        // Update score
        updateBlackjackScores();
        
        // Check for bust
        const playerScore = calculateBlackjackScore(window.blackjackGameState.playerHand);
        if (playerScore > 21) {
            // Player busts
            endBlackjackGame('bust');
        } else if (playerScore === 21) {
            // Player has 21, automatically stand
            standBlackjack();
        }
        
        // Disable double after hit
        document.getElementById('blackjack-double-button').disabled = true;
    }
    
    // Stand in Blackjack
    function standBlackjack() {
        if (!window.blackjackGameState.gameActive || !window.blackjackGameState.playerTurn) return;
        
        // End player turn
        window.blackjackGameState.playerTurn = false;
        
        // Disable action buttons
        document.getElementById('blackjack-hit-button').disabled = true;
        document.getElementById('blackjack-stand-button').disabled = true;
        document.getElementById('blackjack-double-button').disabled = true;
        
        // Reveal dealer's hidden card
        const dealerHand = document.getElementById('dealer-hand');
        dealerHand.removeChild(dealerHand.lastChild); // Remove hidden card
        displayCard('dealer-hand', window.blackjackGameState.dealerHand[1]);
        
        // Dealer plays
        dealerPlayBlackjack();
    }
    
    // Double in Blackjack
    function doubleBlackjack() {
        if (!window.blackjackGameState.gameActive || !window.blackjackGameState.playerTurn) return;
        
        const doubleAmount = window.blackjackGameState.betAmount;
        
        if (doubleAmount > balance) {
            showNotification('Insufficient balance to double', 'error');
            return;
        }
        
        // Deduct additional bet amount
        balance -= doubleAmount;
        updateBalance();
        window.blackjackGameState.betAmount *= 2;
        
        // Deal one card to player
        const card = window.blackjackGameState.deck.pop();
        window.blackjackGameState.playerHand.push(card);
        
        // Display card
        displayCard('player-hand', card);
        
        // Update score
        updateBlackjackScores();
        
        // Check for bust
        const playerScore = calculateBlackjackScore(window.blackjackGameState.playerHand);
        if (playerScore > 21) {
            // Player busts
            endBlackjackGame('bust');
        } else {
            // Automatically stand
            standBlackjack();
        }
    }
    
    // Dealer plays in Blackjack
    function dealerPlayBlackjack() {
        const dealerScore = calculateBlackjackScore(window.blackjackGameState.dealerHand);
        
        if (dealerScore < 17) {
            // Dealer hits
            setTimeout(() => {
                const card = window.blackjackGameState.deck.pop();
                window.blackjackGameState.dealerHand.push(card);
                
                // Display card
                displayCard('dealer-hand', card);
                
                // Update score
                updateBlackjackScores();
                
                // Continue playing
                dealerPlayBlackjack();
            }, 1000);
        } else {
            // Dealer stands, determine winner
            setTimeout(() => {
                determineBlackjackWinner();
            }, 1000);
        }
    }
    
    // Determine winner in Blackjack
    function determineBlackjackWinner() {
        const playerScore = calculateBlackjackScore(window.blackjackGameState.playerHand);
        const dealerScore = calculateBlackjackScore(window.blackjackGameState.dealerHand);
        
        if (dealerScore > 21) {
            // Dealer busts, player wins
            endBlackjackGame('win');
        } else if (playerScore > dealerScore) {
            // Player wins
            endBlackjackGame('win');
        } else if (playerScore < dealerScore) {
            // Player loses
            endBlackjackGame('lose');
        } else {
            // Push
            endBlackjackGame('push');
        }
    }
    
    // End Blackjack game
    function endBlackjackGame(result) {
        window.blackjackGameState.gameActive = false;
        
        const betAmount = window.blackjackGameState.betAmount;
        let winAmount = 0;
        let profit = 0;
        let message = '';
        
        switch (result) {
            case 'blackjack':
                winAmount = Math.floor(betAmount * 2.5);
                profit = winAmount - betAmount;
                message = `Blackjack! Won $${winAmount.toLocaleString()}`;
                break;
            case 'win':
                winAmount = betAmount * 2;
                profit = winAmount - betAmount;
                message = `You won! Won $${winAmount.toLocaleString()}`;
                break;
            case 'push':
                winAmount = betAmount;
                profit = 0;
                message = `Push! Bet returned`;
                break;
            case 'bust':
            case 'lose':
                winAmount = 0;
                profit = -betAmount;
                message = `You lost! Lost $${betAmount.toLocaleString()}`;
                break;
        }
        
        // Add win amount to balance
        balance += winAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWon += winAmount;
        
        // Add to game history
        const multiplier = winAmount / betAmount;
        addToGameHistory('Blackjack', betAmount, multiplier, profit);
        
        // Update profit history
        userStats.profitHistory.push(profit);
        updateProfitChart();
        
        // Show notification
        if (result === 'blackjack' || result === 'win') {
            showNotification(message, 'success');
        } else if (result === 'push') {
            showNotification(message, 'info');
        } else {
            showNotification(message, 'error');
        }
        
        // Enable deal button
        document.getElementById('blackjack-deal-button').disabled = false;
        
        // Save user data
        saveUserData();
    }
    
    // Display card in Blackjack
    function displayCard(handId, card, hidden = false) {
        const hand = document.getElementById(handId);
        const cardDiv = document.createElement('div');
        cardDiv.className = 'blackjack-card';
        
        if (hidden) {
            cardDiv.classList.add('back');
        } else {
            if (card.color === 'red') {
                cardDiv.classList.add('red');
            }
            
            const suitSymbols = {
                'hearts': '♥',
                'diamonds': '♦',
                'clubs': '♣',
                'spades': '♠'
            };
            
            cardDiv.innerHTML = `
                <div class="suit top">${suitSymbols[card.suit]}</div>
                <div>${card.value}</div>
                <div class="suit bottom">${suitSymbols[card.suit]}</div>
            `;
        }
        
        hand.appendChild(cardDiv);
    }
    
    // Calculate Blackjack score
    function calculateBlackjackScore(hand) {
        let score = 0;
        let aces = 0;
        
        // Calculate initial score
        for (const card of hand) {
            if (card.value === 'A') {
                aces++;
                score += 11;
            } else {
                score += card.numericValue;
            }
        }
        
        // Adjust for aces
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        
        return score;
    }
    
    // Update Blackjack scores
    function updateBlackjackScores() {
        const playerScore = calculateBlackjackScore(window.blackjackGameState.playerHand);
        document.getElementById('player-score').textContent = playerScore;
        
        // Only show dealer score if it's not player's turn or game is over
        if (!window.blackjackGameState.playerTurn || !window.blackjackGameState.gameActive) {
            const dealerScore = calculateBlackjackScore(window.blackjackGameState.dealerHand);
            document.getElementById('dealer-score').textContent = dealerScore;
        } else {
            document.getElementById('dealer-score').textContent = '?';
        }
    }
    
    // Spin Slots
    function spinSlots() {
        const betAmount = parseInt(document.getElementById('slots-bet-amount').value);
        
        if (isNaN(betAmount) || betAmount < 10) {
            showNotification('Minimum bet is $10', 'error');
            return;
        }
        
        if (betAmount > balance) {
            showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Deduct bet amount from balance
        balance -= betAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWagered += betAmount;
        userStats.gamesPlayed++;
        
        // Disable spin button
        document.getElementById('slots-spin-button').disabled = true;
        
        // Get reels
        const reel1 = document.getElementById('slots-reel-1');
        const reel2 = document.getElementById('slots-reel-2');
        const reel3 = document.getElementById('slots-reel-3');
        
        // Generate random results
        const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '7️⃣'];
        const result1 = Math.floor(Math.random() * symbols.length);
        const result2 = Math.floor(Math.random() * symbols.length);
        const result3 = Math.floor(Math.random() * symbols.length);
        
        // Calculate spin duration based on animation speed
        let duration = 3000; // Default duration
        if (animationSpeed === 'slow') {
            duration = 5000;
        } else if (animationSpeed === 'fast') {
            duration = 1500;
        }
        
        // Spin reels
        reel1.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
        reel2.style.transition = `transform ${duration + 500}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
        reel3.style.transition = `transform ${duration + 1000}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
        
        // Set final positions
        const symbolHeight = 100;
        reel1.style.transform = `translateY(-${result1 * symbolHeight}px)`;
        reel2.style.transform = `translateY(-${result2 * symbolHeight}px)`;
        reel3.style.transform = `translateY(-${result3 * symbolHeight}px)`;
        
        // Wait for animation to complete
        setTimeout(() => {
            // Get results
            const symbol1 = symbols[result1];
            const symbol2 = symbols[result2];
            const symbol3 = symbols[result3];
            
            // Calculate win
            let winAmount = 0;
            let multiplier = 0;
            let winMessage = '';
            
            // Check for wins
            if (symbol1 === symbol2 && symbol2 === symbol3) {
                // Three of a kind
                switch (symbol1) {
                    case '🍒':
                        multiplier = 5;
                        break;
                    case '🍋':
                        multiplier = 10;
                        break;
                    case '🍊':
                        multiplier = 15;
                        break;
                    case '🍇':
                        multiplier = 20;
                        break;
                    case '🔔':
                        multiplier = 25;
                        break;
                    case '⭐':
                        multiplier = 50;
                        break;
                    case '7️⃣':
                        multiplier = 100;
                        break;
                }
                
                winAmount = Math.floor(betAmount * multiplier);
                winMessage = `Three ${symbol1}! Won $${winAmount.toLocaleString()} (${multiplier}x)`;
            } else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
                // Two of a kind
                multiplier = 2;
                winAmount = Math.floor(betAmount * multiplier);
                
                if (symbol1 === symbol2) {
                    winMessage = `Two ${symbol1}! Won $${winAmount.toLocaleString()} (${multiplier}x)`;
                } else if (symbol2 === symbol3) {
                    winMessage = `Two ${symbol2}! Won $${winAmount.toLocaleString()} (${multiplier}x)`;
                } else {
                    winMessage = `Two ${symbol1}! Won $${winAmount.toLocaleString()} (${multiplier}x)`;
                }
            } else {
                // No win
                winMessage = `No win. Lost $${betAmount.toLocaleString()}`;
            }
            
            // Calculate profit
            const profit = winAmount - betAmount;
            
            // Add win amount to balance
            balance += winAmount;
            updateBalance();
            
            // Update user stats
            userStats.totalWon += winAmount;
            
            // Add to game history
            addToGameHistory('Slots', betAmount, multiplier, profit);
            
            // Update profit history
            userStats.profitHistory.push(profit);
            updateProfitChart();
            
            // Show result
            if (winAmount > 0) {
                showNotification(winMessage, 'success');
            } else {
                showNotification(winMessage, 'error');
            }
            
            // Enable spin button
            document.getElementById('slots-spin-button').disabled = false;
            
            // Save user data
            saveUserData();
        }, duration + 1000);
    }
    
    // Roll Dice
    function rollDice() {
        const betAmount = parseInt(document.getElementById('dice-bet-amount').value);
        
        if (isNaN(betAmount) || betAmount < 10) {
            showNotification('Minimum bet is $10', 'error');
            return;
        }
        
        if (betAmount > balance) {
            showNotification('Insufficient balance', 'error');
            return;
        }
        
        // Get bet type
        const betType = document.querySelector('input[name="dice-bet-type"]:checked').value;
        
        // Deduct bet amount from balance
        balance -= betAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWagered += betAmount;
        userStats.gamesPlayed++;
        
        // Disable roll button
        document.getElementById('dice-roll-button').disabled = true;
        
        // Hide previous result
        document.getElementById('dice-result').style.display = 'none';
        
        // Generate random dice values
        const dice1Value = Math.floor(Math.random() * 6) + 1;
        const dice2Value = Math.floor(Math.random() * 6) + 1;
        const total = dice1Value + dice2Value;
        
        // Update dice display
        updateDiceDisplay('dice-1', dice1Value);
        updateDiceDisplay('dice-2', dice2Value);
        
        // Calculate win
        let winAmount = 0;
        let multiplier = 0;
        let win = false;
        
        if (betType === 'over' && total > 7) {
            win = true;
            multiplier = 2;
        } else if (betType === 'under' && total < 7) {
            win = true;
            multiplier = 2;
        } else if (betType === 'seven' && total === 7) {
            win = true;
            multiplier = 5;
        }
        
        if (win) {
            winAmount = Math.floor(betAmount * multiplier);
        }
        
        // Calculate profit
        const profit = winAmount - betAmount;
        
        // Add win amount to balance
        balance += winAmount;
        updateBalance();
        
        // Update user stats
        userStats.totalWon += winAmount;
        
        // Add to game history
        addToGameHistory('Dice', betAmount, multiplier, profit);
        
        // Update profit history
        userStats.profitHistory.push(profit);
        updateProfitChart();
        
        // Show result
        const resultDiv = document.getElementById('dice-result');
        resultDiv.style.display = 'block';
        
        if (win) {
            resultDiv.className = 'dice-result win';
            resultDiv.textContent = `Rolled ${total}! You won $${winAmount.toLocaleString()} (${multiplier}x)`;
            showNotification(`You won $${winAmount.toLocaleString()}!`, 'success');
        } else {
            resultDiv.className = 'dice-result lose';
            resultDiv.textContent = `Rolled ${total}! You lost $${betAmount.toLocaleString()}`;
            showNotification(`You lost $${betAmount.toLocaleString()}!`, 'error');
        }
        
        // Enable roll button
        document.getElementById('dice-roll-button').disabled = false;
        
        // Save user data
        saveUserData();
    }
    
    // Update dice display
    function updateDiceDisplay(diceId, value) {
        const dice = document.getElementById(diceId);
        
        // Remove all dot classes
        dice.className = 'dice';
        
        // Add appropriate class and dots
        dice.classList.add(`dice-${value}`);
        
        // Clear existing dots
        dice.innerHTML = '';
        
        // Add dots based on value
        for (let i = 0; i < value; i++) {
            const dot = document.createElement('div');
            dot.className = 'dice-dot';
            dice.appendChild(dot);
        }
    }
    
    // Add to game history
    function addToGameHistory(game, betAmount, multiplier, profit) {
        const historyItem = {
            game,
            time: new Date().toISOString(),
            betAmount,
            multiplier,
            profit
        };
        
        gameHistory.unshift(historyItem);
        
        // Keep only last 50 items
        if (gameHistory.length > 50) {
            gameHistory = gameHistory.slice(0, 50);
        }
    }
    
    // Update balance display
    function updateBalance() {
        document.getElementById('user-balance').textContent = balance.toLocaleString();
    }
    
    // Update stats page
    function updateStatsPage() {
        document.getElementById('total-wagered-stat').textContent = `$${userStats.totalWagered.toLocaleString()}`;
        document.getElementById('total-won-stat').textContent = `$${userStats.totalWon.toLocaleString()}`;
        document.getElementById('net-profit-stat').textContent = `$${(userStats.totalWon - userStats.totalWagered).toLocaleString()}`;
        document.getElementById('games-played-stat').textContent = userStats.gamesPlayed;
        
        // Update history table
        const historyTableBody = document.getElementById('history-tbody');
        historyTableBody.innerHTML = '';
        
        if (gameHistory.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" class="no-data">No game history yet</td>';
            historyTableBody.appendChild(row);
        } else {
            gameHistory.forEach(item => {
                const row = document.createElement('tr');
                
                const date = new Date(item.time);
                const timeString = date.toLocaleTimeString();
                
                row.innerHTML = `
                    <td>${item.game}</td>
                    <td>${timeString}</td>
                    <td>$${item.betAmount.toLocaleString()}</td>
                    <td>${item.multiplier.toFixed(2)}x</td>
                    <td class="${item.profit >= 0 ? 'profit-positive' : 'profit-negative'}">
                        ${item.profit >= 0 ? '+' : ''}$${item.profit.toLocaleString()}
                    </td>
                `;
                
                historyTableBody.appendChild(row);
            });
        }
    }
    
    // Update stats
    function updateStats() {
        // This function can be used to update stats in real-time
        // Currently, stats are updated when the stats page is shown
    }
    
    // Open modal
    function openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }
    
    // Close modal
    function closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        if (!notificationsEnabled) return;
        
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        else if (type === 'error') icon = 'exclamation-circle';
        else if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas ${icon} notification-icon"></i>
            <span>${message}</span>
            <i class="fas fa-times notification-close"></i>
        `;
        
        container.appendChild(notification);
        
        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Send chat message
    function sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message === '') return;
        
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        
        const username = 'You';
        messageElement.innerHTML = `
            <span class="chat-username">${username}:</span>
            <span class="chat-text">${message}</span>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        input.value = '';
        
        // Simulate response after a delay
        setTimeout(() => {
            const responses = [
                "Nice win!",
                "Good luck!",
                "That was close!",
                "I'm on a winning streak!",
                "Anyone else playing Crash?",
                "This is so addictive!",
                "Just hit a big one!",
                "Trying to win my losses back",
                "This site is awesome!",
                "Remember to gamble responsibly!"
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const randomUser = `Player${Math.floor(Math.random() * 1000)}`;
            
            const responseElement = document.createElement('div');
            responseElement.className = 'chat-message';
            responseElement.innerHTML = `
                <span class="chat-username">${randomUser}:</span>
                <span class="chat-text">${randomResponse}</span>
            `;
            
            messagesContainer.appendChild(responseElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000 + Math.random() * 3000);
    }
    
    // Start live stats updates
    function startLiveStatsUpdates() {
        // Update players online
        setInterval(() => {
            const playersOnline = document.getElementById('players-online');
            const currentValue = parseInt(playersOnline.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
            const newValue = Math.max(1000, currentValue + change);
            playersOnline.textContent = newValue.toLocaleString();
        }, 5000);
        
        // Update total wagered
        setInterval(() => {
            const totalWagered = document.getElementById('total-wagered');
            const currentValue = parseInt(totalWagered.textContent.replace(/[$,]/g, ''));
            const change = Math.floor(Math.random() * 10001) - 5000; // -5000 to +5000
            const newValue = Math.max(1000000, currentValue + change);
            totalWagered.textContent = `$${newValue.toLocaleString()}`;
        }, 8000);
        
        // Update biggest win
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance to update
                const biggestWin = document.getElementById('biggest-win');
                const newValue = Math.floor(Math.random() * 50000) + 10000; // 10000 to 60000
                biggestWin.textContent = `$${newValue.toLocaleString()}`;
            }
        }, 12000);
        
        // Add random wins to recent wins
        setInterval(() => {
            if (Math.random() < 0.4) { // 40% chance to add a win
                const winsContainer = document.querySelector('.wins-container');
                const games = ['Crash', 'Roulette', 'Blackjack', 'Slots', 'Dice'];
                const randomGame = games[Math.floor(Math.random() * games.length)];
                const randomAmount = Math.floor(Math.random() * 5000) + 100; // 100 to 5100
                const randomUser = `Player${Math.floor(Math.random() * 1000)}`;
                
                const winItem = document.createElement('div');
                winItem.className = 'win-item';
                winItem.innerHTML = `
                    <div class="win-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="win-info">
                        <div class="win-username">${randomUser}</div>
                        <div class="win-amount">+$${randomAmount.toLocaleString()}.00</div>
                    </div>
                    <div class="win-game">${randomGame}</div>
                `;
                
                // Add to beginning of wins
                winsContainer.insertBefore(winItem, winsContainer.firstChild);
                
                // Keep only last 5 items
                while (winsContainer.children.length > 5) {
                    winsContainer.removeChild(winsContainer.lastChild);
                }
            }
        }, 7000);
    }
    
    // Apply theme
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.style.setProperty('--background-color', '#f5f5f5');
            document.documentElement.style.setProperty('--surface-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#333333');
            document.documentElement.style.setProperty('--text-secondary', '#666666');
        } else if (theme === 'blue') {
            document.documentElement.style.setProperty('--background-color', '#0a192f');
            document.documentElement.style.setProperty('--surface-color', '#172a45');
            document.documentElement.style.setProperty('--primary-color', '#00b4d8');
        } else {
            // Default dark theme
            document.documentElement.style.setProperty('--background-color', '#0f0f1e');
            document.documentElement.style.setProperty('--surface-color', '#1a1a2e');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#a0a0b8');
            document.documentElement.style.setProperty('--primary-color', '#e30022');
        }
    }
})();