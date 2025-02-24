import { NextRequest, NextResponse } from "next/server";
import { connect, disconnect } from "@/app/db/connection";
// import { readdir, unlink, writeFile, copyFile } from "fs/promises";
// import path from "path";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {

        const db = await connect();
        const collection = db.collection('blogs');

        //////////// data conversion to buffer data /////////////////////
        let formData, file, buffer;
        let buffers: any = {};
        const { url, _id } = await req.json();
        // console.log(url)
        // return Response.json({ message: 'Uploaded Successfull', status: 200 }, { status: 200 });
        formData = Object.entries(url.images); // { coverimage:data, image1: data, image2:data }
        file = { name: "blogimage.jpg" }

        formData.forEach((formdata: any) => {
            const base64 = formdata[1].split(';base64,')[1];
            buffer = Buffer.from(base64, "base64");
            // buffers.push(buffer);
            buffers[formdata[0]] = buffer;
        })

        if (formData == undefined) {
            // If no file is received, return a JSON response with an error and a 400 status code
            return Response.json({ error: "No Pic received.", status: 400 }, { status: 400 });
        }


        ////////////////////////////////////////////////////////


        // Inserting documents to the collection...
        try {
            let newdata: any = { title: url.title, blog: url.blog };

            newdata['images'] = buffers;
            newdata['currentDate'] = new Date();
            let format: any = file.name.split(".");
            format = format[format.length - 1];

            await collection.insertOne(newdata);

            // Object.values(buffers).forEach(async (buffer: any, ind: number) => {
            //     await writeFile(path.join(process.cwd(), `public/tmp/${ind + 1}.jpeg`), buffer);
            // });

            return NextResponse.json({ message: 'Uploaded Successfull', status: 200 }, { status: 200 });
        }
        catch (e) {
            console.log(e);
            return NextResponse.json({ message: 'Uploaded Failed', status: 500, error: e }, { status: 500 });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Profile Pic Upload Failed \nInternal Server Error Occurred !!!", status: 505 }, { status: 505 });
    } finally {
        await disconnect();
    }
}
