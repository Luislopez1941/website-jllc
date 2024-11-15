const button = document.querySelector('button');
let $navItems = document.querySelector('.nav__items')
let $body = document.getElementById('body')

button.addEventListener('click', () => {
    button.classList.toggle('activo');
    if ($navItems.classList.contains('visible')) {
      $navItems.classList.remove('visible');
    } else {
      $navItems.classList.add('visible');
    }

});





let intervalId = null; // Variable para almacenar el ID del intervalo
    let isSliderRunning = false; // Variable para controlar si el slider está en funcionamiento

    // Función para mostrar el slider
    function startSlider() {
      if (!isSliderRunning) {
        isSliderRunning = true;
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;

        function showSlide(slideIndex) {
          slides.forEach((slide, index) => {
            if (index === slideIndex) {
              slide.classList.add("active");
            } else {
              slide.classList.remove("active");
            }
          });
        }

        function nextSlide() {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
        }

        showSlide(currentSlide); // Mostrar el primer contenedor al cargar la página
        intervalId = setInterval(nextSlide, 3000); // Cambiar la imagen cada 3 segundos (ajusta según tus preferencias)
      }
    }

    // Función para detener el slider
    function stopSlider() {
      const slides = document.querySelectorAll(".slide");
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      if (intervalId !== null) {
        clearInterval(intervalId); // Detener el intervalo si existe
        intervalId = null; // Restablecer la variable intervalId
      }
      isSliderRunning = false;
    }

    // Verificar el tamaño de la ventana al cargar la página y en cada cambio de tamaño
    function checkWindowSize() {
      if (window.innerWidth <= 768) {
        startSlider();
      } else {
        stopSlider();
      }
    }

    // Verificar el tamaño de la ventana al cargar la página
    checkWindowSize();
// 
    // Verificar el tamaño de la ventana cada vez que cambia su tamaño
    window.addEventListener("resize", checkWindowSize);

// Carousel 1
const wrapper1 = document.querySelector(".left__choose-us");
const carousel1 = document.querySelector(".left__choose-us .carousel");
const firstCardWidth1 = carousel1.querySelector(".card").offsetWidth;
const arrowBtns1 = document.querySelectorAll(".left__choose-us i");
const carousel1Children = [...carousel1.children];
const indicatorsContainer1 = document.querySelector(".carousel-indicators_why");

let isDragging1 = false, isAutoPlay1 = true, startX1, startScrollLeft1, timeoutId1;
let cardPerView1 = calculateCardsPerView1();

function calculateCardsPerView1() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
}

function initializeCarousel1() {
    cardPerView1 = calculateCardsPerView1();
    
    carousel1.innerHTML = '';
    indicatorsContainer1.innerHTML = '';

    carousel1Children.slice(-cardPerView1).reverse().forEach(card => {
        carousel1.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carousel1Children.slice(0, cardPerView1).forEach(card => {
        carousel1.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel1Children.forEach(card => {
        carousel1.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel1.classList.add("no-transition");
    carousel1.scrollLeft = carousel1.offsetWidth;
    carousel1.classList.remove("no-transition");

    carousel1Children.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer1.appendChild(indicator);
    });

    // Seleccionar indicadores después de la inicialización
    indicators1 = document.querySelectorAll('.carousel-indicators_why .indicator');
}

let indicators1 = document.querySelectorAll('.carousel-indicators_why .indicator');

function updateIndicators1() {
    const activeIndex = Math.round(carousel1.scrollLeft / firstCardWidth1) % carousel1Children.length;
    console.log("Active Index 1:", activeIndex); // Agregar este log
    indicators1.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

arrowBtns1.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel1.scrollLeft += btn.id === "left" ? -firstCardWidth1 : firstCardWidth1;
        updateIndicators1();
    });
});

const dragStart1 = (e) => {
    isDragging1 = true;
    carousel1.classList.add("dragging");
    startX1 = e.pageX;
    startScrollLeft1 = carousel1.scrollLeft;
}

const dragging1 = (e) => {
    if (!isDragging1) return;
    carousel1.scrollLeft = startScrollLeft1 - (e.pageX - startX1);
}

const dragStop1 = () => {
    isDragging1 = false;
    carousel1.classList.remove("dragging");
    updateIndicators1();
}

const infiniteScroll1 = () => {
    if (carousel1.scrollLeft <= 0) {
        carousel1.classList.add("no-transition");
        carousel1.scrollLeft = carousel1.scrollWidth - 2 * carousel1.offsetWidth;
        carousel1.classList.remove("no-transition");
    } else if (Math.ceil(carousel1.scrollLeft) >= carousel1.scrollWidth - carousel1.offsetWidth) {
        carousel1.classList.add("no-transition");
        carousel1.scrollLeft = carousel1.offsetWidth;
        carousel1.classList.remove("no-transition");
    }

    updateIndicators1();

    clearTimeout(timeoutId1);
    if (!carousel1.matches(":hover")) autoPlay1();
}

const autoPlay1 = () => {
    if (!isAutoPlay1) return;
    timeoutId1 = setTimeout(() => {
        carousel1.scrollLeft += firstCardWidth1;
        updateIndicators1();
    }, 2500);
}

autoPlay1();

carousel1.addEventListener("mousedown", dragStart1);
carousel1.addEventListener("mousemove", dragging1);
document.addEventListener("mouseup", dragStop1);
carousel1.addEventListener("scroll", infiniteScroll1);
carousel1.addEventListener("mouseenter", () => clearTimeout(timeoutId1));
carousel1.addEventListener("mouseleave", autoPlay1);

window.addEventListener('resize', initializeCarousel1);

initializeCarousel1();


// Carousel 2
const servicesCarousel = document.querySelector(".services__carousel");
const servicesCarouselContainer = document.querySelector(".services__carousel_container");
const firstServiceCardWidth = servicesCarouselContainer.querySelector(".service__card").offsetWidth;
const arrowBtnsService = document.querySelectorAll(".btn__service-card");
const servicesCarouselChildren = [...servicesCarouselContainer.children];
const indicatorsContainerService = document.querySelector(".carousel-indicators");

let isDraggingService = false, isAutoPlayService = true, startXService, startScrollLeftService, timeoutIdService;
let cardPerViewService = calculateCardsPerViewService();

function calculateCardsPerViewService() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
}

function initializeCarouselService() {
    cardPerViewService = calculateCardsPerViewService();
    
    servicesCarouselContainer.innerHTML = '';
    indicatorsContainerService.innerHTML = '';

    servicesCarouselChildren.slice(-cardPerViewService).reverse().forEach(card => {
        servicesCarouselContainer.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    servicesCarouselChildren.slice(0, cardPerViewService).forEach(card => {
        servicesCarouselContainer.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    servicesCarouselChildren.forEach(card => {
        servicesCarouselContainer.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    servicesCarouselContainer.classList.add("no-transition");
    servicesCarouselContainer.scrollLeft = servicesCarouselContainer.offsetWidth;
    servicesCarouselContainer.classList.remove("no-transition");

    servicesCarouselChildren.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainerService.appendChild(indicator);
    });

    // Seleccionar indicadores después de la inicialización
    indicatorsService = document.querySelectorAll('.carousel-indicators .indicator');
}

let indicatorsService = document.querySelectorAll('.carousel-indicators .indicator');

function updateIndicatorsService() {
    const activeIndex = Math.round(servicesCarouselContainer.scrollLeft / firstServiceCardWidth) % servicesCarouselChildren.length;
    console.log("Active Index Service:", activeIndex); // Agregar este log
    indicatorsService.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

arrowBtnsService.forEach(btn => {
    btn.addEventListener("click", () => {
        servicesCarouselContainer.scrollLeft += btn.id === "left" ? -firstServiceCardWidth : firstServiceCardWidth;
        updateIndicatorsService();
    });
});

const dragStartService = (e) => {
    isDraggingService = true;
    servicesCarouselContainer.classList.add("dragging");
    startXService = e.pageX;
    startScrollLeftService = servicesCarouselContainer.scrollLeft;
}

const draggingService = (e) => {
    if (!isDraggingService) return;
    servicesCarouselContainer.scrollLeft = startScrollLeftService - (e.pageX - startXService);
}

const dragStopService = () => {
    isDraggingService = false;
    servicesCarouselContainer.classList.remove("dragging");
    updateIndicatorsService();
}

const infiniteScrollService = () => {
    if (servicesCarouselContainer.scrollLeft === 0) {
        servicesCarouselContainer.classList.add("no-transition");
        servicesCarouselContainer.scrollLeft = servicesCarouselContainer.scrollWidth - (2 * servicesCarouselContainer.offsetWidth);
        servicesCarouselContainer.classList.remove("no-transition");
    } else if (Math.ceil(servicesCarouselContainer.scrollLeft) === servicesCarouselContainer.scrollWidth - servicesCarouselContainer.offsetWidth) {
        servicesCarouselContainer.classList.add("no-transition");
        servicesCarouselContainer.scrollLeft = servicesCarouselContainer.offsetWidth;
        servicesCarouselContainer.classList.remove("no-transition");
    }

    updateIndicatorsService();

    clearTimeout(timeoutIdService);
    if (!servicesCarousel.matches(":hover")) autoPlayService();
}

const autoPlayService = () => {
    if (!isAutoPlayService) return;
    timeoutIdService = setTimeout(() => {
        servicesCarouselContainer.scrollLeft += firstServiceCardWidth;
        updateIndicatorsService();
    }, 2500);
}
autoPlayService();

servicesCarouselContainer.addEventListener("mousedown", dragStartService);
servicesCarouselContainer.addEventListener("mousemove", draggingService);
document.addEventListener("mouseup", dragStopService);
servicesCarouselContainer.addEventListener("scroll", infiniteScrollService);
servicesCarousel.addEventListener("mouseenter", () => clearTimeout(timeoutIdService));
servicesCarousel.addEventListener("mouseleave", autoPlayService);

window.addEventListener('resize', initializeCarouselService);

initializeCarouselService();

// Carousel 3
const additionalInformation = document.querySelector(".additional__information");
const additionalInformationCarousel = document.querySelector(".additional__information .carousel");
const firstAdditionalInformationCardWidth = additionalInformationCarousel.querySelector(".additional__information .carousel .card").offsetWidth;
const arrowBtnsAI = document.querySelectorAll(".btn__a_i-card");
const additionalInformationChildren = [...additionalInformationCarousel.children];
const indicatorsContainerAI = document.querySelector(".carousel-indicators_a-i");

let isDraggingAI = false, isAutoPlayAI = true, startXAI, startScrollLeftAI, timeoutIdAI;
let cardPerViewAI = calculateCardsPerViewAI();

function calculateCardsPerViewAI() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
}

function AIinitializeCarousel() {
    // cardPerViewAI = calculateCardsPerViewAI();
    
    additionalInformationCarousel.innerHTML = '';
    indicatorsContainerAI.innerHTML = '';

    additionalInformationChildren.slice(-cardPerViewAI).reverse().forEach(card => {
        additionalInformationCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    additionalInformationChildren.slice(0, cardPerViewAI).forEach(card => {
        additionalInformationCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    additionalInformationChildren.forEach(card => {
        additionalInformationCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    additionalInformationCarousel.classList.add("no-transition");
    additionalInformationCarousel.scrollLeft = additionalInformationCarousel.offsetWidth;
    additionalInformationCarousel.classList.remove("no-transition");

    additionalInformationChildren.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator_a-i');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainerAI.appendChild(indicator);
    });

    // Seleccionar indicadores después de la inicialización
    indicatorsAI = document.querySelectorAll('.carousel-indicators_a-i .indicator_a-i');
}

let indicatorsAI = document.querySelectorAll('.carousel-indicators_a-i .indicator_a-i');

function updateIndicatorsAI() {
    const activeIndex = Math.round(additionalInformationCarousel.scrollLeft / firstAdditionalInformationCardWidth) % additionalInformationChildren.length;
    console.log("Active Index AI:", activeIndex); // Agregar este log
    indicatorsAI.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

arrowBtnsAI.forEach(btn => {
    btn.addEventListener("click", () => {
        additionalInformationCarousel.scrollLeft += btn.id === "left" ? -firstAdditionalInformationCardWidth : firstAdditionalInformationCardWidth;
        updateIndicatorsAI();
    });
});

const dragStartAI = (e) => {
    isDraggingAI = true;
    additionalInformationCarousel.classList.add("dragging");
    startXAI = e.pageX;
    startScrollLeftAI = additionalInformationCarousel.scrollLeft;
}

const draggingAI = (e) => {
    if (!isDraggingAI) return;
    additionalInformationCarousel.scrollLeft = startScrollLeftAI - (e.pageX - startXAI);
}

const dragStopAI = () => {
    isDraggingAI = false;
    additionalInformationCarousel.classList.remove("dragging");
    updateIndicatorsAI();
}

const infiniteScrollAI = () => {
    if (additionalInformationCarousel.scrollLeft === 0) {
        additionalInformationCarousel.classList.add("no-transition");
        additionalInformationCarousel.scrollLeft = additionalInformationCarousel.scrollWidth - (2 * additionalInformationCarousel.offsetWidth);
        additionalInformationCarousel.classList.remove("no-transition");
    } else if (Math.ceil(additionalInformationCarousel.scrollLeft) === additionalInformationCarousel.scrollWidth - additionalInformationCarousel.offsetWidth) {
        additionalInformationCarousel.classList.add("no-transition");
        additionalInformationCarousel.scrollLeft = additionalInformationCarousel.offsetWidth;
        additionalInformationCarousel.classList.remove("no-transition");
    }

    updateIndicatorsAI();

    clearTimeout(timeoutIdAI);
    if (!additionalInformation.matches(":hover")) autoPlayAI();
}

const autoPlayAI = () => {
    if (!isAutoPlayAI) return;
    timeoutIdAI = setTimeout(() => {
        additionalInformationCarousel.scrollLeft += firstAdditionalInformationCardWidth;
        updateIndicatorsAI();
    }, 2500);
}
autoPlayAI();

additionalInformationCarousel.addEventListener("mousedown", dragStartAI);
additionalInformationCarousel.addEventListener("mousemove", draggingAI);
document.addEventListener("mouseup", dragStopAI);
additionalInformationCarousel.addEventListener("scroll", infiniteScrollAI);
additionalInformation.addEventListener("mouseenter", () => clearTimeout(timeoutIdAI));
additionalInformation.addEventListener("mouseleave", autoPlayAI);

window.addEventListener('resize', AIinitializeCarousel);

AIinitializeCarousel();




const buttons = document.querySelectorAll('button[data-target]');
        
// Añadir event listeners a los botones
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Ocultar todos los contenedores de contenido
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
        
        // Mostrar el contenedor de contenido específico
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Activar el primer contenedor y botón al cargar la página
document.querySelector('.content').classList.add('active');
buttons[0].classList.add('active');



