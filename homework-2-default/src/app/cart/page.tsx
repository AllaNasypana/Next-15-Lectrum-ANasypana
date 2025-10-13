'use client'

import { useState, useEffect  } from 'react';
import { CartItem} from '@/components'
import {CartType} from "@/app/api/cart/route";

export default function SettingsPage() {
    const [carts, setCarts] = useState<CartType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [key, setKey] = useState(1)
    const [sum, setSum] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/cart');
                if(res.ok) {
                    const cart = await res.json() as unknown as {carts: CartType[]; sum: number };
                    setSum(cart.sum);
                    setCarts(cart.carts);
                }
            }catch (err) {
                console.log(err);
            }finally {
                setLoading(false);
            }

        })()

    }, [key])


    return (
        <>
            <h2 className={'font-bold text-3xl pt-6 center text-blue-700 mb-6'}>Cart</h2>
            {loading && (<div className={'py-6 font-bold text-2xl text-center text-blue-500'}>Loading ...</div>)}
            {!sum && !loading && <div className={'py-6 font-bold text-xl'}>Cart is empty yet</div>}
            {!!sum && !loading && <div className={'text-2xl font-bold'}>Total: ${sum.toFixed(2)}</div>}
            {!loading && (
                <div>
                    {carts.map((cart) => (<CartItem key={cart.id} product={cart}
                    onChangeKey={() =>  setKey(prv => prv + 1)} />))}
                </div>
            )}

        </>
    );
}