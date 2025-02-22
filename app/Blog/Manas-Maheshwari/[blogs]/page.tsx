import CustomBlog from "@/app/components/blogs";
export function generateStaticParams() { // Only for deployment it is used..Rather than no use of this
  return [{ blogs: '1' }];
}

const Customblog = ({ params }: { params: { blogs: string } }) => {
  return <CustomBlog params={params} />
}

export default Customblog;