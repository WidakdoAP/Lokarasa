import { Head } from '@inertiajs/react';
import Banner from '@/components/Banner';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/products';

type Props = {
    products: Product[];
};

export default function Market({ products }: Props) {
    if (products.length === 0) {
        return (
            <div className='p-6 text-center text-gray-500'>
                No products found
            </div>
        );
    }

    return (
        <>
            <Head title="Market" />
            <div className="mx-auto p-6">
                <Banner />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
