import { FeaturedProjectInteractor } from '@/interactors/featuredProjectInteractor';
import connectMongoDB from '@/lib/mongodb';
import FeaturedProject from '@/models/featuredProject';
import { FeaturedProjectRepository } from '@/repositories/featuredProjectRepository';
import { NextResponse } from 'next/server';

const featuredProjectInteractor = new FeaturedProjectInteractor(
    new FeaturedProjectRepository()
);

export async function GET() {
    await connectMongoDB();
    const featuredProjects = await FeaturedProject.find();
    return NextResponse.json(featuredProjects);
}
