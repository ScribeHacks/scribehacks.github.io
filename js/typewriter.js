
function initTypeEffect() {
    new TypeIt('#info-text1', {
        waitUntilVisible: true,
        cursor: false,
        speed: 50
    })
    .type('Location: 2727 Hackathon Street, San Jose, CA')
    .options({lifeLike: true})
    .go();
    new TypeIt('#info-text2', {
        waitUntilVisible: true,
        cursor: false,
        speed: 50
    })
    .pause(500)
    .type('Date: April 17-18')
    .options({lifeLike: true})
    .go();
    new TypeIt('#info-text3', {
        waitUntilVisible: true,
        cursor: false,
        speed: 50
    })
    .pause(1500)
    .type('Register By: April 15')
    .options({lifeLike: true})
    .go();
}