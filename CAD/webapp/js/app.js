const API_URL = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
  ? 'http://localhost:3001/api'
  : 'https://sua-api-em-producao/api';

function announce(message) {
  let status = document.querySelector('#app-status');
  if (!status) {
    status = document.createElement('p');
    status.id = 'app-status';
    status.className = 'sr-only';
    status.setAttribute('aria-live', 'polite');
    document.body.append(status);
  }
  status.textContent = message;
}

async function api(path, options = {}) {
  const token = localStorage.getItem('cadToken');
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) throw new Error(data.message || 'Não foi possível concluir a solicitação.');
  return data;
}

function setupLogin() {
  const form = document.querySelector('#login-form');
  const registerForm = document.querySelector('#register-form');
  const loginPanel = document.querySelector('#loginPanel');
  const registerPanel = document.querySelector('#registerPanel');
  const toggle = document.querySelector('#toggleButton');

  if (!form || !registerForm || !loginPanel || !registerPanel || !toggle) return;

  const updateAuthView = (showRegister) => {
    registerPanel.hidden = !showRegister;
    registerPanel.inert = !showRegister;
    loginPanel.hidden = showRegister;
    loginPanel.inert = showRegister;
    toggle.textContent = showRegister ? 'Já tenho uma conta' : 'Cadastre-se';
    toggle.setAttribute('aria-expanded', String(showRegister));
    (showRegister ? document.querySelector('#register-name') : document.querySelector('#login-email'))?.focus();
  };

  toggle.addEventListener('click', () => {
    const showRegister = registerPanel.hidden;
    updateAuthView(showRegister);
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const data = await api('/auth/logarConta', { method: 'POST', body: JSON.stringify({ email: document.querySelector('#login-email').value, senha_hash: document.querySelector('#login-password').value }) });
      localStorage.setItem('cadToken', data.token);
      localStorage.setItem('cadUser', JSON.stringify(data.usuario));
      announce('Login realizado. Redirecionando para cursos.');
      location.href = 'cursos.html';
    } catch (error) { announce(error.message); }
  });
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = document.querySelector('#register-password').value;
    if (password !== document.querySelector('#confirm-password').value) return announce('As senhas não coincidem.');
    try {
      await api('/auth/criarConta', { method: 'POST', body: JSON.stringify({
        nome: document.querySelector('#register-name').value,
        email: document.querySelector('#register-email').value,
        senha_hash: password,
        dt_nascimento: document.querySelector('#birthdate').value,
      }) });
      announce('Conta criada. Agora faça login.');
      toggle.click();
    } catch (error) { announce(error.message); }
  });
}

async function setupSearch() {
  const input = document.querySelector('#search-input');
  const grid = document.querySelector('.courses-grid');
  if (!input || !grid) return;
  try {
    const courses = await api('/curso');
    if (Array.isArray(courses) && courses.length) {
      grid.innerHTML = courses.map((course) => `
        <article class="course-cards">
          <div class="card-thumb-wrapper"><img src="../assets/FundoPadrão.png" alt="" class="course-thumb"></div>
          <div class="course-content">
            <h2 class="course-title"><a href="videoAula.html?curso=${course.id_curso}" class="card-link">${escapeHtml(course.nome)}</a></h2>
            <p>${escapeHtml(course.descricao)}</p>
            <p><strong>${escapeHtml(course.categoria)}</strong> · ${course.duracao} minutos</p>
          </div>
        </article>`).join('');
    }
  } catch (error) {
    announce('Não foi possível atualizar o catálogo. Exibindo os cursos disponíveis na página.');
  }
  const cards = [...document.querySelectorAll('.course-cards')];
  const filter = () => {
    const term = input.value.trim().toLocaleLowerCase('pt-BR');
    let visible = 0;
    cards.forEach((card) => { const match = card.textContent.toLocaleLowerCase('pt-BR').includes(term); card.hidden = !match; if (match) visible++; });
    announce(`${visible} curso${visible === 1 ? '' : 's'} encontrado${visible === 1 ? '' : 's'}.`);
  };
  input.addEventListener('input', filter);
  input.closest('form')?.addEventListener('submit', (event) => { event.preventDefault(); filter(); });
}

function escapeHtml(value) {
  const element = document.createElement('span');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function setupAccessibility() {
  const dialog = document.querySelector('#accessibilityMenu');
  const open = document.querySelector('#accessibilityButton');
  if (!dialog || !open) return;
  const prefs = JSON.parse(localStorage.getItem('cadAccessibility') || '{}');
  const cards = [...dialog.querySelectorAll('.accessibility-card')];
  const cardByTitle = (title) => cards.find((card) => card.querySelector('.menu-title-section')?.textContent.trim() === title);
  const buttonsFor = (title) => [...(cardByTitle(title)?.querySelectorAll('button') || [])];
  const setSelected = (buttons, selectedText) => buttons.forEach((button) => {
    const selected = button.textContent.trim() === selectedText;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  const apply = () => {
    document.documentElement.style.fontSize = `${prefs.fontSize || 100}%`;
    document.documentElement.dataset.theme = prefs.theme || 'light';
    document.body.classList.toggle('high-contrast', !!prefs.highContrast);
    document.body.classList.toggle('reduce-motion', !!prefs.reduceMotion);
    document.body.classList.toggle('focus-highlight', !!prefs.highlightFocus);
    document.body.classList.toggle('reading-mode', !!prefs.readingMode);
    document.body.classList.toggle('hide-images', !!prefs.hideImages);
    document.body.classList.toggle('large-cursor', !!prefs.largeCursor);
    document.documentElement.style.setProperty('--azul-medio', prefs.primaryColor || '');
    document.documentElement.style.setProperty('--branco-azulado', prefs.backgroundColor || '');
    const output = document.querySelector('#font-value');
    if (output) output.textContent = `${prefs.fontSize || 100}%`;
    setSelected(buttonsFor('Tema'), prefs.theme === 'dark' ? 'Escuro' : 'Claro');
    setSelected(buttonsFor('Contraste'), prefs.highContrast ? 'Alto contraste' : 'Padrão');
    ['readingMode', 'hideImages', 'largeCursor', 'screenReader', 'autoReadLinks', 'reduceMotion', 'highlightFocus'].forEach((id) => {
      const input = document.querySelector(`#${id}`);
      if (input) input.checked = !!prefs[id];
    });
    const primary = document.querySelector('#primaryColor');
    const background = document.querySelector('#backgroundColor');
    if (primary && prefs.primaryColor) primary.value = prefs.primaryColor;
    if (background && prefs.backgroundColor) background.value = prefs.backgroundColor;
  };
  const save = () => { localStorage.setItem('cadAccessibility', JSON.stringify(prefs)); apply(); };
  open.addEventListener('click', () => { dialog.showModal(); open.setAttribute('aria-expanded', 'true'); });
  dialog.querySelector('.close-accessibility')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { open.setAttribute('aria-expanded', 'false'); open.focus(); });
  document.querySelector('#font-increase')?.addEventListener('click', () => { prefs.fontSize = Math.min((prefs.fontSize || 100) + 10, 150); save(); });
  document.querySelector('#font-decrease')?.addEventListener('click', () => { prefs.fontSize = Math.max((prefs.fontSize || 100) - 10, 80); save(); });
  buttonsFor('Tema').forEach((button) => button.addEventListener('click', () => { prefs.theme = button.textContent.trim() === 'Escuro' ? 'dark' : 'light'; save(); }));
  buttonsFor('Contraste').forEach((button) => button.addEventListener('click', () => { prefs.highContrast = button.textContent.trim() === 'Alto contraste'; save(); }));
  ['readingMode', 'hideImages', 'largeCursor', 'screenReader', 'autoReadLinks', 'reduceMotion', 'highlightFocus'].forEach((id) => document.querySelector(`#${id}`)?.addEventListener('change', (event) => { prefs[id] = event.target.checked; save(); }));
  document.querySelector('#screenReader')?.addEventListener('change', (event) => {
    if (event.target.checked && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const message = new SpeechSynthesisUtterance('Narração assistiva ativada. Navegue pelos elementos com a tecla Tab.');
      message.lang = 'pt-BR';
      window.speechSynthesis.speak(message);
    }
  });
  document.querySelector('#primaryColor')?.addEventListener('input', (event) => { prefs.primaryColor = event.target.value; save(); });
  document.querySelector('#backgroundColor')?.addEventListener('input', (event) => { prefs.backgroundColor = event.target.value; save(); });
  document.querySelector('#resetAccessibility')?.addEventListener('click', () => { Object.keys(prefs).forEach((key) => delete prefs[key]); save(); announce('Preferências restauradas.'); });
  cardByTitle('Modo de cores')?.remove();
  document.addEventListener('focusin', (event) => {
    if (!prefs.screenReader || !window.speechSynthesis) return;
    const target = event.target;
    if (!(target instanceof HTMLElement) || !['BUTTON', 'INPUT', 'A'].includes(target.tagName)) return;
    if (target.tagName === 'A' && !prefs.autoReadLinks) return;
    const text = target.getAttribute('aria-label') || target.textContent || target.placeholder || '';
    if (text.trim()) {
      window.speechSynthesis.cancel();
      const message = new SpeechSynthesisUtterance(text.trim());
      message.lang = 'pt-BR';
      window.speechSynthesis.speak(message);
    }
  });
  apply();
}

document.addEventListener('DOMContentLoaded', () => { setupLogin(); setupSearch(); setupAccessibility(); });
