'use client'


import {useState, use} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Control, FieldValues, useForm, UseFormRegister} from 'react-hook-form';
import { CustomInput, CustomTextarea } from '@/components/form-elements';
import {postSchema, PostSchema} from '@/schems';
import { Tables } from '@/types/database.types';
import { PostAction } from './post-action';
import { usePosts } from './usePosts';
import {User } from '@clerk/nextjs/server';

interface IProps {
    post: Tables<'posts'> | null;
    isOwner: boolean;
    deleteAction?: (id: string) => Promise<void>;
}

export const PostForm = ({post, isOwner, deleteAction}: IProps) => {

    const { mutation: {isPending, mutate }} = usePosts();
    const [isEditing, setEditing] = useState(!post);

    const methods = useForm<PostSchema>({
        resolver: zodResolver(postSchema),
        mode: 'onTouched',
        defaultValues: {
            title: post?.title || '',
            description: post?.description || '',
        }
    });

    const { handleSubmit, control, register, reset, formState: { errors, isValid, isSubmitting },  } = methods;
    const allowSubmit = isEditing && !isSubmitting && !isPending;
    const allowChangeField = isEditing && !isSubmitting && !isPending;

    const onSubmit = async (data: PostSchema) => {
        if(!isValid || isSubmitting || isPending || !isEditing) return;
        await mutate({post: data, id: post?.id});
    }

    return (
        <div className={'w-full flex-col items-center justify-center'}>
            {isOwner && !!post && (
                <PostAction
                    id={post.id}
                    deleteAction={deleteAction}
                    onEdit={() => {
                        if(isEditing) {
                            reset();
                        }
                        setEditing(prevState => !prevState);

                    }} />
            )}
            <form className={'w-full p-1 mt-6'} onSubmit={handleSubmit(onSubmit)} >
                <CustomInput
                    className={'mb-4'}
                    key={'title'}
                    control={control as unknown as Control}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    disabled={!allowChangeField}
                    error={(errors.title?.message || '') as unknown as string}
                    name='title'
                    label={'Post Title'}
                    type="text" placeholder="Enter title ..." />
                <CustomTextarea
                    key={'description'}
                    control={control as unknown as Control}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    disabled={!allowChangeField}
                    error={(errors.description?.message || '') as unknown as string}
                    name='description'
                    label={'Post Description'}
                    rows={5}
                    type="text" placeholder="Enter description..." />

                {isEditing && (<button
                    type={'submit'}
                    disabled={!allowSubmit}
                    className={!allowSubmit ? 'bg-blue-500  text-white font-bold py-2 px-4 rounded mt-6 w-full opacity-50' :
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full hover:cursor-pointer'}>Submit</button>)}
            </form>


        </div>
    )
}