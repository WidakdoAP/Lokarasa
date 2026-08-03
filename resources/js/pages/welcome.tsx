import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div>
                <h1>Hewwo :3</h1>
                <Button>Press</Button>
            </div>
        </>
    );
}
