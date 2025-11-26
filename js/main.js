document.addEventListener('DOMContentLoaded', () => {
  fetch('data/cards.json')
    .then(res => res.json())
    .then(cards => {
      const container = document.getElementById('cards-container');
      const shareContainer = document.getElementById('share-container');
      const hash = window.location.hash.substring(1);

      container.innerHTML = '';
      shareContainer.innerHTML = '';

      if(hash) {
        const card = cards.find(c => c.id === hash);
        if(card) {
          container.innerHTML = `
            <div class="card" id="card-to-save">
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
              </div>
            </div>
          `;

          shareContainer.innerHTML = `
            <div class="share-buttons">
              <button class="share-btn save" onclick="saveCard()">Save Card</button>
              <button class="share-btn whatsapp" onclick="shareCardWhatsApp()">Share WhatsApp</button>
              <button class="share-btn" onclick="shareLink('${window.location.href}')">Share Link</button>
            </div>
          `;
        } else {
          container.innerHTML = "<p style='text-align:center;'>Card not found.</p>";
        }
      } else {
        container.innerHTML = "<p style='text-align:center;'>Please scan your QR code.</p>";
      }
    });
});

// Save card as image
function saveCard() {
  const card = document.getElementById('card-to-save');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'business-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// Share card on WhatsApp
function shareCardWhatsApp() {
  const card = document.getElementById('card-to-save');
  html2canvas(card).then(canvas => {
    const imageData = canvas.toDataURL('image/png');
    const blob = dataURLtoBlob(imageData);
    const file = new File([blob], 'business-card.png', { type: 'image/png' });

    if(navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: 'Business Card',
        text: 'Check my business card'
      }).catch(console.error);
    } else {
      alert('Your device does not support sharing images directly. Please save first.');
    }
  });
}

// Share link fallback
function shareLink(url) {
  if (navigator.share) {
    navigator.share({ title: 'My Business Card', url });
  } else {
    prompt('Copy this link:', url);
  }
}

// Convert base64 to Blob
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}
