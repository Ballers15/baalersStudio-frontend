/* eslint-disable no-undef */
const loader = document.querySelector(".loader-wrapper");
$(window).on('click', function () {
  // console.log('--------------------click detected---------------')
    //   gsap.registerPlugin(ScrollTrigger);
    // var frame_count  = 9,
    //     offset_value = 100;
    // var viewerList = $('.viewer');
    // if (viewerList.length) {
        
    //     gsap.to(".viewer", {
    //       backgroundPosition: (-offset_value * frame_count * 2) + "px 50%",
    //       ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
    //       scrollTrigger: {
    //         trigger: ".scene",
    //         start: "top center",
    //         // end: "+=" + (frame_count * offset_value),
    //         // pin: true,
    //         scrub: true
    //       }
    //     });
    // }
    gsap.utils.toArray(".comparisonSection").forEach(section => {
      let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: () => "+=" + section.offsetHeight,
            scrub: true,
            // pin: true,
            anticipatePin: 1
          },
          defaults: {ease: "none"}
        });
        // console.log(tl)
      tl.fromTo(section.querySelector(".afterImage"), { yPercent: 50, y: 0}, {yPercent: 0})
        tl.fromTo(section.querySelector(".afterImage img"), {yPercent: -50, y: 0}, {yPercent: 0}, 0);
    });
  


     gsap.timeline({
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
  setTimeout(() => {
    loader?.classList?.add("loader--hide");
  },0)
  
  })