import { getCarts, revalidatedByTag } from './actions';
import { CartItem} from '@/components'

export default async function SettingsPage() {
    const carts = await getCarts()

    return (
        <>
            <h2 className={'font-bold text-3xl pt-6 center text-blue-700 mb-6'}>Cart</h2>
            {!carts.sum && <div className={'py-6 font-bold text-xl'}>Cart is empty yet</div>}
            {!!carts.sum && <div className={'text-2xl font-bold'}>Total: ${carts.sum.toFixed(2)}</div>}
            <div>
                {carts.carts.map(cart => (<CartItem key={cart.id} product={cart} revalidatedByTag={revalidatedByTag} />))}
            </div>

        </>
    );
}