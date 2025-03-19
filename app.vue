<template>
  <div
    class="container max-w-[650px] mx-auto px-4 bg-gradient-to-b pb-10 from-[#FDFBFB] to-[#F2F2F2]"
  >
    <div
      class="flex justify-center bg-gradient-to-b from-[#FDFBFB] to-[#F2F2F2] w-full pt-12 mt-4"
    >
      <div class="transform transition-all duration-500 hover:scale-105">
        <h2 style="font-family: Tinos, serif">THÂN MỜI TỚI DỰ BỮA TIỆC</h2>
        <div class="title text-4xl text-center mt-6 mb-10">
          Viết Thọ <br />
          & <br />
          Tưởng Hồng
        </div>
      </div>
    </div>
    <div class="mt-4">
      <NuxtImg
        class="rounded-xl md:rounded-2xl cursor-pointer"
        src="/images/anh-phong/DSC09391.jpg"
        alt="Switching Image"
        fit="cover"
        width="700"
        quality="70"
        @click="
          isModalOpen = true;
          imageUrl = '/images/anh-phong/DSC09391.jpg';
        "
      />
    </div>
    <div class="mt-4">
      <Banner1 />
    </div>
    <div class="mt-4 relative">
      <NuxtImg
        class="absolute scale-x-[-1] opacity-25 h-full"
        src="/images/backgorund/flower.png"
      />
      <Banner2 />
    </div>
    <div class="mt-4">
      <div class="rounded-xl md:rounded-2xl overflow-hidden">
        <NuxtImg
          src="/images/bo-khung/15x21/DSC09457.jpg"
          class="transition-transform duration-300 hover:scale-115 cursor-pointer"
          alt="Switching Image"
          fit="cover"
          width="700"
          quality="70"
          @click="
            isModalOpen11 = true;
            imageUrl1 = '/images/bo-khung/15x21/DSC09457.jpg';
          "
        />
      </div>
    </div>
    <div class="relative mt-4 bg-fuchsia-50">
      <NuxtImg
        class="absolute z-10 w-30 -left-3 scale-x-[-1] opacity-75"
        src="/images/backgorund/small-flower.png"
      />
      <NuxtImg
        class="absolute -right-3 z-10 w-30 opacity-75"
        src="/images/backgorund/small-flower.png"
      />

      <div
        class="text-center text-2xl mb-6 py-3 title1 font-semibold text-neutral-600"
      >
        OUR MEMORY
      </div>
      <Slider @sendIndex="getIndex" />
    </div>
    <!-- <div>
      <ImageGalary :currentIndex="currentIndex" :show="isShow" />
      {{ currentIndex }}
      {{ isShow }}
    </div> -->
    <div class="mt-4">
      <div class="text-center mb-3 text-3xl title3">Bữa Cơm Thân Mật</div>
      <div class="grid grid-cols-2 gap-4">
        <NuxtImg
          src="/images/thiep-moi/nhatrai.PNG"
          class="cursor-pointer w-full"
          alt="Switching Image"
          fit="cover"
          width="700"
          quality="70"
          @click="
            isModalOpen = true;
            imageUrl = '/images/thiep-moi/nhatrai.PNG';
          "
        />
        <NuxtImg
          src="/images/thiep-moi/nhagai.PNG"
          class="cursor-pointer w-full"
          alt="Switching Image"
          fit="cover"
          width="700"
          quality="70"
          @click="
            isModalOpen = true;
            imageUrl = '/images/thiep-moi/nhatrai.PNG';
          "
        />
      </div>
    </div>
    <div class="mt-4">
      <NuxtImg
        src="/images/thiep-moi/honle.PNG"
        class="cursor-pointer w-full"
        alt="Switching Image"
        @click="
          isModalOpen = true;
          imageUrl = '/images/thiep-moi/honle.PNG';
        "
      />
    </div>

    <div class="mt-6">
      <h1 class="text-center text-3xl font-semibold mb-2 title4">CHÚC PHÚC</h1>
      <p class="text-xl text-center title5">
        Cảm ơn tất cả tình cảm của cô dì chú bác, bạn bè và anh chị em đã dành
        cho Thọ & Hồng
      </p>
      <div class="grid grid-cols-2 gap-14 mt-4">
        <div class="text-center">
          <NuxtImg
            src="/images/tho1.png"
            alt="Bride"
            fit="cover"
            class="rounded-full border-4"
          />
          <div class="mt-3 text-2xl title3">Chú Rể</div>
          <div class="mt-3 text-2xl title">Viết Thọ</div>
          <button
            class="py-3 px-10 border-2 rounded-lg mt-4 cursor-pointer lg:text-xl mung-cuoi"
            @click="
              () => {
                isShowQRTho = true;
              }
            "
          >
            Mừng Cưới
          </button>
        </div>
        <div class="text-center">
          <NuxtImg
            src="/images/hong1.png"
            alt="Bride"
            fit="cover"
            class="rounded-full border-4"
          />
          <div class="mt-3 text-2xl title3">Cô dâu</div>
          <div class="mt-3 text-2xl title">Tưởng Hồng</div>
          <button
            class="py-3 px-10 border-2 rounded-lg mt-4 cursor-pointer lg:text-xl mung-cuoi"
            @click="isShowQRHong = true"
          >
            Mừng Cưới
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-2">
      <div>
        <div class="my-2 text-center font-semibold text-xl">Nhà trai</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.8430705475084!2d105.70073323902878!3d21.04524069845134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550005e73f09%3A0xfe98e01b15bdb25a!2zTmjDoCB2xINuIGjDs2EgdGjDtG4gxJDhu5NuZw!5e0!3m2!1sen!2sus!4v1742219042523!5m2!1sen!2sus"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full lg:w-auto"
        ></iframe>
      </div>

      <div>
        <div class="my-2 text-center font-semibold text-xl">Nhà gái</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233.2298897346993!2d105.79250499269386!3d20.723286702157722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cbf505967113%3A0x89ad1fee9ae5da3f!2zVOG6oXAgSG_DoSDEkGnhu4NtIFbEg24gw5RuZw!5e0!3m2!1sen!2sus!4v1742219594399!5m2!1sen!2sus"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full lg:w-auto"
        ></iframe>
      </div>
    </div>
  </div>

  <ImageModal
    :show="isModalOpen"
    :imageUrl="imageUrl"
    @close="isModalOpen = false"
  />
  <ImageModal
    :show="isModalOpen11"
    :imageUrl="imageUrl1"
    @close="isModalOpen11 = false"
    maxWidth="max-w-7xl"
  />
  <QRModalTho :show="isShowQRTho" @close="isShowQRTho = false" />
  <QRModalHong :show="isShowQRHong" @close="isShowQRHong = false" />
</template>

<script setup>
import ImageGalary from "./components/ImageGalary.vue";

const isShowQRTho = ref(false);
const isShowQRHong = ref(false);
const isModalOpen = ref(false);
const imageUrl = ref("");
const isModalOpen11 = ref(false);
const imageUrl1 = ref("");
const currentIndex = ref(0);
const isShow = ref(false);

const getIndex = (index) => {
  console.log({
    index,
  });
};
</script>

<style scoped>
.title {
  font-family: "Great Vibes", cursive;
}

.title1 {
  font-family: "Bungee", cursive;
  font-weight: 200;
}

.title3 {
  font-family: "Dancing Script", cursive;
  font-weight: 200;
}

.title4 {
  font-family: Saira, cursive;

}

.title5 {
  font-family:  Pacifico, cursive;
  font-weight: 300;
}

.mung-cuoi {
  font-family: Saira, cursive;
}
</style>
