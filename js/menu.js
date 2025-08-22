const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

burger.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.style.display = "none";
});
