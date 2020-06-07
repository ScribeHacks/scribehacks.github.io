
function initTypeEffect() {
    new TypeIt('#info-text1', {
        waitUntilVisible: true,
        cursor: false,
        speed: 50
    })
    .pause(500)
    .type('Location: 2727 Hackathon Street, San Jose, CA')
    .pause(1500)
    .delete(50)
    .pause(500)
    .type('Register By: April 15')
    .pause(1500)
    .delete(25)
    .pause(500)
    .type('Date: April 17-18')
    .pause(1500)
    .delete(25)
    .pause(500)
    .options({loop: true, lifeLike: true})
    .go();
}