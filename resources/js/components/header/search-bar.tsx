import { router, usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

type Props = {
    filters?: {
        search?: string;
        sort?: string;
    };
};

export default function SearchBar() {
    const { filters } = usePage<Props>().props;

    const [search, setSearch] = useState(filters?.search ?? '');

    const submitSearch = (value: string) => {
        router.get(
            '/',
            {
                search: value || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };
    
    return (
        <div className="w-full rounded-lg px-4 py-2">
            <InputGroup>
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>

                <InputGroupInput
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitSearch(search);
                        }
                    }}
                    placeholder="Search..."
                />
            </InputGroup>
        </div>
    );
}
