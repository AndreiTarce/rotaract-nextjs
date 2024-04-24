import connectMongoDB from '@/lib/mongodb'
import Member from '@/models/member'
import { NextRequest, NextResponse } from 'next/server'
import { uploadFileToS3 } from '../utils/s3'
import { IMember } from '@/models/interfaces'
import { PutObjectCommandOutput } from '@aws-sdk/client-s3'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const memberInfo: IMember = JSON.parse(
            formData.get('member')!.toString()
        )
        const memberPicture = formData.get('picture_file')

        if (memberPicture) {
            const memberPictureBuffer = Buffer.from(
                await (memberPicture as any).arrayBuffer()
            )
            const uploadResponse: PutObjectCommandOutput = await uploadFileToS3(
                memberPicture,
                memberPictureBuffer,
                'members',
                `${memberInfo.first_name.toLowerCase()}_${memberInfo.last_name.toLowerCase()}`
            )
        }

        const memberObject: IMember = {
            ...memberInfo,
            _id: new ObjectId(),
            picture: `https://rotaract-visio-bucket.s3.eu-central-1.amazonaws.com/members/${memberInfo.first_name}_${memberInfo.first_name}`,
        }

        await connectMongoDB()
        await Member.create(memberObject)
        return NextResponse.json(
            {
                message: 'Member created successfully',
                result: memberObject,
            },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}

export async function GET(request: NextRequest) {
    await connectMongoDB()
    const nameSearchQuery = request.nextUrl.searchParams.get('name')
    if (nameSearchQuery) {
        const members = await Member.find({
            $or: [
                {
                    first_name: {
                        $regex: nameSearchQuery,
                        $options: 'i',
                    },
                },
                {
                    last_name: {
                        $regex: nameSearchQuery,
                        $options: 'i',
                    },
                },
            ],
        })
        return NextResponse.json({ members })
    }
    const members = await Member.find()
    return NextResponse.json({ members })
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json()
    await connectMongoDB()
    await Member.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Member deleted' }, { status: 200 })
}
