/* ===============================
   Firebase & Email Setup
================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
   Contact Form: Database + Email
================================ */
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Processing...</span>";

    // Gather Form Data
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const email = form.querySelector('input[placeholder="Your Email"]').value;
    const details = form.querySelector('textarea').value;
    const services = Array.from(form.querySelectorAll('input[name="service"]:checked'))
                          .map(cb => cb.value).join(", ");

    try {
        // 1. SAVE TO DATABASE (Firebase)
        await addDoc(collection(db, "recruiter_leads"), {
            name, email, services, details, date: new Date()
        });

        // 2. SEND EMAIL NOTIFICATION (EmailJS)
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            reply_to: email,
            message: details,
            chosen_services: services
        });

        alert("✅ Success! Data saved and notification sent to Subham.");
        form.reset();

    } catch (error) {
        console.error("Error:", error);
        alert("❌ Something went wrong. Check the console.");
    } finally {
        submitBtn.innerHTML = originalText;
    }
});

/* ===============================
   Animations (Kept from original)
================================ */
const sections = document.querySelectorAll('.section-container');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.classList.add('hidden');
    revealObserver.observe(section);
});
