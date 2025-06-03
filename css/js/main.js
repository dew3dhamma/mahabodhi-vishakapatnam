// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Load components dynamically
  const loadComponent = async (selector, path) => {
    const container = document.querySelector(selector);
    if (!container) return;
    try {
      const res = await fetch(path);
      if (res.ok) {
        container.innerHTML = await res.text();
      } else {
        container.innerHTML = `<p>Failed to load ${path}</p>`;
      }
    } catch (error) {
      container.innerHTML = `<p>Error loading ${path}</p>`;
      console.error(error);
    }
  };

  loadComponent('#navbar-container', 'components/navbar.html').then(() => {
    initNavbar();
  });
  loadComponent('#footer-container', 'components/footer.html');
  loadComponent('#theme-selector-container', 'components/theme-selector.html');
  loadComponent('#search-box-container', 'components/search-box.html');
  loadComponent('#notification-container', 'components/notification.html').then(() => {
    initNotification();
  });

  // --- Navbar Logic ---
  function initNavbar() {
    const searchToggleBtn = document.querySelector('#nav-search-toggle');
    const searchBoxContainer = document.querySelector('#search-box-container');
    const themeToggleBtn = document.querySelector('#nav-theme-toggle');
    const themeSelectorContainer = document.querySelector('#theme-selector-container');

    if (searchToggleBtn && searchBoxContainer) {
      searchToggleBtn.addEventListener('click', () => {
        searchBoxContainer.classList.toggle('active');
        if (searchBoxContainer.classList.contains('active')) {
          searchBoxContainer.querySelector('input').focus();
        }
      });
    }

    if (themeToggleBtn && themeSelectorContainer) {
      themeToggleBtn.addEventListener('click', () => {
        themeSelectorContainer.classList.toggle('active');
      });
    }
  }

  // --- Theme Selector Logic ---
  document.addEventListener('click', (e) => {
    const themeSelector = document.querySelector('#theme-selector-container');
    if (!themeSelector) return;

    // Close modal if clicked outside content
    if (themeSelector.classList.contains('active') && e.target === themeSelector) {
      themeSelector.classList.remove('active');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const themeBoxes = document.querySelectorAll('.theme-box');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('mahabodhi-theme');
    if (savedTheme) {
      body.className = savedTheme;
    }

    themeBoxes.forEach((box, idx) => {
      box.addEventListener('click', () => {
        body.className = ''; // reset
        if (idx > 0) body.classList.add(`theme${idx}`); // theme1..theme8
        localStorage.setItem('mahabodhi-theme', body.className);
        // Close modal
        const modal = document.querySelector('#theme-selector-container');
        if (modal) modal.classList.remove('active');
      });
    });
  });

  // --- Notification Logic ---
  function initNotification() {
    const badge = document.querySelector('.badge');
    if (!badge) return;

    let count = 3; // starting notification count (simulate)
    const increment = () => {
      count++;
      badge.textContent = count;
    };

    // Increase count every 8 seconds for demo
    setInterval(increment, 8000);
  }
});
