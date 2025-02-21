'use client';
import { useEffect, useState } from "react";
import { getBlog } from "@/app/(server)/actions";
import Image from "next/image";
import { Image as NxtImg } from "@heroui/react";
import HTMLReactParser from "html-react-parser/lib/index";

export function generateStaticParams() { // Only for deployment it is used..Rather than no use of this
  return [{ blogs: '1' }];
}

const CustomBlog = ({ params }: { params: { blogs: string } }) => {
  const [info, setInfo]: any = useState(undefined);
  const [id, setId]: any = useState(null);

  useEffect(() => {
    (async () => {
      const id = `${params.blogs.slice(1, 9)}${params.blogs.slice(11)}`
      setId(`url('/tmp/${id}coverimage.jpg')`);
      // setId(`/tmp/${id}coverimage.jpg`)

      const data = await getBlog({ BlogId: id });
      console.log(data);
      const regex = /{{image\d+}}/g;

      data.data[0].blog = data.data[0].blog.replace(regex, (match: any) => {
        const imageId = match.match(/\d+/)[0];
        return `<br /> <Image
                    priority={true}
                    src=${data.data[0].images[imageId]}
                    alt="Blog Cover Page"
                    className={'w-full'}
                    width={100}
                    height={100}
                /> <br />`;
      })
      console.log(data.data[0]);
      setInfo(data.data[0]);
    })();
  }, []);

  return (
    <>
      {info &&
        <div className="flex flex-col p-4 h-screen overflow-auto">
          <div className={`flex justify-center items-center min-h-[400px] bg-cover`} style={{ backgroundImage: id }}>
            <div className="bg-cover border md:min-w-[80%] min-h-[300px]" >
              {/* <Image
                                priority={true}
                                src={`/tmp/${id}coverimage.jpg`}
                                alt="Blog Cover Page"
                                className={`w-full h-[380px]`}
                                width={100}
                                height={100}
                                quality={100}
                                style={{ objectFit: "cover" }}
                            /> */}
            </div>
          </div>
          <div className="flex flex-col md:mx-[25%] p-4">
            <div className={`flex items-center bg-inherit text-3xl hover:bg-inherit/80 p-4 h-24`}>
              {info.title}
            </div>

            <div className={`flex flex-col bg-inherit flex-1 hover:bg-inherit/80 p-4 h-24`}>
              {HTMLReactParser(info.blog)}
              {id}
            </div>

          </div>

        </div>
      }
    </>
  )
}

export default CustomBlog;