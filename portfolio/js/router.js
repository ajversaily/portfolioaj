const routes = {
  '': 'landing',
  'hand': 'hand',
  'card': 'card',
  'about': 'about',
  'contact': 'contact'
};

function getCurrentRoute() {
  return window.location.hash.slice(1).split('/')[0] || '';
}

function getCurrentCardId() {
  return window.location.hash.slice(1).split('/')[1] || '';
}

function showLanding() {
  document.getElementById('main-content').innerHTML = `
    <div id="landing" class="page">
      <div class="card card--landing">
        <div class="card__inner">
          <div class="card__face card__face--back"></div>
        </div>
      </div>
      <button id="draw-btn">Draw</button>
    </div>
  `;
  document.getElementById('draw-btn').addEventListener('click', () => {
    window.location.hash = '#hand';
  });
}

async function showPage(pageId) {
  if (pageId === 'landing') {
    showLanding();
    return;
  }
  try {
    const response = await fetch(`pages/${pageId}.html`);
    const html = await response.text();
    document.getElementById('main-content').innerHTML = html;
    if (pageId === 'hand' || pageId === 'card') {
      dealCards();
      document.getElementById('shuffle-btn').classList.remove('hidden');
      if (pageId === 'card') {
        const cardId = getCurrentCardId();
        if (cardId) setTimeout(() => playCard(cardId), 800);
      }
    } else {
      document.getElementById('shuffle-btn').classList.add('hidden');
    }
  } catch (error) {
    console.error('Error loading page:', error);
  }
}

function handleRoute() {
  const route = getCurrentRoute();
  const pageId = routes[route] || 'landing';
  showPage(pageId);
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  if (!localStorage.getItem('visited')) {
    localStorage.setItem('visited', 'true');
    handleRoute();
  } else {
    // hashchange fires and calls handleRoute for us
    window.location.hash = '#hand';
  }
});