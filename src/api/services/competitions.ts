import { COMPETITION_ID } from "@/config/api";
import { request } from "../axios";

const getCompetitionData = async () => {
    return await request({
        url: `/competitions/${COMPETITION_ID}`,
        method: 'GET'
    })
}

export default {
    getCompetitionData
}