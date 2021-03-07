<template>
  <v-container>
    <v-layout justify-center>
      <v-card class="pa-4 my-10" :loading="isLoading" width="1000">
        <template slot="progress">
          <div class="text-center my-10">
            <v-progress-circular
                :size="80"
                color="red"
                indeterminate
            ></v-progress-circular>
          </div>
        </template>
        <template v-if="!isLoading">
          <v-card-title class="mb-6">
            <h1 class="font-weight-black">
              {{ competition.name }}
            </h1>
          </v-card-title>
          <v-card-subtitle>
            <h1 class="font-weight-medium mb-6">
              Кубок Москвы
            </h1>
          </v-card-subtitle>
          <!--  RACES -->
          <v-card
              v-for="(raceOrder, index) in raceOrders"
              :key="raceOrder.id"
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
            <v-data-table
                :headers="ordersHeaders"
                :items="raceOrder.orders"
                hide-default-footer
                disable-pagination
            >
              <template #item.index="{ item }">
                {{ raceOrder.orders.indexOf(item) + 1 }}
              </template>
              <template #item.last_name="{ item }">
                <span class="font-weight-bold">
                  {{ getFullName(item.last_name, item.first_name, item.middle_name) }}
                </span>
              </template>
            </v-data-table>
          </v-card>
          <!--  RELAYS  -->
          <v-card
              v-for="(relayOrder, index) in relayOrders"
              :key="relayOrder.id"
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
            <v-data-table
                :headers="ordersHeaders"
                :items="relayOrder.orders"
                hide-default-footer
                disable-pagination
            >
              <template #item.index="{ item }">
                {{ relayOrder.orders.indexOf(item) + 1 }}
              </template>
              <template #item.last_name="{ item }">
                <span class="font-weight-bold">
                  {{ getFullName(item.last_name, item.first_name, item.middle_name) }}
                </span>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Competitions } from '@/api'
import { getSwimmingStyleText, getAgeGroupText } from "@/utils/races";
import { getFullName, getGenderText } from "@/utils/members";
import { getFormattedDate } from "@/utils/time";
import { RaceOrders } from "./interfaces/race-orders.interface";
import { RelayOrders } from "./interfaces/relay-orders.interface";

export default Vue.extend({
  name: 'CupMain',
  data() {
    return {
      isLoading: true,
      competition: {
        id: null,
        name: '',
        description: null
      },
      raceOrders: [] as RaceOrders[],
      ordersHeaders: [
        {
          text: '#',
          value: 'index',
          sortable: false
        },
        {
          text: 'ФИО',
          value: 'last_name',
          sortable: true
        },
        {
          text: 'Клуб',
          value: 'club_name',
          sortable: true
        },
        {
          text: 'Город',
          value: 'location',
          sortable: true
        },
      ],
      relayOrders: [] as RelayOrders[]
    }
  },
  async mounted() {
    await this.loadCompetitionOrdersData()
  },
  methods: {
    getSwimmingStyleText,
    getAgeGroupText,
    getFullName,
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