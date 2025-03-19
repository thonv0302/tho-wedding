<template>
  <div class="relative bg-center w-full p-2">
    <div class="title text-center text-4xl z-10">
      Chú Rể &nbsp;&nbsp; & &nbsp;&nbsp; Cô Dâu
    </div>
    <div class="grid grid-cols-2 gap-x-6 z-10">
      <div class="flex flex-col">
        <div class="rounded-xl md:rounded-2xl overflow-hidden">
          <NuxtImg
            src="/images/bo-khung/15x21/DSC08983.jpg"
            alt="Bride"
            class="transition-transform duration-300 hover:scale-110 cursor-pointer"
            fit="cover"
            width="700"
            quality="70"
            @click="
              isModalOpen = true;
              imageUrl = '/images/bo-khung/15x21/DSC08983.jpg';
            "
          />
        </div>
        <div class="card mt-4">
          <div class="text-xl name mb-3">Nguyễn Viết Thọ</div>
          <div class="parents">
            Con ông :
            <span class="highlight font-semisemi">Nguyễn Viết Vượng</span>
          </div>
          <div class="parents">
            Con bà :
            <span class="highlight font-semisemi">Hoàng Thị Kim Cúc</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="rounded-xl md:rounded-2xl overflow-hidden">
          <NuxtImg
            src="/images/anh-phong/DSC09391.jpg"
            alt="Groom"
            class="transition-transform duration-300 hover:scale-105 cursor-pointer"
            fit="cover"
            width="700"
            quality="70"
            @click="
              isModalOpen = true;
              imageUrl = '/images/anh-phong/DSC09391.jpg';
            "
          />
        </div>
        <div class="card mt-4">
          <div class="text-xl name mb-3">Tưởng Thị Hồng</div>
          <div class="parents">
            Con ông : <span class="highlight font-semisemi">Tưởng Duy Huề</span>
          </div>
          <div class="parents">
            Con bà :
            <span class="highlight font-semisemi">Đỗ Thị Tươi</span>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute z-0 pt-0 pl-0"></div>
    <!-- <NuxtImg
      class="w-full h-full object-cover"
      src="/images/backgorund/flower.png"
      alt="Switching Image"
    /> -->
  </div>
  <ImageModal
    :show="isModalOpen"
    :imageUrl="imageUrl"
    @close="isModalOpen = false"
  />
</template>

<script lang="ts" setup>
const isModalOpen = ref(false);
const imageUrl = ref("");
</script>

<style scoped>
.title {
  font-family: "Dancing Script", cursive;
}

.name {
  /* font-size: 24px; */
  font-family: "Saira", cursive;
  color: #333;
}
.parents {
  /* margin-top: 10px; */
  /* font-size: 18px; */
  color: #555;
  line-height: 1.6;
}
.highlight {
  color: #e74c3c;
  /* font-weight: bold; */
}
</style>
