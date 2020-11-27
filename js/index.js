particlesJS("particles", {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 10000
      }
    },
    "color": {
      "value": "#2B2D42"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
    },
    "opacity": {
      "value": 1.0,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 1.2,
        "opacity_min": 0.0,
        "sync": false
      }
    },
    "size": {
      "value": 20,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#eee",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": false
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 150,
        "size": 30,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


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