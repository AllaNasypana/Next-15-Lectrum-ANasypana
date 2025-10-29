'use client';

import { FiRefreshCw } from "react-icons/fi";
import { IconButton} from '../icon-button';
import { revalidateSpecificPath } from '@/app/posts/actions'

interface IProps {
    path: string;
}

export const RefreshButton = ({path}: IProps) => {

    return (
        <IconButton type={'submit'} onClick={() => revalidateSpecificPath(path)}>
            <FiRefreshCw size={24} color={'oklch(62.3% 0.214 259.815)'} />
        </IconButton>
    )
}


