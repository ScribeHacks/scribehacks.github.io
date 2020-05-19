
function initTypeEffect() {
    new TypeIt('#info-text', {
        waitUntilVisible: true
    })
    .type(".date(April 17-18);")
    .pause(2000)
    .delete(30)
    .type(".registerBy(April 15);")
    .pause(2000)
    .delete(30)
    .type(".location(2727 Hackathon Street, San Jose, CA);")
    .pause(2000)
    .delete(50)
    .options({lifeLike: true, loop: true})
    .go();
}
