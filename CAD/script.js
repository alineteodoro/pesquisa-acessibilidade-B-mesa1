const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Ativar modo claro');
    themeToggle.setAttribute('aria-pressed', 'true');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');

        themeIcon.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
        themeToggle.setAttribute('aria-pressed', 'false');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        themeIcon.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Ativar modo claro');
        themeToggle.setAttribute('aria-pressed', 'true');
    }
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth'
        });

        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    });
});

const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.querySelector('#email');
    const senha = document.querySelector('#senha');

    if (!email.value.trim() || !senha.value.trim()) {
        return;
    }
});