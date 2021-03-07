import { Race } from "@/views/Order/interfaces/race.interface";
import { Order } from "@/views/Home/interfaces/order.interface";

export interface RaceOrders extends Race {
    orders: Order[];
}