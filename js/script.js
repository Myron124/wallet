// Отримуємо всі елементи за ID в один об'єкт 
const el = {}; 
[ 
  'account', 'countryCode', 'mobile', 'password', 'confirmPassword', 
  'username', 'saveBtn', 'avatarInput', 'avatarImage', 'avatarLetter' 
].forEach(id => el[id] = document.getElementById(id)); 
 
// Функція очищення форми 
function clearForm() { 
  el.countryCode.value = '+1'; 
  ['mobile', 'username', 'account'].forEach(f => el[f].value = ''); 
   
  ['password', 'confirmPassword'].forEach(f => { 
    el[f].type = 'text'; 
    el[f].value = ''; 
    el[f].type = 'password'; 
  }); 
 
  el.avatarImage.src = ''; 
  el.avatarImage.style.display = 'none'; 
  el.avatarLetter.style.display = 'block'; 
} 
 
// Завантаження останнього користувача 
document.addEventListener('DOMContentLoaded', () => { 
  let users = JSON.parse(localStorage.getItem('users')) || []; 
  if (users.length) { 
    const u = users[users.length - 1]; 
    Object.keys(u).forEach(k => { 
      if (el[k]) el[k].value = u[k]; 
    }); 
 
    if (u.avatar) { 
      el.avatarImage.src = u.avatar; 
      el.avatarImage.style.display = 'block'; 
      el.avatarLetter.style.display = 'none'; 
    } 
  } 
}); 
 
// Зміна аватара 
el.avatarInput.addEventListener('change', () => { 
  const file = el.avatarInput.files[0]; 
  if (file) { 
    const reader = new FileReader(); 
    reader.onload = e => { 
      el.avatarImage.src = e.target.result; 
      el.avatarImage.style.display = 'block'; 
      el.avatarLetter.style.display = 'none'; 
    }; 
    reader.readAsDataURL(file); 
  } 
}); 
 
// Збереження та валідація 
el.saveBtn.addEventListener('click', () => { 
  if (!el.mobile.value || !el.confirmPassword.value || !el.username.value) { 
    return alert('Please fill in all fields'); 
  } 
  if (el.password.value !== el.confirmPassword.value) { 
    return alert('Passwords do not match'); 
  } 
 
  let users = JSON.parse(localStorage.getItem('users')) || []; 
  users.push({ 
    account: el.account.value, 
    countryCode: el.countryCode.value, 
    mobile: el.mobile.value, 
    password: el.password.value, 
    confirmPassword: el.confirmPassword.value, 
    username: el.username.value, 
    avatar: el.avatarImage.src || '' 
  }); 
 
  localStorage.setItem('users', JSON.stringify(users)); 
  alert('Новий користувач доданий у LocalStorage!'); 
  clearForm(); 
  window.location.href = 'currency.html'; 
});
