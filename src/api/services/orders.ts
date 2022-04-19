import { axiosService } from "../axios";
import { CreateOrderDTO } from "../dto/create-order.dto";

const createOrder = async (data: CreateOrderDTO) => {
    return await axiosService.request(
        {
            url: "/orders",
            method: "POST",
            data
        }
    );
}

const getCompetitionOrders = async (competitionId: number) => {
    return await axiosService.request({
        url: `/orders/competition/${competitionId}`,
        method: 'GET'
    })
}

export default {
    createOrder,
    getCompetitionOrders
}