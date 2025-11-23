"use client";

import dynamic from "next/dynamic";
import { IntentionPrefetchLink } from '../intention-prefetch-link'
import { List, AutoSizer } from "react-virtualized";
import { IPost } from '../../types'

interface IProps {
    posts: IPost[];
}


export const PostList = dynamic(() => {
    return Promise.resolve(
        ({ posts }: IProps) => {

            return (
                <div className={'w-full h-[calc(100vh-200px)]'}>
                    <AutoSizer>
                        {({width, height,}) => (
                            <List
                                height={height}
                                rowHeight={66}
                                overscanRowCount={3}
                                rowCount={posts.length}
                                width={width} rowRenderer={({index, key, style}) => (
                                <div className={'py-2 flex items-center justify-center'} key={key} style={style}>
                                    <IntentionPrefetchLink
                                        className={'w-full'}

                                        href={`/post/${posts[index].id}`}>
                                        <div className={'text-blue-700 border-1 truncate p-4 border-blue-100 rounded-xl flex justify-start items-center bg-blue-50 w-full hover:border-blue-300 hover:translate-y-1'}>
                                            {posts[index].title}
                                        </div>
                                    </IntentionPrefetchLink>
                                </div>


                            )} />
                        )}
                    </AutoSizer>
                </div>

            )
        }
    )

}, {ssr: false, loading: () => <div className={'p-6 flex justify-center items-center text-blue-500 text-2xl font-bold'}>Loading...</div>});

