"use strict";

// MODAL WINDOW
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// BUTTON SCROLLING
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
// TABBED COMPONENT - OPERATIONS
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
// MENU FADE ANIMATION
const nav = document.querySelector(".nav");
// STICKY NAVIGATION
const header = document.querySelector(".header");
// REVEALING SECTIONS
const allSections = document.querySelectorAll(".section");

///////////////////////////////////////
// MODAL WINDOW
///////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// old way of loop
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

// new way of loop
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// BUTTON SCROLLING
///////////////////////////////////////

// New technic
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// PAGE NAVIGATION
///////////////////////////////////////

// Event delegation

// 1. add event listener to common parent element (in this case ul - nav__links)
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // prevent default behavior
  e.preventDefault();

  // 2. determine what element originated the event
  // element that we click (e.target) must be equal to the link class
  if (e.target.classList.contains("nav__link")) {
    // get the href value (anchor to the id of each section)
    const id = e.target.getAttribute("href");
    // select the element that we want to reach with scrolling (section - id)
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// old way
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     // prevent default behavior
//     e.preventDefault();
//     // get the href value (anchor to the id of each section) for each link
//     const id = this.getAttribute("href");
//     // select the element that we want to reach with scrolling (section - id)
//     // id = #section--1(2 or 3)
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

///////////////////////////////////////
// TABBED COMPONENT - OPERATIONS
///////////////////////////////////////

// we add event listener to common parent element (in this case div - operations__tab)
tabsContainer.addEventListener("click", function (e) {
  // to get always all the tab (even if we click on a span inside the tab)
  const clicked = e.target.closest(".operations__tab");

  // Guard close
  // to prevent getting a null value / error when we click outside the tab
  if (!clicked) return;

  // we clear the active class on all tabs and contents
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // we add the active class on the tab that we clicked
  clicked.classList.add("operations__tab--active");

  // we activate the content area
  // we use the value stored in each tab with the attribute data-tab = "n"
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// MENU FADE ANIMATION
///////////////////////////////////////

// function to use in the eventListener
const handleHover = function (e) {
  // we define the e.target and find the connected elements
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    // add/remove opacity to the siblings
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    // add/remove opacity to the logo
    logo.style.opacity = this;
  }
};

// mouseover when we hover over the parent/element
// we add opacity (.bind will define the THIS value)
nav.addEventListener("mouseover", handleHover.bind(0.5));

// mouseout when we hover out of the parent/element
// we remove opacity (.bind will define the THIS value)
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// STICKY NAVIGATION
///////////////////////////////////////
// we want to apply the sticky nav when the header goes completely out of view

// to get the nav height dinamically
const navHeight = nav.getBoundingClientRect().height;

// 2) we create the callback
const stickyNav = function (entries) {
  // we create the intersectionObserverEntry object (1 threshold value)
  const [entry] = entries; // array destructuring

  // scrolling down
  // isIntersecting = false (we want to add the sticky nav)
  // if it's not true
  if (!entry.isIntersecting) nav.classList.add("sticky");
  // scrolling up
  // isIntersecting = true (we want to remove the sticky nav)
  else nav.classList.remove("sticky");
};

// 1) we create the observer for the header
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // entire viewport
  threshold: 0, // 0% of the header
  rootMargin: `-${navHeight}px`, // margin before the header bottom (height of the nav bar)
});
headerObserver.observe(header);

// Intersection observer API

// 3) the callback will be called whenever the target intersects the view port (root) at a certain percentage (threshold)
// entries = array of threshold
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// 4) options
// const obsOptions = {
//   // the element that the target is intersecting
//   root: null, // null = entire viewport
//   // percentage of intersection at which the observer callback will be called
//   // amount of target that is intesecting the viewport (scrolling up and down)
//   threshold: [0, 0.2], // scrolling down we get 4 intersections at 0, 2%, 2% (end) and again 0 (end)
// };

// // 1) call the function
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // 2) observe a target
// observer.observe(section1);

// Old way
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

///////////////////////////////////////
// REVEALING SECTIONS
///////////////////////////////////////

// 3) callback
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // isIntersecting = false
  // nothing happens
  if (!entry.isIntersecting) return;

  // isIntersecting = true
  // remove hidden class
  entry.target.classList.remove("section--hidden");

  // we remove the observer once a section has been already observed
  observer.unobserve(entry.target);
};

// 1) Observer of each section
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// 2) Observe the target (each section)
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden"); // initial state must be ""hidden"
});

///////////////////////////////////////
// LAZY LOADING IMAGES (for good performance)
///////////////////////////////////////

// to get only the imgs that have the attribute data-src="img/digital.jpg"
const imgTargets = document.querySelectorAll("img[data-src]");

// 3) callback
const loadImg = function (entries, observer) {
  const [entry] = entries;

  // close guard (isIntersecting = false)
  if (!entry.isIntersecting) return;

  // replace src with data-src - low size img (200px) with high size img (200px)
  entry.target.src = entry.target.dataset.src;

  // add lazy loading and remove blur (lazy-img class)
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  // remove observer
  observer.unobserve(entry.target);
};

// 1) Observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

// 2) Observe the target (each img)
imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////
// SLIDE COMPONENT
///////////////////////////////////////

// All in 1 general function
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  // Set current slide and maximum number of slides
  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS
  // Create the dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Activate the dot (different color)
  const activateDot = function (slide) {
    // remove active class on each dot
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // add the active class only on the current dot
    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add("dots__dot--active");
  };

  // Moving slides (right or left)
  const goToSlide = function (slide) {
    // curSlide = 1;  to the left = -100%, 0, 100%, 200%
    // 0 - 1 = -1 * 100 = -100%
    // 1 - 1 = 0 * 100 = 0%
    // 2 - 1 = 1 * 100 = 100%
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  // Next slide (right button)
  const nextSlide = function () {
    // whenever we click, the current slide changes from 0 to 1 - 2 - 3 till the max number of slides
    // when we get to the last slide and we click again, the first slide comes back to the initial position of zero
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    // moving slides to the left
    goToSlide(curSlide);
    // activate the dot
    activateDot(curSlide);
  };

  // Previous slide (left button)
  const prevSlide = function () {
    // whenever we click, we decrease the value of the current slide of 1 each click till we get 0
    // when we get the first slide and we click again, the slider will move to the last slide
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    // moving slides to the right
    goToSlide(curSlide);
    // activate the dot
    activateDot(curSlide);
  };

  // Initial status - Initialization
  const init = function () {
    // Create dots HTML
    createDots();
    // Activate the dot for the first slide as initial status
    activateDot(0);
    // Put slides side by side as initial status
    // 0%, 100%, 200%, 300%
    // slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));
    goToSlide(0);
  };

  init();

  // EVENT HANDLERS
  // Right button
  btnRight.addEventListener("click", nextSlide);
  // Left button
  btnLeft.addEventListener("click", prevSlide);

  // Keyboard left/right key
  document.addEventListener("keydown", function (e) {
    // if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowLeft" && prevSlide();
    // if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  // Dots
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // get the slide linked to each dot
      const { slide } = e.target.dataset;
      // go to the slide that we just got from the data attribute
      goToSlide(slide);
      // activate the dot
      activateDot(slide);
    }
  });
};

slider();

///////////////////////////////////////
// LECtures

///////////////////////////////////////
// Selecting elements
// special elements html, head, body
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // all the other elements
// const header = document.querySelector(".header");

// // Node list
// // if DOM changes, the list is not updated
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// // by ID
// document.getElementById("section--1");

// // HTML collection based on element name
// // if DOM changes, the colletion is also updated
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// // by class name
// document.getElementsByClassName("btn");

// ///////////////////////////////////////
// // Creating and inserting elements

// // Most used technic
// // create a HTML template and attach/insert to its container
// // const html = `
// //      <div class="movements__row">
// //       <div class="movements__type movements__type--${type}">${
// //       i + 1
// //     } ${type}</div>hj
// //       <div class="movements__date">${displayDate}</div>
// //       <div class="movements__value">${formattedMov}</div>
// //      </div>
// //     `;
// //     containerMovements.insertAdjacentHTML("afterbegin", html);

// // Programming technic
// // creating a dom object for the new element
// const message = document.createElement("div");
// // adding a class (already styled with CSS)
// message.classList.add("cookie-message");
// // adding a text
// // message.textContent =
// //   "We used cookies for improved functionality and analytics.";
// // adding text + btn element
// message.innerHTML = `We used cookies for improved functionality and analytics.
// <button class="btn btn--close-cookie">Got it!</button>`;
// // inserting / moving the new element before the first child of the parent
// // header.prepend(message);
// // inserting / moving the new element at the end
// header.append(message);
// // copying the element
// // header.append(message.cloneNode(true));
// // inserting / moving the new element before the the parent
// // header.before(message);
// // // inserting / moving the new element after the the parent
// // header.after(message);

// ///////////////////////////////////////
// // Deleting elements
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//     // message.parentElement.removeChild(message);
//   });

// ///////////////////////////////////////
// // STYLES - ATTRIBUTES - CLASSES

// // STYLES
// // they are set as inline styles - html
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// // to read inline styles
// console.log(message.style.backgroundColor);

// // to read CSS styles or automatic styles (like height)
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// // to create a new height adding 30px to the automatic one
// message.style.height =
//   parseInt(getComputedStyle(message).height, 10) + 30 + "px";

// // to change CSS VARIABLES --color-primary: #5ec576;
// document.documentElement.style.setProperty("--color-primary", "orangered");

// // ATTRIBUTES
// const logo = document.querySelector(".nav__logo");
// // to read the standard attributes
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// // to change the standard attributes
// logo.alt = "Great minimalist logo";

// // to create a new attribute
// logo.setAttribute("company", "Bankist");

// // to read non-standard attributes
// console.log(logo.getAttribute("designer"));

// // to read the absolute URL - http://
// console.log(logo.src);

// // to read the relative URL - img/logo.png
// console.log(logo.getAttribute("src"));

// // to read data attributes
// console.log(logo.dataset.versionNumber);

// // CLASSES
// logo.classList.add("c, y");
// logo.classList.remove("c");
// logo.classList.toggle("y");
// logo.classList.contains("c");

// // never create a class in this way
// logo.className = "link-green";

///////////////////////////////////////
// SCROLLING

// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

// // New technic
// btnScrollTo.addEventListener("click", function () {
//   section1.scrollIntoView({ behavior: "smooth" });
// });

// Old technic
// btnScrollTo.addEventListener("click", function () {
// 1. get the coordinates of the element that we want to reach
// const s1coords = section1.getBoundingClientRect();

// scrolling
// left = 0 (no horizontal scrolling)
// top = viewport height
// window.pageYOffset = scrolling height
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );

// 2. smooth scrolling
// current position + current scrolling
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: "smooth",
// });
// });

///////////////////////////////////////
// EVENT PROPAGATION
//  rgb(250, 250, 250)
// Random Number
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;

// // Random color
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
