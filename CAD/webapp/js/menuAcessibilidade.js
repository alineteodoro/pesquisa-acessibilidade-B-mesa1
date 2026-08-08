const MIN_FONT_PERCENT = 60;
const MAX_FONT_PERCENT = 200;
const STEP_PERCENT = 10;
const STORAGE_KEY = 'cad-accessibility-font-percent';

const fontDecreaseBtn = document.getElementById('font-decrease');
const fontIncreaseBtn = document.getElementById('font-increase');
const fontValueOutput = document.getElementById('font-value');
const themeSection = document.querySelector('section[aria-labelledby="theme-title"]');
const contrastSection = document.querySelector('section[aria-labelledby="contrast-title"]');
const colorModeSection = document.querySelector('section[aria-labelledby="color-title"]');

let currentFontPercent = 100;
const scalableTextElements = [];

function loadSavedFontSize() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        return;
    }

    const parsed = parseInt(saved, 10);
    if (Number.isNaN(parsed)) {
        return;
    }

    currentFontPercent = Math.min(MAX_FONT_PERCENT, Math.max(MIN_FONT_PERCENT, parsed));
}

function saveFontSize() {
    window.localStorage.setItem(STORAGE_KEY, currentFontPercent.toString());
}

function applyWrap() {
    const shouldWrap = currentFontPercent > 120;
    [themeSection, contrastSection, colorModeSection].forEach(section => {
        if (!section) return;
        section.classList.toggle('wrap-large', shouldWrap);
    });
}

function shouldScaleElement(el) {
    return !el.matches('script, style, link, meta, title, iframe, img, svg, canvas, noscript, video, audio, object, embed');
}

function prepareTextScaling() {
    const allElements = document.querySelectorAll('body *');
    allElements.forEach(el => {
        if (!shouldScaleElement(el)) {
            return;
        }

        const style = window.getComputedStyle(el);
        const fontSize = style.fontSize;
        if (!fontSize || fontSize === '0px') {
            return;
        }

        const originalSize = parseFloat(fontSize);
        if (!originalSize || Number.isNaN(originalSize)) {
            return;
        }

        el.dataset.originalFontSize = originalSize.toString();
        scalableTextElements.push(el);
    });
}

function applyTextScale(percent) {
    const scale = percent / 100;
    scalableTextElements.forEach(el => {
        const originalSize = parseFloat(el.dataset.originalFontSize);
        if (!originalSize || Number.isNaN(originalSize)) {
            return;
        }
        el.style.fontSize = `${(originalSize * scale).toFixed(2)}px`;
    });
}

function updateFontSize(percent) {
    const newPercent = Math.min(MAX_FONT_PERCENT, Math.max(MIN_FONT_PERCENT, percent));
    if (newPercent === currentFontPercent) {
        return;
    }

    currentFontPercent = newPercent;
    applyTextScale(currentFontPercent);
    saveFontSize();

    if (fontValueOutput) {
        fontValueOutput.textContent = `${currentFontPercent}%`;
    }

    applyWrap();
}

function changeFontSize(delta) {
    updateFontSize(currentFontPercent + delta);
}

if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => changeFontSize(-STEP_PERCENT));
}

if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => changeFontSize(STEP_PERCENT));
}

loadSavedFontSize();
prepareTextScaling();
applyTextScale(currentFontPercent);
if (fontValueOutput) {
    fontValueOutput.textContent = `${currentFontPercent}%`;
}
applyWrap();
