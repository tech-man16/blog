'use client';
import { useEffect, useState } from "react";
import { getBlog } from "@/app/(server)/actions";
import HTMLReactParser from "html-react-parser/lib/index";
import { Image as Img } from "@heroui/react";
// const CustomBlog = ({ params }: { params: { blogs: string } }) => {
const CustomBlog = ({ blogs }: any) => {
  const [info, setInfo]: any = useState(undefined);
  const [id, setId]: any = useState(null);
  const [msg, updateMsg] = useState("Loading...")
  useEffect(() => {
    (async () => {
      const id = `${blogs.slice(1, 9)}${blogs.slice(11)}`
      // setId(`url('/tmp/${id}coverimage.jpg')`);
      setId(`/tmp/${id}coverimage.jpg`)

      const data = await getBlog({ BlogId: id });
      // console.log(data);
      const regex = /{{image\d+}}/g;
      if (data.status != 200) {
        updateMsg("Error...");
      }
      else {
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
      }
    })();
  }, []);

  return (
    <>

      {info ?
        <div className="flex flex-col p-4 h-screen overflow-auto">
          <div className={`flex flex-col  min-h-[400px] bg-cover `}>
            <Img
              src={id} alt="blog image"
              className="w-full max-h-[400px] object-cover min-h-full"
              classNames={{ wrapper: "min-w-full min-h-full" }}
            />
          </div>
          <span className="flex italic p-2 justify-end  text-current/45 text-small"> Published on: {info.currentDate} </span>
          <div className="flex flex-col md:mx-[25%] p-4">

            <div className={`flex items-center border bg-inherit text-3xl hover:bg-inherit/80 p-4 h-24`}>
              {info.title}
            </div>

            <div className={`flex flex-col border bg-inherit flex-1 hover:bg-inherit/80 p-4 h-24`}>
              {HTMLReactParser(info.blog)}
            </div>

          </div>

        </div >
        :
        <> {msg} </>
      }
    </>
  )
}

export default CustomBlog;