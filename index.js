function sendHireEmail(event) {
    event.preventDefault();

    const name = document.querySelector("input[name='name']").value;
    const email = document.querySelector("input[name='email']").value;
    const message = document.querySelector("textarea[name='message']").value;

    const subject = encodeURIComponent("Hiring / Contact Request from Portfolio");
    const body = encodeURIComponent(
        `Hello Subham,\n\n` +
        `You have received a new message from your portfolio.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}\n\n` +
        `Regards,\nPortfolio Website`
    );

    // Open Gmail / Email app
    window.location.href =
        `mailto:subhamraj8569@gmail.com?subject=${subject}&body=${body}`;

    // Show Thank You message
    document.getElementById("thankYouMsg").style.display = "block";

    // Clear form
    event.target.reset();
}
