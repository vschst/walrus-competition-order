<template>
  <v-app-bar color="indigo" class="overflow-x-auto" absolute dark app>
    <v-row justify="center" align="center" class="fill-height">
      <v-toolbar-items>
        <v-menu v-for="competition in upcomingCompetitions" :key="competition.id" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                class="mr-2"
            >
              {{ competition.name }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item :to="`/competition/${competition.id}/orders`">
              <v-list-item-title>Список участников</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/competition/${competition.id}/protocols`">
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
              Регистрация на соревнования
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="competition in upcomingCompetitions" :key="competition.id" :to="`/order/${competition.id}`">
              <v-list-item-title>{{ competition.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Navbar",
  computed: {
    ...mapGetters('competitions', ['upcomingCompetitions'])
  }
})
</script>