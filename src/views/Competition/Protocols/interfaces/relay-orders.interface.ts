import { Relay } from "@/views/Order/interfaces/relay.interface";
import { Order } from "@/components/interfaces/order.interface";

export interface RelayOrders extends Relay {
    orders: Order[];
}