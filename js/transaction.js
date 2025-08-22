const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const btnIncome = document.getElementById('btnIncome');
const btnExpense = document.getElementById('btnExpense');
const formFields = document.getElementById('formFields');
const records = document.querySelector('.records');
const addBtn = document.querySelector('.add');
const totalEl = document.querySelector('.total');

let currentType = "income"; // за замовчуванням

// ===== ФУНКЦІЇ =====

// Завантажуємо дані з localStorage
function loadData() {
  let income = JSON.parse(localStorage.getItem("income")) || [];
  let expense = JSON.parse(localStorage.getItem("expense")) || [];
  let totalAssets = parseFloat(localStorage.getItem("totalAssets")) || 0;

  // показуємо total
  totalEl.textContent = totalAssets.toFixed(2);

  // показуємо транзакції
  records.innerHTML = "";
  [...income, ...expense].sort((a,b)=> new Date(b.date)-new Date(a.date))
    .forEach(item => renderRecord(item));
}

// Зберігаємо дані в localStorage
function saveData(type, record) {
  let data = JSON.parse(localStorage.getItem(type)) || [];
  data.push(record);
  localStorage.setItem(type, JSON.stringify(data));
}

// Рендеримо одну транзакцію
function renderRecord(item) {
  const record = document.createElement('div');
  record.classList.add('record', item.type);
  record.innerHTML = `<span>${item.text}</span><span>${item.amount} USDT</span>`;
  records.prepend(record);
}

// Оновлюємо баланс
function updateBalance(amount, type) {
  let totalAssets = parseFloat(localStorage.getItem("totalAssets")) || 0;
  if (type === "income") totalAssets += amount;
  else totalAssets -= amount;
  localStorage.setItem("totalAssets", totalAssets);
  totalEl.textContent = totalAssets.toFixed(2);
}

// ===== МОДАЛКА =====
openModal.addEventListener('click', () => modal.classList.add('active'));
closeModal.addEventListener('click', () => modal.classList.remove('active'));

btnIncome.addEventListener('click', () => {
  currentType = "income";
  btnIncome.classList.add('active','income');
  btnExpense.classList.remove('active','expense');
  formFields.innerHTML = `
    <input type="number" placeholder="0.00" id="amount">
    <input type="date" id="date">
    <textarea placeholder="Comment" id="comment"></textarea>
  `;
});

btnExpense.addEventListener('click', () => {
  currentType = "expense";
  btnExpense.classList.add('active','expense');
  btnIncome.classList.remove('active','income');
  formFields.innerHTML = `
    <select id="category">
      <option value="">Select a category</option>
      <option>Food</option>
      <option>Shopping</option>
      <option>Transport</option>
    </select>
    <input type="number" placeholder="0.00" id="amount">
    <input type="date" id="date">
    <textarea placeholder="Comment" id="comment"></textarea>
  `;
});

// ===== ДОДАВАННЯ ТРАНЗАКЦІЇ =====
addBtn.addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount')?.value) || 0;
  const comment = document.getElementById('comment')?.value || "";
  const category = document.getElementById('category')?.value || "";
  const date = document.getElementById('date')?.value || new Date().toISOString().split('T')[0];

  if (!amount || amount <= 0) {
    alert("Enter valid amount!");
    return;
  }

  let text = currentType === "income" ? (comment || "Income") : (category || "Expense");

  const record = {
    type: currentType,
    text: text,
    amount: amount,
    date: date
  };

  // зберігаємо в localStorage
  saveData(currentType, record);

  // оновлюємо баланс
  updateBalance(amount, currentType);

  // показуємо в списку
  renderRecord(record);

  // закриваємо модалку
  modal.classList.remove('active');
});

// ===== ПЕРВИННЕ ЗАВАНТАЖЕННЯ =====
loadData();
// ===== Бургер-меню =====
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
  localStorage.clear();
  window.location.href = "login.html"; // сторінка входу
});