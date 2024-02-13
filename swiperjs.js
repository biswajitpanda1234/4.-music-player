var swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    slidesPerView: 4.5,
    spaceBetween: 30,
    mousewheel: true,
    breakpoints: {
      100:{
        slidesPerView:2,
      },
      400:{
        slidesPerView:2.5,
      },
      640: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 3.5,
      },
      1000:{
        slidesPerView:4.5
      }
    },
  });