// CASH BACK — unified theme persistence across all admin pages
(function initTheme(){
  const saved = localStorage.getItem('cashback-theme') || localStorage.getItem('app_theme');
  const dark = saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark-mode', dark);
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  function updateIcon(){
    if(themeIcon) themeIcon.textContent = document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';
  }
  updateIcon();
  if(toggleBtn && !toggleBtn.dataset.themeBound){
    toggleBtn.dataset.themeBound = '1';
    toggleBtn.addEventListener('click', () => {
      const dark = !document.documentElement.classList.contains('dark-mode');
      document.documentElement.classList.toggle('dark-mode', dark);
      localStorage.setItem('cashback-theme', dark ? 'dark' : 'light');
      localStorage.setItem('app_theme', dark ? 'dark' : 'light');
      updateIcon();
    });
  }
});
