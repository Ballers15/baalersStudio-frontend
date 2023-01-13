/* eslint-disable no-undef */

$(window).on('load', function () {
 
      // try {
      //     gsap.registerPlugin(ScrollTrigger);
      // } catch (e) {
      //     console.log("GSAP is not define in this template");
      // }
      gsap.registerPlugin(ScrollTrigger);
    var frame_count  = 9,
        offset_value = 100;
    var viewerList = $('.viewer');
    if (viewerList.length) {
        
        gsap.to(".viewer", {
          backgroundPosition: (-offset_value * frame_count * 2) + "px 50%",
          ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
          scrollTrigger: {
            trigger: ".scene",
            start: "top top",
            end: "+=" + (frame_count * offset_value),
            pin: true,
            scrub: true
          }
        });
    }
   


    gsap.utils.toArray(".comparisonSection").forEach(section => {
      let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "center center",
            // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
            end: () => "+=" + section.offsetWidth, 
            scrub: true,
            pin: true,
            anticipatePin: 1
          },
          defaults: {ease: "none"}
        });
      // animate the container one way...
      tl.fromTo(section.querySelector(".afterImage"), { yPercent: 100, y: 0}, {yPercent: 0})
        // ...and the image the opposite way (at the same time)
        .fromTo(section.querySelector(".afterImage img"), {yPercent: -100, y: 0}, {yPercent: 0}, 0);
    });
  })