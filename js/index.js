new fullpage('#fullpage', {
    navigation: true,
    navigationPosition: 'right',
    controlArrows: false,

    slidesNavigation: true,
	slidesNavPosition: 'bottom',

    easing: 'easeInOutCubic',
	easingcss3: 'ease',
});

function initTimeTable() {
    var timetable = new Timetable();
    timetable.setScope(9, 23);
    timetable.useTwelveHour();
    timetable.addLocations(['Silent Disco', 'Nile', 'Len Room', 'Maas Room']);

    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
}