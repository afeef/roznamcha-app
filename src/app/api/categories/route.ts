import {NextRequest, NextResponse} from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client';

const createCategorySchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(1)
});

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createCategorySchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const category = await prisma.Category.create({
        data: { name: body.name, description: body.description}
    });

    return NextResponse.json(category, { status: 201 });
}
