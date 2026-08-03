import { useState } from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product } from '@/types/products';
import { Button } from "./ui/button";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);

    const imageSrc = imageError || !product.image
        ? "https://placehold.net/default.png"
        : product.image;

    return (
        <Card className="flex h-full flex-col overflow-auto relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-20 aspect-video bg-card" />
            <img
                src={imageSrc}
                alt={product.name}
                onError={() => setImageError(true)}
                className="relative z-30 aspect-video w-full object-cover"
            />
            <CardHeader className="flex-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="line-clamp-3">{product.description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardFooter className="flex items-center justify-between p-4">
                <CardDescription className="text-lg font-semibold">{formatRupiah(product.price)}</CardDescription>
                <div className="flex gap-2">
                    <Button className="bg-secondary">Add to Cart</Button>
                    <Button>Buy Now</Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export function formatRupiah(price: number | string): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(price));
}
