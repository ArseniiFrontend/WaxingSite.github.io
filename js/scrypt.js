const scrollContainer = document.getElementById('scroll-container');

let isDown = false;
let startX;
let scrollLeft;
let startY;
let isScrolling;

scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
    scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
    scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollContainer.scrollLeft = scrollLeft - walk;
});

// Add touch event listeners for mobile devices
scrollContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    startY = e.touches[0].pageY;
    scrollLeft = scrollContainer.scrollLeft;
    isScrolling = undefined; // Reset scrolling direction flag
});

scrollContainer.addEventListener('touchend', () => {
    isDown = false;
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;

    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const y = e.touches[0].pageY;
    const walkX = (x - startX) * 1.7; // increase sensitivity on mobile
    const walkY = y - startY;

    // Determine scroll direction
    if (typeof isScrolling === 'undefined') {
        isScrolling = Math.abs(walkY) > Math.abs(walkX);
    }

    if (!isScrolling) {
        e.preventDefault(); // Prevent default scrolling for horizontal scroll
        scrollContainer.scrollLeft = scrollLeft - walkX;
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.overflowX = 'hidden';
  });
  

