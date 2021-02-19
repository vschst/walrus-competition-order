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

export default {
    createOrder
}