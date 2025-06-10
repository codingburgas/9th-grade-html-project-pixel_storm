document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('currentUser');

  // Redirect if not logged in
  if (!username) {
    window.location.href = 'logIn.html';
    return;
  }

  // Fetch user data
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const userData = users[username];

  // Populate profile fields
  document.getElementById('username').textContent = username;
  document.getElementById('profileUsername').textContent = username;
  document.getElementById('profileEmail').textContent = userData?.email || 'N/A';

  // Handle logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'logIn.html';
  });
});
