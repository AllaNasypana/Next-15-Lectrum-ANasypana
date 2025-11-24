import { NextResponse } from "next/server";
import { URL_BASE} from '../../../../config'
import {IComment} from "@/types";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const resComments = await fetch(`${URL_BASE}comments?postId=${id}`);
        if (!resComments.ok) throw new Error(resComments.statusText);
        const comments = await resComments.json() as unknown as IComment[];

        const res = NextResponse.json(comments);
        res.headers.set("Cache-Control", "public, s-maxage=10, stale-while-revalidate=60");
        return res;
    }catch (error) {
        console.error(error);
    }

}
