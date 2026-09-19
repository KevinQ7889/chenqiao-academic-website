(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const themeButton = document.querySelector('.theme-toggle');
  const progressBar = document.getElementById('scroll-progress-bar');
  const currentYear = document.getElementById('current-year');
  const toast = document.getElementById('toast');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const savedTheme = localStorage.getItem('academic-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = savedTheme || preferredTheme;

  root.setAttribute('data-theme', initialTheme);
  updateThemeButton(initialTheme);

  function updateThemeButton(theme) {
    if (!themeButton) return;
    const nextLabel = theme === 'dark' ? '切换到明亮主题' : '切换到暗色主题';
    themeButton.setAttribute('aria-label', nextLabel);
    themeButton.setAttribute('title', nextLabel);
  }

  themeButton?.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('academic-theme', nextTheme);
    updateThemeButton(nextTheme);
  });

  function closeMenu() {
    nav?.classList.remove('is-open');
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('is-open', !isOpen);
    body.classList.toggle('menu-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  function updateScrollUi() {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = progress + '%';
    header?.classList.toggle('scrolled', scrollTop > 8);
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollUi();
      scrollTicking = false;
    });
  }, { passive: true });

  updateScrollUi();

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.site-nav > a'));

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  const publicationItems = document.querySelectorAll('.publication-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      publicationItems.forEach((item) => {
        const visible = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('is-hidden', !visible);
      });
    });
  });

  const copyButton = document.querySelector('.copy-email');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  copyButton?.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showToast('邮箱已复制：' + email);
    } catch (error) {
      window.location.href = 'mailto:' + email;
    }
  });

  if (currentYear) currentYear.textContent = new Date().getFullYear();
})();
