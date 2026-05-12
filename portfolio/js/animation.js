function positionCard(cardElement, pos, index) {
  cardElement.style.setProperty('--fan-x', `${pos.x}px`);
  cardElement.style.setProperty('--fan-y', `${pos.y}px`);
  cardElement.style.setProperty('--fan-rotate', `${pos.rotate}deg`);
  cardElement.style.zIndex = index;
}

function animateCard(cardElement, index) {
  setTimeout(() => {
    cardElement.classList.add('is-dealt', 'card--dealing');
  }, index * 150);
  setTimeout(() => {
    cardElement.classList.add('is-flipped', 'card--flipping');
  }, index * 150 + 200);
}

function dealCards() {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';
  const positions = deck.getFanPositions();

  deck.cards.forEach((cardData, index) => {
    const cardElement = createCardElement(cardData);
    container.appendChild(cardElement);
    positionCard(cardElement, positions[index], index);
    animateCard(cardElement, index);
  });
}

function createCardElement(cardData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = cardData.id;

  card.innerHTML = `
    <div class="card__inner">
      <div class="card__face card__face--front">
        <div class="card__corner top-left">${cardData.rank}<br>${cardData.suit_symbol}</div>
        <div class="card__suit-center">${cardData.suit_symbol}</div>
        <div class="card__title">${cardData.title}</div>
        <div class="card__subtitle">${cardData.subtitle}</div>
        <div class="card__stack">
          ${cardData.stack.map(tech => `<code>${tech}</code>`).join('')}
        </div>
        <div class="card__corner bottom-right">${cardData.rank}<br>${cardData.suit_symbol}</div>
      </div>
      <div class="card__face card__face--back"></div>
    </div>
  `;

  card.addEventListener('click', () => playCard(cardData.id));
  card.addEventListener('mouseenter', () => card.classList.add('is-lifted'));
  card.addEventListener('mouseleave', () => card.classList.remove('is-lifted'));

  return card;
}

function playCard(cardId) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(c => {
    if (c.dataset.id === cardId) {
      c.classList.add('is-active');
    } else {
      c.style.opacity = '0.4';
    }
  });
  // TODO: Show detail panel
}

function shuffleCards() {
  deck.shuffle();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('card--shuffling');
    setTimeout(() => card.classList.remove('card--shuffling'), 500);
  });
  setTimeout(dealCards, 500);
}