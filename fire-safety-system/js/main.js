document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle'); 
  const body = document.body;

  // Set initial state based on localStorage
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '🌞';
  } else {
    toggleBtn.textContent = '🌙';
  }

  // Toggle theme on click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    toggleBtn.textContent = isLight ? '🌞' : '🌙';
  });
});
