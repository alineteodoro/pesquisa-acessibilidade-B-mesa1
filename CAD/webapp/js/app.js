const API_URL = localStorage.getItem('cadApiUrl') || 'http://localhost:3000/api';

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
  if (!form || !registerForm) return;
  toggle?.addEventListener('click', () => {
    const showRegister = registerPanel.hidden;
    registerPanel.hidden = !showRegister;
    registerPanel.inert = !showRegister;
    loginPanel.hidden = showRegister;
    loginPanel.inert = showRegister;
    toggle.textContent = showRegister ? 'Já tenho uma conta' : 'Cadastre-se';
    (showRegister ? document.querySelector('#register-name') : document.querySelector('#login-email'))?.focus();
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
        dt_nascimento: document.querySelector('#birthdate').value.split('-').reverse().join('-'),
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
  const apply = () => {
    document.documentElement.style.fontSize = `${prefs.fontSize || 100}%`;
    document.body.classList.toggle('high-contrast', !!prefs.highContrast);
    document.body.classList.toggle('reduce-motion', !!prefs.reduceMotion);
    document.body.classList.toggle('focus-highlight', !!prefs.highlightFocus);
    const output = document.querySelector('#font-value');
    if (output) output.textContent = `${prefs.fontSize || 100}%`;
  };
  const save = () => { localStorage.setItem('cadAccessibility', JSON.stringify(prefs)); apply(); };
  open.addEventListener('click', () => { dialog.showModal(); open.setAttribute('aria-expanded', 'true'); });
  dialog.querySelector('.close-accessibility')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { open.setAttribute('aria-expanded', 'false'); open.focus(); });
  document.querySelector('#font-increase')?.addEventListener('click', () => { prefs.fontSize = Math.min((prefs.fontSize || 100) + 10, 150); save(); });
  document.querySelector('#font-decrease')?.addEventListener('click', () => { prefs.fontSize = Math.max((prefs.fontSize || 100) - 10, 80); save(); });
  ['reduceMotion', 'highlightFocus'].forEach((id) => document.querySelector(`#${id}`)?.addEventListener('change', (event) => { prefs[id] = event.target.checked; save(); }));
  document.querySelector('#resetAccessibility')?.addEventListener('click', () => { Object.keys(prefs).forEach((key) => delete prefs[key]); save(); announce('Preferências restauradas.'); });
  apply();
}

document.addEventListener('DOMContentLoaded', () => { setupLogin(); setupSearch(); setupAccessibility(); });
