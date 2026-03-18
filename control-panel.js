// control-panel.js - 控制盘交互逻辑
(function() {
    const panelWrapper = document.getElementById('panelWrapper');
    const resizeHandle = document.getElementById('resizeHandle');

    // 折叠/展开功能
    window.togglePanel = function() {
        panelWrapper.classList.toggle('collapsed');
        const collapseBtn = document.querySelector('.collapse-btn');
        if (collapseBtn) {
            collapseBtn.textContent = panelWrapper.classList.contains('collapsed') ? '▶' : '◀';
        }
    };

    // 宽度拖拽
    if (resizeHandle) {
        let startX, startWidth;

        resizeHandle.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            startWidth = panelWrapper.offsetWidth;
            document.addEventListener('pointermove', resizeMove);
            document.addEventListener('pointerup', resizeStop);
        });

        function resizeMove(e) {
            let newWidth = startWidth + (e.clientX - startX);
            newWidth = Math.min(800, Math.max(150, newWidth));
            panelWrapper.style.width = newWidth + 'px';
        }

        function resizeStop() {
            document.removeEventListener('pointermove', resizeMove);
            document.removeEventListener('pointerup', resizeStop);
        }
    }
})();