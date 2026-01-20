function sendHireEmail(event) {
    event.preventDefault();

    // Change "Send Proposal" button text to show it's working
    const btn = event.target.querySelector("button");
    const originalText = btn.innerHTML;
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    // These parameters must match the {{variable_names}} in your EmailJS template
    const templateParams = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        message: document.querySelector("textarea[name='message']").value
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function() {
            // Success!
            document.getElementById("thankYouMsg").innerText = "Message sent successfully!";
            document.getElementById("thankYouMsg").style.display = "block";
            document.getElementById("thankYouMsg").style.color = "green";
            event.target.reset();
        }, function(error) {
            // Failed
            console.log('FAILED...', error);
            alert("Sent failed. Please check your internet or try again later.");
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}
