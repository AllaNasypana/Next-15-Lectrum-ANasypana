import { FunctionComponent} from 'react';
import { ObservePrefetchLink } from '../observer-prefetch-link';

interface IProps {
    name: string;
}

export const CategoryCard: FunctionComponent<IProps> = ({name}) => {
    return (
        <ObservePrefetchLink href={`/products/${name}}`}>
            <div className={'py-6 text-lg font-bold text-blue-500 hover:text-blue-700'}>
                {name}
            </div>
        </ObservePrefetchLink>
    )
}