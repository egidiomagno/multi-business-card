document.addEventListener('DOMContentLoaded', () => {
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
              <div class="left-panel">
                <img src="${card.photo}" alt="Photo" class="photo">
                <img src="${card.qr}" alt="QR Code" class="qr">
              </div>
              <div class="right-panel">
                <h1 class="name">${card.name}</h1>
                <p class="title">${card.title}</p>
                <p class="organization">${card.organization}</p>
                <p class="address">${card.address}</p>
                <p class="contact">
                  T: ${card.phone} | P: ${card.phone2} <br>
                  E: ${card.email} <br>
                  W: ${card.web}
                </p>
                <button class="share-btn" onclick="shareCard('${window.location.href}')">Share</button>
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
});

function shareCard(url) {
  if (navigator.share) {
    navigator.share({
      title: 'My Business Card',
      text: 'Check out my business card!',
      url: url,
    }).catch(console.error);
  } else {
    prompt('Copy this link to share:', url);
  }
}
