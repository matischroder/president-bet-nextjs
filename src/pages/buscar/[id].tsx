import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CircleSpinner from '@/components/global/Spinner';
import useAuth from '@/hook/auth';

const MyComponent = () => {
    const auth = useAuth()
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!auth.user) {
            localStorage.setItem('torneoId', id as string);
            router.push(`/auth}`)
        }
        router.push(`/buscar?slug=${id}`);
    }, [router, auth, id]);

    return (
        <div className='h-full'>
            <CircleSpinner />
        </div>
    );
};

export default MyComponent;
