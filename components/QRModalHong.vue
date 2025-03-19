<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed top-0 w-full h-full bg-black opacity-50 z-40"
    ></div>
    <div
      v-if="show"
      class="fixed top-0 w-full h-full flex items-center justify-center z-50"
    >
      <div class="relative w-full p-4 max-w-2xl bg-white">
        <NuxtImg
          src="/images/QRCode/QRCodeHong.png"
          alt="QR Code Tho"
          class="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <button
        @click="closeModal"
        class="absolute top-3 right-6 text-white text-5xl cursor-pointer"
      > × </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: false,
  }
);
const emit = defineEmits(["close"]);
const closeModal = () => emit("close");

watch(
  () => props.show,
  (value) => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
