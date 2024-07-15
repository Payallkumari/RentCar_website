let swiperCards = new Swiper('.card-content', {
  
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  

    breakpoints: {
        600: {
            slidesPerView:2, 
        },
        968: {
            slidesPerView:3, 
        },
    }  ,
  
  });






 let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
const cardContainer = document.getElementById('cardContainer');
const reviewCards = Array.from(document.querySelectorAll('.review-card'));
const totalCards = reviewCards.length;
const sliderControls = document.querySelector('.slider-controls');

// Clone first and last card for looping effect
const firstClone = reviewCards[0].cloneNode(true);
const lastClone = reviewCards[totalCards - 1].cloneNode(true);
cardContainer.appendChild(firstClone);
cardContainer.insertBefore(lastClone, reviewCards[0]);

// Update reviewCards and totalCards after cloning
const updatedReviewCards = Array.from(document.querySelectorAll('.review-card'));
const updatedTotalCards = updatedReviewCards.length;

function createDots() {
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dot.addEventListener('click', () => moveSlider(i));
        sliderControls.appendChild(dot);
    }
}

function setPositionByIndex() {
    const cardWidth = reviewCards[0].offsetWidth + parseInt(getComputedStyle(cardContainer).gap);
    cardContainer.style.transform = `translateX(${-(currentIndex + 1) * cardWidth}px)`;
    updateDots();
}

function moveSlider(index) {
    currentIndex = index;
    setPositionByIndex();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

createDots();
updateDots();

// Add event listeners for touch and mouse events
cardContainer.addEventListener('touchstart', touchStart);
cardContainer.addEventListener('touchend', touchEnd);
cardContainer.addEventListener('touchmove', touchMove);
cardContainer.addEventListener('mousedown', touchStart);
cardContainer.addEventListener('mouseup', touchEnd);
cardContainer.addEventListener('mousemove', touchMove);
cardContainer.addEventListener('mouseleave', touchEnd);

window.addEventListener('resize', setPositionByIndex);

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    cardContainer.style.cursor = 'grabbing';
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    cardContainer.style.cursor = 'grab';

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < totalCards - 1) {
        currentIndex += 1;
    }
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();
    prevTranslate = currentTranslate;
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
        setSliderPosition();
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    cardContainer.style.transform = `translateX(${currentTranslate}px)`;
}

// Initialize slider position
setPositionByIndex();




  document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    let menuOpen = false;

    menuToggle.addEventListener('click', function() {
        if (!menuOpen) {
            menu.style.display = 'flex'; 
            const menuHeight = menu.scrollHeight + 'px';
            menu.style.height = menuHeight;
            menu.classList.add('show');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuOpen = true;
        } else {
            menu.style.height = '0';
            menu.classList.remove('show');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuOpen = false;
            
            setTimeout(() => {
                menu.style.display = 'none';
            }, 200);
        }
    });
});