import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SiderBar from "./SiderBar";

function Dashboard() {
  const [students, setStudents] = useState([]);
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
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  let studentToShow = students.slice(0, 5);

  return (
    <div className="flex h-screen">
      <SiderBar />
      <div className="flex-1 p-8 mt-[7%]">
        <h1 className="text-9xl ">Hello !</h1>
        <p className="text-2xl">Welcome to Dashboard</p>

        <div className="bg-white  p-6">
          <table className="w-full ">
            <thead>
              <tr className="text-black  text-xl border-t border-b border-gray-200">
                <th className="p-3 ">Id</th>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Level</th>
                <th className="p-3">University</th>
              </tr>

            </thead>
            <tbody>
              {studentToShow.map((e) => (
                <tr key={e._id} className="text-center   text-lg border-t border-b border-gray-200">
                  <td className="p-3 ">{e._id}</td>
                  <td className="p-3 ">{e.name}</td>
                  <td className="p-3 ">{e.age}</td>
                  <td className="p-3 ">{e.email}</td>
                  <td className="p-3 ">{e.phone}</td>
                  <td className="p-3 ">{e.level}</td>
                  <td className="p-3 ">{e.university}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className=" flex justify-center">
          <Link to="/Data">
            <button className="px-6 py-3 bg-[#700608] text-white  text-2xl font-bold  font-sans rounded-md shadow-md hover:bg-red-800">
              View All Data
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
