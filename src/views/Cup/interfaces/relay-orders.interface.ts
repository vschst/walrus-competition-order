import { Relay } from "@/views/Order/interfaces/relay.interface";
import { Order } from "@/views/Home/interfaces/order.interface";

export interface RelayOrders extends Relay {
    orders: Order[];
}