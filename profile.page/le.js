const openModal = id => document.getElementById(id).style.display = 'flex';
const closeModal = id => document.getElementById(id).style.display = 'none';

// Edit Profile
document.getElementById('editBtn').onclick = () => openModal('editModal');
document.getElementById('closeEdit').onclick = () => closeModal('editModal');

// Settings
document.getElementById('settingsBtn').onclick = () => openModal('settingsModal');
document.getElementById('closeSettings').onclick = () => closeModal('settingsModal');

// Theme Toggle
document.getElementById('themeSelect').onchange = e =>
  document.body.classList.toggle('light-mode', e.target.value === 'light');

// Logout
document.getElementById('logoutBtn').onclick = () => alert('You have been logged out.');

// Add Playlist
document.getElementById('addPlaylistBtn').onclick = () => openModal('addPlaylistModal');
document.getElementById('closeAddPlaylist').onclick = () => closeModal('addPlaylistModal');
document.getElementById('savePlaylist').onclick = () => {
  const name = document.getElementById('playlistNameInput').value.trim();
  const desc = document.getElementById('playlistDescInput').value.trim();
  if (!name) return alert('Please enter a playlist name.');
  const container = document.getElementById('playlistContainer');
  const card = document.createElement('div');
  card.className = 'folder-card';
  card.innerHTML = `
    <div class="folder-icon">🎧</div>
    <h4>${name}</h4>
    <p>${desc || 'New Playlist'}</p>
    <button class="remove-btn">🗑️</button>
  `;
  container.appendChild(card);
  attachRemoveHandlers();
  closeModal('addPlaylistModal');
  document.getElementById('playlistNameInput').value = '';
  document.getElementById('playlistDescInput').value = '';
};

// ✅ Add Liked Song Redirect
document.getElementById('addLikedBtn').onclick = () => {
  // Redirect directly to your songs page
  // Change 'songs.html' to your actual song list page URL
  window.location.href = "songs.html";
};

// Edit Profile Save
document.getElementById('saveProfile').onclick = () => {
  const name = document.getElementById('usernameInput').value.trim();
  const bio = document.getElementById('bioInput').value.trim();
  const pic = document.getElementById('profilePicInput').files[0];
  if (name) document.getElementById('display-name').innerText = name;
  if (bio) document.getElementById('display-bio').innerText = bio;
  if (pic) {
    const reader = new FileReader();
    reader.onload = e => document.getElementById('display-pic').src = e.target.result;
    reader.readAsDataURL(pic);
  }
  closeModal('editModal');
};

// Remove Buttons
function attachRemoveHandlers() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const card = btn.parentElement;
      card.remove();
    };
  });
}
attachRemoveHandlers();

// Placeholder click alerts
document.addEventListener('click', e => {
  if (e.target.classList.contains('folder-card') && !e.target.classList.contains('liked-item-card'))
    alert('Edit Playlist - backend feature soon.');
  if (e.target.classList.contains('liked-item-card'))
    alert('Liked Song Details - backend feature soon.');
});
