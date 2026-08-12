document.addEventListener('DOMContentLoaded', () => {
    
    const slides = document.querySelectorAll('.carousel-slide');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    const delay = 3000;
    let autoSlideInterval;

     
    function showSlide(index) {
         
        slides[currentIndex].classList.remove('active');

        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        slides[currentIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, delay);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    btnPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    startAutoSlide();
});