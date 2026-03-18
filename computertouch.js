// 电脑端触摸/鼠标交互（鼠标拖拽 + 滚轮缩放）
(function() {
    let isDragging = false;
    let startX, startY, startTranslateX, startTranslateY;

    canvasArea.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        isDragging = true;
        canvasArea.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        startTranslateX = translateX;
        startTranslateY = translateY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        translateX = startTranslateX + dx;
        translateY = startTranslateY + dy;
        applyTransform();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            canvasArea.classList.remove('dragging');
        }
    });

    canvasArea.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * delta));
        applyTransform();
    });
})();