import { Link, useLocation } from "react-router-dom";

function SiderBar() {
    const location = useLocation();

    return (
        <div className="flex flex-col h-full bg-black/90 w-[20%] text-white p-4 overflow-y-auto">
            <img src="/logo-2e33b7a0.png" className="w-20 mb-6 ml-[30%]" alt="logo" />
            <nav className="flex flex-col space-y-4">
                <Link
                    to="/"
                    className={`p-3 rounded-md ${location.pathname === "/" ? "bg-red-900" : "bg-transparent"}`}
                >
                    <span className="text-xl">Dashboard</span>
                </Link>
                <Link
                    to="/Data"
                    className={`p-3 rounded-md ${location.pathname === "/Data" ? "bg-red-900" : "bg-transparent"}`}
                >
                    <span className="text-xl">Data</span>
                </Link>
            </nav>
        </div>
    );
}

export default SiderBar;
