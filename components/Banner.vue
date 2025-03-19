<template>
  <div class="aspect-video relative">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :modules="[Autoplay]"
      :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
      }"
      class="h-full"
    >
      <swiper-slide>
        <img
          class="w-full h-full object-cover"
          src="https://swiperjs.com/demos/images/nature-1.jpg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-full h-full object-cover"
          src="https://swiperjs.com/demos/images/nature-2.jpg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-full h-full object-cover"
          src="https://swiperjs.com/demos/images/nature-3.jpg"
        />
      </swiper-slide>
    </swiper>

    <div
      class="absolute top-1/2 left-1/2 z-20 -translate-y-1/2 -translate-x-1/2"
    >
      <div
        class="relative p-8 w-[90%] max-w-lg text-center transform transition-all duration-500 hover:scale-105"
      >
        <!-- Bride & Groom Names -->
        <h2
          class="text-3xl font-bold text-gray-800 animate-fadeIn animate-fadeIn"
        >
          Tho ❤️ Hong
        </h2>
        <p class="text-lg text-gray-600">We're Getting Married!</p>

        <!-- Wedding Date -->
        <p class="mt-4 text-xl font-semibold text-red-500 animate-bounce">
          March 17, 2025
        </p>

        <!-- Countdown Timer -->
        <div class="mt-6 flex justify-center space-x-4 text-gray-800">
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">{{ countdown.days }}</span>
            <span class="text-sm uppercase">Days</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">{{ countdown.hours }}</span>
            <span class="text-sm uppercase">Hours</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">{{ countdown.minutes }}</span>
            <span class="text-sm uppercase">Minutes</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">{{ countdown.seconds }}</span>
            <span class="text-sm uppercase">Seconds</span>
          </div>
        </div>

        <!-- Decorative Bottom -->
        <div class="mt-6 text-pink-500 animate-pulse">💍 Save the Date 💍</div>
      </div>
    </div>
    <div
      class="absolute top-1/2 left-1/2 z-10 -translate-y-1/2 -translate-x-1/2 opacity-75"
    >
      <HeartBeat />
    </div>
  </div>
</template>
<script lang="ts" setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

const weddingDate = new Date("2025-03-27T11:30:00").getTime();
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });

const updateCountdown = () => {
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;

  countdown.value = {
    days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
  };
};

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Import Swiper styles
import "swiper/css";

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>
