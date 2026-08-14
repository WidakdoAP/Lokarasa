import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

type BannerCtrlProps = {
    currentIndex: number;
    totalCount: number;
    onPrev: () => void;
    onNext: () => void;
};

export const BannerCtrl = ({ currentIndex, totalCount, onPrev, onNext }: BannerCtrlProps) => {
    return (
        <div className="flex items-center justify-end gap-6">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPrev()}
            >
                <ChevronLeft />
            </Button>
            <div className="flex gap-2">
                {Array.from({ length: totalCount }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-secondary'
                        }`}
                    />
                ))}
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onNext()}
            >
                <ChevronRight />
            </Button>
        </div>
    );
};
