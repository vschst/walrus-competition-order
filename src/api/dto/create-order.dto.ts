export interface CreateOrderDTO {
    competition_id: number;
    first_name: string;
    last_name: string;
    middle_name?: string;
    para_swimmer: boolean;
    club_name: string;
    location: string;
    birthdate: string;
    gender: string;
    email: string;
    phone?: string;
    races?: number[];
    relays?: number[];
    cryatlon_id?: number;
    additional?: string;
}