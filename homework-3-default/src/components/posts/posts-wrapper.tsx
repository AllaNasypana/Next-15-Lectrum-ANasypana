import { LoaderButton} from '../loader-button';
import { PostItem } from './post-item';
import { Tables } from '@/types/database.types';



interface IProps {
    deleteAction: (id: string) => Promise<void>;
    posts: Tables<'posts'>[]
    userId: string;
    total: number;
    currentLimit: number;
};

export const PostsWrapper = ({deleteAction, posts, userId, total, currentLimit}: IProps) => {

    return (
        <div>
            {posts.map((post) =>
                <PostItem
                    key={post.id}
                    deleteAction={deleteAction}
                    isOwner={post.user_id === userId}
                    post={post}  />)}
            <div className={'w-80 p-6 mx-auto '}>
                <LoaderButton currentLimit={currentLimit} total={total} />
            </div>
        </div>
    )
}