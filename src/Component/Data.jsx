import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SiderBar from "./SiderBar";
import { FaTrash } from "react-icons/fa";   
import { IoPerson } from "react-icons/io5"; 

function Data() {
    const [Students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("https://fake-form.onrender.com/api/students")
            .then((response) => {
                setStudents(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching group data:", err);
                setError("Failed to load group details.");
                setLoading(false);
            });
    }, []);

    const deleteStudent = (id) => {
        axios.delete(`https://fake-form.onrender.com/api/students/${id}`)
            .then((Delete) => {
                setStudents(Delete.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error deleting student:", err);
                setError("Failed to delete student.");
                setLoading(false);
            });
    };

    return (
        <div className="flex w-full h-full">
            <SiderBar />
            <div className="overflow-auto w-full p-4">
                {loading ? <p>Loading...</p> : null}
                {error ? <p className="text-red-600">{error}</p> : null}
                <h1 className="text-3xl font-bold mb-5 mt-4">Form Data</h1>
                <table className="w-full text-center">
    <thead>
        <tr className="text-black text-xl border-t border-b border-gray-200">
            <th className="px-6 py-3 whitespace-nowrap">Id</th>
            <th className="px-6 py-3 whitespace-nowrap">Name</th>
            <th className="px-6 py-3 whitespace-nowrap">Age</th>
            <th className="px-6 py-3 whitespace-nowrap ">Email</th>
            <th className="px-6 py-3 whitespace-nowrap">Phone</th>
            <th className="px-6 py-3 whitespace-nowrap">Level</th>
            <th className="px-6 py-3 whitespace-nowrap">University</th>
        </tr>
    </thead>
    <tbody>
        {Students.map((e) => (
            <tr key={e._id} className="text-lg border-t border-b border-gray-200">
                <td className="px-6 py-3">{e._id}</td>
                <td className="px-6 py-3 ">{e.name}</td>
                <td className="px-6 py-3">{e.age}</td>
                <td className="px-6 py-3 ">{e.email}</td>
                <td className="px-6 py-3">{e.phone}</td>
                <td className="px-6 py-3">{e.level}</td>
                <td className="px-6 py-3">{e.university}</td>
                <td className="px-6 py-3 flex justify-center space-x-4">
                    <button 
                        className="border-[#700608] bg-[#700608] text-white px-3 py-1 rounded-md flex items-center"
                        onClick={() => deleteStudent(e._id)}
                    >
                        <FaTrash className="mr-2" /> Delete
                    </button>

                    <Link to={`/update/${e._id}`}>
                        <button 
                            className="border-green-700 bg-green-700 text-white px-3 py-1 rounded-md flex items-center"
                        >
                            <IoPerson className="mr-2 text-lg" /> Edit
                        </button>
                    </Link>
                </td>
            </tr>
        ))}
    </tbody>
</table>

            </div>
        </div>
    );
}

export default Data;
