import {mongoconnect} from '../../../lib/connection/mogoconnect';
import {NextResponse } from 'next/server';


export async function GET () {

    await mongoconnect();
    return NextResponse.json({ message: 'everything is running correct' });

}