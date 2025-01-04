import { Product } from '../../types';

export interface ProductProps {
    title: string;
    description: string;
    price: number;
    image: string;
    onAddToCart: () => void;
}

export interface ProductFormValues {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
}

export interface ProductFormProps {
    onSubmit: (product: Product) => void;
}