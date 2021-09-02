import { Item } from '@/entities/Item';

export default interface ZombieItemsWithPrice {
    items: Item[];
    totalPrice: {
        PLN: number;
        EUR: number;
        USD: number;
    };
}
