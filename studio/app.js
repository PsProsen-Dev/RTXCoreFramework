// State configuration
const state = {
    leftQuote: `"English is the programming language of the future."`,
    rightQuote: `"Your Mother Tongue is the Programming Language of the Future."`,
    leftColor: '#76B900',
    rightColor: '#00e5ff',
    morphSpeed: 5,
    scripts: {
        devanagari: true,
        bengali: true,
        arabic: true,
        spanish: true
    }
};

// Character sets for morphing background
const charSets = {
    devanagari: 'अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह',
    bengali: 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ',
    arabic: 'أبجدهوزحطيكلمنسعفصقرشتثخذضظغ',
    spanish: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
};

const codeSnippets = [
    'def main():',
    'class Developer:',
    'import numpy as np',
    'std::cout << "Hello"',
    '#include <iostream>',
    'const rtx = true;',
    'fn calculate() ->',
    'let mut tech =',
    'print(f"RTX {v}")',
    'sys.exit(0)',
    'public static void',
    'override func draw()',
    'using System.IO;'
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initWorkspaceScaling();
    initFormControls();
    initMatrixCanvases();
});

// 1. Maintain dynamic scaling of the poster container to fit browser viewport
function initWorkspaceScaling() {
    const poster = document.getElementById('viral-poster');
    const workspace = document.querySelector('.workspace');

    function scalePoster() {
        const workspaceWidth = workspace.clientWidth - 80; // Margin
        const workspaceHeight = workspace.clientHeight - 80;
        const size = Math.min(workspaceWidth, workspaceHeight, 1000);
        
        const scale = size / 1000;
        poster.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', scalePoster);
    // Initial scale call
    setTimeout(scalePoster, 100);
}

// 2. Setup control inputs and bind to poster preview
function initFormControls() {
    const leftInput = document.getElementById('left-quote-input');
    const rightInput = document.getElementById('right-quote-input');
    const leftColorInput = document.getElementById('left-color');
    const rightColorInput = document.getElementById('right-color');
    const morphSpeedInput = document.getElementById('morph-speed');
    
    const leftQuoteEl = document.getElementById('left-quote');
    const rightQuoteEl = document.getElementById('right-quote');
    
    // Bind inputs to elements & state
    leftInput.addEventListener('input', (e) => {
        state.leftQuote = e.target.value;
        leftQuoteEl.textContent = state.leftQuote;
    });

    rightInput.addEventListener('input', (e) => {
        state.rightQuote = e.target.value;
        rightQuoteEl.textContent = state.rightQuote;
    });

    leftColorInput.addEventListener('input', (e) => {
        state.leftColor = e.target.value;
        document.documentElement.style.setProperty('--left-neon-color', state.leftColor);
    });

    rightColorInput.addEventListener('input', (e) => {
        state.rightColor = e.target.value;
        document.documentElement.style.setProperty('--right-neon-color', state.rightColor);
    });

    morphSpeedInput.addEventListener('input', (e) => {
        state.morphSpeed = parseInt(e.target.value);
    });

    // Checkboxes
    const scriptCheckboxes = ['devanagari', 'bengali', 'arabic', 'spanish'];
    scriptCheckboxes.forEach(script => {
        const chk = document.getElementById(`chk-${script}`);
        chk.addEventListener('change', (e) => {
            state.scripts[script] = e.target.checked;
        });
    });

    // Export button handler
    const exportBtn = document.getElementById('btn-export');
    exportBtn.addEventListener('click', exportViralPoster);
}

// 3. Morphing matrix background code
function initMatrixCanvases() {
    const leftCanvas = document.getElementById('canvas-left-matrix');
    const rightCanvas = document.getElementById('canvas-right-matrix');
    
    setupMatrixStream(leftCanvas, true); // Left is nvidia green theme
    setupMatrixStream(rightCanvas, false); // Right is cyan/gold holographic theme
}

function setupMatrixStream(canvas, isLeft) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize) + 1;
    let drops = Array(columns).fill(1).map(() => Math.random() * -100);

    // Stream elements: each drops holds characters that can morph
    function draw() {
        // Subtle transparent black fade to create trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decide text color
        if (isLeft) {
            ctx.fillStyle = hexToRgba(state.leftColor, 0.45);
        } else {
            // Alternating gold and cyan for right cyber brain
            ctx.fillStyle = Math.random() > 0.5 ? '#ffd700' : state.rightColor;
        }
        
        ctx.font = `${fontSize}px 'Fira Code', monospace`;

        for (let i = 0; i < drops.length; i++) {
            // Determine active character pool based on checkboxes and morphing state
            let char = '';
            
            // Randomly morph between code snippets and global characters
            if (Math.random() < 0.25) {
                // Snippet morph
                const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                char = snippet.charAt(Math.floor(Math.random() * snippet.length));
            } else {
                // Get active character sets
                let activePools = [];
                if (state.scripts.devanagari) activePools.push(charSets.devanagari);
                if (state.scripts.bengali) activePools.push(charSets.bengali);
                if (state.scripts.arabic) activePools.push(charSets.arabic);
                if (state.scripts.spanish) activePools.push(charSets.spanish);
                
                if (activePools.length > 0) {
                    const selectedPool = activePools[Math.floor(Math.random() * activePools.length)];
                    char = selectedPool.charAt(Math.floor(Math.random() * selectedPool.length));
                } else {
                    char = String.fromCharCode(33 + Math.random() * 93);
                }
            }

            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Draw character
            ctx.fillText(char, x, y);

            // Move stream down according to morph speed state
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += (state.morphSpeed / 5);
        }
    }

    setInterval(draw, 33);
}

// Helper to convert hex colors to rgba with custom opacity
function hexToRgba(hex, opacity) {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x' + c.join('');
        return `rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')},${opacity})`;
    }
    return `rgba(255,255,255,${opacity})`;
}

// 4. Manual High-Resolution Canvas Export (Generates a clean 3840x3840 PNG poster)
function exportViralPoster() {
    const exportBtn = document.getElementById('btn-export');
    exportBtn.disabled = true;
    exportBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Compiling Poster...';

    // 8K / High Resolution (3840 x 3840 pixels)
    const exportWidth = 3840;
    const exportHeight = 3840;
    
    const canvas = document.createElement('canvas');
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const ctx = canvas.getContext('2d');

    // Load background images
    const imgLeft = new Image();
    const imgRight = new Image();
    
    imgLeft.src = 'assets/jensen_portrait.png';
    imgRight.src = 'assets/holographic_brain.png';

    let imagesLoaded = 0;
    const onImageLoad = () => {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            renderAndDownload();
        }
    };

    imgLeft.onload = onImageLoad;
    imgRight.onload = onImageLoad;

    // Fallback in case image loading fails
    imgLeft.onerror = onImageLoad;
    imgRight.onerror = onImageLoad;

    function renderAndDownload() {
        // Clear background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, exportWidth, exportHeight);

        // --- DRAW LEFT SPLIT (JENSEN HUANG) ---
        const halfWidth = exportWidth / 2;
        
        ctx.save();
        // Clip to left side
        ctx.beginPath();
        ctx.rect(0, 0, halfWidth, exportHeight);
        ctx.clip();

        // Draw portrait
        if (imgLeft.complete && imgLeft.naturalWidth > 0) {
            // Draw image with Cover scaling
            drawCoverImage(ctx, imgLeft, 0, 0, halfWidth, exportHeight);
        } else {
            // Fallback gradient if image fails
            ctx.fillStyle = '#0a1005';
            ctx.fillRect(0, 0, halfWidth, exportHeight);
        }

        // Left dark gradient overlay
        const gradLeft = ctx.createLinearGradient(0, 0, 0, exportHeight);
        gradLeft.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
        gradLeft.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
        ctx.fillStyle = gradLeft;
        ctx.fillRect(0, 0, halfWidth, exportHeight);
        ctx.restore();

        // --- DRAW RIGHT SPLIT (HOLOGRAPHIC BRAIN) ---
        ctx.save();
        // Clip to right side
        ctx.beginPath();
        ctx.rect(halfWidth, 0, halfWidth, exportHeight);
        ctx.clip();

        // Draw brain
        if (imgRight.complete && imgRight.naturalWidth > 0) {
            drawCoverImage(ctx, imgRight, halfWidth, 0, halfWidth, exportHeight);
        } else {
            // Fallback gradient
            ctx.fillStyle = '#050c12';
            ctx.fillRect(halfWidth, 0, halfWidth, exportHeight);
        }

        // Right dark gradient overlay
        const gradRight = ctx.createLinearGradient(halfWidth, 0, halfWidth, exportHeight);
        gradRight.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
        gradRight.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
        ctx.fillStyle = gradRight;
        ctx.fillRect(halfWidth, 0, halfWidth, exportHeight);
        ctx.restore();

        // --- DRAW STREAMING CODE SYMBOLS ON BACKGROUND ---
        drawStaticCodeMatrix(ctx, exportWidth, exportHeight);

        // --- DRAW LEFT CONTENT (QUOTE & TAG) ---
        ctx.save();
        ctx.font = 'bold 44px "Orbitron", sans-serif';
        ctx.fillStyle = state.leftColor;
        ctx.letterSpacing = '10px';
        ctx.fillText('JENSEN HUANG • CEO OF NVIDIA', 120, exportHeight - 1000);

        // Neon shadow settings for Left Quote
        ctx.shadowColor = state.leftColor;
        ctx.shadowBlur = 40;
        ctx.font = '900 130px "Outfit", sans-serif';
        ctx.fillStyle = '#ffffff';
        wrapText(ctx, state.leftQuote.toUpperCase(), 120, exportHeight - 800, halfWidth - 240, 170);
        ctx.restore();

        // --- DRAW RIGHT CONTENT (QUOTE & TAG) ---
        ctx.save();
        ctx.font = 'bold 44px "Orbitron", sans-serif';
        ctx.fillStyle = state.rightColor;
        ctx.letterSpacing = '10px';
        ctx.fillText('THE GLOBAL COUNTER-DEBATE', halfWidth + 120, exportHeight - 1000);

        // Neon shadow settings for Right Quote
        ctx.shadowColor = state.rightColor;
        ctx.shadowBlur = 40;
        ctx.font = '900 130px "Outfit", sans-serif';
        ctx.fillStyle = '#ffffff';
        wrapText(ctx, state.rightQuote.toUpperCase(), halfWidth + 120, exportHeight - 800, halfWidth - 240, 170);
        ctx.restore();

        // --- DRAW CENTER GLOW DIVIDER ---
        ctx.save();
        const dividerGrad = ctx.createLinearGradient(halfWidth, 0, halfWidth, exportHeight);
        dividerGrad.addColorStop(0, 'transparent');
        dividerGrad.addColorStop(0.3, hexToRgba(state.leftColor, 0.6));
        dividerGrad.addColorStop(0.7, hexToRgba(state.rightColor, 0.6));
        dividerGrad.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = dividerGrad;
        ctx.lineWidth = 12;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(halfWidth, 0);
        ctx.lineTo(halfWidth, exportHeight);
        ctx.stroke();
        ctx.restore();

        // --- DRAW SLEEK METALLIC EMBOSSED RTX⚡ LOGO ---
        const logoWidth = 560;
        const logoHeight = 160;
        const logoX = halfWidth - (logoWidth / 2);
        const logoY = exportHeight - 350;

        ctx.save();
        // Logo Background Metallic Gradient
        const metalGrad = ctx.createLinearGradient(logoX, logoY, logoX + logoWidth, logoY + logoHeight);
        metalGrad.addColorStop(0, '#2e323e');
        metalGrad.addColorStop(0.5, '#191b24');
        metalGrad.addColorStop(1, '#0e0f14');
        
        ctx.fillStyle = metalGrad;
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 4;
        
        // Rounded box
        ctx.beginPath();
        roundRect(ctx, logoX, logoY, logoWidth, logoHeight, 20);
        ctx.fill();
        ctx.stroke();

        // Inner shadow / Bevel effect
        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        roundRect(ctx, logoX + 3, logoY + 3, logoWidth - 6, logoHeight - 6, 17);
        ctx.stroke();

        // Render RTX Logo text
        ctx.font = '900 80px "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Text embossing shadows
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillText('RTX⚡', halfWidth - 2, logoY + (logoHeight / 2) - 2);
        
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText('RTX⚡', halfWidth, logoY + (logoHeight / 2));
        ctx.restore();

        // --- TRIGGER EXPORT DOWNLOAD ---
        try {
            const link = document.createElement('a');
            link.download = 'RTX_Viral_Debate_Poster.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Export error: ', err);
            alert('Export failed. Make sure your browser supports dynamic canvas export.');
        }

        // Reset button
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fa-solid fa-file-image"></i> Export Viral Poster';
    }
}

// Cover image drawing helper
function drawCoverImage(ctx, img, x, y, w, h) {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = w / h;
    let sWidth, sHeight, sx, sy;

    if (imgRatio > targetRatio) {
        sHeight = img.naturalHeight;
        sWidth = sHeight * targetRatio;
        sx = (img.naturalWidth - sWidth) / 2;
        sy = 0;
    } else {
        sWidth = img.naturalWidth;
        sHeight = sWidth / imgRatio;
        sx = 0;
        sy = (img.naturalHeight - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

// Rounded rectangle helper
function roundRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
}

// Canvas Text Wrap utility
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, currentY);
}

// Generate code background for high-res export
function drawStaticCodeMatrix(ctx, width, height) {
    const fontSize = 48;
    ctx.font = `${fontSize}px 'Fira Code', monospace`;
    
    // Draw columns of characters
    for (let x = 0; x < width; x += fontSize * 1.5) {
        for (let y = 0; y < height; y += fontSize * 1.5) {
            if (Math.random() > 0.88) { // Sparse distribution for high-res look
                const isLeft = x < (width / 2);
                
                // Color configuration
                if (isLeft) {
                    ctx.fillStyle = hexToRgba(state.leftColor, 0.15);
                } else {
                    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 215, 0, 0.18)' : hexToRgba(state.rightColor, 0.18);
                }
                
                // Generate random glyph
                let char = '';
                if (Math.random() < 0.2) {
                    const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                    char = snippet.charAt(Math.floor(Math.random() * snippet.length));
                } else {
                    let pools = [];
                    if (state.scripts.devanagari) pools.push(charSets.devanagari);
                    if (state.scripts.bengali) pools.push(charSets.bengali);
                    if (state.scripts.arabic) pools.push(charSets.arabic);
                    if (state.scripts.spanish) pools.push(charSets.spanish);
                    
                    if (pools.length > 0) {
                        const pool = pools[Math.floor(Math.random() * pools.length)];
                        char = pool.charAt(Math.floor(Math.random() * pool.length));
                    } else {
                        char = '$';
                    }
                }
                ctx.fillText(char, x, y);
            }
        }
    }
}
