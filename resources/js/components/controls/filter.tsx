import { router, usePage } from '@inertiajs/react';

import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

const options = [
    'Paling Murah',
    'Paling Mahal',
] as const;

type Props = {
    filters?: {
        search?: string;
        sort?: string;
    };
};

export default function Filter() {
    const { filters } = usePage<Props>().props;

    const selectedOption =
        options.find(
            (option) => option === filters?.sort,
        ) ?? null;

    const handleChange = (value: string | null) => {
        router.get(
            '/',
            {
                search: filters?.search || undefined,
                sort: value || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <Combobox
            items={options}
            value={selectedOption}
            onValueChange={handleChange}
        >
            <ComboboxInput
                showClear
                placeholder="Sort by"
                className="w-full max-w-xs"
            />

            <ComboboxContent>
                <ComboboxEmpty>
                    No items found.
                </ComboboxEmpty>

                <ComboboxList>
                    {(item) => (
                        <ComboboxItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}