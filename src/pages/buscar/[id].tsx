import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CircleSpinner from '@/components/global/Spinner';

const MyComponent = () => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        router.push(`/buscar?slug=${id}`);
    }, [router, id]);

    return (
        <div className='h-full'>
            <CircleSpinner />
        </div>
    );
};

export default MyComponent;
