// Initialize LocalStorage Data
if (!localStorage.getItem('ads')) localStorage.setItem('ads', JSON.stringify([]));
if (!localStorage.getItem('members')) localStorage.setItem('members', JSON.stringify([]));
if (!localStorage.getItem('tenants')) localStorage.setItem('tenants', JSON.stringify([]));
if (!localStorage.getItem('feedback')) localStorage.setItem('feedback', JSON.stringify([]));

// Advertising Management
document.getElementById('adUploadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('advertiserName').value;
  const description = document.getElementById('adDescription').value;
  const schedule = document.getElementById('adSchedule').value;
  const file = document.getElementById('adFile').files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const ads = JSON.parse(localStorage.getItem('ads'));
    ads.push({
      name,
      description,
      schedule,
      file: reader.result,
    });
    localStorage.setItem('ads', JSON.stringify(ads));
    alert('Ad uploaded successfully!');
    renderAds();
  };
  reader.readAsDataURL(file);
});

function renderAds() {
  const adsGrid = document.getElementById('adsGrid');
  adsGrid.innerHTML = '';
  const ads = JSON.parse(localStorage.getItem('ads'));
  ads.forEach((ad) => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
      <h3>${ad.name}</h3>
      <p>${ad.description}</p>
      <p>Scheduled: ${new Date(ad.schedule).toLocaleString()}</p>
      ${ad.file.includes('image/') ? `<img src="${ad.file}" style="width: 100%;">` : ''}
    `;
    adsGrid.appendChild(div);
  });
}

renderAds();
