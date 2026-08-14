import { Info } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currencyFormatter } from '@/lib/utils';
import type { Product } from '@/types/products';

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);

    const imageSrc =
        imageError || !product.images
            ? 'https://placehold.net/default.png'
            : product.images[0]?.image;

    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-auto pt-0">
            <div className="absolute inset-0 z-20 aspect-video bg-card" />
            <img
                src={imageSrc}
                alt={product.name}
                onError={() => setImageError(true)}
                className="relative z-30 aspect-video w-full object-cover"
            />
            <CardHeader className="flex-1">
                <div className="flex justify-between">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge className="bg-accent text-accent-foreground border-border">
                        {product.category}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-3">
                    {product.description}
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardFooter className="flex items-center justify-between">
                <CardDescription className="text-lg font-semibold">
                    {currencyFormatter(product.price)}
                </CardDescription>
                <div className="flex">
                    <Button asChild>
                        <a href={`/product/${product.id}`}>
                            <Info />
                            Details
                        </a>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
