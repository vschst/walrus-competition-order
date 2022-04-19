import {Module} from "vuex";
import {CompetitionsState} from "../interfaces/competitions.interface";
import { Competitions } from '../../api'

export default {
    namespaced: true,
    state: {
        upcoming: []
    },
    mutations: {
        SET_UPCOMING_COMPETITIONS(state, competitions) {
            state.upcoming = competitions
        }
    },
    getters: {
        upcomingCompetitions: state => state.upcoming
    },
    actions: {
        async fetchUpcomingCompetitions({ commit }) {
            try {
                const { data: competitions } = await Competitions.getUpcomingCompetitions()

                commit('SET_UPCOMING_COMPETITIONS', competitions)
            } catch (err) {
                console.error(err)
            }
        }
    }
} as Module<CompetitionsState, unknown>