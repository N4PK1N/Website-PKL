document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text');
    revealElements.forEach((el, index) => {
        // Add a slight staggered delay for elements that appear together
        el.style.transitionDelay = `${(index % 5) * 0.1}s`;
        observer.observe(el);
    });

    // ========================
    // Portfolio Category Filter
    // ========================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });


    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxYear = document.getElementById('lightboxYear');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(item) {
        lightboxImg.src = item.dataset.img;
        lightboxImg.alt = item.dataset.title;
        lightboxTitle.textContent = item.dataset.title;
        lightboxYear.textContent = item.dataset.year;
        lightboxTag.textContent = item.querySelector('.portfolio-tag').textContent;
        lightboxDesc.textContent = item.dataset.desc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});

