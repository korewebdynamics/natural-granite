document.addEventListener('DOMContentLoaded', () => {
    const seeDetailsButton = document.querySelector('.heading-button');
    const header = document.querySelector('header');
    const mainSection = document.querySelector('#section1');
    const languageSelect = document.querySelector('#language-select');
    const navLogoLink = document.querySelector('.nav-logo a');
    const navLinks = document.querySelectorAll('.nav-links a');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carouselContainer = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.carousel-card');
    let currentIndex = 0;
    let autoSlideInterval = null;
    const autoSlideDelay = 4000; // 4 seconds

    // Debug: Check elements
    if (!seeDetailsButton) console.error('See Details button not found');
    if (!header) console.error('Header not found');
    if (!mainSection) console.error('Main section not found');
    // Debug: Carousel info
    console.log('Carousel cards count:', cards.length);

    // Calculate card width
    const getCardWidth = () => {
        if (!cards.length) return 0;
        const computedStyle = getComputedStyle(cards[0]);
        const width = cards[0].offsetWidth + 
            parseFloat(computedStyle.marginLeft) + 
            parseFloat(computedStyle.marginRight);
        console.log('Computed card width (with margins):', width);
        return width;
    };

    // Update carousel
    const updateCarousel = (isAuto = false) => {
        if (!cards.length) return;
        const cardWidth = getCardWidth();
        if (cardWidth === 0) return;

        // Cap currentIndex
        if (currentIndex >= cards.length) {
            currentIndex = 0;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(0)`;
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease';
            }, 0);
        } else if (currentIndex < 0) {
            currentIndex = cards.length - 1;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${(cards.length - 1) * cardWidth}px)`;
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease';
            }, 0);
        } else {
            carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        // Debug container and track widths
        if (carouselContainer) {
            console.log('Container width:', carouselContainer.offsetWidth);
            console.log('Track width:', carouselTrack.offsetWidth);
        }
        // Reset auto-slide on manual interaction
        if (!isAuto) resetAutoSlide();
    };

    // Start auto-slide
    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            updateCarousel(true);
        }, autoSlideDelay);
    };

    // Stop auto-slide
    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    };

    // Reset auto-slide timer
    const resetAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    // Language selection
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            const lang = event.target.value;
            const currentPath = window.location.pathname;
            const basePath = currentPath.replace(/(-es)?\.html$/, '');
            window.location.href = lang === 'es' ? `${basePath}-es.html` : `${basePath}.html`;
        });
    }

    // See Details button transition
    if (seeDetailsButton) {
        seeDetailsButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (header) {
                header.style.opacity = '0';
                header.style.transform = 'scale(0.95)';
                header.style.visibility = 'hidden';
                setTimeout(() => {
                    header.style.display = 'none';
                    document.documentElement.style.overflow = 'auto';
                    if (mainSection) {
                        window.scrollTo({
                            top: mainSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 700);
            }
        });
    }

    // Nav logo/company name click to return to header
    if (navLogoLink) {
        navLogoLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (header) {
                header.style.display = 'block';
                header.style.opacity = '1';
                header.style.transform = 'scale(1)';
                header.style.visibility = 'visible';
                document.documentElement.style.overflow = 'hidden';
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Nav links smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection && header) {
                header.style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel functionality
    if (carouselTrack && prevButton && nextButton && cards.length) {
        // Event listeners
        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        // Pause auto-slide on hover
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        // Update on resize
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        // Start auto-slide
        startAutoSlide();

        // Initial update
        updateCarousel();
    }
});