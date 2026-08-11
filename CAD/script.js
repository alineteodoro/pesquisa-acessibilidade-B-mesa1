// JS: Modo escuro

const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Ativar modo claro');
    themeToggle.setAttribute('aria-pressed', 'true');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');

        themeIcon.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
        themeToggle.setAttribute('aria-pressed', 'false');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        themeIcon.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Ativar modo claro');
        themeToggle.setAttribute('aria-pressed', 'true');
    }
});