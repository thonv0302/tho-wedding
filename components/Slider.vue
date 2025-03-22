<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :loop="true"
    :spaceBetween="10"
    :autoplay="{ delay: 1000, pauseOnMouseEnter: true }"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
  >
    <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/anh-ban/DSC08697.webp"
    /></swiper-slide>
    <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/anh-phong/DSC08964.webp"
    /></swiper-slide>
    <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/15x21/DSC09003.webp"
    /></swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :loop="true"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mt-2"
  >
    <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/anh-ban/DSC08697.webp"
    /></swiper-slide>
    <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/anh-phong/DSC08964.webp"
    /></swiper-slide>
    <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/15x21/DSC09003.webp"
    /></swiper-slide>
  </swiper>
</template>
<script>
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import './style.css';

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  emits: ["sendIndex"],
  setup({ emits }) {
    const imageList = ref([
      "/images/anh-ban/DSC08697.webp",
      "/images/anh-phong/DSC08964.webp",
      "/images/bo-khung/15x21/DSC09003.webp",
      "/images/bo-khung/15x21/DSC09477.webp",
      "/images/bo-khung/20x30/DSC08666.webp",
      "/images/bo-khung/25x25/DSC08764.webp",
      "/images/videos/DSC08849.webp",
      "/images/videos/DSC08874.webp",
      "/images/videos/DSC08895.webp",
      "/images/videos/DSC08955.webp",
      "/images/videos/DSC09029.webp",
      "/images/videos/DSC09048.webp",
      "/images/videos/DSC09092.webp",
      "/images/videos/DSC09098.webp",
      "/images/videos/DSC09119.webp",
      "/images/videos/DSC09131.webp",
      "/images/videos/DSC09137.webp",
      "/images/videos/DSC09198.webp",
      "/images/videos/DSC09229.webp",
      "/images/videos/DSC09352.webp",
      "/images/videos/DSC09499.webp",
    ]);

    const thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs, Autoplay],
      imageList,
    };
  },
};
</script>
