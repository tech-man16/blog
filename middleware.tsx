import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    try {
        console.log(request.nextUrl)
        if (request.nextUrl.pathname.startsWith("/Blog/tech-man"))
            return NextResponse.redirect(new URL("/Blog/Manas-Maheshwari", request.url));
        return NextResponse.redirect(new URL("/Blog/tech-man", request.url));
    } catch (e) {
        console.log("catch")
        console.log(new URL("/", request.url));
        return NextResponse.json({ message: new URL("/", request.url), err: e }, { status: 500 });
    }
}

export const config = {
    matcher: ["/", "/Blog/tech-man"]
}