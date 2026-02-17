document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Scroll reveal animation
    // ========================================
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });

    // ========================================
    // Navbar scroll effect
    // ========================================
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // Mobile menu toggle
    // ========================================
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('active');
        });

        links.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                links.classList.remove('active');
            });
        });
    }

    // ========================================
    // Particle Network Animation
    // ========================================
    function initParticles(canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var animId;

        var PARTICLE_COUNT = 55;
        var MAX_DIST = 130;
        var PARTICLE_SPEED = 0.35;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                r: Math.random() * 1.5 + 0.8
            };
        }

        function init() {
            resize();
            particles = [];
            for (var i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update positions
            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            // Draw connecting lines
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MAX_DIST) {
                        var alpha = (1 - dist / MAX_DIST) * 0.18;
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(96, 165, 250, ' + alpha + ')';
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw dots
            particles.forEach(function (p) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(147, 197, 253, 0.35)';
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        }

        // Only animate when section is visible
        var sectionEl = canvas.parentElement;
        var visibilityObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (!animId) {
                        init();
                        draw();
                    }
                } else {
                    if (animId) {
                        cancelAnimationFrame(animId);
                        animId = null;
                    }
                }
            });
        }, { threshold: 0 });

        visibilityObserver.observe(sectionEl);

        // Handle resize
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (animId) {
                    cancelAnimationFrame(animId);
                    animId = null;
                    init();
                    draw();
                }
            }, 200);
        });
    }

    // Initialize particle canvases
    document.querySelectorAll('canvas[data-particle]').forEach(function (canvas) {
        initParticles(canvas);
    });

});
