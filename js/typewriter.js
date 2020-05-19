
function initTypeEffect() {
    new TypeIt('#info-text3', {
        waitUntilVisible: true,
        cursor: false,
        speed: 100
    })
    .pause(1500)
    .type('.date("April 17-18");')
    .options({lifeLike: true})
    .go();

    new TypeIt('#info-text2', {
        waitUntilVisible: true,
        cursor: false
    })
    .pause(1000)
    .type('.registerBy("April 15");')
    .options({lifeLike: true})
    .go();

    new TypeIt('#info-text1', {
        waitUntilVisible: true,
        cursor: false,
        speed: 60
    })
    .pause(500)
    .type('.location("2727 Hackathon Street, San Jose, CA");')

    .options({lifeLike: true})
    .go();
}