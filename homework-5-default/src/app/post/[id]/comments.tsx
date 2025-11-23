"use client";

import { IComment } from '../../../types'
import {  useState, useEffect } from 'react'


interface IProps {
    postId: number;


}

export default function Comments({postId}: IProps) {
    const [comments, setComments] = useState<IComment[]>([]);
    useEffect(() => {
        (async () => {
            const res = await fetch('/api/comments/' + postId);
            if(res.ok) {
                const commentsData = await res.json();
                setComments(commentsData);            }


        } )()
    }, [postId]);

    return (
        <div className={'flex flex-col w-full justify-start items-center'}>
            {comments.map((comment) => (<div key={comment.id}>
                <div className={'text-xl font-bold text-center py-6 text-blue-700 text-center'}>{comment.name}</div>
                <div className={'text-lg text-typography-black mb-6 text-center'}>{comment.body}</div>
            </div>))}
        </div>
    );
}