<template>
  <v-container fill-height>
    <v-layout justify-center>
      <custom-card class="align-self-center" :loading="isLoading" :width="1000">
        <v-card-title class="mb-6">
          <h1 class="font-weight-black" style="word-break: break-word">
            {{ competition.name }}
          </h1>
        </v-card-title>
        <v-card-subtitle>
          <h1 class="font-weight-medium mb-6">
            {{ isSukko ? 'Черноморский Кубок' : 'Кубок Московской области' }}
          </h1>
        </v-card-subtitle>
        <!--  RACES -->
        <v-card
            v-for="(raceOrder, index) in raceOrders"
            :key="`race_${raceOrder.id}`"
            class="mx-4 mb-10"
            tile
            outlined
        >
          <h6 class="pa-4 text-h6">Дистанция #{{ index + 1}}</h6>
          <v-simple-table>
            <tbody>
            <tr>
              <td>Название</td>
              <td class="font-weight-bold">{{ raceOrder.name }}</td>
            </tr>
            <tr>
              <td>Дистанция (метров)</td>
              <td class="font-weight-bold">{{ raceOrder.distance }}</td>
            </tr>
            <tr>
              <td>Стиль плавания</td>
              <td class="font-weight-bold">{{ getSwimmingStyleText(raceOrder.swimming_style) }}</td>
            </tr>
            <tr>
              <td>Пол</td>
              <td class="font-weight-bold">{{ getGenderText(raceOrder.gender) }}</td>
            </tr>
            <tr>
              <td>Возрастная группа</td>
              <td class="font-weight-bold">{{ getAgeGroupText(raceOrder.min_age, raceOrder.max_age) }}</td>
            </tr>
            <tr>
              <td>Дата</td>
              <td class="font-weight-bold">{{ getFormattedDate(raceOrder.date) }}</td>
            </tr>
            </tbody>
          </v-simple-table>
          <h6 class="pa-4 text-h6">Участники</h6>
          <orders-table :orders="raceOrder.orders" hide-status/>
        </v-card>
        <!--  RELAYS  -->
        <v-card
            v-for="(relayOrder, index) in relayOrders"
            :key="`relay_${relayOrder.id}`"
            class="mx-4 mb-10"
            tile
            outlined
        >
          <h6 class="pa-4 text-h6">Эстафета #{{ index + 1 }}</h6>
          <v-simple-table>
            <tbody>
            <tr>
              <td>Название</td>
              <td class="font-weight-bold">{{ relayOrder.name }}</td>
            </tr>
            <tr>
              <td>Дистанция (метров)</td>
              <td class="font-weight-bold">{{ relayOrder.distance }}</td>
            </tr>
            <tr>
              <td>Стиль плавания</td>
              <td class="font-weight-bold">{{ getSwimmingStyleText(relayOrder.swimming_style) }}</td>
            </tr>
            <tr>
              <td>Число участников</td>
              <td class="font-weight-bold">{{ relayOrder.count }}</td>
            </tr>
            <tr>
              <td>Дата</td>
              <td class="font-weight-bold">{{ getFormattedDate(relayOrder.date) }}</td>
            </tr>
            </tbody>
          </v-simple-table>
          <h6 class="pa-4 text-h6">Участники</h6>
          <orders-table :orders="relayOrder.orders" hide-status/>
        </v-card>
      </custom-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Competitions } from '@/api'
import { getSwimmingStyleText, getAgeGroupText } from "@/utils/races";
import { getGenderText } from "@/utils/members";
import { getFormattedDate } from "@/utils/time";
import { RaceOrders } from "./interfaces/race-orders.interface";
import { RelayOrders } from "./interfaces/relay-orders.interface";
import OrdersTable from "@/components/OrdersTable.vue";
import CustomCard from "@/components/CutomCard.vue"
import { COMPETITION_MODE } from "@/config/competition";

export default Vue.extend({
  name: 'CupMain',
  components: {
    OrdersTable,
    CustomCard
  },
  data() {
    return {
      isSukko: COMPETITION_MODE === 'sukko',
      isLoading: true,
      competition: {
        id: null,
        name: '',
        description: null
      },
      raceOrders: [] as RaceOrders[],
      relayOrders: [] as RelayOrders[]
    }
  },
  async mounted() {
    await this.loadCompetitionOrdersData()
  },
  methods: {
    getSwimmingStyleText,
    getAgeGroupText,
    getGenderText,
    getFormattedDate,
    async loadCompetitionOrdersData() {
      try {
        const { data: competitionOrders } = await Competitions.getCompetitionOrders()
        const { id, name, description, races, relays } = competitionOrders

        this.competition.id = id
        this.competition.name = name
        this.competition.description = description
        this.raceOrders = races
        this.relayOrders = relays
        this.isLoading = false
      }
      catch (error) {
        console.error(error)
      }
    }
  }
})
</script>