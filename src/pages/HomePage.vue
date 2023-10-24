
<!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo" class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->

<template>
  <div class="container-fluid">
    <div class="row top">
      <div class="col-12 d-flex flex-column align-items-center">
        <h1 class="text-center py-3"><i class="mdi mdi-heart px-5"></i>Gifted<i class="px-5 mdi mdi-heart"></i></h1>
        <div>
          <button class="btn btn-pink mb-1" @click="getPostForm()"><i class="mdi mdi-gift"></i></button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit="createGift()">
          <div class="d-flex flex-row justify-content-center">
            <div class="mx-3 mt-2">
              <input type="text" required minlength="1" maxlength="30" placeholder="tag here">
            </div>
            <div class="mx-3">
              <input type="url" required maxlength="500" placeholder="image url here">
            </div>
          </div>
          <div class="justify-content-center d-flex mt-2">
            <button class="btn btn-pink" type="submit">
              <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">
      <div v-for="gift in gifts" :key="gift.id" class="col-3 p-4 m-3">
        <div v-if="gift.opened == false" class="lockedCard" @click="this.unlockGifts(gift)">
          <p class="text-center fs-3">You Have Not Unlocked This Gift Yet</p>
        </div>
        <div v-else-if="gift.opened == true" class="unlockedCard text-center">
          <img class="image-fluid giftImage" :src="gift.url" />
          <h3>{{ gift.tag }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { giftService } from '../services/GiftService.js'
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js'

export default {
  setup() {
    async function getGifts() {
      try {
        // logger.log('this function loaded')
        await giftService.getGifts()
      } catch (error) {
        logger.error(error)
      }
    }
    async function unlockGifts(gift) {
      try {
        await giftService.lockGifts(gift)
      } catch (error) {
        logger.error(error)
      }
    }

    onMounted(() => {
      getGifts()
    })
    return {
      gifts: computed(() => AppState.gifts),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.top {
  font-family: 'Luckiest Guy', cursive;
  color: rgb(191, 62, 83);
  border-bottom: 3px solid rgb(191, 62, 83);
  background-color: beige;
}


.btn-pink {
  border: 3px solid rgb(191, 62, 83);
  color: rgb(191, 62, 83);
}

* {
  user-select: none;
}

.lockedCard {
  border: 10px solid black;
  background-image: url('https://images.unsplash.com/photo-1617691763432-8b45e6748b71?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN1dGUlMjBsaXphcmR8ZW58MHx8MHx8fDA%3D');
  background-position: center;
  background-size: cover;
  height: 40vh;
  max-width: 100%;
  font-family: 'Luckiest Guy', cursive;
}

.unlockedCard {
  border: 10px solid black;
  height: 40vh;
  max-width: 100%;
}

.giftImage {
  height: 30vh;
  width: 100%;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;


  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
