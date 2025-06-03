import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Optional: Uncomment to debug
    // console.log("Current formData:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Signup success:", data);
      alert("User registered successfully!");

      // Optionally reset form
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Signup failed:", err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <span className="text-blue-700 cursor-pointer">Sign In</span>
      </div>
    </div>
  );
};

export default SignUp;
