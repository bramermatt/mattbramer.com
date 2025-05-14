document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', function () {
      const icon = this.querySelector('.icon');
      if (this.open) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '+';
      }
    });
  });
  