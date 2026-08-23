// تطبيق الثيم فوراً لتفادي الوميض الأبيض عند التنقل بين الصفحات
(function initTheme() {
  const savedTheme = localStorage.getItem('app_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
})();

// تفعيل زر التبديل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function updateIcon() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
  }

  updateIcon();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isDark = document.documentElement.classList.contains('dark-mode');
      
      // حفظ الإعداد ليطبق في جميع الصفحات
      localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
      updateIcon();
    });
  }
});
