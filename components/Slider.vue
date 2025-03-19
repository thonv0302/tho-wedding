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
        src="/images/anh-ban/DSC08697.jpg"
        fit="cover"
        width="700"
        quality="70"
        @click="click(0)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/anh-phong/DSC08964.jpg"
        fit="cover"
        width="700"
        quality="70"
        @click="click(1)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/15x21/DSC09003.jpg"
        fit="cover"
        width="700"
        quality="70"
        @click="click(2)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/15x21/DSC09477.jpg"
        fit="cover"
        width="700"
        quality="70"
        @click="click(3)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/20x30/DSC08666.jpg"
        fit="cover"
        width="700"
        quality="70"
        @click="click(4)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/25x25/DSC08764.jpg"
        fit="cover"
        width="700"
        quality="70"
        @click="click(5)"
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
        src="/images/anh-ban/DSC08697.jpg"
        fit="cover"
        width="700"
        @click="click(0)"
        quality="70" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/anh-phong/DSC08964.jpg"
        fit="cover"
        width="700"
        @click="click(1)"
        quality="70" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/15x21/DSC09003.jpg"
        fit="cover"
        width="700"
        @click="click(2)"
        quality="70" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/15x21/DSC09477.jpg"
        fit="cover"
        width="700"
        @click="click(3)"
        quality="70" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/20x30/DSC08666.jpg"
        fit="cover"
        width="700"
        @click="click(4)"
        quality="70" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/25x25/DSC08764.jpg"
        fit="cover"
        width="700"
        @click="click(5)"
        quality="70"
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
    const thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    const click = (index) => {
      console.log('index: ', index);
      
      emits("sendIndex", index);
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs, Autoplay],
      click,
    };
  },
};
</script>
