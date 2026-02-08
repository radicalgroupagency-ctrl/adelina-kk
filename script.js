// Core state
let currentStep = 1;
const totalSteps = 4;

// Configuration
const REDIRECT_URL = "https://ivanacir-typebot-viewer.ad2ez3.easypanel.host/my-typebot-iqwxg0v";

function nextStep(stepNumber) {
    // Fade out current
    const currentEl = document.querySelector('.quiz-step.active');
    if (currentEl) {
        currentEl.classList.remove('active');
    }

    // Progressive Reveal Calculation
    // Total steps = 4 (including loading)
    // Step 1 (Initial): Grayscale 100%, Contrast 200%, Blur 15px
    // Step 2: Grayscale 66%, Contrast 166%, Blur 10px
    // Step 3: Grayscale 33%, Contrast 133%, Blur 5px
    // Step 4: Grayscale 0%, Contrast 100%, Blur 0px

    const totalLevels = 3; // Steps to fully reveal (2, 3, 4)
    const currentLevel = stepNumber - 1; // 0 to 3

    // Calculate reduction factor (1 -> 0)
    const ratio = Math.max(0, 1 - (currentLevel / totalLevels));

    // Base values
    const maxBlur = 15;
    const maxGrayscale = 100; // %
    const maxContrastBoost = 100; // % (on top of 100%)

    const newBlur = maxBlur * ratio;
    const newGrayscale = maxGrayscale * ratio;
    const newContrast = 100 + (maxContrastBoost * ratio);

    const bgElement = document.querySelector('.site-bg');
    if (bgElement) {
        bgElement.style.filter = `grayscale(${newGrayscale}%) contrast(${newContrast}%) blur(${newBlur}px) brightness(0.7)`;
    }

    // Show next step
    setTimeout(() => {
        const nextEl = document.getElementById(`step-${stepNumber}`);
        if (nextEl) {
            nextEl.classList.add('active');
            currentStep = stepNumber;
        }
    }, 200);
}

function startQualifying() {
    // Hide last question
    document.getElementById('step-4').classList.remove('active');

    // Show loading
    const loadingEl = document.getElementById('step-loading');
    loadingEl.classList.add('active');
    document.getElementById('progressBar').style.width = '100%';

    // Fully reveal image (No filters)
    const bgElement = document.querySelector('.site-bg');
    if (bgElement) {
        bgElement.style.filter = `grayscale(0%) contrast(100%) blur(0px) brightness(1)`;
    }

    // Simulate analysis steps
    const textEl = document.getElementById('loading-text');

    setTimeout(() => {
        textEl.textContent = "A validar o teu perfil...";
    }, 1500);

    setTimeout(() => {
        textEl.textContent = "A preparar o video...";
    }, 3000);

    setTimeout(() => {
        textEl.textContent = "Acesso LIBERADO!";
        textEl.style.color = "#ff9900";
    }, 4500);

    // Redirect
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 5500);
}

function blockAccess() {
    document.querySelector('.quiz-step.active').classList.remove('active');
    document.getElementById('step-blocked').classList.add('active');
    document.getElementById('progressBar').style.width = '0%';
}
