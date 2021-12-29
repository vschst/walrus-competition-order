<template>
  <v-app-bar color="indigo" dark hide-on-scroll app>
    <v-row justify="center" align="center" class="fill-height">
      <v-toolbar-items>
        <v-btn text to="/">
          <span class="mr-2">Список участников</span>
        </v-btn>
        <v-btn text to="/cup">
          <span class="mr-2">{{ isSukko ? 'Черноморский Кубок' : 'Кубок Московской области' }}</span>
        </v-btn>
        <v-btn text to="/order">
          <span class="mr-2">Новая заявка</span>
        </v-btn>
      </v-toolbar-items>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { COMPETITION_MODE } from "@/config/competition";

export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      isSukko: COMPETITION_MODE === 'sukko'
    }
  }
})
</script>