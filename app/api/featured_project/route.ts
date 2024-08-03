import connectMongoDB from '@/lib/mongodb';
import FeaturedProject from '@/models/featuredProject';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectMongoDB();
    const featuredProjects = await FeaturedProject.find();
    return NextResponse.json(featuredProjects);
}
