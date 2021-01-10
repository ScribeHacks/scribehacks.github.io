document.getElementsByClassName('hidden').style.display = 'none';

function sendEmail() {
    var subject = document.getElementById('subject-field').value;
    var body = document.getElementById('body-field').value;
    console.log(subject);
    console.log(body);
    subject = encodeURIComponent(subject.trim());
    body = encodeURIComponent(body.trim());
    console.log(subject);
    console.log(body);
    var email = "mailto:help@scribehacks.tech?subject=" + subject + "&body=" + body;
    document.getElementById("mailSubmit").href = email;
    console.log(document.getElementById("mailSubmit").href);
}
var navClosed = true;
function closeNav() {
    var navbar = document.getElementById('bs-example-navbar');
    console.log("1");
    if (/Mobi/.test(navigator.userAgent)) {
        console.log("2");
        if (navClosed) {
            navbar.classList.remove('hidden');
            navClosed = false;
            console.log("3");
        }
        else {
            navbar.classList.add('hidden');
            navClosed = true;
            console.log("4");
        }
    }
}