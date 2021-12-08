const clients1 = document.getElementById("clients1");
const clients2 = document.getElementById("clients2");
const clients3 = document.getElementById("clients3");
const brand1 = document.getElementById("brand1");
const brand2 = document.getElementById("brand2");
const brand3 = document.getElementById("brand3");
const brand4 = document.getElementById("brand4");
const brand5 = document.getElementById("brand5");
const brand6 = document.getElementById("brand6");
const copas=document.getElementsByClassName("picture");
zoomOnHover(document.getElementById('brand1'), 1.15, 1);
zoomOnHover(document.getElementById('brand2'), 1.15, 1);
zoomOnHover(document.getElementById('brand3'), 1.15, 1);
zoomOnHover(document.getElementById('brand4'), 1.15, 1);
zoomOnHover(document.getElementById('brand5'), 1.15, 1);
zoomOnHover(document.getElementById('brand6'), 1.15, 1);

gsap.from("#logo", {duration: 3, x: 300, opacity: 0, scale: 0.5});

clients1.addEventListener('mouseover', ()=>{
    gsap.from("#clients1", {duration: 3, rotationY: 360}); 
}
)

clients2.addEventListener('mouseover', ()=>{
    gsap.from("#clients2", {duration: 3, rotationY: 360}); 
}
)

clients3.addEventListener('mouseover', ()=>{
    gsap.from("#clients3", {duration: 3, rotationY: 360}); 
}
)

function zoomOnHover (element, zoom, seconds) {

    var timeline = new TimelineLite({paused:true});

    timeline.to(element, seconds, {scale:zoom, ease:Elastic.easeOut});

    timeline.to(element, seconds, {scale:1});

    element.onmouseover = function() {
        timeline.restart();
    };
}

gsap
.timeline({
  defaults: {
    duration: 1.5
  }
})
.to('#features__item__1', {
  
  scale: 1.3,
  ease: "bounce"
})
.to('#features__item__2', {
  
  scale: 1.3,
  ease: "bounce"
}, '-=1')
.to('#features__item__3', {
  
  scale: 1.3,
  ease: "bounce"
}, '-=1')