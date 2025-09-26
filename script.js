document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    e.preventDefault();
    alert('Copiar está desactivado en esta página.');
  }
});
