document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Отримуємо список зареєстрованих користувачів
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Шукаємо користувача з таким телефоном
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const fullPhone = (u.countryCode || "") + (u.mobile || "");
    if (fullPhone === phone) {
      foundUser = u;
      break;
    }
  }

  if (!foundUser) {
    errorMsg.textContent = "❌ Користувача з таким номером не знайдено!";
    return;
  }

  if (foundUser.password !== password) {
    errorMsg.textContent = "❌ Неправильний пароль!";
    return;
  }

  // Якщо все вірно
  localStorage.setItem("activeUser", JSON.stringify(foundUser));
  window.location.href = "currency.html";
});
