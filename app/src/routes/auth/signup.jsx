import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  component: Signup,
});

import { useState } from "react";

export default function Signup() {
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      let response = await fetch("http://localhost:8080/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.ok) {
        console.log("form data submitted");
        navigate("/home");
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        console.log("error in form submission");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="relative rounded-lg max-w-[80vw] w-full bg-white p-10 shadow-lg">
        <div className="absolute top-0 left-1/2 h-full w-1/2 z-[99] hidden lg:block">
          <div className="absolute top-0 left-0 h-full w-full z-[10]">
            <div className="absolute rounded-r-md top-0 left-0 h-full w-full bg-black opacity-50 z-[12]" />
            <img
              src="https://images.unsplash.com/photo-1577546568088-eb32790be7ec?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Logo2"
              className="absolute h-full w-full object-cover rounded-r-lg"
            />
            <img
              src="/src/assets/logos/png/logo-no-background.png"
              alt="Logo1"
              className="absolute h-full w-full object-contain p-4 z-20 rounded-r-lg"
            />
          </div>
        </div>
        <div className="h-full w-full bg-white lg:pl-2">
          <div className="flex items-center justify-between">
            <div className="w-full lg:max-w-[calc(50%-12.5px)]">
              <div className="relative Title text-xl font-medium text-gray-800">
                Signup
                <div className="absolute left-0 bottom-0 h-[3px] w-[25px] bg-yellow-500" />
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <i className="absolute px-2 left-0 top-1/2 transform -translate-y-1/2 text-yellow-500 fas fa-user"></i>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleOnChange}
                      placeholder="Enter your name"
                      className="pl-8 SFB pr-3 py-2 w-full rounded-md border-b-2 border-gray-300 focus:border-yellow-500 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:outline-none transition duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <i className="absolute px-2 left-0 top-1/2 transform -translate-y-1/2 text-yellow-500 fas fa-envelope"></i>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleOnChange}
                      placeholder="Enter your email"
                      className="pl-8 SFB pr-3 py-2 w-full rounded-md border-b-2 border-gray-300 focus:border-yellow-500 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:outline-none transition duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <i className="absolute px-2 left-0 top-1/2 transform -translate-y-1/2 text-yellow-500 fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
                      placeholder="Enter your password"
                      className="pl-8 SFB pr-3 py-2 w-full rounded-md border-b-2 border-gray-300 focus:border-yellow-500 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:outline-none transition duration-300"
                      required
                    />
                  </div>
                  <div className="mt-6 mr-5">
                    <input
                      type="submit"
                      value="Submit"
                      className="w-full SFB py-3 px-4 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300"
                    />
                  </div>
                  <div className="text-center SFB   mt-4 text-sm font-medium text-gray-800">
                    Already have an account?{" "}
                    <span className="text-yellow-500 SFB   cursor-pointer hover:underline">
                      Login now
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
