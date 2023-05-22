const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);





// Obtener referencias a los elementos del DOM
const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider-item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Variables para el control del slider
let currentSlide = 0;
const slideInterval = 3000; // Intervalo de tiempo entre cambios de imagen (1 segundo)

// Función para cambiar al siguiente slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderItems.length;
  updateSliderPosition();
}

// Función para cambiar al slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
  updateSliderPosition();
}

// Función para actualizar la posición del slider
function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Event listeners para los botones de navegación
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Función para cambiar al siguiente slide automáticamente cada intervalo de tiempo
function autoSlide() {
  nextSlide();
}

// Iniciar el intervalo automático
let slideIntervalId = setInterval(autoSlide, slideInterval);

// Detener el intervalo automático cuando el mouse está sobre el slider
slider.addEventListener('mouseover', () => {
  clearInterval(slideIntervalId);
});

// Reanudar el intervalo automático cuando el mouse sale del slider
slider.addEventListener('mouseout', () => {
  clearInterval(slideIntervalId);
  slideIntervalId = setInterval(autoSlide, slideInterval);
});
