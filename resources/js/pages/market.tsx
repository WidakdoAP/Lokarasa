import { Head } from '@inertiajs/react';

import Banner from '@/components/market/banner';
import ProductCard from '@/components/market/product-card';

import type { Product } from '@/types/products';

type Props = {
    products: Product[];
    banners: string[];
};

export default function Market({
    products,
    banners,
}: Props) {
    return (
        <>
            <Head title="Market" />

            <div className="mx-auto p-6">
                <Banner banners={banners} />

                {products.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No products found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}