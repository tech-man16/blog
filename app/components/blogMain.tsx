'use client';
import { Card, CardHeader, CardFooter, Button, CardBody, Input, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import { getBlog } from "@/app/(server)/actions";
import { useRouter, usePathname } from "next/navigation";

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
    const pathname = usePathname();

    const [initial, update]: any = useState(undefined);
    const [filtered, updateFiltered]: any = useState(initial);
    const [val, setValue] = useState("");
    const [liked, setLiked] = useState(false);
    const [msg, updateMsg] = useState("Loading...")
    const handle = (e: any) => {
        setValue(e.target.value);
        if (e.target.value.length) {
            updateFiltered(() => {
                const newArr = initial.filter((val: any) => val.title.startsWith(e.target.value));
                if (!newArr.length)
                    return initial;
                // console.log(newArr);
                return newArr;
            })
        } else {
            updateFiltered(initial);
        }
    }

    const blog = (e: any) => {
        const date = new Date()
        router.push(`/Blog/Manas-Maheshwari/${date.getDay()}${e.target.id.slice(0, 8)}${date.getDay()}${date.getDay()}${e.target.id.slice(8)}`);
    }

    useEffect(() => {
        // console.log(pathname);
        (async () => {
            const data = await getBlog({});
            if (data.status != 200) {
                updateMsg("Error..");
            } else {
                console.log(data.data[0].coverimageurl);
                update(data.data);
                updateFiltered(data.data);
            }
        })();

    }, [pathname]);

    return (
        <>
            <div className="flex flex-col border-2 border-green-400 h-screen">
                <div className="relative gap-4 grid grid-cols-1 md:grid-cols-12 p-4 max-h-full overflow-auto cursor-pointer">
                    <div className="md:top-0 md:left-0 z-20 md:sticky col-span-1 md:col-span-12 h-16 text-2xl">
                        <Input classNames={{ inputWrapper: "h-full", base: "h-full" }} onChange={handle} value={val} placeholder="Search Blog..." />
                    </div>
                    {typeof initial == 'object' ?
                        filtered.map((elem: any, ind: number) => (
                            <Card isFooterBlurred
                                key={ind}
                                className={`col-span-1 md:col-span-3 bg-cover bg-gradient-to-tr hover:bg-gradient-to-tr from-purple-500 hover:from-purple-500/80 to-purple-700 hover:to-purple-700/80 min-w-[80%] md:min-w-[80%] min-h-[300px]`}
                                style={{ backgroundImage: elem.coverimageurl }}
                            >
                                <CardHeader className="w-full">
                                    <Image alt={`blog${ind + 1}`} src={elem.coverimageurl}
                                        className="w-full object-cover min-h-full"
                                        classNames={{ wrapper: "min-w-full min-h-full" }}
                                    />
                                </CardHeader>
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
                        )) :
                        <> {msg} </>
                    }

                </div>
                {typeof initial == 'object' && initial.length == 0 && <span className="flex flex-1 justify-center items-center">No Blog Exists </span>}
            </div>
        </>
    )
}
export default BlogList;