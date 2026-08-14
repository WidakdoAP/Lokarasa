import { router } from "@inertiajs/react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BannerCtrl } from "@/components/controls/banner-ctrl";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { currencyFormatter } from "@/lib/utils";
import type { Product } from "@/types/products";

type Props = {
    product: Product;
};

export default function ProductDetails({ product }: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentIndex, setCurrent] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const totalCount = api?.scrollSnapList().length ?? 0;

    useEffect(() => {
        if (!api) {
            return;
        }

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        onSelect();
        api.on('select', onSelect);

        return () => {
            api.off('select', onSelect);
        };
    }, [api]);

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-6">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <div className="min-w-0">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true
                        }}
                        className="mb-4 w-full overflow-hidden"
                    >
                        <CarouselContent className="ml-0">
                            {product.images.map((image) => (
                                <CarouselItem key={image.id} className="pl-0">
                                    <img
                                        src={image.image ?? 'https://placehold.net/default.png'}
                                        alt={product.name}
                                        className="flex aspect-square rounded-lg max-h-170 p-0 w-full object-cover"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="flex justify-center">
                        <BannerCtrl
                            currentIndex={currentIndex}
                            totalCount={totalCount}
                            onPrev={() => api?.scrollPrev()}
                            onNext={() => api?.scrollNext()}
                        />
                    </div>
                    <Carousel
                        opts={{
                            containScroll: 'trimSnaps',
                        }}
                        className="mt-6 w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {product.images.map((image, index) => (
                                <CarouselItem
                                    key={image.id}
                                    className="basis-1/5 pl-2 sm:basis-1/6"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            api?.scrollTo(index)
                                        }
                                        className={`overflow-hidden rounded-lg border-2 transition ${
                                            currentIndex === index
                                                ? 'border-primary'
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={image.image}
                                            alt={product.name}
                                            className="aspect-square w-full object-cover"
                                        />
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="flex flex-col">
                    <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                            {product.category}
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {product.name}
                        </h1>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">
                            {currencyFormatter(product.price)}
                        </span>
                    </div>
                    <div>
                        <h2 className="mt-2 font-semibold">
                            Description
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            {product.description}
                        </p>
                    </div>
                    <div className="mt-6">
                        <span className="mb-3 block font-medium">
                            Quantity
                        </span>

                        <div className="flex w-fit items-center rounded-lg border">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                <Minus />
                            </Button>

                            <span className="w-12 text-center font-medium">
                                {quantity}
                            </span>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={increaseQuantity}
                            >
                                <Plus />
                            </Button>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button
                                onClick={() => {
                                    router.post("/cart", {
                                        product_id: product.id,
                                        quantity: quantity,
                                    });
                                    toast.success("Berhasil memasukkan barang kedalam keranjang.");
                                }}
                                className="flex-1 min-h-8"
                            >
                                <ShoppingCart />
                                Add to Cart
                            </Button>

                            <Button
                                variant="secondary"
                                className="flex-1 min-h-8"
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
