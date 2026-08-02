const carousel = document.querySelector('[data-carousel="funk"]');

if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const previousButton = carousel.querySelector('.previous');
    const nextButton = carousel.querySelector('.next');

    const cards = Array.from(
        track.querySelectorAll('.collection-card')
    );

    let currentIndex = 0;

    function updateCarousel() {
        if (!cards.length) {
            return;
        }

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;

        const position =
            currentIndex * (cardWidth + gap);

        track.scrollTo({
            left: position,
            behavior: window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
                ? 'auto'
                : 'smooth'
        });
    }

    nextButton.addEventListener('click', () => {
        currentIndex =
            currentIndex < cards.length - 1
                ? currentIndex + 1
                : 0;

        updateCarousel();
    });

    previousButton.addEventListener('click', () => {
        currentIndex =
            currentIndex > 0
                ? currentIndex - 1
                : cards.length - 1;

        updateCarousel();
    });
}