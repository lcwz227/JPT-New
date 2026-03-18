(function(global) {
    'use strict';

    const canvasArea = global.canvasArea;
    if (!canvasArea) {
        console.error('canvasArea not found');
        return;
    }

    let isDragging = false;
    let startX, startY, startTranslateX, startTranslateY;
    let initialPinchDistance = 0;
    let pinchScale = 1;

    function getPinchDistance(touches) {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    canvasArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touches = e.touches;
        if (touches.length === 1) {
            isDragging = true;
            canvasArea.classList.add('dragging');
            startX = touches[0].clientX;
            startY = touches[0].clientY;
            startTranslateX = global.translateX;
            startTranslateY = global.translateY;
        } else if (touches.length === 2) {
            initialPinchDistance = getPinchDistance(touches);
            pinchScale = global.scale;
        }
    }, { passive: false });

    canvasArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touches = e.touches;
        if (touches.length === 1 && isDragging) {
            const dx = touches[0].clientX - startX;
            const dy = touches[0].clientY - startY;
            global.translateX = startTranslateX + dx;
            global.translateY = startTranslateY + dy;
            global.applyTransform();
        } else if (touches.length === 2) {
            const currentDistance = getPinchDistance(touches);
            if (initialPinchDistance > 0 && currentDistance > 0) {
                const newScale = pinchScale * (currentDistance / initialPinchDistance);
                global.scale = Math.min(global.MAX_SCALE, Math.max(global.MIN_SCALE, newScale));
                global.applyTransform();
            }
        }
    }, { passive: false });

    canvasArea.addEventListener('touchend', (e) => {
        e.preventDefault();
        isDragging = false;
        canvasArea.classList.remove('dragging');
    }, { passive: false });

    canvasArea.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        isDragging = false;
        canvasArea.classList.remove('dragging');
    }, { passive: false });
})(window);