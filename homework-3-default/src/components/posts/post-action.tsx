'use client'

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IconButton } from '../icon-button';

interface IProps {
    deleteAction?: (id: string) => Promise<void>;
    onEdit: () => void;
    id: string;
}


export const PostAction = ({deleteAction, onEdit, id}: IProps) => {

    return(
        <div className={'w-full flex justify-end py-6'}>
            <div className={'flex gap-1'}>
                <IconButton onClick={onEdit}>
                    <FaEdit size={24} color={'oklch(62.3% 0.214 259.815)'} />
                </IconButton>


                <form action={async () => {
                    if(deleteAction){
                        await deleteAction(id, false)
                    }
                }}>
                    <IconButton type={'submit'}>
                        <RiDeleteBin6Line size={24} color={'oklch(62.3% 0.214 259.815)'} />
                    </IconButton>
                </form>

            </div>
        </div>
    )
}