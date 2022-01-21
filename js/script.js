"use strict"  
//меню бургер
if (document.documentElement.clientWidth < 1024) {
    const iconMenu = document.querySelector('.menu__icon');
        
    if(iconMenu) {
        const menuBody = document.querySelector('.menu__body');
        iconMenu.addEventListener("click", function (e){
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }
}
if (document.documentElement.clientWidth < 1024) {
    const iconMenu = document.querySelector('.menu__icon');
    const linkActive = document.querySelectorAll('.active-link');
    if(linkActive.length>0){
        for (let index = 0; index < linkActive.length; index++){
            const menuBody = document.querySelector('.menu__body');
            linkActive[index].addEventListener("click", function (e){
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.toggle('_active');});
        }
    }
}
//прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}  

//parallax
function parallax(event){
    this.querySelectorAll('.parallax').forEach(parallax => {
        let attraction = parallax.getAttribute('data-attraction');
        parallax.style.transform = `translate3d(${-(event.clientX-700)*attraction/70}%,${-(event.clientY-700)*attraction/10}%,0)`;
        parallax.style.left = `left:0`;
        parallax.style.top = `top:0`
    });
}

document.addEventListener('mousemove', parallax);

/////slider USE SWIPER
new Swiper('.reviews-slider',{
    navigation: {
        nextEl: '.reviews__button-next',
        prevEl: '.reviews__button-prew'
    },
    loop: true,
    autoplay: {
        delay : 5000,
        disableOnInteraction: false,

    },
    spaceBetween: 15,
    sliderPerView: 2,
    loopedSlides: 3,
    breakpoints: {
        1300:{
            sliderPerView: 1,
            loopedSlides: 2,
        }
    }
});



////header scroll
let lastScroll = 0;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide()){
    header.classList.add('hide')
    }
    else if(scrollPosition() < lastScroll && containHide()){
    header.classList.remove('hide')
    }
    lastScroll = scrollPosition();
})






////popup авторизация ///
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let cleanInput = document.querySelectorAll('input[type="text"],[type="password"]')
 
let unLock = true;

const timeout = 500;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e){
           const popupName = popupLink.getAttribute('href').replace('#', '');
           const curentPopup = document.getElementById(popupName);
           popupOpen(curentPopup);
           e.preventDefault();
        });
        
    }
}
//объекты которые закрывают(крестик)
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unLock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive,false);

        } else {          
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup-content')){ 
                popupClose(e.target.closest('.popup') );
            }
        });
    }
}

function popupClose(popupActive, doUnLock = true) {
    if (unLock) {
        popupActive.classList.remove('open');
        if(cleanInput.length > 0){
            for (let index=0; index < cleanInput.length; index++){
                cleanInput[index].value = '';}}
        if (doUnLock) {
            bodyUnLock();
        }
    }
}
// убираем паддинг справа который образуется от scroll`a
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.app').offsetWidth + 'px';
    if(lockPadding.length > 0){
        for (let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unLock = false;
    setTimeout(function (){
        unLock = true;
    },timeout);
}

function bodyUnLock() {
    setTimeout(function (){
        if(lockPadding.length > 0){
            for (let index=0; index < lockPadding.length; index++){
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unLock = false;
    setTimeout(function (){
        unLock = true;
    },timeout);
}

document.addEventListener('keydown',function(e){
    if (e.which === 27) {
        const popupActive = document. querySelector('.popup.open');
        popupClose(popupActive);
    }
});

  ////////телефон mask

  window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});


  
    
