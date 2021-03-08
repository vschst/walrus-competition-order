import { COMPETITION_ID } from "@/config/api";
import { request } from "../axios";
import { CreateOrderDTO } from "../dto/create-order.dto";

const createOrder = async (data: CreateOrderDTO) => {
    return await request(
        {
            url: "/orders",
            method: "POST",
            data
        },
        true
    );
}

const getPublicOrders = async () => {
    return await request({
        url: `/orders/public/${COMPETITION_ID}`,
        method: 'GET'
    })
}

export default {
    createOrder,
    getPublicOrders
}