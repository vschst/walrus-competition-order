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

const getPublicOrders = async (competitionId: number) => {
    return await axiosService.request({
        url: `/orders/public/${competitionId}`,
        method: 'GET'
    })
}

export default {
    createOrder,
    getPublicOrders
}