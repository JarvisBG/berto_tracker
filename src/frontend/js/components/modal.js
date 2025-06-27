export function showModal(title, content, buttons = []) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${title}</h2>
      <div class="modal-body">${content}</div>
      <div class="modal-buttons">
        ${buttons.map(btn => `<button class="${btn.className}" onclick="${btn.onClick}">${btn.label}</button>`).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

export function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) modal.remove();
}