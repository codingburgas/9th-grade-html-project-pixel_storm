document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

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
  });