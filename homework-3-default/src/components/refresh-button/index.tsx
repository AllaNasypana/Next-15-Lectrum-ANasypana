'use client';

import { FiRefreshCw } from "react-icons/fi";
import { IconButton} from '../icon-button'
import {  useRouter } from 'next/navigation';


export const RefreshButton = () => {
    const router = useRouter();
    return (
        <IconButton type={'submit'} onClick={() => router.refresh()}>
            <FiRefreshCw size={24} color={'oklch(62.3% 0.214 259.815)'} />
        </IconButton>
    )
}


