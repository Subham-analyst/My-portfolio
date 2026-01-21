/* ===============================
   Mobile Menu Toggle
================================ */
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

/* ===============================
   Scroll Animations (Observer)
================================ */
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bars only when section is visible
            if (entry.target.querySelector('.fill')) {
                const bars = entry.target.querySelectorAll('.fill');
                bars.forEach(bar => bar.style.width = bar.dataset.width);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.section-container').forEach(section => {
    section.style.opacity = "0";
    section.style.transition = "opacity 1s ease, transform 1s ease";
    section.style.transform = "translateY(50px)";
    
    // Add class for animation
    section.classList.add('hidden-section');
    observer.observe(section);
});

// Helper to handle the transition via CSS class
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .visible { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(styleSheet);


/* ===============================
   SECURE FORM SUBMISSION (Mock Database)
================================ */
const form = document.getElementById('secureForm');
const statusMsg = document.getElementById('form-status');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // 1. Basic Security: Check Honeypot (Anti-Spam)
    const honeypot = form.querySelector('input[name="honeypot"]');
    if (honeypot.value) { 
        console.warn("Spam bot detected"); 
        return; 
    }

    // 2. Data Collection
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 3. Sanitization (Example of cleaning input before sending)
    // In a real app, the backend MUST also sanitize.
    const cleanInput = (input) => {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    data.name = cleanInput(data.name);
    data.message = cleanInput(data.message);

    statusMsg.textContent = "Sending securely...";
    statusMsg.style.color = "blue";

    // 4. API Call (Simulating a Database Connection)
    // To make this real, replace the URL below with a service like Formspree.io or your own backend
    // Example: fetch('https://formspree.io/f/YOUR_ID', { ... })
    
    try {
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success Response
        statusMsg.textContent = "✅ Message saved to database successfully!";
        statusMsg.style.color = "green";
        form.reset();
        
    } catch (error) {
        statusMsg.textContent = "❌ Error connecting to server.";
        statusMsg.style.color = "red";
    }
});
