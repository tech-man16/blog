'use client';
import { Textarea, Button, Input, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HTMLReactParser from "html-react-parser/lib/index";
import { UploadIcon, UploadImageIcon, DeleteDocumentIcon } from "../icons/icon";
import { signup } from "../(server)/actions";

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
                  <DeleteDocumentIcon />
                </Button>
              }
            </div>}
          {!image.coverimage && <h1> Blog Cover Page </h1>}
        </div>
        <div className="flex flex-col md:mx-[25%] p-4" ref={divElem}>

          <div className="flex justify-end items-center pr-4">
            <Tooltip delay={0} closeDelay={0} content="Upload Cover" placement="bottom">
              <Button isIconOnly variant="light" onPress={() => imgFile.current.click()}>
                <UploadIcon />
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
                  <UploadImageIcon />
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