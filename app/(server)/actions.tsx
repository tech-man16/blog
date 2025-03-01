import path from "path";

const signup = async (params: any) => {
    const PATH = path.join(process.cwd(), "/insertBlog");
    const res = await fetch(PATH, {
        method: "POST",
        body: JSON.stringify(params)
    })
    const data = await res.json();
    return data;
}

const getBlog = async (params: any) => {
    const Path = path.join(process.cwd(), "/getblog");
    const res = await fetch(Path, {
        method: "POST",
        body: JSON.stringify(params)
    })
    const data = await res.json();
    return data;
}
export { signup, getBlog }