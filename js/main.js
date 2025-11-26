fetch('data/cards.json')
  .then(res => res.json())
  .then(cards => {
    const container = document.getElementById('cards-container');
    const hash = window.location.hash.substring(1);

    container.innerHTML = '';

    if(hash) {
      const card = cards.find(c => c.id === hash);
      if(card) {
        container.innerHTML = `
          <div class="card">
            <div class="header">
              <div class="pattern"></div>
              <img src="${card.photo}" alt="Photo" class="photo">
              <img src="${card.qr}" alt="QR Code" class="qr">
            </div>
            <div class="body">
              <h1 class="name">${card.name}</h1>
              <p class="title">${card.title}</p>
              <p class="organization">${card.organization}</p>
              <p class="address">${card.address}</p>
              <p class="contact">
                T: ${card.phone} | P: ${card.phone2} <br>
                E: ${card.email} <br>
                W: ${card.web}
              </p>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = "<p style='text-align:center;'>Card not found. Please scan a valid QR code.</p>";
      }
    } else {
      container.innerHTML = "<p style='text-align:center;'>Please scan your QR code to view your business card.</p>";
    }
  });
