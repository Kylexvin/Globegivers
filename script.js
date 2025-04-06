document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.gg-hamburger');
    const nav = document.querySelector('.gg-nav');
    const dropdowns = document.querySelectorAll('.gg-dropdown');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('gg-active');
        nav.classList.toggle('gg-active');
    });
    
    // Handle dropdowns on mobile
    if (window.innerWidth <= 991) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.gg-dropdown-toggle');
            
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('gg-open');
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('gg-active')) {
            nav.classList.remove('gg-active');
            hamburger.classList.remove('gg-active');
        }
    });
    
    // Adjust for window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            nav.classList.remove('gg-active');
            hamburger.classList.remove('gg-active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('gg-open'));
        }
    });
});

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Initialize slider
    showSlide(currentSlide);

    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    // Auto-advance slides every 5 seconds
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        
        // Update current slide index
        currentSlide = n;
    }

    // Animate Statistics Counter
    const stats = document.querySelectorAll('.stat-number');
    
    // Check if stats section exists
    if (stats.length > 0) {
        // Function to animate counting
        function animateCounter(el) {
            const target = parseInt(el.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 20)); // Update every 20ms
            let current = 0;
            
            const timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, 20);
        }
        
        // Function to check if element is in viewport with more tolerance
        function isInViewport(el) {
            if (!el) return false;
            
            const rect = el.getBoundingClientRect();
            // Add more tolerance - element is considered in viewport when at least partially visible
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                rect.right > 0
            );
        }
        
        // Initialize a flag to track if animation has started
        let animationStarted = false;
        
        // Start animation when stats section comes into view
        function checkStats() {
            if (animationStarted) return; // Skip if already animated
            
            const statsContainer = document.querySelector('.stats-container');
            
            if (statsContainer && isInViewport(statsContainer)) {
                console.log("Stats container is in viewport, starting animation");
                
                stats.forEach(stat => {
                    animateCounter(stat);
                });
                
                // Set flag to prevent re-running
                animationStarted = true;
                
                // Remove scroll listener once animation starts
                window.removeEventListener('scroll', checkStats);
            }
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', checkStats);
        
        // Check on initial load as well
        setTimeout(checkStats, 500); // Small delay to ensure DOM is fully rendered
        
        // Force animation if not triggered after 2 seconds (fallback)
        setTimeout(function() {
            if (!animationStarted) {
                console.log("Forcing animation start");
                stats.forEach(stat => {
                    animateCounter(stat);
                });
                animationStarted = true;
                window.removeEventListener('scroll', checkStats);
            }
        }, 2000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip dropdown parent elements
            if (this.parentElement.classList.contains('dropdown')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            
            // Skip empty or just '#' links
            if (targetId === '#' || targetId === '') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would normally send this to your backend
                // For demo purposes, just show an alert
                alert('Thank you for subscribing with: ' + email);
                emailInput.value = '';
            }
        });
    }

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = 'Back to Top';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.classList.add('sticky');
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScrollPosition > lastScrollPosition) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hidden');
        }
        
        lastScrollPosition = currentScrollPosition;
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }

    