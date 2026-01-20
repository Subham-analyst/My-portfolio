/* ===============================
   Smooth scroll for nav links
================================ */
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ===============================
   Reveal sections on scroll
================================ */
const sections = document.querySelectorAll('.section-container');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.classList.add('hidden');
    revealObserver.observe(section);
});

/* ===============================
   Animate skill bars
================================ */
const skillBars = document.querySelectorAll('.fill');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = "0";
    skillObserver.observe(bar);
});

/* ===============================
   Contact form submit
================================ */
const form = document.querySelector('.contact-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("✅ Thank you! Your proposal has been sent.");
    form.reset();
});
