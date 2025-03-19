<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-white text-3xl cursor-pointer"
        >
          &times;
        </button>
        <div :class="['relative w-full p-4', maxWidth]">
          <NuxtImg
            :src="imageUrl"
            alt="Full Image"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
// Define props with default values
const props = withDefaults(
  defineProps<{
    show?: boolean;
    imageUrl?: string;
    maxWidth?: string;
  }>(),
  {
    show: false,
    imageUrl: "",
    maxWidth: "max-w-4xl",
  }
);

const emit = defineEmits(["close"]);
const closeModal = () => emit("close");
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide-in animation */
@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
