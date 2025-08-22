// Ключі, які МАЮТЬ існувати. Оновлюємо лише той, що реально є в localStorage.
const USER_KEYS = ["activeUser", "registeredUser"];

/**
 * Повертає { key, obj } для першого знайденого користувача,
 * або null, якщо нічого валідного не знайдено.
 */
function getStoredUserAndKey() {
  for (const key of USER_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return { key, obj: parsed };
      }
    } catch {
      // пошкоджений JSON — ігноруємо цей ключ
    }
  }
  return null;
}

/** Показ повідомлення з невеликою анімацією */
function flashMessage(text, type = "success") {
  const box = document.getElementById("message");
  box.textContent = text;
  box.className = ""; // скинути класи
  // додати класи наново
  box.classList.add(type === "error" ? "error" : "success", "show");
  // прибрати через 3 секунди
  window.clearTimeout(flashMessage._t);
  flashMessage._t = setTimeout(() => box.classList.remove("show"), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("updateForm");
  const oldInput = document.getElementById("oldPassword");
  const newInput = document.getElementById("newPassword");

  // швидка перевірка на наявність користувача
  let stored = getStoredUserAndKey();
  if (!stored) {
    flashMessage("Користувача не знайдено або дані пошкоджені.", "error");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // повторно зчитуємо прямо перед оновленням (раптом інша вкладка змінила дані)
    stored = getStoredUserAndKey();
    if (!stored) {
      flashMessage("Користувача не знайдено або дані пошкоджені.", "error");
      return;
    }

    const oldPass = (oldInput.value || "").trim();
    const newPass = (newInput.value || "").trim();

    if (!oldPass || !newPass) {
      flashMessage("Заповни обидва поля.", "error");
      return;
    }
    if (newPass.length < 6) {
      flashMessage("Новий пароль має містити щонайменше 6 символів.", "error");
      return;
    }
    if (oldPass === newPass) {
      flashMessage("Новий пароль має відрізнятися від старого.", "error");
      return;
    }

    const { key, obj } = stored;

    // Перевіряємо, що в об'єкті реально є поле password
    if (!Object.prototype.hasOwnProperty.call(obj, "password")) {
      flashMessage("У збережених даних відсутнє поле password.", "error");
      return;
    }

    if (obj.password !== oldPass) {
      flashMessage("Старий пароль невірний.", "error");
      return;
    }

    // ✅ ОНОВЛЮЄМО ЛИШЕ ІСНУЮЧИЙ ЗАПИС
    obj.password = newPass;
    try {
      localStorage.setItem(key, JSON.stringify(obj));
      flashMessage("Пароль успішно змінено ✅", "success");
      form.reset();
      newInput.blur();
    } catch {
      flashMessage("Не вдалося зберегти зміни (localStorage).", "error");
    }
  });
});
