<template>
  <div class="relative">
    <NuxtImg class="w-full" src="/images/backgorund/flower.png" alt="Switching Image"/>
    <div
      class="absolute p-4 sm:p-7 md:p-14 lg:p-20 w-[80%] text-center z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg" 
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
        March 27, 2025
      </p>

      <!-- Countdown Timer -->
      <div class="mt-3 md:mt-4 lg:mt-6 flex justify-center space-x-4 text-gray-800">
        <div class="flex flex-col items-center">
          <span class="text-sm lg:text-3xl font-bold">{{ countdown.days }}</span>
          <span class="text-sm ">Ngày</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-sm lg:text-3xl font-bold">{{ countdown.hours }}</span>
          <span class="text-sm ">Giờ</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-sm lg:text-3xl font-bold">{{ countdown.minutes }}</span>
          <span class="text-sm ">Phút</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-sm lg:text-3xl font-bold">{{ countdown.seconds }}</span>
          <span class="text-sm ">Giây</span>
        </div>
      </div>

      <!-- Decorative Bottom -->
      <div class="mt-3 md:mt-4 lg:mt-6 text-pink-500 animate-pulse">💍 Save the Date 💍</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const weddingDate = new Date("2025-03-27T14:30:00").getTime();
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
</script>
