(function(global) {
    'use strict';

    const canvasArea = global.canvasArea;
    if (!canvasArea) {
        console.error('canvasArea not found');
        return;
    }

    let isDragging = false;
    let startX, startY, startTranslateX, startTranslateY;

    canvasArea.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        isDragging = true;
        canvasArea.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        startTranslateX = global.translateX;
        startTranslateY = global.translateY;
    });

    global.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        global.translateX = startTranslateX + dx;
        global.translateY = startTranslateY + dy;
        global.applyTransform();
    });

    global.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            canvasArea.classList.remove('dragging');
        }
    });

    canvasArea.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        global.scale = Math.min(global.MAX_SCALE, Math.max(global.MIN_SCALE, global.scale * delta));
        global.applyTransform();
    });
})(window);