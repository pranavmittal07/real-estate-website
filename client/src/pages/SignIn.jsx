import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/backend/auth/signin", {
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

      console.log("Signin success:", data);
      alert("User signed in successfully!");

      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Signin failed:", err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          Sign In
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don’t have an account?</p>
        <span className="text-blue-700 cursor-pointer">Sign Up</span>
      </div>
    </div>
  );
};

export default SignIn;
