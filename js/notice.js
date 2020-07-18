/* modal js starting point */
var modalOpenBtn = document.querySelector('.modal-open-btn');
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');
var modalCloseX = document.querySelector('.modal-close-x');
var modalCloseBtn = document.querySelector('.modal-close-btn');
var modal_popup_flag = [false, false];
var modal_popup_obj;

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function openModal() {
    modal.classList.add('modal-active');
    document.body.style.paddingRight = getScrollbarWidth()+'px';
    document.body.classList.add('modal-open');
}

function closeModal() {
    if (modal_popup_flag[0]) {
        if (modal_popup_flag[1]) return;
        modal_popup_obj.style.visibility = "hidden";
        modal_popup_flag[0] = false;
    }
    modal.classList.remove('modal-active');
    document.body.removeAttribute("style");
    document.body.classList.remove('modal-open');
}

modalOpenBtn.addEventListener('click', openModal);
modalOverlay.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalCloseX.addEventListener('click', closeModal);
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
        closeModal();
    }
});
/* modal js end point */

/* carousel js starting point */
//slide-wrap
var slideWrapper = document.getElementById('slider-wrap');
//current slideIndexition
var slideIndex = 0;
//items
var slides = document.querySelectorAll('#slider-wrap ul li');
//number of slides
var totalSlides = slides.length;
//get the slide width
var sliderWidth = slideWrapper.clientWidth;
//set width of items
slides.forEach(function (element) {
    element.style.width = sliderWidth + 'px';
})
//set width to be 'x' times the number of slides
var slider = document.querySelector('#slider-wrap ul#slider');
slider.style.width = sliderWidth * totalSlides + 'px';

// next, prev
var nextBtn = document.getElementById('next');
var prevBtn = document.getElementById('previous');
nextBtn.addEventListener('click', function () {
    plusSlides(1);
});
prevBtn.addEventListener('click', function () {
    plusSlides(-1);
});

// hover
slideWrapper.addEventListener('mouseover', function () {
    this.classList.add('active');
    clearInterval(autoSlider);
});
slideWrapper.addEventListener('mouseleave', function () {
    this.classList.remove('active');
    autoSlider = setInterval(function () {
        plusSlides(1);
    }, 3000);
});


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlides(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    slideIndex = n;
    if (slideIndex == -1) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex === totalSlides) {
        slideIndex = 0;
    }

    slider.style.left = -(sliderWidth * slideIndex) + 'px';
    pagination();
}

//pagination
slides.forEach(function () {
    var li = document.createElement('li');
    document.querySelector('#slider-pagination-wrap ul').appendChild(li);
})

function pagination() {
    var dots = document.querySelectorAll('#slider-pagination-wrap ul li');
    dots.forEach(function (element) {
        element.classList.remove('active');
    });
    dots[slideIndex].classList.add('active');
}

pagination();
var autoSlider = setInterval(function () {
    plusSlides(1);
}, 3000);
/* carousel js end point */
/* 출처 : https://github.com/SaintSilver */
