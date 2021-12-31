import { request } from "../axios";

const getCompetitionData = async (competitionId: number) => {
    return await request({
        url: `/competitions/${competitionId}`,
        method: 'GET'
    })
}

const getCompetitionOrders = async (competitionId: number) => {
    return await request({
        url: `/competitions/public/orders/${competitionId}`,
        method: 'GET'
    })
}

export default {
    getCompetitionData,
    getCompetitionOrders
}