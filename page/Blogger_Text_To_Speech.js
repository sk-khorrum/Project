<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text-to-Speech Converter</title>
    <style>
        :root {
            --primary-color: #4361ee;
            --primary-dark: #3a0ca3;
            --secondary-color: #f72585;
            --background-color: #ffffff;
            --surface-color: #f8f9fa;
            --text-color: #212529;
            --text-secondary: #6c757d;
            --border-color: #dee2e6;
            --success-color: #4bb543;
            --warning-color: #ffcc00;
            --error-color: #dc3545;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --border-radius: 8px;
            --transition: all 0.3s ease;
        }

        [data-theme="dark"] {
            --background-color: #121212;
            --surface-color: #1e1e1e;
            --text-color: #e9ecef;
            --text-secondary: #adb5bd;
            --border-color: #495057;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--background-color);
            color: var(--text-color);
            transition: var(--transition);
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            flex: 1;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }

        h1 {
            font-size: 2rem;
            color: var(--primary-color);
        }

        .theme-toggle {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: var(--text-color);
            padding: 5px;
            border-radius: 50%;
            transition: var(--transition);
        }

        .theme-toggle:hover {
            background-color: var(--surface-color);
        }

        .card {
            background-color: var(--surface-color);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 25px;
            margin-bottom: 20px;
        }

        .section-title {
            margin-bottom: 15px;
            font-size: 1.3rem;
            color: var(--primary-color);
        }

        .text-input-container {
            position: relative;
            margin-bottom: 20px;
        }

        textarea {
            width: 100%;
            min-height: 200px;
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            background-color: var(--background-color);
            color: var(--text-color);
            font-size: 1rem;
            resize: vertical;
            transition: var(--transition);
        }

        textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
        }

        .char-count {
            position: absolute;
            bottom: 10px;
            right: 15px;
            font-size: 0.85rem;
            color: var(--text-secondary);
            background-color: var(--surface-color);
            padding: 2px 8px;
            border-radius: 10px;
        }

        .controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        @media (min-width: 768px) {
            .controls {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }

        .control-group {
            display: flex;
            flex-direction: column;
        }

        label {
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-color);
        }

        select, input[type="range"] {
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            background-color: var(--background-color);
            color: var(--text-color);
            font-size: 1rem;
        }

        select:focus, input[type="range"]:focus {
            outline: none;
            border-color: var(--primary-color);
        }

        .range-value {
            text-align: center;
            margin-top: 5px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .action-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
        }

        button {
            padding: 12px 20px;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-primary {
            background-color: var(--primary-color);
            color: white;
        }

        .btn-primary:hover:not(:disabled) {
            background-color: var(--primary-dark);
        }

        .btn-secondary {
            background-color: var(--surface-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
        }

        .btn-secondary:hover:not(:disabled) {
            background-color: var(--border-color);
        }

        .btn-danger {
            background-color: var(--error-color);
            color: white;
        }

        .btn-danger:hover:not(:disabled) {
            background-color: #c82333;
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .progress-container {
            margin-top: 20px;
        }

        .progress-bar {
            height: 8px;
            background-color: var(--border-color);
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background-color: var(--primary-color);
            width: 0%;
            transition: width 0.3s ease;
        }

        .progress-text {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .highlighted-text {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            background-color: var(--background-color);
            min-height: 100px;
            max-height: 200px;
            overflow-y: auto;
            line-height: 1.8;
        }

        .highlight {
            background-color: rgba(67, 97, 238, 0.3);
            padding: 2px 4px;
            border-radius: 3px;
            transition: background-color 0.3s ease;
        }

        .current-word {
            background-color: var(--primary-color) !important;
            color: white !important;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: bold;
        }

        .error-message {
            background-color: rgba(220, 53, 69, 0.1);
            border: 1px solid var(--error-color);
            color: var(--error-color);
            padding: 15px;
            border-radius: var(--border-radius);
            margin-top: 20px;
            display: none;
        }

        .success-message {
            background-color: rgba(75, 181, 67, 0.1);
            border: 1px solid var(--success-color);
            color: var(--success-color);
            padding: 15px;
            border-radius: var(--border-radius);
            margin-top: 20px;
            display: none;
        }

        .loading-voices {
            text-align: center;
            padding: 10px;
            color: var(--text-secondary);
            font-style: italic;
        }

        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            
            .card {
                padding: 20px;
            }
            
            .controls {
                grid-template-columns: 1fr;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            button {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Text-to-Speech Converter</h1>
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">????</button>
        </header>
        
        <main>
            <div class="card">
                <h2 class="section-title">Enter Your Text</h2>
                <div class="text-input-container">
                    <textarea id="textInput" placeholder="Type or paste your text here..." aria-label="Text to convert to speech">Welcome to the Text-to-Speech converter. This tool allows you to convert any text into speech using your browser's built-in speech synthesis capabilities. You can adjust the voice, rate, and pitch to customize your listening experience.</textarea>
                    <div class="char-count" id="charCount">0 characters</div>
                </div>
                
                <div class="controls">
                    <div class="control-group">
                        <label for="voiceSelect">Voice</label>
                        <select id="voiceSelect" aria-label="Select voice" disabled>
                            <option value="">Loading voices...</option>
                        </select>
                        <div class="loading-voices" id="loadingVoices">Loading available voices...</div>
                    </div>
                    
                    <div class="control-group">
                        <label for="rateSelect">Speech Rate</label>
                        <input type="range" id="rateSelect" min="0.5" max="2" step="0.1" value="1" aria-label="Speech rate">
                        <div class="range-value" id="rateValue">1.0</div>
                    </div>
                    
                    <div class="control-group">
                        <label for="pitchSelect">Pitch</label>
                        <input type="range" id="pitchSelect" min="0.5" max="2" step="0.1" value="1" aria-label="Speech pitch">
                        <div class="range-value" id="pitchValue">1.0</div>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button id="playBtn" class="btn-primary" aria-label="Play speech" disabled>
                        <span>▶️</span> Play
                    </button>
                    <button id="pauseBtn" class="btn-secondary" disabled aria-label="Pause speech">
                        <span>⏸️</span> Pause
                    </button>
                    <button id="resumeBtn" class="btn-secondary" disabled aria-label="Resume speech">
                        <span>⏯️</span> Resume
                    </button>
                    <button id="stopBtn" class="btn-danger" disabled aria-label="Stop speech">
                        <span>⏹️</span> Stop
                    </button>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <div class="progress-text">
                        <span id="progressText">Progress: 0%</span>
                        <span id="statusText">Ready</span>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2 class="section-title">Text Preview</h2>
                <div class="highlighted-text" id="highlightedText">
                    Your text will appear here with word highlighting during speech.
                </div>
            </div>
            
            <div class="error-message" id="errorMessage"></div>
            <div class="success-message" id="successMessage"></div>
        </main>
        
        <footer>
            <p>Text-to-Speech Converter &copy; 2023 | Powered by Web Speech API</p>
        </footer>
    </div>

    <script>
        // DOM Elements
        const themeToggle = document.getElementById('themeToggle');
        const textInput = document.getElementById('textInput');
        const charCount = document.getElementById('charCount');
        const voiceSelect = document.getElementById('voiceSelect');
        const loadingVoices = document.getElementById('loadingVoices');
        const rateSelect = document.getElementById('rateSelect');
        const rateValue = document.getElementById('rateValue');
        const pitchSelect = document.getElementById('pitchSelect');
        const pitchValue = document.getElementById('pitchValue');
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        const stopBtn = document.getElementById('stopBtn');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const statusText = document.getElementById('statusText');
        const highlightedText = document.getElementById('highlightedText');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        // Speech synthesis variables
        let speechSynthesis = window.speechSynthesis;
        let utterance = null;
        let voices = [];
        let isPlaying = false;
        let isPaused = false;
        let currentWordIndex = 0;
        let words = [];
        let voicesLoaded = false;
        let speechStartTime = 0;
        let speechDuration = 0;
        let progressInterval = null;

        // Check browser support
        if (!speechSynthesis) {
            showError('Your browser does not support the Web Speech API. Please try using Chrome, Edge, or Safari.');
            disableAllControls();
        } else {
            // Initialize the application
            init();
        }

        // Initialize the application
        function init() {
            // Set up event listeners
            setupEventListeners();
            
            // Update character count
            updateCharCount();
            
            // Load voices with proper initialization
            initializeVoices();
        }

        // Set up event listeners
        function setupEventListeners() {
            // Theme toggle
            themeToggle.addEventListener('click', toggleTheme);
            
            // Text input
            textInput.addEventListener('input', updateCharCount);
            
            // Voice selection
            voiceSelect.addEventListener('change', updateVoice);
            
            // Rate and pitch controls
            rateSelect.addEventListener('input', updateRate);
            pitchSelect.addEventListener('input', updatePitch);
            
            // Control buttons
            playBtn.addEventListener('click', playSpeech);
            pauseBtn.addEventListener('click', pauseSpeech);
            resumeBtn.addEventListener('click', resumeSpeech);
            stopBtn.addEventListener('click', stopSpeech);
        }

        // Initialize voices with proper handling
        function initializeVoices() {
            // Try to get voices immediately
            tryGetVoices();
            
            // Also set up a fallback in case voices aren't loaded yet
            const checkVoicesInterval = setInterval(() => {
                if (speechSynthesis && speechSynthesis.getVoices) {
                    const availableVoices = speechSynthesis.getVoices();
                    if (availableVoices.length > 0) {
                        clearInterval(checkVoicesInterval);
                        voices = availableVoices;
                        populateVoiceList();
                        voicesLoaded = true;
                        enableControls();
                    }
                }
            }, 500);
            
            // Set a timeout to stop checking after 10 seconds
            setTimeout(() => {
                clearInterval(checkVoicesInterval);
                if (!voicesLoaded) {
                    showError('Unable to load voices. Please refresh the page and try again.');
                    loadingVoices.textContent = 'Failed to load voices. Please refresh.';
                }
            }, 10000);
        }

        // Try to get voices with error handling
        function tryGetVoices() {
            try {
                if (speechSynthesis && speechSynthesis.getVoices) {
                    const availableVoices = speechSynthesis.getVoices();
                    if (availableVoices.length > 0) {
                        voices = availableVoices;
                        populateVoiceList();
                        voicesLoaded = true;
                        enableControls();
                        return;
                    }
                }
            } catch (error) {
                console.error('Error getting voices:', error);
                showError('Error loading voices. Please try again.');
            }
            
            // If voices aren't available yet, wait for the voiceschanged event
            if (speechSynthesis) {
                speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
            }
        }

        // Handle voices changed event
        function handleVoicesChanged() {
            try {
                if (speechSynthesis && speechSynthesis.getVoices) {
                    const availableVoices = speechSynthesis.getVoices();
                    if (availableVoices.length > 0 && !voicesLoaded) {
                        voices = availableVoices;
                        populateVoiceList();
                        voicesLoaded = true;
                        enableControls();
                        
                        // Remove the event listener after successful load
                        speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
                    }
                }
            } catch (error) {
                console.error('Error in voiceschanged event:', error);
            }
        }

        // Populate voice list in the dropdown
        function populateVoiceList() {
            // Clear existing options and loading message
            voiceSelect.innerHTML = '';
            loadingVoices.style.display = 'none';
            
            if (voices.length === 0) {
                voiceSelect.innerHTML = '<option value="">No voices available</option>';
                return;
            }
            
            // Group voices by language
            const voiceGroups = {};
            
            voices.forEach(voice => {
                const lang = voice.lang || 'Unknown';
                if (!voiceGroups[lang]) {
                    voiceGroups[lang] = [];
                }
                voiceGroups[lang].push(voice);
            });
            
            // Create optgroups for each language
            Object.keys(voiceGroups).sort().forEach(lang => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = `${lang} (${voiceGroups[lang].length})`;
                
                voiceGroups[lang].forEach(voice => {
                    const option = document.createElement('option');
                    option.value = voice.name;
                    option.textContent = `${voice.name} ${voice.default ? ' (Default)' : ''}`;
                    optgroup.appendChild(option);
                });
                
                voiceSelect.appendChild(optgroup);
            });
            
            // Select the default voice if available
            const defaultVoice = voices.find(voice => voice.default);
            if (defaultVoice) {
                voiceSelect.value = defaultVoice.name;
            } else if (voices.length > 0) {
                voiceSelect.value = voices[0].name;
            }
            
            // Enable the voice select
            voiceSelect.disabled = false;
        }

        // Enable controls once voices are loaded
        function enableControls() {
            playBtn.disabled = false;
            voiceSelect.disabled = false;
            loadingVoices.style.display = 'none';
        }

        // Toggle between light and dark themes
        function toggleTheme() {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            themeToggle.textContent = isDark ? '????' : '☀️';
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to dark mode' : 'Switch to light mode');
        }

        // Update character count
        function updateCharCount() {
            const count = textInput.value.length;
            charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
        }

        // Update selected voice
        function updateVoice() {
            if (utterance) {
                const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }
            }
        }

        // Update speech rate
        function updateRate() {
            const rate = parseFloat(rateSelect.value);
            rateValue.textContent = rate.toFixed(1);
            
            if (utterance) {
                utterance.rate = rate;
            }
        }

        // Update speech pitch
        function updatePitch() {
            const pitch = parseFloat(pitchSelect.value);
            pitchValue.textContent = pitch.toFixed(1);
            
            if (utterance) {
                utterance.pitch = pitch;
            }
        }

        // Play the speech
        function playSpeech() {
            const text = textInput.value.trim();
            
            if (!text) {
                showError('Please enter some text to convert to speech.');
                return;
            }
            
            if (!voicesLoaded || voices.length === 0) {
                showError('Voices are not loaded yet. Please wait and try again.');
                return;
            }
            
            // Reset state
            stopSpeech();
            
            // Create new utterance
            utterance = new SpeechSynthesisUtterance(text);
            
            // Set utterance properties
            const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            
            utterance.rate = parseFloat(rateSelect.value);
            utterance.pitch = parseFloat(pitchSelect.value);
            
            // Set up event handlers
            utterance.onstart = onSpeechStart;
            utterance.onend = onSpeechEnd;
            utterance.onerror = onSpeechError;
            utterance.onpause = onSpeechPause;
            utterance.onresume = onSpeechResume;
            utterance.onboundary = onSpeechBoundary;
            
            // Prepare text for highlighting
            prepareTextHighlighting(text);
            
            // Speak the text
            speechSynthesis.speak(utterance);
        }

        // Pause the speech
        function pauseSpeech() {
            if (isPlaying && !isPaused && speechSynthesis) {
                speechSynthesis.pause();
                clearInterval(progressInterval);
            }
        }

        // Resume the speech
        function resumeSpeech() {
            if (isPlaying && isPaused && speechSynthesis) {
                speechSynthesis.resume();
                startProgressTracking();
            }
        }

        // Stop the speech
        function stopSpeech() {
            if (isPlaying && speechSynthesis) {
                speechSynthesis.cancel();
                resetSpeechState();
            }
        }

        // Handle speech start
        function onSpeechStart() {
            isPlaying = true;
            isPaused = false;
            updateControlStates();
            statusText.textContent = 'Speaking...';
            showSuccess('Speech started successfully.');
            
            // Start progress tracking
            speechStartTime = Date.now();
            startProgressTracking();
        }

        // Handle speech end
        function onSpeechEnd() {
            resetSpeechState();
            statusText.textContent = 'Finished';
            showSuccess('Speech completed successfully.');
        }

        // Handle speech error
        function onSpeechError(event) {
            console.error('Speech error:', event);
            resetSpeechState();
            statusText.textContent = 'Error';
            showError('An error occurred during speech synthesis: ' + (event.error || 'Unknown error'));
        }

        // Handle speech pause
        function onSpeechPause() {
            isPaused = true;
            updateControlStates();
            statusText.textContent = 'Paused';
            clearInterval(progressInterval);
        }

        // Handle speech resume
        function onSpeechResume() {
            isPaused = false;
            updateControlStates();
            statusText.textContent = 'Speaking...';
            startProgressTracking();
        }

        // Handle word boundaries for highlighting
        function onSpeechBoundary(event) {
            if (event.name === 'word') {
                const charIndex = event.charIndex;
                const charLength = event.charLength;
                highlightCurrentWord(charIndex, charLength);
            }
        }

        // Start tracking speech progress
        function startProgressTracking() {
            clearInterval(progressInterval);
            
            progressInterval = setInterval(() => {
                if (isPlaying && !isPaused && utterance) {
                    // Estimate progress based on time elapsed
                    const elapsed = Date.now() - speechStartTime;
                    // Estimate total duration (this is approximate)
                    const totalChars = textInput.value.length;
                    const rate = utterance.rate || 1;
                    // Rough estimate: 150ms per character at normal speed
                    const estimatedTotalTime = (totalChars * 150) / rate;
                    
                    const progress = Math.min((elapsed / estimatedTotalTime) * 100, 100);
                    updateProgress(progress);
                }
            }, 100);
        }

        // Prepare text for highlighting
        function prepareTextHighlighting(text) {
            // Split text into words for highlighting
            words = text.split(/(\s+)/);
            currentWordIndex = 0;
            
            // Create highlighted text display
            let html = '';
            words.forEach((word, index) => {
                if (word.trim() === '') {
                    html += word; // Preserve whitespace
                } else {
                    html += `<span class="word" data-index="${index}">${word}</span>`;
                }
            });
            
            highlightedText.innerHTML = html;
            
            // Store word elements for quick access
            window.wordElements = highlightedText.querySelectorAll('.word');
        }

        // Highlight the current word being spoken
        function highlightCurrentWord(charIndex, charLength) {
            // Remove previous highlights
            const highlightedWords = highlightedText.querySelectorAll('.current-word');
            highlightedWords.forEach(word => {
                word.classList.remove('current-word');
                word.classList.add('highlight');
            });
            
            // Find the word at the current position
            const wordElements = window.wordElements || highlightedText.querySelectorAll('.word');
            let currentCharCount = 0;
            let foundWord = null;
            let foundIndex = -1;
            
            for (let i = 0; i < wordElements.length; i++) {
                const word = wordElements[i];
                const wordText = word.textContent;
                
                if (currentCharCount <= charIndex && currentCharCount + wordText.length >= charIndex) {
                    foundWord = word;
                    foundIndex = i;
                    break;
                }
                
                currentCharCount += wordText.length;
            }
            
            // Highlight the current word
            if (foundWord) {
                // Remove all highlights first
                const allWords = highlightedText.querySelectorAll('.word');
                allWords.forEach(word => {
                    word.classList.remove('highlight', 'current-word');
                });
                
                // Add current word highlight
                foundWord.classList.remove('highlight');
                foundWord.classList.add('current-word');
                
                // Add subtle highlight to upcoming words
                for (let i = foundIndex + 1; i < Math.min(foundIndex + 3, wordElements.length); i++) {
                    wordElements[i].classList.add('highlight');
                }
                
                // Scroll to the highlighted word
                foundWord.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }

        // Update progress bar and text
        function updateProgress(progress) {
            const roundedProgress = Math.round(progress);
            progressFill.style.width = `${roundedProgress}%`;
            progressText.textContent = `Progress: ${roundedProgress}%`;
        }

        // Update control button states
        function updateControlStates() {
            playBtn.disabled = isPlaying && !isPaused;
            pauseBtn.disabled = !isPlaying || isPaused;
            resumeBtn.disabled = !isPlaying || !isPaused;
            stopBtn.disabled = !isPlaying;
        }

        // Reset speech state
        function resetSpeechState() {
            isPlaying = false;
            isPaused = false;
            updateControlStates();
            progressFill.style.width = '0%';
            progressText.textContent = 'Progress: 0%';
            statusText.textContent = 'Ready';
            clearInterval(progressInterval);
            
            // Remove all highlights
            const highlightedWords = highlightedText.querySelectorAll('.highlight, .current-word');
            highlightedWords.forEach(word => {
                word.classList.remove('highlight', 'current-word');
            });
        }

        // Show error message
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }

        // Show success message
        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }

        // Disable all controls if browser doesn't support API
        function disableAllControls() {
            textInput.disabled = true;
            voiceSelect.disabled = true;
            rateSelect.disabled = true;
            pitchSelect.disabled = true;
            playBtn.disabled = true;
            pauseBtn.disabled = true;
            resumeBtn.disabled = true;
            stopBtn.disabled = true;
            loadingVoices.textContent = 'Speech API not supported';
        }
    </script>
</body>
</html>