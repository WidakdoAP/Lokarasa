export interface ProductImage {
    id: number;
    image: string;
    
}

export interface Product {
    id: number;
    name: string;
    price: string;
    images: ProductImage[];
    description: string;
    category: string;
}
