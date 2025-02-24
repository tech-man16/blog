'use client';
import { Card, CardHeader, CardFooter, Button, CardBody, Input, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import { getBlog } from "@/app/(server)/actions";
import { useRouter } from "next/navigation";

const HeartIcon = ({
    width,
    height,
    size = 24,
    strokeWidth = 1.5,
    fill = "none",
}: any) => {
    return (
        <svg
            aria-hidden="true"
            fill={fill}
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
        >
            <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke="purple"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}

            />
        </svg>
    );
};

const BlogList = () => {
    const router = useRouter();
    const li = ['1', '2', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const [initial, update]: any = useState(undefined);
    const [val, setValue] = useState("");
    const [liked, setLiked] = useState(false);
    const handle = (e: any) => {
        setValue(e.target.value);
        if (e.target.value.length) {
            update(() => {
                const newArr = li.filter((val: any) => val.startsWith(e.target.value)) || li;
                // console.log(newArr);
                return newArr;
            })
        } else {
            update(li);
        }
    }

    const blog = (e: any) => {
        const date = new Date()
        router.push(`/Blog/Manas-Maheshwari/${date.getDay()}${e.target.id.slice(0, 8)}${date.getDay()}${date.getDay()}${e.target.id.slice(8)}`);
    }

    useEffect(() => {
        (async () => {
            const data = await getBlog({});
            // console.log(data);
            update(data.data);
        })();
    }, []);

    return (
        <>
            <div className="flex flex-col border-2 border-green-400 h-screen">
                <div className="relative gap-4 grid grid-cols-1 md:grid-cols-12 p-4 max-h-full overflow-auto cursor-pointer">
                    <div className="md:top-0 md:left-0 z-20 md:sticky col-span-1 md:col-span-12 h-16 text-2xl">
                        <Input classNames={{ inputWrapper: "h-full", base: "h-full" }} onChange={handle} value={val} placeholder="Search Blog..." />
                    </div>
                    {typeof initial == 'object' &&
                        initial.map((elem: any, ind: number) => (
                            <Card isFooterBlurred
                                key={ind}
                                className={`col-span-1 md:col-span-3 bg-cover bg-gradient-to-tr hover:bg-gradient-to-tr from-purple-500 hover:from-purple-500/80 to-purple-700 hover:to-purple-700/80 min-w-[80%] md:min-w-[80%] min-h-[300px]`}
                                style={{ backgroundImage: elem.coverimageurl }}
                            >
                                <CardBody className="w-full">
                                    <Image alt={`blog${ind + 1}`} src={elem.coverimageurl}
                                        className="w-full object-cover"
                                        classNames={{ wrapper: "min-w-full" }}
                                    />
                                </CardBody>
                                <CardFooter className="bottom-0 z-10 absolute flex justify-between items-center gap-3 bg-white/30 border-zinc-100/50 border-t-1 h-16">
                                    <span className="text-black"> {elem.title.length > 30 ? `${elem.title.slice(0, 30)}...` : elem.title} </span>

                                    <Button
                                        id={elem._id.toString()}
                                        className="text-tiny"
                                        color="primary"
                                        radius="full"
                                        size="sm"
                                        onPress={blog}
                                    >
                                        Read Blog
                                    </Button>

                                    {/* <Button
                                        isIconOnly
                                        className="data-[hover]:bg-foreground/10 text-default-900/60"
                                        radius="full"
                                        variant="light"
                                        onPress={() => setLiked((v) => !v)}
                                    >
                                        <HeartIcon
                                            className={liked ? "[&>path]:stroke-transparent" : ""}
                                            fill={liked ? "red" : "none"}
                                        />
                                    </Button> */}

                                </CardFooter>
                            </Card>
                        ))
                    }

                </div>
                {typeof initial == 'object' && initial.length == 0 && <span className="flex flex-1 justify-center items-center">No Blog Exists </span>}
            </div>
        </>
    )

    return (
        <>
            <div className="flex flex-col border-2 border-green-400 h-screen">
                <div className="relative gap-4 grid grid-cols-1 md:grid-cols-12 p-4 max-h-full overflow-auto cursor-pointer">
                    <div className="md:top-0 md:left-0 z-20 md:sticky col-span-1 md:col-span-12 h-16 text-2xl">
                        <Input classNames={{ inputWrapper: "h-full", base: "h-full" }} onChange={handle} value={val} placeholder="Search Blog..." />
                    </div>
                    {typeof initial == 'object' &&
                        initial.map((elem: any, ind: number) => (
                            <Card isFooterBlurred
                                key={ind}
                                className={`col-span-1 md:col-span-3 bg-gradient-to-tr hover:bg-gradient-to-tr from-purple-500 hover:from-purple-500/80 to-purple-700 hover:to-purple-700/80 min-w-[80%] md:min-w-[80%] min-h-[300px]`}
                            >
                                <CardHeader className="top-1 z-10 absolute justify-between items-start">
                                    <p className="font-bold text-tiny text-white/60 uppercase">New</p>
                                    <Button
                                        isIconOnly
                                        className="data-[hover]:bg-foreground/10 text-default-900/60 -translate-y-2 translate-x-2"
                                        radius="full"
                                        variant="light"
                                        onPress={() => setLiked((v) => !v)}
                                    >
                                        <HeartIcon
                                            className={liked ? "[&>path]:stroke-transparent" : ""}
                                            fill={liked ? "red" : "none"}
                                        />
                                    </Button>
                                </CardHeader>

                                <CardBody className={`flex justify-center items-center bg-[url(/tmp/67b0b9ce5af6be8412662cadcoverimage.jpg)]`}>
                                    {/* <Image className="w-full" src={`/tmp/${elem._id.toString()}coverimage.jpg`} alt="coverimage" width={100} height={100} /> */}
                                    <span className="text-large"> Blog {ind + 1}  </span>
                                </CardBody>

                                <CardFooter className="bottom-0 z-10 absolute justify-between bg-white/30 border-zinc-100/50 border-t-1">
                                    <span className="w-2/3 text-black"> {elem.title} </span>
                                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                                        Read Blog
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    }

                </div>
                {typeof initial == 'object' && initial.length == 0 && <span className="flex flex-1 justify-center items-center">No Blog Exists </span>}
            </div>
        </>
    )
}

export default BlogList;