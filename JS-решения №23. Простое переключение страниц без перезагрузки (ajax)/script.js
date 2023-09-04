document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.querySelector('.content');
  const navLinks = document.querySelectorAll('.nav-link');
  const loadingOverlay = document.querySelector('.loading-overlay');

  const showLoadingOverlay = () => {
    loadingOverlay.style.opacity = '1';
  };

  const hideLoadingOverlay = () => {
    loadingOverlay.style.opacity = '0';
  };

  const loadScripts = (url) => {
    if (url.includes('about')) {
      document.querySelector('.btn').addEventListener('click', (e) => {
        console.log(e);
      });
    }
  };

  const loadPage = (url) => {
    showLoadingOverlay();

    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('.content').innerHTML;

        contentDiv.classList.add('fade-out');

        contentDiv.innerHTML = newContent;
        document.title = doc.title;

        setTimeout(() => {
          contentDiv.classList.remove('fade-out');
          history.pushState({}, '', url);
          hideLoadingOverlay();
        }, 500);
      })
      .then(() => {
        loadScripts(url);
      });
  };

  navLinks.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();

      const url = e.currentTarget.getAttribute('href');
      loadPage(url);
    });
  });

  loadPage(window.location.pathname);

  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
  });
});
