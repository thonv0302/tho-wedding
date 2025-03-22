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
    <swiper-slide v-for="(image, index) in imageList" :key="Math.random()"
      ><NuxtImg
        class="w-full h-full object-cover"
        :src="image"
        @click="click(index)"
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
    <swiper-slide v-for="(image, index) in imageList" :key="Math.random()"
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        :src="image"
        @click="click(index)"
    /></swiper-slide>
    <!-- <swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/anh-phong/DSC08964.webp"
        @click="click(1)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/15x21/DSC09003.webp"
        @click="click(2)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover"
        src="/images/bo-khung/15x21/DSC09477.webp"
        @click="click(3)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/20x30/DSC08666.webp"
        @click="click(4)" /></swiper-slide
    ><swiper-slide
      ><NuxtImg
        class="w-full h-full object-cover cursor-pointer"
        src="/images/bo-khung/25x25/DSC08764.webp"
        @click="click(5)"
    /></swiper-slide> -->
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

    const click = (index) => {
      emits("sendIndex", index);
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs, Autoplay],
      click,
      imageList,
    };
  },
};
</script>
