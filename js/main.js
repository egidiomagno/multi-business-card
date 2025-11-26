fetch('data/cards.json')
  .then(response => response.json())
  .then(cards => {
    const container = document.getElementById('cards-container');
    cards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.innerHTML = `
        <img src="${card.photo}" alt="${card.name}" class="photo">
        <h2>${card.name}</h2>
        <p>${card.title}</p>
        <p><a href="tel:${card.phone}">📞 ${card.phone}</a></p>
        <p><a href="mailto:${card.email}">📧 Email</a></p>
        <p><img src="${card.qr}" alt="QR Code" style="width:120px;"></p>
      `;
      container.appendChild(cardDiv);
    });
  });