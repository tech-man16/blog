// // import path from "path";
// import { connect, disconnect } from "@/app/db/connection";
// import { ObjectId } from "mongodb";
// import { NextResponse, NextRequest } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function GET(req: NextRequest, res: NextResponse) {
//     return NextResponse.json({ data: "Success" }, { status: 200 })
// }

// export async function POST(req: NextRequest, res: any) {
//     try {

//         const { BlogId } = await req.json();

//         const db = await connect();
//         const collection = db.collection('blogs');
//         const messageId = BlogId != undefined ? new ObjectId(BlogId) : "";

//         const data = messageId == "" ? await collection.find({}).toArray() : await collection.find({ _id: messageId }).toArray();
//         if (BlogId == undefined)
//             data.forEach(async (elem: any) => {
//                 elem.coverimageurl = `url(/tmp/${elem._id.toString()}coverimage.jpg)`;
//                 if (elem.images.coverimage != '')
//                     await writeFile(path.join(process.cwd(), `public/tmp/${elem._id.toString()}coverimage.jpg`), elem.images.coverimage.buffer);
//             })
//         else {
//             const images = Object.entries(data[0].images);
//             let elem: any;
//             for (elem of images) {
//                 if (elem.length > 0) {
//                     await writeFile(path.join(process.cwd(), `public/tmp/${BlogId}${elem[0]}.jpg`), elem[1].buffer);
//                     elem[1] = `/tmp/${BlogId}${elem[0]}.jpg`;
//                 }
//             }
//             data[0].images = Object.fromEntries(images);
//         }

//         return NextResponse.json({ msg: "Get mail Successfull !!", status: 200, data: data }, { status: 200 });
//     } catch (e: any) {
//         console.log(e)
//         return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
//     } finally {
//         await disconnect();
//     }
// }

// Import required modules
import { connect, disconnect } from "@/app/db/connection";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Export async functions for GET and POST requests
export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ data: "Success" }, { status: 200 });
}

export async function POST(req: NextRequest, res: any) {
    try {
        // Get BlogId from request body
        const { BlogId } = await req.json();

        // Connect to database and get collection
        const db = await connect();
        const collection = db.collection('blogs');

        // Find data based on BlogId
        let data;
        if (BlogId) {
            data = await collection.find({ _id: new ObjectId(BlogId) }).toArray();
        } else {
            data = await collection.find({}).toArray();
        }

        // Process data
        data.forEach(async (elem: any) => {
            if (!BlogId) {
                // elem.coverimageurl = `url(/tmp/${elem._id.toString()}coverimage.jpg)`;
                elem.coverimageurl = `/tmp/${elem._id.toString()}coverimage.jpg`;
                if (elem.images.coverimage) {
                    await writeFile(path.join(process.cwd(), `public/tmp/${elem._id.toString()}coverimage.jpg`), elem.images.coverimage.buffer);
                }
            } else {
                const images = Object.entries(elem.images);
                images.forEach(async ([key, value]: any) => {
                    if (value.buffer) {
                        await writeFile(path.join(process.cwd(), `public/tmp/${BlogId}${key}.jpg`), value.buffer);
                        elem.images[key] = `/tmp/${BlogId}${key}.jpg`;
                    }
                });
            }
        });

        // Return response
        return NextResponse.json({ msg: "Get mail Successfull !!", status: 200, data: data }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
    } finally {
        await disconnect();
    }
}