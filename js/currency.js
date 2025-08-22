// Налаштування
const PRIVAT_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const PROXY = 'https://api.allorigins.win/get?url=' + encodeURIComponent(PRIVAT_URL);
const TARGET_CCYS = ['USD', 'EUR'];
const REFRESH_MS = 30 * 60 * 1000; // 30 хв

const tbody = document.getElementById('ratesBody');
const updatedAt = document.getElementById('updatedAt');
const refreshBtn = document.getElementById('refreshBtn');

async function fetchRates() {
  refreshBtn.disabled = true;
  refreshBtn.textContent = 'Оновлення…';
  try {
    const res = await fetch(PROXY, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const wrapper = await res.json();
    // allorigins повертає { contents: '...json...' }
    const data = JSON.parse(wrapper.contents);

    const filtered = data.filter(x => TARGET_CCYS.includes(x.ccy));
    renderRows(filtered);
    const now = new Date();
    updatedAt.textContent = `Оновлено: ${now.toLocaleString()}`;
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="3">Не вдалося завантажити дані. Спробуйте ще раз.</td></tr>`;
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = 'Оновити курс';
  }
}

function renderRows(items) {
  tbody.innerHTML = '';
  items.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.classList.add('fade-in');
    tr.style.animationDelay = (idx * 120) + 'ms'; // каскадна поява

    const currencyCell = document.createElement('td');
    currencyCell.innerHTML = currencyBadge(item.ccy);

    const buyCell = document.createElement('td');
    const saleCell = document.createElement('td');

    buyCell.innerHTML = `<span class="amount">${format2(item.buy)}</span>`;
    saleCell.innerHTML = `<span class="amount">${format2(item.sale)}</span>`;

    tr.append(currencyCell, buyCell, saleCell);
    tbody.appendChild(tr);
  });
}

function currencyBadge(code) {
  const map = {
    'USD': 'https://flagcdn.com/us.svg',
    'EUR': 'https://flagcdn.com/eu.svg'
  };
  const src = map[code] || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>';
  return `
    <span class="badge">
      <img class="flag" src="${src}" alt="${code} flag" width="20" height="20" loading="lazy" />
      <span>${code}</span>
    </span>
  `;
}

function format2(n) {
  const num = Number(n);
  // Округлення до 2 знаків і фіксована довжина
  return isFinite(num) ? num.toFixed(2) : '—';
}

// Події
refreshBtn.addEventListener('click', fetchRates);

// Стартове завантаження і автооновлення
fetchRates();
setInterval(fetchRates, REFRESH_MS);
const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Відкрити меню
  burger.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });

  // Закрити меню
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Логаут
  logoutBtn.addEventListener("click", () => {
    window.location.href = "login.html"; // переходимо на сторінку логіну
  });