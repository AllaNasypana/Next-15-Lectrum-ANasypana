import { NextRequest, NextResponse } from 'next/server';
import { ProductsSchema, productSchema } from '@/schems';
import {z} from 'zod';

export type CartType = ProductsSchema & {
  quantity: number;
}

export const cartsMap = new Map<number, CartType>()

export async function GET() {
  const carts = Array.from(cartsMap.values());


  return NextResponse.json({
    carts,
    sum: carts.reduce((acc, currentValue) => acc + (currentValue.quantity * currentValue.price), 0),
    timestamp: new Date().toISOString(),
  }, {status: 200});
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
          { error: z.flattenError(validated.error).fieldErrors },
          { status: 400 }
      );
    }

    if(cartsMap.has(validated.data.id)) {
      cartsMap.set(validated.data.id, {...validated.data, quantity: (cartsMap.get(validated.data.id)?.quantity || 0) + 1})
    }else {
      cartsMap.set(validated.data.id, {...validated.data, quantity: 1})
    }


    return NextResponse.json({
      success: true,
      message: 'Product was added to the cart',
    }, { status: 201 });

  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 400 }
    );
  }
}
