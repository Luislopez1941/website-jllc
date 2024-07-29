
const wrapper = document.querySelector(".left__choose-us");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
const indicatorsContainer = document.querySelector(".carousel-indicators_why");

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  // timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);










const servicesCrucel = document.querySelector(".services__carousel");
const servicesCrucelContainer = document.querySelector(".services__carousel_container");
const firstserviceCardWidth = servicesCrucelContainer.querySelector(".service__card").offsetWidth;
const arrowBtnsService = document.querySelectorAll(".btn__service-card");
const servicesCrucelChildrens = [...servicesCrucelContainer.children];
const indicatorsContainer = document.querySelector(".carousel-indicators");

let serviceCardisDragging = false, serviceCardisAutoPlay = true, serviceCardstartX, serviceCardstartScrollLeft, serviceCardtimeoutId;
let serviceCardPerView = calculateCardsPerView();

// Function to calculate the number of cards that can fit in the carousel at once
function calculateCardsPerView() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
}

// Function to initialize the carousel
function initializeCarousel() {
    serviceCardPerView = calculateCardsPerView();
    
    servicesCrucelContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    servicesCrucelChildrens.slice(-serviceCardPerView).reverse().forEach(card => {
        servicesCrucelContainer.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    servicesCrucelChildrens.slice(0, serviceCardPerView).forEach(card => {
        servicesCrucelContainer.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Add the original cards
    servicesCrucelChildrens.forEach(card => {
        servicesCrucelContainer.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
    servicesCrucelContainer.classList.add("no-transition");
    servicesCrucelContainer.scrollLeft = servicesCrucelContainer.offsetWidth;
    servicesCrucelContainer.classList.remove("no-transition");

    // Create carousel indicators
    servicesCrucelChildrens.slice(0, servicesCrucelChildrens.length).forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    indicators = document.querySelectorAll('.indicator'); // Update the indicators variable
}

let indicators = document.querySelectorAll('.indicator');

function updateIndicators() {
    const activeIndex = Math.round(servicesCrucelContainer.scrollLeft / firstserviceCardWidth) % servicesCrucelChildrens.length;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtnsService.forEach(btn => {
    btn.addEventListener("click", () => {
        servicesCrucelContainer.scrollLeft += btn.id === "left" ? -firstserviceCardWidth : firstserviceCardWidth;
        updateIndicators();
    });
});

const ServiceCarddragStart = (e) => {
    serviceCardisDragging = true;
    servicesCrucelContainer.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    serviceCardstartX = e.pageX;
    serviceCardstartScrollLeft = servicesCrucelContainer.scrollLeft;
}

const serviceCarddragging = (e) => {
    if (!serviceCardisDragging) return; // if serviceCardisDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    servicesCrucelContainer.scrollLeft = serviceCardstartScrollLeft - (e.pageX - serviceCardstartX);
}

const serviceCarddragStop = () => {
    serviceCardisDragging = false;
    servicesCrucelContainer.classList.remove("dragging");
    updateIndicators();
}

const serviceCardinfiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (servicesCrucelContainer.scrollLeft === 0) {
        servicesCrucelContainer.classList.add("no-transition");
        servicesCrucelContainer.scrollLeft = servicesCrucelContainer.scrollWidth - (2 * servicesCrucelContainer.offsetWidth);
        servicesCrucelContainer.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(servicesCrucelContainer.scrollLeft) === servicesCrucelContainer.scrollWidth - servicesCrucelContainer.offsetWidth) {
        servicesCrucelContainer.classList.add("no-transition");
        servicesCrucelContainer.scrollLeft = servicesCrucelContainer.offsetWidth;
        servicesCrucelContainer.classList.remove("no-transition");
    }

    updateIndicators();

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(serviceCardtimeoutId);
    if (!servicesCrucel.matches(":hover")) serviceCardautoPlay();
}

const serviceCardautoPlay = () => {
    if (!serviceCardisAutoPlay) return; // Return if isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    serviceCardtimeoutId = setTimeout(() => {
        servicesCrucelContainer.scrollLeft += firstserviceCardWidth;
        updateIndicators();
    }, 2500);
}
serviceCardautoPlay();

servicesCrucelContainer.addEventListener("mousedown", ServiceCarddragStart);
servicesCrucelContainer.addEventListener("mousemove", serviceCarddragging);
document.addEventListener("mouseup", serviceCarddragStop);
servicesCrucelContainer.addEventListener("scroll", serviceCardinfiniteScroll);
servicesCrucel.addEventListener("mouseenter", () => clearTimeout(serviceCardtimeoutId));
servicesCrucel.addEventListener("mouseleave", serviceCardautoPlay);

window.addEventListener('resize', initializeCarousel);

// Initialize the carousel on page load
initializeCarousel();








///////////////////////////////////////////////// Informacion dicional ////////////////////////////////////////////////////////////////////////

const additionalInformation = document.querySelector(".additional__information");
const additionalInformationCarousel = document.querySelector(".additional__information .carousel");
const firstaAditionalInformationCardWidth = additionalInformationCarousel.querySelector(".additional__information .carousel .card").offsetWidth;
const AIarrowBtnsService = document.querySelectorAll(".btn__a_i-card");
const AICarouselChildrens = [...additionalInformationCarousel.children];
const indicatorsContainer = document.querySelector(".carousel-indicators_a-i");

let AIisDragging = false, AIisAutoPlay = true, AIstartX, AIstartScrollLeft, AItimeoutId;
let AIPerView = AICalculateCardsPerView();

// Function to calculate the number of cards that can fit in the carousel at once
function AICalculateCardsPerView() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
}

// Function to initialize the carousel
function AIinitializeCarousel() {
    AIPerView = AICalculateCardsPerView();
    
    additionalInformationCarousel.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    AICarouselChildrens.slice(-AIPerView).reverse().forEach(card => {
        additionalInformationCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    AICarouselChildrens.slice(0, AIPerView).forEach(card => {
        additionalInformationCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Add the original cards
    AICarouselChildrens.forEach(card => {
        additionalInformationCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
    additionalInformationCarousel.classList.add("no-transition");
    additionalInformationCarousel.scrollLeft = additionalInformationCarousel.offsetWidth;
    additionalInformationCarousel.classList.remove("no-transition");

    // Create carousel indicators
    AICarouselChildrens.slice(0, AICarouselChildrens.length).forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    indicators = document.querySelectorAll('.indicator'); // Update the indicators variable
}

let AIindicators = document.querySelectorAll('.indicator');

function updateIndicators() {
    const activeIndex = Math.round(additionalInformationCarousel.scrollLeft / firstaAditionalInformationCardWidth) % AICarouselChildrens.length;
    AIindicators.forEach((indicator, index) => {
      AIindicators.classList.toggle('active', index === activeIndex);
    });
}

// Add event listeners for the arrow buttons to scroll the carousel left and right
AIarrowBtnsService.forEach(btn => {
    btn.addEventListener("click", () => {
        additionalInformationCarousel.scrollLeft += btn.id === "left" ? -firstaAditionalInformationCardWidth : firstaAditionalInformationCardWidth;
        updateIndicators();
    });
});

const AIServiceCarddragStart = (e) => {
    AIisDragging = true;
    additionalInformationCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    AIstartX = e.pageX;
    AIstartScrollLeft = additionalInformationCarousel.scrollLeft;
}

const AIserviceCarddragging = (e) => {
    if (!AIisDragging) return; // if AIisDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    additionalInformationCarousel.scrollLeft = AIstartScrollLeft - (e.pageX - AIstartX);
}

const AIserviceCarddragStop = () => {
    AIisDragging = false;
    additionalInformationCarousel.classList.remove("dragging");
    updateIndicators();
}

const AIserviceCardinfiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (additionalInformationCarousel.scrollLeft === 0) {
        additionalInformationCarousel.classList.add("no-transition");
        additionalInformationCarousel.scrollLeft = additionalInformationCarousel.scrollWidth - (2 * additionalInformationCarousel.offsetWidth);
        additionalInformationCarousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(additionalInformationCarousel.scrollLeft) === additionalInformationCarousel.scrollWidth - additionalInformationCarousel.offsetWidth) {
        additionalInformationCarousel.classList.add("no-transition");
        additionalInformationCarousel.scrollLeft = additionalInformationCarousel.offsetWidth;
        additionalInformationCarousel.classList.remove("no-transition");
    }

    updateIndicators();

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(AItimeoutId);
    if (!servicesCrucel.matches(":hover")) AIserviceCardautoPlay();
}

const AIserviceCardautoPlay = () => {
    if (!AIisAutoPlay) return; // Return if isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    AItimeoutId = setTimeout(() => {
        additionalInformationCarousel.scrollLeft += firstaAditionalInformationCardWidth;
        updateIndicators();
    }, 2500);
}
AIserviceCardautoPlay();

additionalInformationCarousel.addEventListener("mousedown", AIServiceCarddragStart);
additionalInformationCarousel.addEventListener("mousemove", serviceCarddragging);
document.addEventListener("mouseup", AIserviceCarddragStop);
additionalInformationCarousel.addEventListener("scroll", AIserviceCardinfiniteScroll);
additionalInformation.addEventListener("mouseenter", () => clearTimeout(AItimeoutId));
additionalInformation.addEventListener("mouseleave", AIserviceCardautoPlay);

window.addEventListener('resize', AIinitializeCarousel);

// Initialize the carousel on page load
AIinitializeCarousel();








// const servicesCrucel = document.querySelector(".services__carousel");
// const servicesCrucelContainer = document.querySelector(".services__carousel_container");
// const firstserviceCardWidth = servicesCrucelContainer.querySelector(".service__card").offsetWidth;
// const arrowBtnsService = document.querySelectorAll(".btn__service-card");
// const servicesCrucelChildrens = [...servicesCrucelContainer.children];
// const indicatorsContainer = document.querySelector(".carousel-indicators");

// let serviceCardisDragging = false, serviceCardisAutoPlay = true, serviceCardstartX, serviceCardstartScrollLeft, serviceCardtimeoutId;
// let serviceCardPerView = calculateCardsPerView();

// // Function to calculate the number of cards that can fit in the carousel at once
// function calculateCardsPerView() {
//     if (window.innerWidth < 600) return 1;
//     if (window.innerWidth < 900) return 2;
//     return 3;
// }

// // Function to initialize the carousel
// function initializeCarousel() {
//     serviceCardPerView = calculateCardsPerView();
    
//     servicesCrucelContainer.innerHTML = '';
//     indicatorsContainer.innerHTML = '';

//     // Insert copies of the last few cards to beginning of carousel for infinite scrolling
//     servicesCrucelChildrens.slice(-serviceCardPerView).reverse().forEach(card => {
//         servicesCrucelContainer.insertAdjacentHTML("afterbegin", card.outerHTML);
//     });

//     // Insert copies of the first few cards to end of carousel for infinite scrolling
//     servicesCrucelChildrens.slice(0, serviceCardPerView).forEach(card => {
//         servicesCrucelContainer.insertAdjacentHTML("beforeend", card.outerHTML);
//     });

//     // Add the original cards
//     servicesCrucelChildrens.forEach(card => {
//         servicesCrucelContainer.insertAdjacentHTML("beforeend", card.outerHTML);
//     });

//     // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
//     servicesCrucelContainer.classList.add("no-transition");
//     servicesCrucelContainer.scrollLeft = servicesCrucelContainer.offsetWidth;
//     servicesCrucelContainer.classList.remove("no-transition");

//     // Create carousel indicators
//     servicesCrucelChildrens.slice(0, servicesCrucelChildrens.length).forEach((_, index) => {
//         const indicator = document.createElement('span');
//         indicator.classList.add('indicator');
//         if (index === 0) indicator.classList.add('active');
//         indicatorsContainer.appendChild(indicator);
//     });

//     indicators = document.querySelectorAll('.indicator'); // Update the indicators variable
// }

// let indicators = document.querySelectorAll('.indicator');

// function updateIndicators() {
//     const activeIndex = Math.round(servicesCrucelContainer.scrollLeft / firstserviceCardWidth) % servicesCrucelChildrens.length;
//     indicators.forEach((indicator, index) => {
//         indicator.classList.toggle('active', index === activeIndex);
//     });
// }

// // Add event listeners for the arrow buttons to scroll the carousel left and right
// arrowBtnsService.forEach(btn => {
//     btn.addEventListener("click", () => {
//         servicesCrucelContainer.scrollLeft += btn.id === "left" ? -firstserviceCardWidth : firstserviceCardWidth;
//         updateIndicators();
//     });
// });

// const ServiceCarddragStart = (e) => {
//     serviceCardisDragging = true;
//     servicesCrucelContainer.classList.add("dragging");
//     // Records the initial cursor and scroll position of the carousel
//     serviceCardstartX = e.pageX;
//     serviceCardstartScrollLeft = servicesCrucelContainer.scrollLeft;
// }

// const serviceCarddragging = (e) => {
//     if (!serviceCardisDragging) return; // if serviceCardisDragging is false return from here
//     // Updates the scroll position of the carousel based on the cursor movement
//     servicesCrucelContainer.scrollLeft = serviceCardstartScrollLeft - (e.pageX - serviceCardstartX);
// }

// const serviceCarddragStop = () => {
//     serviceCardisDragging = false;
//     servicesCrucelContainer.classList.remove("dragging");
//     updateIndicators();
// }

// const serviceCardinfiniteScroll = () => {
//     // If the carousel is at the beginning, scroll to the end
//     if (servicesCrucelContainer.scrollLeft === 0) {
//         servicesCrucelContainer.classList.add("no-transition");
//         servicesCrucelContainer.scrollLeft = servicesCrucelContainer.scrollWidth - (2 * servicesCrucelContainer.offsetWidth);
//         servicesCrucelContainer.classList.remove("no-transition");
//     }
//     // If the carousel is at the end, scroll to the beginning
//     else if (Math.ceil(servicesCrucelContainer.scrollLeft) === servicesCrucelContainer.scrollWidth - servicesCrucelContainer.offsetWidth) {
//         servicesCrucelContainer.classList.add("no-transition");
//         servicesCrucelContainer.scrollLeft = servicesCrucelContainer.offsetWidth;
//         servicesCrucelContainer.classList.remove("no-transition");
//     }

//     updateIndicators();

//     // Clear existing timeout & start autoplay if mouse is not hovering over carousel
//     clearTimeout(serviceCardtimeoutId);
//     if (!servicesCrucel.matches(":hover")) serviceCardautoPlay();
// }

// const serviceCardautoPlay = () => {
//     if (!serviceCardisAutoPlay) return; // Return if isAutoPlay is false
//     // Autoplay the carousel after every 2500 ms
//     serviceCardtimeoutId = setTimeout(() => {
//         servicesCrucelContainer.scrollLeft += firstserviceCardWidth;
//         updateIndicators();
//     }, 2500);
// }
// serviceCardautoPlay();

// servicesCrucelContainer.addEventListener("mousedown", ServiceCarddragStart);
// servicesCrucelContainer.addEventListener("mousemove", serviceCarddragging);
// document.addEventListener("mouseup", serviceCarddragStop);
// servicesCrucelContainer.addEventListener("scroll", serviceCardinfiniteScroll);
// servicesCrucel.addEventListener("mouseenter", () => clearTimeout(serviceCardtimeoutId));
// servicesCrucel.addEventListener("mouseleave", serviceCardautoPlay);

// window.addEventListener('resize', initializeCarousel);

// // Initialize the carousel on page load
// initializeCarousel();
