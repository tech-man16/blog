import BlogList from "@/app/components/blogMain";
export default function PAGE() {
  return <BlogList />
}

// return (
//   <>
//     <div className="flex flex-col border-2 border-green-400 h-screen">
//       <div className="relative gap-4 grid grid-cols-1 md:grid-cols-12 p-4 max-h-full overflow-auto cursor-pointer">
//         <div className="md:top-0 md:left-0 z-20 md:sticky col-span-1 md:col-span-12 h-16 text-2xl">
//           <Input classNames={{ inputWrapper: "h-full", base: "h-full" }} onChange={handle} value={val} placeholder="Search Blog..." />
//         </div>
//         {typeof initial == 'object' &&
//           initial.map((elem: any, ind: number) => (
//             <Card isFooterBlurred
//               key={ind}
//               className={`col-span-1 md:col-span-3 bg-gradient-to-tr hover:bg-gradient-to-tr from-purple-500 hover:from-purple-500/80 to-purple-700 hover:to-purple-700/80 min-w-[80%] md:min-w-[80%] min-h-[300px]`}
//             >
//               <CardHeader className="top-1 z-10 absolute justify-between items-start">
//                 <p className="font-bold text-tiny text-white/60 uppercase">New</p>
//                 <Button
//                   isIconOnly
//                   className="data-[hover]:bg-foreground/10 text-default-900/60 -translate-y-2 translate-x-2"
//                   radius="full"
//                   variant="light"
//                   onPress={() => setLiked((v) => !v)}
//                 >
//                   <HeartIcon
//                     className={liked ? "[&>path]:stroke-transparent" : ""}
//                     fill={liked ? "red" : "none"}
//                   />
//                 </Button>
//               </CardHeader>

//               <CardBody className={`flex justify-center items-center bg-[url(/tmp/67b0b9ce5af6be8412662cadcoverimage.jpg)]`}>
//                 {/* <Image className="w-full" src={`/tmp/${elem._id.toString()}coverimage.jpg`} alt="coverimage" width={100} height={100} /> */}
//                 <span className="text-large"> Blog {ind + 1}  </span>
//               </CardBody>

//               <CardFooter className="bottom-0 z-10 absolute justify-between bg-white/30 border-zinc-100/50 border-t-1">
//                 <span className="w-2/3 text-black"> {elem.title} </span>
//                 <Button className="text-tiny" color="primary" radius="full" size="sm">
//                   Read Blog
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))
//         }

//       </div>
//       {typeof initial == 'object' && initial.length == 0 && <span className="flex flex-1 justify-center items-center">No Blog Exists </span>}
//     </div>
//   </>
// )
// }

