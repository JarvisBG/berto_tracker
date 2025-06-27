export function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR');
}

export function formatTime(time) {
  return time ? time.slice(0, 5) : '-';
}