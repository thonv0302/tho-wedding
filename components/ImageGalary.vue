<template>
  <div class="flex flex-wrap gap-4">
    <!-- Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="show"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          @click.self="closeModal"
        >
          <div class="relative max-w-3xl w-full p-4">
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 text-white text-3xl"
            >
              &times;
            </button>

            <!-- Image Display -->
            <div class="relative">
              <NuxtImg
                :src="images[currentIndex]"
                class="w-full h-auto rounded-lg shadow-lg"
              />
              <button
                v-if="currentIndex > 0"
                @click="prevImage"
                class="absolute cursor-pointer -left-20 top-1/2 z-10 bg-white bg-opacity-30 w-12 h-12 rounded-full text-black hover:bg-opacity-50 transition"
              >
                <
              </button>

              <button
                v-if="currentIndex < images.length - 1"
                @click="nextImage"
                class="absolute cursor-pointer -right-20 top-1/2 bg-white bg-opacity-30 w-12 h-12 rounded-full text-black hover:bg-opacity-50 transition"
              >
                >
              </button>
            </div>

            <!-- Navigation Buttons -->
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    show?: boolean;
    currentIndex?: number;
  }>(),
  {
    show: false,
    currentIndex: 0,
  }
);

// Image list
const images = ref([
  "/images/anh-ban/DSC08697.jpg",
  "/images/anh-phong/DSC08964.jpg",
  "/images/bo-khung/15x21/DSC09003.jpg",
  "/images/bo-khung/15x21/DSC09477.jpg",
  "/images/bo-khung/20x30/DSC08666.jpg",
  "/images/bo-khung/25x25/DSC08764.jpg",
]);

watch(
  () => props.currentIndex,
  (index) => {
    currentIndex.value = index;
  }
);

// const showModal = ref(false);
const currentIndex = ref(0);

// Open modal and set image index
const openModal = (index: number) => {
  currentIndex.value = index;
  //   showModal.value = true;
};

// Close modal
const closeModal = () => {
  //   showModal.value = false;
};

// Next image
const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++;
  }
};

// Previous image
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Keyboard navigation
const handleKeydown = (e: any) => {
  //   if (showModal.value) {
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeModal();
  //   }
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
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
