$(document).ready(function (e) {
  // Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
  var itemClassName = "service-slide";
  var items = $("." + itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true,
    slideDuration = $(".carousel").data("interval"),
    next = $(".carousel__button--next")[0],
    prev = $(".carousel__button--prev")[0];
  // console.log(totalItems)

  function autoSlide() {
    setTimeout(function () {
      if (!moving) {
        $(next).click();
        autoSlide();
      }
    }, slideDuration);
  }

  // To initialise the carousel we'll want to update the DOM with our own classes
  function setInitialClasses() {
    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    $(items[totalItems - 1]).addClass("prev");
    $(items[0]).addClass("active");
    $(items[1]).addClass("next");
    // autoSlide();
  }

  // Set click events to navigation buttons

  function setEventListeners() {
    $(next).click(function (e) {
      moveNext();
    });
    $(prev).click(function (e) {
      movePrev();
    });
  }

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction();

      animate();

      // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Test if carousel has more than three items
      if (totalItems - 1 >= 3) {
        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }
        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      moveCarouselTo(slide);

      // autoSlide();
      // Move carousel to updated slide
    }
  }

  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();
    if (slideDuration != 0 || slideDuration != "") {
      autoSlide();
    }

    // Set moving to false now that the carousel is ready
    moving = false;
  }

  // make it rain
  initCarousel();

  // *********** SVG CAROUSEL ANIMATIONS ***********

  function animate() {

    // Slide 1
    var tl = gsap.timeline({ defaults: { transformOrigin: "50% 50%" }}); // timeline for slide1 animations

    // All headings and text
    tl.fromTo(".slide-head", 0.7, {opacity: 0, y: 300, delay: 0.2 },{opacity: 1, y: 0, ease: "back",})
      .fromTo(".slide-sub-head", { opacity: 0, y: 300 },{ opacity: 1, y: 0, ease: "back" }, "-=0.4")
      .fromTo(".slide-txt", { opacity: 0, y: 200 },{ opacity: 1, y: 0, ease: "back" }, "=-0.3")
      .fromTo(".head-rect", { opacity: 0, y: -200 },{ opacity: 1, y: 0, ease: "back" }, "-=0.5")

      // All circles groups, girl, and bg objects
      .fromTo(".slide1-girl", { opacity: 0, y: 500 },{ opacity: 1, y: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl1bg-obj", { opacity: 0, y: -500 },{ opacity: 1, y: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl1cg1", { opacity: 0, x: -300 },{ opacity: 1, x: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl1cg2", { opacity: 0, x: -200, y: 200 },{ opacity: 1, x: 0, y: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl1cg3", { opacity: 0, x: 300 },{ opacity: 1, x: 0, ease: "back" }, "-=0.5")

      // All objects over the girl's head
      .fromTo(".sl1cg4", { opacity: 0, y: -200 },{ opacity: 1, y: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl1heart", { opacity: 0, x: 300 },{ opacity: 1, x: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl1user", { opacity: 0, y: -300 },{ opacity: 1, y: 0, ease: "back" }, "-=0.5")
      .fromTo('.sl1eye', {opacity: 0, y: -100,x: -200,}, {opacity: 1,y: 0,x: 0, ease: 'back'}, "-=0.5")
      .fromTo(".sl1chat",{ opacity: 0, x: -100, y: -200 },{opacity : 1, x: 0, y: 0, onComplete: killObj }, "-=0.5");

    // Slide 2
    var tl2 = gsap.timeline({ defaults: { transformOrigin: "50% 50%" }}); // Timeline for slide 2 animations

    // All cirlce groups, and bg object
    tl2.fromTo("#sl2cg1", 0.7, { opacity: 0, x: -400, y: -100, delay: 0.2,},{ opacity: 1, x: 0, y: 0, ease: "back"})
      .fromTo("#sl2cg2", { opacity: 0, x: 50, y: 150 },{ opacity: 1, x: 0, y: 0, ease: "back" }, "-=0.5")
      .fromTo("#sl2cg3", { opacity: 0, x: 200, y: -50 },{ opacity: 1, x: 0, y: 0, ease: "back" }, "-=0.5")
      .fromTo("#sl2bg-obj", { opacity: 0 },{ opacity: 1, ease: "back" }, "-=0.5")

      // Girl and objects
      .fromTo(".sl2-girl", { opacity: 0, x: 400 },{ opacity: 1, x: 0, ease: "back" }, "-=0.5")
      .fromTo(".sl2-girlobj-heart",{ opacity: 0, x: 200, y: -50 },{ opacity: 1, x: 0, y: 0, ease: "back" },"-=0.4")
      .fromTo(".sl2-girlobj-eye", { opacity: 0, x: 200, y: -100 },{ opacity: 1, x: 0, y: 0, ease: "back" }, "-=0.4")
      .fromTo( ".sl2-girlobj-chat", { opacity: 0, x: 150, y: -100 },{ opacity: 1, x: 0, y: 0, ease: "back" }, "-=0.4")
      .fromTo( ".sl2-girlobj-user",{ opacity: 0, x: 20, y: -150 },{ opacity: 1, x: 0, y: 0, ease: "back", onComplete: killObj }, "-=0.4");

    // Slide3
    var tl3 = gsap.timeline({ defaults: { transformOrigin: "50% 50%" }}); // Slide3 timeline object

    // Slide3 features, bg-object
    tl3.fromTo("#sl3-subhead > g", 0.7, { opacity: 0, y: 300, delay: 0.2, },{ opacity: 1, y: 0, ease: "back", stagger: 0.1 })
      .fromTo(".sl-btng", { opacity: 0, y: 100, },{ opacity: 1, y: 0, ease: "back" }, "-=0.6")
      .fromTo("#sl3bg-obj", { opacity: 0, y: -100, },{ opacity: 1, y: 0, ease: "back" }, "-=0.6")

      // All circle groups
      .fromTo("#sl3-cg1", { opacity: 0, y: -150, x: 150 },{ opacity: 1, y: 0, x: 0, ease: "back" }, "-=0.7")
      .fromTo("#sl3-cg2", { opacity: 0, y: 150 },{ opacity: 1, y: 0, ease: "back" }, "-=0.7")
      .fromTo("#sl3-cg3", { opacity: 0, x: 150 },{ opacity: 1, x: 0, ease: "back" }, "-=0.7")

      // Hi five
      .fromTo("#sl3-girl", { opacity: 0, y: 150, x: -150 },{ opacity: 1, y: 0, x: 0, ease: "back" }, "-=0.7")
      .fromTo( "#sl3-man", { opacity: 0, x: 150 },{ opacity: 1, x: 0, ease: "back", onComplete: killObj }, "-=0.7" );

      $('#sl1-restart').click(function(e){tl.restart();});
      $('#sl2-restart').click(function(e){tl2.restart();});
      $('#sl3-restart').click(function(e){tl3.restart();});

    function killObj() {

      // setTimeout(function(){

        // tl.kill();
        tl = null;
        tl2 = null;
        tl3 = null;
        // console.log(`Killed, tl is now:${tl}, tl2 is now:${tl2}, tl3 is now:${tl3}`)

      // }, 900)
        
    }

  }

  animate();
}); //DOM content loaded
