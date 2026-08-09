const CURSOR_SCALE = 3;
const MIN_FONT_PERCENT = 60;
const MAX_FONT_PERCENT = 200;
const STEP_PERCENT = 10;
const STORAGE_KEY = 'cad-accessibility-font-percent';
const PRIMARY_COLOR_KEY = 'cad-accessibility-primary-color';
const BACKGROUND_COLOR_KEY = 'cad-accessibility-background-color';
const CURSOR_STORAGE_KEY = 'cad-accessibility-large-cursor';

// Cores originais do site, extraídas do :root em inicio.css.
// São usadas como valores padrão ao restaurar as configurações de acessibilidade.
const DEFAULT_PRIMARY_COLOR = '#FFFFFF';    // --branco
const DEFAULT_BACKGROUND_COLOR = '#F6F7FF'; // --branco-azulado
const DEFAULT_ACCENT_COLOR = '#0245A8';     // --azul-medio
const DEFAULT_DARK_BLUE = '#102030';        // --azul-escuro
const DEFAULT_LIGHT_BLUE = '#1E88EE';       // --azul-claro
const DEFAULT_CARD_BLUE = '#93C5FD';        // --azul-fundo-card
const DEFAULT_PAGE_BACKGROUND = '#F4F7FF';  // --fundo-pagina
const DEFAULT_SUB_GRAY = '#4B5563';         // --cinza-sub
const DEFAULT_BUTTON_GRAY = '#E5E7EB';      // --cinza-bg-btn
const DEFAULT_FOCUS = '#0245A8';            // --foco-visivel
const DEFAULT_GRAY = '#C7CFDA';             // --cinza
const DEFAULT_LIGHT_GRAY = '#858C9A';       // --cinza-claro
const DEFAULT_BORDER_GRAY = '#E5E7EB';      // --cinza-borda
const DEFAULT_ORANGE = '#FF6D00';           // --laranja

const DEFAULT_FONT_PERCENT = 100;

const fontDecreaseBtn = document.getElementById('font-decrease');
const fontIncreaseBtn = document.getElementById('font-increase');
const fontValueOutput = document.getElementById('font-value');
const themeSection = document.querySelector('section[aria-labelledby="theme-title"]');
const contrastSection = document.querySelector('section[aria-labelledby="contrast-title"]');
const colorModeSection = document.querySelector('section[aria-labelledby="color-title"]');
const menuElement = document.querySelector('aside.menu');
const primaryColorInput = document.getElementById('primaryColor');
const backgroundColorInput = document.getElementById('backgroundColor');
const resetAccessibilityBtn = document.getElementById('resetAccessibility');
const accessibilityMenu = document.getElementById('accessibilityMenu');
const largeCursorCheckbox = document.getElementById('largeCursor');

const accessibilityMenuColors = {
    background: '#102030',
    text: '#FFFFFF',
    accent: '#0245A8'
};

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

function applyPrimaryColor(color) {
    document.documentElement.style.setProperty('--branco', color);
}

function applyBackgroundColor(color) {
    document.documentElement.style.setProperty('--branco-azulado', color);
    document.body.style.backgroundColor = color;
}

function createLargeCursor(scale) {
    const baseSize = 32;
    const size = Math.round(baseSize * scale);

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="${size}"
            height="${size}"
            viewBox="0 0 32 32"
        >
            <path
                d="M3 2L27 17L17 19L22 29L17 31L12 21L5 27Z"
                fill="white"
                stroke="black"
                stroke-width="2"
                stroke-linejoin="round"
            />
        </svg>
    `;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 2 2, auto`;
}

function updateCursorSize(save = true) {
    if (!largeCursorCheckbox) {
        return;
    }

    if (largeCursorCheckbox.checked) {
        const cursor = createLargeCursor(CURSOR_SCALE);

        document.documentElement.style.setProperty(
            '--accessibility-cursor',
            cursor
        );

        document.documentElement.classList.add('large-cursor');
    } else {
        document.documentElement.classList.remove('large-cursor');
    }

    if (save) {
        localStorage.setItem(
            CURSOR_STORAGE_KEY,
            largeCursorCheckbox.checked ? 'true' : 'false'
        );
    }
}

function loadSavedCursorSize() {
    if (!largeCursorCheckbox) {
        return;
    }

    const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);

    if (savedCursor === 'true') {
        largeCursorCheckbox.checked = true;
    } else {
        largeCursorCheckbox.checked = false;
    }

    updateCursorSize(false);
}

// --- Contraste automático das cores do projeto ---

// Todas as variáveis de cor utilizadas pelo projeto.
// As duplicadas existentes nos diferentes CSS foram consolidadas aqui.
const PROJECT_COLORS = {
    '--azul-escuro': '#102030',
    '--azul-medio': '#0245A8',
    '--azul-claro': '#1E88EE',
    '--azul-fundo-card': '#93C5FD',
    '--fundo-pagina': '#F4F7FF',
    '--branco': '#FFFFFF',
    '--cinza-sub': '#4B5563',
    '--cinza-bg-btn': '#E5E7EB',
    '--foco-visivel': '#0245A8',
    '--branco-azulado': '#F6F7FF',
    '--cinza': '#C7CFDA',
    '--cinza-claro': '#858C9A',
    '--cinza-borda': '#E5E7EB',
    '--laranja': '#FF6D00'
};

// Variáveis que representam as superfícies escolhidas pelos pickers.
// Elas serão usadas como base para o cálculo.
const SURFACE_VARIABLES = [
    '--branco',
    '--branco-azulado'
];

// O menu de acessibilidade NÃO participa do cálculo.
const ACCESSIBILITY_MENU_SELECTOR = '#accessibilityMenu';

function hexToRgb(hex) {
    let sanitized = hex.trim().replace('#', '');

    if (sanitized.length === 3) {
        sanitized = sanitized
            .split('')
            .map(char => char + char)
            .join('');
    }

    const bigint = parseInt(sanitized, 16);

    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function relativeLuminance({ r, g, b }) {
    const [rl, gl, bl] = [r, g, b].map(channel => {
        const c = channel / 255;

        return c <= 0.03928
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(hexA, hexB) {
    const lumA = relativeLuminance(hexToRgb(hexA));
    const lumB = relativeLuminance(hexToRgb(hexB));

    const lighter = Math.max(lumA, lumB);
    const darker = Math.min(lumA, lumB);

    return (lighter + 0.05) / (darker + 0.05);
}

function getCurrentSurfaceColors() {
    const root = getComputedStyle(document.documentElement);

    const primary =
        (primaryColorInput && primaryColorInput.value)
        || root.getPropertyValue('--branco').trim()
        || PROJECT_COLORS['--branco'];

    const background =
        (backgroundColorInput && backgroundColorInput.value)
        || root.getPropertyValue('--branco-azulado').trim()
        || PROJECT_COLORS['--branco-azulado'];

    return [primary, background];
}

function getProjectColorCandidates() {
    return Object.entries(PROJECT_COLORS)
        .filter(([variable]) => !SURFACE_VARIABLES.includes(variable))
        .map(([, color]) => color);
}

function pickBestContrastColor(surfaceColors, candidates) {
    let bestCandidate = candidates[0];
    let bestWorstCaseContrast = -Infinity;

    candidates.forEach(candidate => {
        const worstCaseContrast = Math.min(
            ...surfaceColors.map(surface =>
                contrastRatio(candidate, surface)
            )
        );

        if (worstCaseContrast > bestWorstCaseContrast) {
            bestWorstCaseContrast = worstCaseContrast;
            bestCandidate = candidate;
        }
    });

    return bestCandidate;
}

function updateColorContrast() {
    const surfaceColors = getCurrentSurfaceColors();
    const candidates = getProjectColorCandidates();

    const root = document.documentElement;

    Object.keys(PROJECT_COLORS).forEach(variable => {

        // As cores usadas pelos pickers são superfícies,
        // portanto não devem ser substituídas pelo algoritmo.
        if (SURFACE_VARIABLES.includes(variable)) {
            return;
        }

        const currentColor = PROJECT_COLORS[variable];

        // Se a cor atual já possui contraste adequado
        // contra TODAS as superfícies, ela é preservada.
        const hasGoodContrast = surfaceColors.every(surface =>
            contrastRatio(currentColor, surface) >= 4.5
        );

        if (hasGoodContrast) {
            root.style.setProperty(variable, currentColor);
            return;
        }

        // Caso contrário, procura entre todas as cores
        // do projeto aquela que possui o melhor pior-caso.
        const bestColor = pickBestContrastColor(
            surfaceColors,
            candidates
        );

        root.style.setProperty(variable, bestColor);
    });
}

function saveColor(key, color) {
    window.localStorage.setItem(key, color);
}

function loadSavedColors() {
    const savedPrimary = window.localStorage.getItem(PRIMARY_COLOR_KEY);
    if (savedPrimary) {
        applyPrimaryColor(savedPrimary);
        if (primaryColorInput) {
            primaryColorInput.value = savedPrimary;
        }
    }

    const savedBackground = window.localStorage.getItem(BACKGROUND_COLOR_KEY);
    if (savedBackground) {
        applyBackgroundColor(savedBackground);
        if (backgroundColorInput) {
            backgroundColorInput.value = savedBackground;
        }
    }

    // Só recalcula o contraste se o usuário já tiver customizado alguma cor;
    // assim o visual padrão do site (--azul-medio original) não é mexido à toa.
    if (savedPrimary || savedBackground) {
        updateColorContrast();
    }
}

function applyWrap() {
    const shouldWrap = currentFontPercent > 120;
    [themeSection, contrastSection, colorModeSection].forEach(section => {
        if (!section) return;
        section.classList.toggle('wrap-large', shouldWrap);
    });
}

function applyMenuWidth() {
    if (!menuElement) return;
    menuElement.classList.toggle('wide', currentFontPercent > 180);
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
    applyMenuWidth();
}

function changeFontSize(delta) {
    updateFontSize(currentFontPercent + delta);
}

// --- Restaurar padrões ---
// Volta o tamanho da fonte e as cores para os valores originais definidos
// em :root no inicio.css, e limpa as preferências salvas no localStorage.
function resetToDefaults() {
    // Fonte
    currentFontPercent = DEFAULT_FONT_PERCENT;
    applyTextScale(currentFontPercent);
    if (fontValueOutput) {
        fontValueOutput.textContent = `${currentFontPercent}%`;
    }
    applyWrap();
    applyMenuWidth();

    if (largeCursorCheckbox) {
        largeCursorCheckbox.checked = false;
        updateCursorSize();
    }

    // Cores (valores originais do :root de inicio.css)
    applyPrimaryColor(DEFAULT_PRIMARY_COLOR);
    applyBackgroundColor(DEFAULT_BACKGROUND_COLOR);
    document.documentElement.style.setProperty('--azul-escuro', DEFAULT_DARK_BLUE);
    document.documentElement.style.setProperty('--azul-medio', DEFAULT_ACCENT_COLOR);
    document.documentElement.style.setProperty('--azul-claro', DEFAULT_LIGHT_BLUE);
    document.documentElement.style.setProperty('--azul-fundo-card', DEFAULT_CARD_BLUE);
    document.documentElement.style.setProperty('--fundo-pagina', DEFAULT_PAGE_BACKGROUND);
    document.documentElement.style.setProperty('--cinza-sub', DEFAULT_SUB_GRAY);
    document.documentElement.style.setProperty('--cinza-bg-btn', DEFAULT_BUTTON_GRAY);
    document.documentElement.style.setProperty('--foco-visivel', DEFAULT_FOCUS);
    document.documentElement.style.setProperty('--cinza', DEFAULT_GRAY);
    document.documentElement.style.setProperty('--cinza-claro', DEFAULT_LIGHT_GRAY);
    document.documentElement.style.setProperty('--cinza-borda', DEFAULT_BORDER_GRAY);
    document.documentElement.style.setProperty('--laranja', DEFAULT_ORANGE);

    // Remove o override inline do body para não conflitar com a variável CSS
    document.body.style.backgroundColor = '';

    if (primaryColorInput) {
        primaryColorInput.value = DEFAULT_PRIMARY_COLOR;
    }
    if (backgroundColorInput) {
        backgroundColorInput.value = DEFAULT_BACKGROUND_COLOR;
    }

    // Limpa as preferências salvas
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(PRIMARY_COLOR_KEY);
    window.localStorage.removeItem(BACKGROUND_COLOR_KEY);
}

if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => changeFontSize(-STEP_PERCENT));
}

if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => changeFontSize(STEP_PERCENT));
}

if (largeCursorCheckbox) {
    largeCursorCheckbox.addEventListener('change', updateCursorSize);
}

if (primaryColorInput) {
    primaryColorInput.addEventListener('input', (event) => {
        const color = event.target.value;
        applyPrimaryColor(color);
        saveColor(PRIMARY_COLOR_KEY, color);
        updateColorContrast();
    });
}

if (backgroundColorInput) {
    backgroundColorInput.addEventListener('input', (event) => {
        const color = event.target.value;
        applyBackgroundColor(color);
        saveColor(BACKGROUND_COLOR_KEY, color);
        updateColorContrast();
    });
}

if (resetAccessibilityBtn) {
    resetAccessibilityBtn.addEventListener('click', resetToDefaults);
}

loadSavedFontSize();
prepareTextScaling();
applyTextScale(currentFontPercent);
if (fontValueOutput) {
    fontValueOutput.textContent = `${currentFontPercent}%`;
}
applyWrap();
applyMenuWidth();
loadSavedColors();
loadSavedCursorSize();