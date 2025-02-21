'use client';
import React from "react";
import { Button, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
// import HTMLReactParser from "html-react-parser/lib/index";
const sortArray = (arr: any) => {
    for (let elem of arr) {
        let j = arr.indexOf(elem)
        while (j > 0) {
            if (arr[j - 1][0] > arr[j][0]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
            } else { break }
            // console.log(j, arr);
            j--;
        }
    }
    return arr;
}

const mergeArray = (sortedArr: any) => {
    let sortedArray = [...sortedArr];
    if (sortedArray.length > 1) {
        let i = 1;
        let length = sortedArray.length;
        while (i < length) {
            // console.log(sortedArray)

            if (sortedArray[i][0] - sortedArray[i - 1][1] <= 0) {
                if (sortedArray[i][0] == sortedArray[i - 1][0])
                    sortedArray[i - 1][1] = Math.max(sortedArray[i - 1][1], sortedArray[i][1])
                else
                    sortedArray[i - 1][1] = sortedArray[i][1]
                sortedArray.splice(i, 1)
                length--;
            }
            else { i++; }
        }
    }
    return sortedArray;
}

const CreateBlog = () => {
    const [value, updateValue]: any = useState({});
    const [selected, updateSelected] = useState("");
    const [selectedInd, updateBoldIndex]: any = useState([]);
    const [italic, updateItalicInd]: any = useState([]);
    const [info, setInfo] = useState("");
    const [hidden, setHidden] = useState(false);
    const handle = (e: any) => {
        updateValue((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleMouseUp = () => {
        const selectedWord = window.getSelection()?.toString();
        updateSelected(selectedWord || "");
    }

    const boldText = () => {
        updateBoldIndex((prev: any) => ([...prev, [value.blog.indexOf(selected), value.blog.indexOf(selected) + selected.length]]));
    }
    const italictext = () => {
        updateItalicInd((prev: any) => ([...prev, [value.blog.indexOf(selected), value.blog.indexOf(selected) + selected.length]]));
    }


    const showElem = () => {
        const sortedArray = sortArray(selectedInd);
        const result = mergeArray(sortedArray);
        const val = value.blog;
        // let elementString = `<div>${val}</div>`
        let elementString = ''
        const flattened_arr = result.flat();
        let i = 0;
        // let length = elementString.length;
        while (i < flattened_arr.length) {
            if (i == 0) {
                elementString = '<div>' + val.slice(0, flattened_arr[i]) + '<span className="font-semibold">';
            }
            else if (i % 2 == 1) {
                elementString = elementString + val.slice(flattened_arr[i - 1], flattened_arr[i]) + '</span>'
            } else {
                elementString = elementString + val.slice(flattened_arr[i - 1], flattened_arr[i]) + '<span className="font-semibold">'
            }
            i++;
        }
        elementString += val.slice(flattened_arr[i - 1]) + "</div>"
        setInfo(elementString);
    }

    const showElem2 = () => {
        const sortedArray = sortArray(italic);
        const result = mergeArray(sortedArray);
        const val = value.blog;
        // let elementString = `<div>${val}</div>`
        let elementString = ''
        const flattened_arr = result.flat();
        let i = 0;
        // let length = elementString.length;
        while (i < flattened_arr.length) {
            if (i == 0) {
                if (selectedInd.filter((subarr: any) => JSON.stringify([flattened_arr[i - 1], flattened_arr[i]]) == JSON.stringify(subarr)).length) {
                    elementString = info.slice(0, 5) + val.slice(0, flattened_arr[i]) + info.slice(flattened_arr[i + 1])
                } else {
                    elementString = '<div>' + val.slice(0, flattened_arr[i]) + '<span className="italic">';
                }
            }
            else if (i % 2 == 1) {
                elementString = elementString + val.slice(flattened_arr[i - 1], flattened_arr[i]) + '</span>'
            } else {
                if (selectedInd.filter((subarr: any) => JSON.stringify([flattened_arr[i - 1], flattened_arr[i]]) == JSON.stringify(subarr)).length) {

                } else {
                    elementString = elementString + val.slice(flattened_arr[i - 1], flattened_arr[i]) + '<span className="italic">'
                }
            }
            i++;
        }
        elementString += val.slice(flattened_arr[i - 1]) + "</div>"
        setInfo(elementString);
    }

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => { window.removeEventListener("mouseup", handleMouseUp); }
    }, []);


    return (
        <>
            <div className="flex flex-col gap-3 p-4">
                <div className="flex gap-4">
                    <Button onPress={boldText} className="max-w-sm"> B </Button>
                    <Button onPress={italictext} className="max-w-sm"> I </Button>
                    <Button onPress={showElem} className="max-w-sm"> Show Element </Button>
                    <Button onPress={showElem2} className="max-w-sm"> Make italics </Button>
                </div>

                <div className="flex flex-col flex-1 gap-3 mx-[25%] h-screen">
                    <div>
                        <Textarea
                            id="title"
                            placeholder="Blog Title..."
                            value={value.blogTitle}
                            onChange={handle}
                            classNames={{ input: "text-3xl" }}
                        />
                    </div>
                    <div className="flex">
                        <Textarea
                            id="blog"
                            value={value.blog} onChange={handle}
                            // disableAutosize
                            classNames={{
                                base: "",
                                input: "min-h-full p-4 resize-none",
                                inputWrapper: "max-h-screen md:min-h-[450px]"
                            }}
                            placeholder="Write a Blog..."
                        />
                    </div>
                    <div className={`flex h-50 border ${hidden && 'hidden'}`} onClick={() => setHidden(!hidden)}>
                        Blog Title...
                    </div>
                    <div className={`flex relative ${!hidden && 'hidden'}`}>
                        <Textarea  />
                        <Button className="right-0 bottom-0 absolute" variant="flat" color="success" onPress={() => setHidden(!hidden)}> Upload Blog</Button>
                    </div>

                    {/* <div className="flex flex-col flex-1 border">
                        <div className="flex flex-1 p-4"> {selected} </div>
                        <div className="flex flex-1 border"> */}
                    {/* {elem[elem.length - 1]} */}
                    {/* {value}
                        </div>
                        <div className="flex flex-1 p-4">
                            {HTMLReactParser(info)}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default CreateBlog;