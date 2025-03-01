import { userRegister } from "@/store/slices/userSlice";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function SignUp() {

const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    aboutMe: "",
    password: "",
    avatar: null,
    resume: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("aboutMe", formData.aboutMe);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("resume", formData.resume);

    for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

    dispatch(userRegister(formDataToSend));

    // try {
    //   const response = await fetch("http://localhost:4000/api/register", {
    //     method: "POST",
    //     body: formDataToSend, // ✅ Sending FormData
    //   });

    //   const result = await response.json();
    //   console.log("Response:", result);

    //   if (response.ok) {
    //     alert("Registration Successful!");
    //   } else {
    //     alert(`Error: ${result.message}`);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  return (
    <div>
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-5">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">About Me</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Profile Picture (Avatar)</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Resume (PDF/DOC)</label>
          <input
            type="file"
            name="resume"
            // accept=".pdf,.doc,.docx"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
      
    </div>
    <ToastContainer/>
    </div>
  );
}
