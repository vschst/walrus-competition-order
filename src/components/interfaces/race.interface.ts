export interface Race {
    id: number;
    name: string;
    distance: number;
    swimming_style: string;
    gender: string;
    min_age: null | number;
    max_age: null | number;
    para_swimmers: false;
    date: string;
}