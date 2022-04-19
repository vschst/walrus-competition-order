import { axiosService } from "../axios";

const getUpcomingCompetitions = async () => {
    return await axiosService.request({
        url: '/competitions/upcoming',
        method: 'GET'
    })
}

const getCompetitionData = async (competitionId: number) => {
    return await axiosService.request({
        url: `/competitions/${competitionId}`,
        method: 'GET'
    })
}

const getCompetitionProtocols = async (competitionId: number) => {
    return await axiosService.request({
        url: `/competitions/protocols/${competitionId}`,
        method: 'GET'
    })
}

export default {
    getUpcomingCompetitions,
    getCompetitionData,
    getCompetitionProtocols
}