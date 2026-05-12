class Deck {
  constructor() {
    this.cards = [];
    this.loadCards();
  }

  async loadCards() {
    try {
      const response = await fetch('data/cards.json');
      const data = await response.json();
      this.cards = data.cards;
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  }

  getCardById(id) {
    return this.cards.find(card => card.id === id);
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  getFanPositions() {
    const totalCards = this.cards.length;
    const totalSpread = 40 * (Math.PI / 180); // 40 degrees in radians
    const startAngle = -totalSpread / 2;
    const angleStep = totalSpread / (totalCards - 1);

    return this.cards.map((card, index) => {
      const angle = startAngle + angleStep * index;
      const x = Math.sin(angle) * 120;
      const y = (1 - Math.cos(angle)) * 80;
      return { x, y, rotate: angle * (180 / Math.PI) };
    });
  }
}

const deck = new Deck();