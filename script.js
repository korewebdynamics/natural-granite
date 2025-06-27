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
    const autoSlideDelay = 2000; 

    
    if (!seeDetailsButton) console.error('See Details button not found');
    if (!header) console.error('Header not found');
    if (!mainSection) console.error('Main section not found');
    
    console.log('Carousel cards count:', cards.length);

    
    const getCardWidth = () => {
        if (!cards.length) return 0;
        const computedStyle = getComputedStyle(cards[0]);
        const width = cards[0].offsetWidth + 
            parseFloat(computedStyle.marginLeft) + 
            parseFloat(computedStyle.marginRight);
        console.log('Computed card width (with margins):', width);
        return width;
    };

    
    const updateCarousel = (isAuto = false) => {
        if (!cards.length) return;
        const cardWidth = getCardWidth();
        if (cardWidth === 0) return;

        
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
       
        if (carouselContainer) {
            console.log('Container width:', carouselContainer.offsetWidth);
            console.log('Track width:', carouselTrack.offsetWidth);
        }
        
        if (!isAuto) resetAutoSlide();
    };

    
    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            updateCarousel(true);
        }, autoSlideDelay);
    };

    
    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    };

    
    const resetAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    
    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            const lang = event.target.value;
            const currentPath = window.location.pathname;
            const basePath = currentPath.replace(/(-es)?\.html$/, '');
            window.location.href = lang === 'es' ? `${basePath}-es.html` : `${basePath}.html`;
        });
    }

    
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

   
    if (carouselTrack && prevButton && nextButton && cards.length) {
        
        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

      
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        
        startAutoSlide();

        updateCarousel();
    }
    
    const cards1 = document.querySelectorAll('.service-card, .s-img, .t-img');
    
    cards1.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#FF3F33'; 
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#000';
        });
    });
});
