document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('info-panel');
    const closeBtn = document.getElementById('info-close-btn');

    const lastClosed = localStorage.getItem('infoPanelClosed');
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; 

    if (!lastClosed || now - parseInt(lastClosed) > oneDay) {
        panel.classList.remove('hidden');
    }

    closeBtn.addEventListener('click', () => {
        panel.classList.add('hidden');
        localStorage.setItem('infoPanelClosed', now.toString());
    });
});