$(window).on('load', function() {
  
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
        console.log("GSAP is not define in this template");
    }
  
  // News & Insights
    let newsItems = $('.news-item');
    let scrollScrub = newsItems.length > 10 ? 1.5 : true;

    let news_list_wrap = $('.news-list-wrap');
    // let scene_news = null;
    let yNewsOffset = null;

    if (news_list_wrap.length) {
        yNewsOffset = news_list_wrap.height() - (window.innerHeight / 1.25);
        scene_news = gsap.to('.news-list-wrap', {
            y: () => -(yNewsOffset - 120) + 'px',
            ease: 'none',
            scrollTrigger: {
                trigger: '.news',
                start: 'top top',
                // end: 'bottom top',
                // end: () => "+=" + news_list_wrap.height(),
                pin: true,
                scrub: scrollScrub,
                invalidateOnRefresh: true
            }
        });
    } 


    
}) 