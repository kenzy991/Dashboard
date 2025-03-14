import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SiderBar from "./SiderBar";

function Update() {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    level: "",
    university: "",
  });

  const [message, setMessage] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fake-form.onrender.com/api/students/${id}`)
      .then((response) => {
        setStudent(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setError("Failed to load student details.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    axios
      .patch(`https://fake-form.onrender.com/api/students/${id}`, student)
      .then(() => {
        setMessage("Student updated successfully!"); 
        setError(null); 
      })
      .catch(() => {
        setMessage(null);
        setError("Update failed. Try again.");
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex w-full h-full">
      <SiderBar />
      <div className="w-[80%]">
        <form className="p-4 bg-white w-full mt-2">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={(e) => setStudent((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full border p-2 rounded-md mb-5"
          />

          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={(e) => setStudent((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full border p-2 rounded-md mb-5"
          />

          <label className="block">Phone</label>
          <input
            type="tel"
            name="phone"
            value={student.phone}
            onChange={(e) => setStudent((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full border p-2 rounded-md mb-5"
          />

          <label className="block">Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={(e) => setStudent((prev) => ({ ...prev, age: e.target.value }))}
            className="w-full border p-2 rounded-md mb-5"
          />

          <label className="block">Level</label>
          <input
            type="text"
            name="level"
            value={student.level}
            onChange={(e) => setStudent((prev) => ({ ...prev, level: e.target.value }))}
            className="w-full border p-2 rounded-md mb-5"
          />

          <label className="block">University</label>
          <input
            type="text"
            name="university"
            value={student.university}
            onChange={(e) => setStudent((prev) => ({ ...prev, university: e.target.value }))}
            className="w-full border p-2 rounded-md mb-5"
          />

          <div>
            <button
              type="button"
              onClick={handleUpdate}
              className="mt-4 bg-[#700608] text-white py-3 px-4 rounded-md w-full"
            >
              Update
            </button>
            <Link to="/Data">
              <button
                type="button"
                className="mt-4 bg-[#700608] text-white py-3 px-4 rounded-md w-full"
              >
                Back
              </button>
            </Link>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
