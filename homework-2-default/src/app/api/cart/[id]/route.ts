import { NextRequest, NextResponse } from 'next/server';



export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const data = await import('../route');

    if(paramId === 'all') {

      data.cartsMap?.clear();
      return NextResponse.json({
        success: true,
        message: 'Products were removed from the cart',
        status: 204,
      });
    }

    const id = parseInt(paramId);

    if (isNaN(id)) {
      return NextResponse.json(
          { error: 'Invalid data' },
          { status: 400 }
      );
    }
    const product = data.cartsMap?.get(id);

    if (!product) {
      return NextResponse.json(
          { error: 'Invalid data' },
          { status: 400 }
      );
    }

    if(product.quantity === 1) {
      data?.cartsMap?.delete(id);
    }else {
      data?.cartsMap?.set(id, {...product, quantity: product.quantity - 1});
    }

    return NextResponse.json({
      success: true,
      message: 'Product was removed from the cart',
      status: 204,
    });
  }catch (err) {
    return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 400 }
    );
  }

}
