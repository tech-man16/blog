import { connect, disconnect } from "@/app/db/connection";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ data: "Success" }, { status: 200 })
}

export async function POST(req: NextRequest, res: any) {
    try {
        const { BlogId } = await req.json();
        const db = await connect();
        const collection = db.collection('blogs');
        const messageId = BlogId != undefined ? new ObjectId(BlogId) : "";

        const data = messageId == "" ? await collection.find({}).toArray() : await collection.find({ _id: messageId }).toArray();
        if (BlogId == undefined)
            data.forEach(async (elem: any) => {
                // elem.coverimageurl = `url(/tmp/${elem._id.toString()}coverimage.jpg)`;
                elem.coverimageurl = `/tmp/${elem._id.toString()}coverimage.jpg`;
                if (elem.images.coverimage != '') {
                    const base64String = elem.images.coverimage.toString('base64');
                    const imageString = `data:image/jpeg;base64,${base64String}`;
                    elem.coverimageurl = imageString;
                }
            })
        else {
            const images = Object.entries(data[0].images);
            let elem: any;
            for (elem of images) {
                if (elem.length > 0) {
                    // await writeFile(path.join(process.cwd(), `public/tmp/${BlogId}${elem[0]}.jpg`), elem[1].buffer);
                    // elem[1] = `/tmp/${BlogId}${elem[0]}.jpg`;
                    const base64String = elem.images.coverimage.toString('base64');
                    const imageString = `data:image/jpeg;base64,${base64String}`;
                    elem[1] = imageString;
                }

            }
            data[0].images = Object.fromEntries(images);
            data[0].currentDate = data[0].currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll("/", "-")
        }
        return NextResponse.json({
            msg: "Get mail Successfull !!",
            status: 200,
            data: data
        },
            { status: 200 });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
    } finally {
        await disconnect();
    }
}