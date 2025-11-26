fetch('data/cards.json')
  .then(res => res.json())
  .then(cards => {
    const container = document.getElementById('cards-container');
    const hash = window.location.hash.substring(1); // get id from URL

    container.innerHTML = ''; // clear container

    if(hash) {
      // Show only the specific card
      const card = cards.find(c => c.id === hash);
      if(card) {
        container.innerHTML = `
          <div class="card">
            <img src="${card.photo}" alt="${card.name}" class="photo">
            <h2>${card.name}</h2>
            <p>${card.title}</p>
            <p><a href="tel:${card.phone}">📞 ${card.phone}</a></p>
            <p><a href="mailto:${card.email}">📧 Email</a></p>
            <p><a href="/"><button>Back to All Cards</button></a></p>
          </div>
        `;
      } else {
        container.innerHTML = "<p>Card not found</p>";
      }
    } else {
      // Show all cards
      cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
          <img src="${card.photo}" alt="${card.name}" class="photo">
          <h2>${card.name}</h2>
          <p>${card.title}</p>
          <p><a href="tel:${card.phone}">📞 ${card.phone}</a></p>
          <p><a href="mailto:${card.email}">📧 Email</a></p>
          <p><a href="#${card.id}"><img src="${card.qr}" alt="QR Code" style="width:120px;"></a></p>
        `;
        container.appendChild(cardDiv);
      });
    }
  });
