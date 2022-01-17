<template>
  <v-footer padless>
    <v-col
        class="text-center"
        cols="12"
    >
      <div class="d-flex flex-wrap justify-center flex-row">
        <div class="mr-md-16 font-weight-bold">
          <strong>©</strong> <a href="https://gitlab.com/walrus-project/walrus-competition-api" target="_blank" class="text-decoration-none">
            Система регистрации на соревнования
          </a> v{{ buildVersion }}
        </div>
        <div>
          <a href="https://t.me/viktormath" target="_blank" class="font-weight-bold text-decoration-none" style="color: #757575">Обратная связь с разработчиком</a>
        </div>
      </div>
    </v-col>
  </v-footer>
</template>

<script>
import Vue from 'vue'
import { BUILD_VERSION } from "@/config/app";

export default Vue.extend({
  name: 'Footer',
  data() {
    return {
      buildVersion: BUILD_VERSION
    }
  }
})
</script>