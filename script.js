// Sound effects
const buttonSound = new Audio('/zapsplat_multimedia_button_click_001.mp3');
const hoverSound = new Audio('/zapsplat_foley_plastic_button_press_click_002_56903.mp3');

// Set volume levels
buttonSound.volume = 0.3;
hoverSound.volume = 0.2;

let isFullscreen = false;
let isMinimized = false;

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}

function minimizeWindow() {
    playSound(buttonSound);
    const window = document.getElementById('terminal-window');
    isMinimized = !isMinimized;
    
    if (isMinimized) {
        window.classList.add('minimized');
        setTimeout(() => {
            window.style.display = 'none';
        }, 400);
        
        // Restore after 3 seconds for demo purposes
        setTimeout(() => {
            window.style.display = 'flex';
            window.classList.remove('minimized');
            isMinimized = false;
        }, 3000);
    }
}

function toggleFullscreen() {
    playSound(buttonSound);
    const window = document.getElementById('terminal-window');
    isFullscreen = !isFullscreen;
    
    if (isFullscreen) {
        window.classList.add('fullscreen');
    } else {
        window.classList.remove('fullscreen');
    }
}

// Add some interactive terminal-like behavior
document.addEventListener('DOMContentLoaded', function() {
    // Animate the terminal output on load with staggered timing
    const elements = document.querySelectorAll('.command-line, .profile-section, .skill-category, .status-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Add click handlers with sound effects
    document.querySelectorAll('.status-card').forEach(card => {
        card.addEventListener('click', function() {
            playSound(buttonSound);
            this.style.transform = 'scale(0.98) translateY(-4px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px)';
            }, 150);
        });
    });
    
    // Add hover sound effects and visual feedback
    document.querySelectorAll('.skill-tag, .contact-item, .control-btn').forEach(item => {
        item.addEventListener('mouseenter', function() {
            playSound(hoverSound);
            if (this.classList.contains('skill-tag')) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (this.classList.contains('skill-tag')) {
                this.style.transform = 'none';
            }
        });
    });
    
    // Enhanced cursor animation
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        let cursorChars = ['_', '█', '▓', '░'];
        let charIndex = 0;
        setInterval(() => {
            cursor.textContent = cursorChars[charIndex];
            charIndex = (charIndex + 1) % cursorChars.length;
        }, 600);
    }
    
    // Add window dragging functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    const windowHeader = document.querySelector('.window-header');
    const windowElement = document.querySelector('.window');
    
    windowHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        if (!isFullscreen) {
            playSound(hoverSound);
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === windowHeader || windowHeader.contains(e.target)) {
                isDragging = true;
                windowElement.style.cursor = 'move';
            }
        }
    }
    
    function drag(e) {
        if (isDragging && !isFullscreen) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            windowElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        windowElement.style.cursor = 'default';
    }
    
    // Matrix-style typing effect for commands
    document.querySelectorAll('.command').forEach(command => {
        const text = command.textContent;
        command.textContent = '';
        let i = 0;
        
        const typeEffect = setInterval(() => {
            command.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(typeEffect);
            }
        }, 50 + Math.random() * 50);
    });
    
    // Add reactive window pulse on activity
    let activityTimeout;
    document.addEventListener('click', () => {
        windowElement.style.boxShadow = '0 20px 40px rgba(88, 166, 255, 0.3), 0 0 0 1px rgba(88, 166, 255, 0.5)';
        clearTimeout(activityTimeout);
        activityTimeout = setTimeout(() => {
            windowElement.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)';
        }, 1000);
    });
});

// Hacker easter eggs
let hackSequence = [];
const hackCode = [72, 65, 67, 75]; // H-A-C-K

document.addEventListener('keydown', function(e) {
    hackSequence.push(e.keyCode);
    if (hackSequence.length > hackCode.length) {
        hackSequence.shift();
    }
    
    if (JSON.stringify(hackSequence) === JSON.stringify(hackCode)) {
        // Hacker mode activated!
        playSound(buttonSound);
        document.body.style.animation = 'hackGlow 3s ease-in-out';
        
        // Add matrix rain effect
        createMatrixRain();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = '01ニコ☠️💀🔥⚡';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#58a6ff';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 35);
    
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 3000);
}

// Add hack glow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes hackGlow {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        25% { filter: hue-rotate(90deg) brightness(1.2); }
        50% { filter: hue-rotate(180deg) brightness(1.1); }
        75% { filter: hue-rotate(270deg) brightness(1.2); }
    }
`;
document.head.appendChild(style);