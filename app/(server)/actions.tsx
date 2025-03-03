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
    const Path = path.join(process.cwd(), "/getblogs");
    const res = await fetch(Path, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    })
    const data = await res.json();
    console.log(data);
    return data;
}
export { signup, getBlog }