const button = document.querySelector('button');

button.addEventListener('click', () => {
    button.classList.toggle('activo');
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

    // Verificar el tamaño de la ventana cada vez que cambia su tamaño
    window.addEventListener("resize", checkWindowSize);


    $(document).ready(function() {
      let interval = setInterval(function() {
        if ($('.neon h2 .off').length === 0) {
          clearInterval(interval);
          return;
        }
        let letterNumber = randomInteger(0, $('.neon h2 .off').length - 1);
        onNeon(letterNumber);
      }, 300);
    
      let timeOut = 2500;
      setTimeout(function() {
        setInterval(function() {
          let letterNumber = randomInteger(0, $('.neon h2 .on').length - 1);
          let $onElement = $('.neon h2 .on').eq(letterNumber);
          $onElement.removeClass('not-normal');
          setTimeout(function() {
            $onElement.removeClass('on').addClass('not-normal');
          }, 100);
        }, 2800);
      }, timeOut);
    });
    
    let onNeon = function(num) {
      if (randomInteger(0, 1)) {
        $('.neon h2 span.off').eq(num).addClass('on');
      } else {
        $('.neon h2 span.off').eq(num).addClass('on not-normal');
      }
      $('.neon h2 span.off').eq(num).removeClass('off');
    };
    
    let randomInteger = function(min, max) {
      let rand = min + Math.floor(Math.random() * (max - min + 1));
      return rand;
    };
    