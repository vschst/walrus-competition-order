import { Race } from "@/views/Order/interfaces/race.interface";
import { Order } from "@/components/interfaces/order.interface";

export interface RaceOrders extends Race {
    orders: Order[];
}