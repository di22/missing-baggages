export interface LostBaggage {
    date: string;
    origin: string;
    destination: string;
    baggageCode: string;
    contentName?: string;
    price?: number;
    quantity?: number;
}