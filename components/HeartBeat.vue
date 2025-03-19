<template>
  <div
    class="relative w-66 h-66 bg-red-200 rotate-[45deg] mx-auto mt-20 animate-heartbeat shadow-xl"
  >
    <div
      class="absolute w-66 h-66 bg-red-200 rounded-full -top-1/2 left-0"
    ></div>
    <div
      class="absolute w-66 h-66 bg-red-200 rounded-full top-0 -left-1/2"
    ></div>
  </div>
</template>

<style>
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(0deg);
  }
}
.animate-heartbeat {
  animation: heartbeat 1s infinite;
}
</style>
