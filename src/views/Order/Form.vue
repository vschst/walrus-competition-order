<template>
  <v-container fill-height>
    <v-layout justify-center>
      <custom-card class="align-self-center" :loading="isLoading" :width="600">
        <v-card-title class="mb-6">
          <h1 class="font-weight-black" style="word-break: break-word">
            {{ competitionName }}
          </h1>
        </v-card-title>
        <v-card-subtitle>
          <h1 class="font-weight-medium mb-6">
            Заявка на участие в соревнованиях
          </h1>
        </v-card-subtitle>
        <v-alert
            v-model="showAlert"
            border="top"
            color="red lighten-2"
            class="mx-4"
            dark
            dismissible
        >
          Произошла ошибка при создании новой заявки!
        </v-alert>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mx-4"
        >
          <h3 class="font-weight-medium mb-4">
            Информация об участнике
          </h3>
          <v-text-field
              v-model="lastName"
              :rules="lastNameRules"
              label="Фамилия"
              hint="Фамилия участника. Обязательное поле."
              class="mb-4"
              persistent-hint
              filled
              clearable
              required
          ></v-text-field>
          <v-text-field
              v-model="firstName"
              :rules="firstNameRules"
              label="Имя"
              hint="Имя участника. Обязательное поле."
              class="mb-4"
              persistent-hint
              filled
              clearable
              required
          ></v-text-field>
          <v-text-field
              v-model="middleName"
              label="Отчество"
              hint="Отчество участника."
              persistent-hint
              clearable
              filled
          ></v-text-field>
          <v-radio-group
              v-model="gender"
              class="mt-2"
              row
          >
            <v-radio label="Мужчина" value="male"></v-radio>
            <v-radio label="Женщина" value="female"></v-radio>
          </v-radio-group>
          <v-menu
              v-model="birthdateMenu"
              :close-on-content-click="false"
              max-width="300"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="birthdate"
                  :rules="birthdateRules"
                  label="День рождения"
                  hint="День рождения участника. Обязательное поле."
                  persistent-hint
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  filled
                  required
                  clearable
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="birthdate"
                @change="birthdateMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-checkbox
              v-model="isParaSwimmer"
              label="Участник - парапловец"
              class="mt-2"
              required
          ></v-checkbox>
          <v-text-field
              v-model="clubName"
              :rules="clubNameRules"
              label="Клуб"
              hint="Клуб участника. Обязательное поле."
              class="mb-4"
              persistent-hint
              clearable
              filled
          ></v-text-field>
          <v-text-field
              v-model="location"
              :rules="locationRules"
              label="Город"
              hint="Город участника. Обязательное поле."
              class="mb-4"
              persistent-hint
              clearable
              filled
          ></v-text-field>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              hint="E-mail участника. Обязательное поле."
              class="mb-4"
              persistent-hint
              clearable
              filled
          ></v-text-field>
          <v-text-field
              v-model="phone"
              label="Телефон"
              hint="Телефон участника."
              class="mb-4"
              persistent-hint
              clearable
              filled
          ></v-text-field>
          <v-checkbox
              v-if="isWinterMode && hasCryatlonsDistances"
              v-model="needSkis"
              label="Нужны лыжи"
              class="mb-6"
              required
          ></v-checkbox>
          <h3 class="font-weight-medium mb-4">
            Участие в соревнованиях
          </h3>
          <v-data-table
              :headers="distancesHeaders"
              :items="selectedDistances"
              item-key="name"
              class="mb-2"
              no-data-text="Не выбрано дистанций"
              hide-default-footer
              disable-pagination
          />
          <v-dialog
              v-model="distanceDialog"
              max-width="1100"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  class="mb-6"
                  v-bind="attrs"
                  v-on="on"
              >Добавить участие</v-btn>
            </template>
            <v-card class="pa-4">
              <template v-if="hasRacesDistances">
                <h3 class="font-weight-medium mb-4">
                  Выбранные дистанции
                </h3>
                <!--  SELECTED RACES  -->
                <v-data-table
                    v-model="racesSelected"
                    :headers="racesHeaders"
                    :items="filteredRaces"
                    item-key="id"
                    show-select
                    class="elevation-1 mb-6"
                    :items-per-page="5"
                >
                  <template #item.swimming_style="{ item }">
                    {{ getSwimmingStyleText(item.swimming_style) }}
                  </template>
                  <template #item.gender="{ item }">
                    {{ getGenderText(item.gender) }}
                  </template>
                  <template #item.age_group="{ item }">
                    {{ getAgeGroupText(item.min_age, item.max_age) }}
                  </template>
                  <template #item.date="{ item }">
                    {{ getFormattedDate(item.date) }}
                  </template>
                </v-data-table>
              </template>
              <!--  SELECTED RELAYS -->
              <template v-if="hasRelaysDistances">
                <h3 class="font-weight-medium mb-4">
                  Выбранные эстафеты
                </h3>
                <v-data-table
                    v-model="relaysSelected"
                    :headers="relaysHeaders"
                    :items="relays"
                    item-key="id"
                    show-select
                    class="elevation-1 mb-6"
                    :items-per-page="5"
                >
                  <template #item.swimming_style="{ item }">
                    {{ getSwimmingStyleText(item.swimming_style) }}
                  </template>
                  <template #item.date="{ item }">
                    {{ getFormattedDate(item.date) }}
                  </template>
                </v-data-table>
              </template>
              <!-- CRYATLON -->
              <template v-if="isWinterMode && hasCryatlonsDistances">
                <h3 class="font-weight-medium mb-4">
                  Участие в криатлоне
                </h3>
                <v-data-table
                    v-model="cryatlonsSelected"
                    :headers="cryatlonsHeaders"
                    :items="filteredCryatlons"
                    item-key="id"
                    class="elevation-1 mb-6"
                    :items-per-page="5"
                    single-select
                    show-select
                >
                  <template #item.gender="{ item }">
                    {{ getGenderText(item.gender) }}
                  </template>
                  <template #item.date="{ item }">
                    {{ getFormattedDate(item.date) }}
                  </template>
                </v-data-table>
              </template>
              <!--  AQUATLON  -->
              <template v-if="isSpringMode && hasAquatlonsDistances">
                <h3 class="font-weight-medium mb-4">
                  Участие в акватлоне
                </h3>
                <v-data-table
                    v-model="aquatlonsSelected"
                    :headers="aquatlonsHeaders"
                    :items="filteredAquatlons"
                    item-key="id"
                    class="elevation-1 mb-6"
                    :items-per-page="5"
                    single-select
                    show-select
                >
                  <template #item.gender="{ item }">
                    {{ getGenderText(item.gender) }}
                  </template>
                  <template #item.date="{ item }">
                    {{ getFormattedDate(item.date) }}
                  </template>
                </v-data-table>
              </template>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    @click="distanceDialog = false"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <h3 class="font-weight-medium mb-4">
            Дополнительная информация
          </h3>
          <v-textarea
              v-model="additional"
              filled
              name="input-7-4"
              class="mb-8"
              label="Укажите дополнительную информацию"
              hint="Необязятельное поле."
              persistent-hint
          ></v-textarea>
          <v-btn
              :disabled="!isSelectedDistances || !valid"
              color="success"
              class="mr-4"
              @click="submitOrder"
              :loading="isOrderCreating"
          >
            Отправить заявку
          </v-btn>
        </v-form>
      </custom-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Competitions, Orders } from '@/api'
import { getSwimmingStyleText, getAgeGroupText } from "@/utils/races";
import { getGenderText, getAgeFromBirthdate } from "@/utils/members";
import { getFormattedDate } from "@/utils/time";
import type { Race } from "./interfaces/race.interface";
import type { Relay } from "./interfaces/relay.interface";
import type { Cryatlon } from "./interfaces/cryatlon.interface";
import type { Aquatlon } from './interfaces/aquatlon.interface'
import { COMPETITION_MODE } from "@/config/competition";
import { CreateOrderDTO } from "@/api/dto/create-order.dto";
import CustomCard from "@/components/CutomCard.vue"

export default Vue.extend({
  name: 'OrderForm',
  components: {
    CustomCard
  },
  data() {
    return {
      isWinterMode: COMPETITION_MODE === 'winter',
      isSpringMode: COMPETITION_MODE === 'spring',
      isLoading: true,
      competitionName: '',
      valid: true,
      lastName: '',
      lastNameRules: [
        (v: string) => !!v || 'Необходимо указать фамилию участника!',
      ],
      firstName: '',
      firstNameRules: [
        (v: string) => !!v || 'Необходимо указать имя участника!',
      ],
      middleName: '',
      isParaSwimmer: false,
      clubName: '',
      clubNameRules: [
        (v: string) => !!v || 'Необходимо указать клуб участника!',
      ],
      location: '',
      locationRules: [
        (v: string) => !!v || 'Необходимо указать город участника!',
      ],
      birthdate: null,
      birthdateMenu: false,
      birthdateRules: [
        (v: string | null) =>
            v !== null || "Необходимо указать день рождения участника!"
      ],
      gender: "male",
      email: '',
      emailRules: [
        (v: string | null) =>
            v !== null || "Необходимо указать e-mail адрес участника!",
        (v: string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          return pattern.test(v) || 'Некорректный e-mail адрес!'
        }
      ],
      phone: '',
      needSkis: false,
      distancesHeaders: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
          sortable: false
        },
        {
          text: 'Тип',
          align: 'center',
          value: 'type',
          sortable: false
        }
      ],
      distanceDialog: false,
      racesSelected: [] as Race[],
      racesHeaders: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
          sortable: false
        },
        {
          text: 'Длина (метров)',
          align: 'right',
          value: 'distance',
        },
        {
          text: 'Стиль плавания',
          align: 'center',
          value: 'swimming_style',
          sortable: false
        },
        {
          text: 'Пол',
          align: 'center',
          value: 'gender',
          sortable: false
        },
        {
          text: 'Возрастная группа',
          align: 'right',
          value: 'age_group',
          sortable: false
        },
        {
          text: 'Дата',
          align: 'center',
          value: 'date',
          sortable: false
        }
      ],
      races: [] as Race[],
      relaysSelected: [] as Relay[],
      relaysHeaders: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
          sortable: false
        },
        {
          text: 'Длина (метров)',
          align: 'right',
          value: 'distance',
        },
        {
          text: 'Стиль плавания',
          align: 'center',
          value: 'swimming_style',
          sortable: false
        },
        {
          text: 'Число участников',
          align: 'right',
          value: 'count',
        },
        {
          text: 'Дата',
          align: 'center',
          value: 'date',
          sortable: false
        }
      ],
      relays: [] as Relay[],
      cryatlonsHeaders: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
          sortable: false
        },
        {
          text: 'Пол',
          align: 'center',
          value: 'gender',
          sortable: false
        },
        {
          text: 'Дата',
          align: 'center',
          value: 'date',
          sortable: false
        }
      ],
      cryatlonsSelected: [] as Cryatlon[],
      cryatlons: [] as Cryatlon[],
      aquatlonsHeaders: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
          sortable: false
        },
        {
          text: 'Бег (метров)',
          align: 'right',
          value: 'run_distance',
        },
        {
          text: 'Плавание (метров)',
          align: 'right',
          value: 'water_distance',
        },
        {
          text: 'Пол',
          align: 'center',
          value: 'gender',
          sortable: false
        },
        {
          text: 'Дата',
          align: 'center',
          value: 'date',
          sortable: false
        }
      ],
      aquatlonsSelected: [] as Aquatlon[],
      aquatlons: [] as Aquatlon[],
      additional: '',
      isOrderCreating: false,
      showAlert: false
    }
  },
  watch: {
    '$route.params.id': async function(val) {
      await this.loadCompetitonData(Number(val))
    }
  },
  computed: {
    age(this: any) {
      return this.birthdate ? getAgeFromBirthdate(this.birthdate) : 0
    },
    filteredRaces(this: any) {
      return this.races.filter((race: Race) => {
        return (race.gender === 'all' || race.gender === this.gender) &&
            (this.isParaSwimmer ? this.isParaSwimmer === race.para_swimmers : true) &&
            ((this.birthdate && race.min_age) ? (this.age >= race.min_age) : true) &&
            ((this.birthdate && race.max_age) ? (this.age <= race.max_age) : true)
      })
    },
    hasRacesDistances(this: any) {
      return this.filteredRaces.length > 0
    },
    hasRelaysDistances(this: any) {
      return this.relays.length > 0
    },
    filteredCryatlons(this: any) {
      return this.cryatlons.filter((cryatlon: Cryatlon) => {
        return (cryatlon.gender === 'all' || cryatlon.gender === this.gender)
      })
    },
    hasCryatlonsDistances(this: any) {
      return this.filteredCryatlons.length > 0
    },
    filteredAquatlons(this: any) {
      return this.aquatlons.filter((aquatlon: Aquatlon) => {
        return (aquatlon.gender === 'all' || aquatlon.gender === this.gender)
      })
    },
    hasAquatlonsDistances(this: any) {
      return this.filteredAquatlons.length > 0
    },
    isSelectedRaces(this: any) {
      return this.racesSelected.length > 0
    },
    isSelectedRelays(this: any) {
      return this.relaysSelected.length > 0
    },
    isSelectedCryatlons(this: any) {
      return this.cryatlonsSelected.length > 0
    },
    isSelectedAquatlons(this: any) {
      return this.aquatlonsSelected.length > 0
    },
    selectedDistances(this: any) {
      return [].concat(
          this.racesSelected.map((race: Race) => ({
            name: race.name,
            type: 'Дистанция'
          })),
          this.relaysSelected.map((relay: Relay) => ({
            name: relay.name,
            type: 'Эстафета'
          })),
          this.cryatlonsSelected.map((cryatlon: Cryatlon) => ({
            name: cryatlon.name,
            type: 'Криатлон'
          })),
          this.aquatlonsSelected.map((aquatlon: Aquatlon) => ({
            name: aquatlon.name,
            type: 'Акватлон'
          }))
      )
    },
    isSelectedDistances(this: any) {
      return this.selectedDistances.length > 0
    }
  },
  async mounted() {
    await this.loadCompetitonData(Number(this.$route.params.id))
  },
  methods: {
    getSwimmingStyleText,
    getAgeGroupText,
    getGenderText,
    getFormattedDate,
    resetForm() {
      this.racesSelected = []
      this.relaysSelected = []
      this.cryatlonsSelected = []
      this.aquatlonsSelected = []
      this.needSkis = false
    },
    async loadCompetitonData(this: any, competitionId: number) {
      this.isLoading = true

      try {
        const { data: responseData } = await Competitions.getCompetitionData(competitionId)
        const { data: competition } = responseData
        const { name, races, relays, cryatlons, aquatlons } = competition

        this.competitionName = name
        this.races = races
        this.relays = relays
        this.cryatlons = cryatlons
        this.aquatlons = aquatlons
        this.isLoading = false
      } catch (err) {
        console.error(err)
      }
    },
    async submitOrder () {
      if (
          (this.$refs.form as Vue & { validate: () => boolean }).validate()
      ) {
        this.isOrderCreating = true

        const payload: CreateOrderDTO = {
          competition_id: Number(this.$route.params.id),
          first_name: this.firstName,
          last_name: this.lastName,
          ...(this.middleName && { middle_name: this.middleName }),
          para_swimmer: this.isParaSwimmer,
          club_name: this.clubName,
          location: this.location,
          birthdate: this.birthdate || '',
          gender: this.gender,
          email: this.email,
          need_skis: this.needSkis,
          ...(this.phone && { phone: this.phone }),
          ...(this.isSelectedRaces && { races: this.racesSelected.map((race: Race) => race.id)}),
          ...(this.isSelectedRelays && { relays: this.relaysSelected.map((relay: Relay) => relay.id) }),
          ...(this.isSelectedCryatlons && { cryatlons: this.cryatlonsSelected.map((cryatlon: Cryatlon) => cryatlon.id) }),
          ...(this.isSelectedAquatlons && { aquatlons: this.aquatlonsSelected.map((aquatlon: Aquatlon) => aquatlon.id) }),
          ...(this.additional && { additional: this.additional })
        }

        try {
          const { status } = await Orders.createOrder(payload)

          if (status === 200) {
            this.isOrderCreating = false
            this.$root.$emit('onOrderCreatedSuccessfully')
          }
        } catch (err) {
          this.showAlert = true;
        }
      }
    },
  }
})
</script>