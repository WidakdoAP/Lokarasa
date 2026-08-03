import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CarouselApi } from '@/components/ui/carousel';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

export default function Banner() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const count = api?.scrollSnapList().length ?? 0;

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

    return (
        <>
            <Carousel
                className="mb-4 w-full"
                opts={{
                    loop: true,
                }}
                setApi={setApi}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-5/1 items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="mb-4 flex items-center justify-end gap-6">
                <Button
                    variant="outline"
                    size="icon"
                    // disabled={!api?.canScrollPrev()}
                    onClick={() => api?.scrollPrev()}
                >
                    <ChevronLeft />
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <span
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                current === index
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-accent'
                            }`}
                        />
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    // disabled={!api?.canScrollNext()}
                    onClick={() => api?.scrollNext()}
                >
                    <ChevronRight />
                </Button>
            </div>
        </>
    );
}
