import { cookies } from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET() {
    const token = (await cookies()).get('auth-token')?.value;
    console.log('Token:', token);
    if (!token) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
    try{
        const djangoResponse = await fetch(`${process.env.DJANGO_API_URL}/api/transactions/categories/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!djangoResponse.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await djangoResponse.json();
        return NextResponse.json(data);
    }
    catch (error) {
        console.log('Error fetching categories:', error);
        return NextResponse.json({error: error.message || 'Failed to fetch categoroes'}, {status: 500});
    }
}