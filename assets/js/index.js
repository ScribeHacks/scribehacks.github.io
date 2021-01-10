
function initTimeTable() {
    var timetable = new Timetable();
    timetable.setScope(9, 23);
    timetable.useTwelveHour();
    timetable.addLocations(['Silent Disco', 'Nile', 'Len Room', 'Maas Room']);

    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
}

// Accordion expansion code
var acc = document.getElementsByClassName("accordion-content");
var i;
var toggled = document.getElementsByClassName("active");

for(i = 0; i < acc.length; i++) {
  acc[i].style.maxHeight = acc[i].scrollHeight * 2;
}

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       var panelheight = panel.scrollHeight * 2;
//       panel.style.maxHeight = panelheight + "em";
//     } 
//   });
// }

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
    content = this.nextElementSibling;
    content.setAttribute('height',(content.scrollHeight*2) + "px")
    console.log(content.getAttribute('height'));
    console.log(content.scrollHeight );
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));