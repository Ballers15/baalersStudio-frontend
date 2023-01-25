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
            start: "top center",
            // end: "+=" + (frame_count * offset_value),
            // pin: true,
            scrub: true
          }
        });
    }
   



    gsap.utils.toArray(".comparisonSection").forEach(section => {
      let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
            end: () => "+=" + section.offsetHeight, 
            scrub: true,
            // pin: true,
            anticipatePin: 1
          },
          defaults: {ease: "none"}
        });
      // animate the container one way...
      tl.fromTo(section.querySelector(".afterImage"), { yPercent: 50, y: 0}, {yPercent: 0})
        // ...and the image the opposite way (at the same time)
        .fromTo(section.querySelector(".afterImage img"), {yPercent: -50, y: 0}, {yPercent: 0}, 0);
    });





    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".ballerSec",
        scrub: true,
        // pin: true,
        start: "top top",
        end: "center bottom",
        // end: "+=200%"
      }
    })
     
    .from(".flashLight", {
      scale: 1.5, 
      opacity:1,
      ease: "none"
    })
    .from(".flashLight2", {
      scale: 1.5, 
      opacity:1,
      ease: "none"
    })
  })