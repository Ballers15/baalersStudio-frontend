/* eslint-disable no-undef */
const loader = document.querySelector(".loader-wrapper");
$(window).on('click', function () {
  
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
      tl.fromTo(section.querySelector(".afterImage"), { yPercent: 50, y: 0}, {yPercent: 0})
        tl.fromTo(section.querySelector(".afterImage img"), {yPercent: -50, y: 0}, {yPercent: 0}, 0);
    });
  
  setTimeout(() => {
    loader?.classList?.add("loader--hide");
  },0)
  
  })