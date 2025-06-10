document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle'); 
  const body = document.body;

  // --- Theme Toggle ---
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '🌞';
  } else {
    toggleBtn.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    toggleBtn.textContent = isLight ? '🌞' : '🌙';
  });

  // --- User Login/Profile Handling ---
  const currentUser = localStorage.getItem('currentUser');
  const loginNav = document.getElementById('loginNav');
  const profileNav = document.getElementById('profileNav');

  if (currentUser) {
    if (loginNav) loginNav.style.display = 'none';
    if (profileNav) profileNav.style.display = 'inline-block';
  } else {
    if (loginNav) loginNav.style.display = 'inline-block';
    if (profileNav) profileNav.style.display = 'none';
  }
});
