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

    // $(document).on('click', '#view_more_news', function (e) {
    //     e.preventDefault();

    //     /**
    //      * Update DOM
    //      */
    //     // $('.news-list-column').each(function() {
    //     //     let $self = $(this);
    //     //     let items_clone = $self.find('.news-item').not('.news-item--view_more').clone();
    //     //     items_clone.addClass('news-item--clone').appendTo($self);
    //     // });

    //     // let $self_wrap = $('.news-item--view_more');
    //     // $self_wrap.appendTo($self_wrap.parent());


    //     /**
    //      * Update GSAP
    //      */
    //     setTimeout(() => {
    //         updateNewsAndInsights('update');
    //     }, 16);
    // });

    // function updateNewsAndInsights(action) {
    //     if (scene_news != 'undefined') {
          
    //         if (action === 'kill') {
              
    //             scene_news.kill();
    //             $('.news-list-wrap, .news').attr('style', '');
              
    //         } else if (action === 'update') {
              
    //           if (window.innerWidth >= 992) {
    //               ScrollTrigger.refresh(true);
    //           }
              
    //         }
          
    //     }
    // }

//     ScrollTrigger.addEventListener("revert", function() {
//         newsItems = $('.news-item');
//         scrollScrub = newsItems.length > 10 ? 1.5 : true;
//         news_list_wrap = $('.news-list-wrap');
//         yNewsOffset = news_list_wrap.height() - (window.innerHeight / 1.25);

// //         scene_news = gsap.to('.news-list-wrap', {
// //             y: -(yNewsOffset - 120) + 'px',
// //             ease: 'none',
// //             scrollTrigger: {
// //                 trigger: '.news',
// //                 start: 'top top',
// //                 end: 'bottom top',
// //                 pin: true,
// //                 scrub: scrollScrub,
// //             }
// //         });
      
// //         let count = 0
        
// //         let triggers = ScrollTrigger.getAll();
// //         triggers.forEach( function(trigger) {			
// //           count += 1
// //         });
        
// //         console.log(count)
      
//     });
  
    // function mobileCheck() {
    //     if (window.innerWidth <= 991) {
    //         updateNewsAndInsights('kill');
    //     }
    // }

    // mobileCheck();
    // $(window).on('resize', mobileCheck);
})