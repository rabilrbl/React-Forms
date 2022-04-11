import Loading from "../components/Loading";


export const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return <h2 className="flex justify-center h-full w-full">
        <Loading />
    </h2>;
}