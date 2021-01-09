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