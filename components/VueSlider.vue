<script setup lang="ts">
const containerRef = ref(null);
const slides = ref(Array.from({ length: 10 }));
const swiper = useSwiper(containerRef, {
  effect: "creative",
  loop: true,
  navigation: true,
  spaceBetween: 10,
  autoplay: {
    delay: 1000,
    pauseOnMouseEnter: true,
  },
});

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

onMounted(() => {
  console.log(swiper.instance);
});
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false">
      <swiper-slide v-for="(slide, idx) in imageList" :key="idx">
        <NuxtImg
          preload
          class="w-full h-full object-cover cursor-pointer"
          :src="slide"
        />
      </swiper-slide>
    </swiper-container>
    <swiper-container ref="containerRef" :init="false" class="mt-2">
      <swiper-slide v-for="(slide, idx) in imageList" :key="idx">
        <NuxtImg
          preload
          class="w-full h-full object-cover cursor-pointer"
          :src="slide"
        />
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>

<style lang="css">
/* swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
} */
</style>
