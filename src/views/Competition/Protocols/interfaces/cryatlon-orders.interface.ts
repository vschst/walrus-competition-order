import { Cryatlon } from "@/views/Order/interfaces/cryatlon.interface";
import { Order } from "@/components/interfaces/order.interface";

export interface CryatlonOrders extends Order {
    orders: Cryatlon[];
}