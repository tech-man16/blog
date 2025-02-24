'use client';
import { Textarea, Button, Input, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HTMLReactParser from "html-react-parser/lib/index";
// import { UploadIcon, UploadImageIcon, DeleteDocumentIcon } from "@/app/icons/icon";
import { signup } from "../(server)/actions";

// export const UploadIcon = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
//       />
//     </svg>
//   )
// }

// export const UploadImageIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
//   </svg>

// )

const DeleteDocumentIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const CreateBlog = (props: any) => {
  const imgFile: any = useRef(null);
  const divElem: any = useRef(null);
  const addImage: any = useRef(null);

  const [hidden, setHidden] = useState({ title: false, blog: false, opacity: '' });
  const [data, setData]: any = useState({ title: "", blog: "" });
  const [image, updateimage]: any = useState({ coverimage: null });
  const [isLoading, setLoading] = useState(false);

  const handleImage = (e: any) => {
    try {
      const file = e.target.files?.[0];
      console.log(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        updateimage((prev: any) => ({ ...prev, coverimage: reader.result?.toString() || "" }))
      };
      reader.readAsDataURL(file);
    } catch (e: any) {
      console.log("error");
    }
  }

  const handle = (e: any) => {
    if (e.key == 'Enter')
      setData((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
    else
      setData((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = (e: any) => {
    if (!divElem.current.contains(e.target))
      setHidden((prev: any) => ({ ...prev, title: false, blog: false }))
  }
  const handlePhotos = (e: any) => {
    try {
      const file = e.target.files?.[0];
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const ind = Object.keys(image).length;
        updateimage((prev: any) => ({ ...prev, [ind]: reader.result?.toString() || "" }));
        setData((prev: any) => ({ ...prev, blog: prev.blog + "\n" + `{{image${ind}}}` + "\n" }));
      };
      reader.readAsDataURL(file);
    } catch (e: any) {
      console.log("error");
    }
  }

  const hoverImage = () => {
    setHidden((prev: any) => ({ ...prev, opacity: 'blur-sm' }))
  }
  const disablehoverImage = () => {
    setHidden((prev: any) => ({ ...prev, opacity: '' }))
  }
  const success = async () => {
    setLoading(true);
    setHidden((prev: any) => ({ ...prev, title: false, blog: false }))
    const modifiedBlog = data.blog.replaceAll("\n", "<br />");
    setData((prev: any) => ({ ...prev, blog: modifiedBlog }));
    // console.log(image, data.blog);
    const data0 = await signup({ url: { ...data, images: { ...image } }, _id: "12322" });
    if (data0.status == 200)
      setLoading(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col p-4 h-screen overflow-auto">
        <div className={`flex justify-center items-center min-h-[400px] ${!image.coverimage && 'border'}`}>
          {image.coverimage &&
            <div
              className="relative w-full"
              onMouseEnter={hoverImage}
              onMouseLeave={disablehoverImage}
            >
              <Image
                src={image.coverimage}
                alt="Blog Cover Page"
                className={`w-full h-[380px] object-cover ${hidden.opacity}`}
                width={100}
                height={100}

              />
              {hidden.opacity &&
                <Button isIconOnly
                  className="top-1/2 left-1/2 absolute -m-10 text-black text-2xl"
                  color="danger"
                  onPress={() => { updateimage((prev: any) => ({ ...prev, coverimage: null })) }}
                >
                  {/* <DeleteDocumentIcon /> */}
                </Button>
              }
            </div>}
          {!image.coverimage && <h1> Blog Cover Page </h1>}
        </div>
        <div className="flex flex-col md:mx-[25%] p-4" ref={divElem}>

          <div className="flex justify-end items-center pr-4">
            <Tooltip delay={0} closeDelay={0} content="Upload Cover" placement="bottom">
              <Button isIconOnly variant="light" onPress={() => imgFile.current.click()}>
                {/* <UploadIcon /> */}
              </Button>
            </Tooltip>
            <Input type="file" className="hidden" ref={imgFile} onChange={handleImage} />
          </div>
          <Tooltip delay={0} closeDelay={0} content="Click to edit title">
            <div
              className={`flex items-center bg-inherit text-3xl hover:bg-inherit/80 p-4 h-24 ${!data.title && 'border'} ${hidden.title && 'hidden'}`}
              onClick={() => (setHidden((prev: any) => ({ ...prev, title: !hidden.title })))}
            >
              {data.title ? HTMLReactParser(data.title.replace("\n", "<br />")) : "Blog Title..."}
            </div>
          </Tooltip>
          <div className={`flex flex-col p-4 ${!hidden.title && 'hidden'}`}>
            <Textarea
              id="title"
              // onChange={handle}

              onKeyUp={handle}
              placeholder="Blog Title..."
              classNames={{ input: "text-3xl max-h-[30lvh]", mainWrapper: "bg-red-400" }}
            />
          </div>

          <Tooltip delay={0} closeDelay={0} content="Click to edit blog">
            <div
              className={`flex items-center bg-inherit flex-1 hover:bg-inherit/80 p-4 h-24 ${!data.blog && 'border'} ${hidden.blog && 'hidden'}`}
              onClick={() => setHidden((prev: any) => ({ ...prev, blog: !hidden.blog }))}
            >
              {data.blog ? HTMLReactParser(data.blog) : "Write a blog..."}
            </div>
          </Tooltip>
          <div className={`relative p-4 flex flex-col ${!hidden.blog && 'hidden'}`}>
            <div className="flex justify-end">
              <Tooltip delay={0} closeDelay={0} content="Add Image" placement="bottom" showArrow>
                <Button isIconOnly variant="light" onPress={() => addImage.current.click()}>
                  {/* <UploadImageIcon /> */}
                </Button>
              </Tooltip>
              <Input className="hidden" type="file" ref={addImage} onChange={handlePhotos} />
            </div>
            <Textarea
              // className="max-w-sm"
              id="blog"
              onKeyUp={handle}
              onChange={handle}
              value={data.blog.replaceAll("<br />", "\n")}
              placeholder="Write a blog..."
              classNames={{ input: "min-h-[40lvh] max-h-[60lvh]" }}
            />

            <span className="flex justify-end pt-3">
              <Button
                disabled={isLoading}
                color="success"
                variant="flat"
                className=""
                onPress={success}
              > Upload Blog
              </Button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateBlog;