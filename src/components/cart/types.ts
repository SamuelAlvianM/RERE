import { CartItem } from '../../types';

export interface CartProps {
    items: CartItem[];
    onRemove: (title: string) => void;
    onCheckout: () => void;
}