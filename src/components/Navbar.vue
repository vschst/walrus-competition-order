<template>
  <v-app-bar color="indigo" dark hide-on-scroll app>
    <v-row justify="center" align="center" class="fill-height">
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                class="mr-2"
            >
              КРИАТЛОН 2022
            </v-btn>
          </template>
          <v-list>
            <v-list-item :to="`/competition/${competitionId}/orders`">
              <v-list-item-title>Список участников</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/competition/${competitionId}/protocols`">
              <v-list-item-title>Стартовые протоколы</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                class="mr-2"
            >
              Кубок Московской области
            </v-btn>
          </template>
          <v-list>
            <v-list-item :to="`/competition/${cupCompetitionId}/orders`">
              <v-list-item-title>Список участников</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/competition/${cupCompetitionId}/protocols`">
              <v-list-item-title>Стартовые протоколы</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              Регистрация на соревнования
            </v-btn>
          </template>
          <v-list>
            <v-list-item :to="`/order/${competitionId}`">
              <v-list-item-title>КРИАТЛОН 2022</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/order/${cupCompetitionId}`">
              <v-list-item-title>Кубок Московской области</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { COMPETITION_ID, CUP_COMPETITION_ID} from "@/config/api";

export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      competitionId: COMPETITION_ID,
      cupCompetitionId: CUP_COMPETITION_ID
    }
  }
})
</script>