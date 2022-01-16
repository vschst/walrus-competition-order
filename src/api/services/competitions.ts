import { axiosService } from "../axios";

const getUpcomingCompetitions = async () => {
    return await axiosService.request({
        url: '/competitions/public/upcoming',
        method: 'GET'
    })
}

const getCompetitionData = async (competitionId: number) => {
    return await axiosService.request({
        url: `/competitions/${competitionId}`,
        method: 'GET'
    })
}

const getCompetitionOrders = async (competitionId: number) => {
    return await axiosService.request({
        url: `/competitions/public/orders/${competitionId}`,
        method: 'GET'
    })
}

export default {
    getUpcomingCompetitions,
    getCompetitionData,
    getCompetitionOrders
}