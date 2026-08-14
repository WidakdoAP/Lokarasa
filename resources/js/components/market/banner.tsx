 import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { BannerCtrl } from '../controls/banner-ctrl';
import Filter from '../controls/filter';

type BannerProps = {
    banners: string[];
};

export default function Banner({ banners }: BannerProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentIndex, setCurrent] = useState(0);
    const totalCount = banners?.length ?? 0;

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
                opts={{
                    loop: true,
                }}
                setApi={setApi}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="mb-4 w-full"
            >
                <CarouselContent>
                    {banners.map((banner, index) => (
                        <CarouselItem key={banner}>
                            <div className="p-1">
                                <img
                                    src={`/storage/${banner}`}
                                    alt={`Banner ${index + 1}`}
                                    className="flex aspect-4/1 w-full rounded-xl object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="mb-4 flex items-center justify-between">
                <Filter />
                <BannerCtrl
                    currentIndex={currentIndex}
                    totalCount={totalCount}
                    onPrev={() => api?.scrollPrev()}
                    onNext={() => api?.scrollNext()}
                />
            </div>
        </>
    );
}
