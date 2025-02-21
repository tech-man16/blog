import { Link } from "@heroui/react";
// import logo from '@/app/images/blog-icon.jfif';

const Navbar = () => {

    return (
        <>
            <div className="flex h-20">
                <div className="flex flex-1 items-center p-4 border logo">
                   
                </div>
                <div className="flex flex-1 justify-end items-center gap-4 p-4 border">
                    <Link href="/create2">Create Blog</Link>
                    <span>45</span><span>45</span><span>45</span>
                </div>
            </div>
        </>
    )
}
export default Navbar;