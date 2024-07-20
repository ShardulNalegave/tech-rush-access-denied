import { createFileRoute,Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

import { useState } from "react";

export default function Login() {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      let response = await fetch("http://localhost:8080/login", {
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
		<div className="min-h-screen flex items-center bg-gray-100 justify-center p-8 overflow-hidden">
			<div className="relative rounded-lg h-[70vh] max-w-[80vw] w-full bg-white p-10 shadow-lg">
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
								Login
								<div className="absolute left-0 bottom-0 h-[3px] w-[25px] bg-yellow-500" />
							</div>
							<form onSubmit={handleSubmit} className="mt-7">
								<div className="space-y-4">
									<div className="flex items-center mb-7 h-12 w-full relative">
										<i className="fas fa-envelope absolute left-4 text-yellow-500" />
										<input
											type="text"
											name="email"
											value={formData.email}
											onChange={handleOnChange}
											placeholder="Enter your email"
											required
											className="h-full rounded-md w-full outline-none border-b-2 pl-12 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset text-lg font-medium border-gray-300 focus:border-yellow-500 transition duration-300"
										/>
									</div>
									<div className="flex items-center  h-12 w-full relative">
										<i className="fas fa-lock absolute left-4 text-yellow-500" />
										<input
											type="password"
											name="password"
											value={formData.password}
											onChange={handleOnChange}
											placeholder="Enter your password"
											required
											className="h-full rounded-md w-full outline-none border-b-2 pl-12 text-lg ring-inset ring-gray-300 focus:ring-1 focus:ring-inset font-medium border-gray-300 focus:border-yellow-500 transition duration-300"
										/>
									</div>
									<div className="text-sm mb-7 font-medium SFB text-gray-800">
										<a href="#" className="hover:underline">
											Forgot password?
										</a>
									</div>
									<div className="mt-10 mr-5">
										<input
											type="submit"
											value="Submit"
											className="w-full py-3 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-amber-500"
										/>
									</div>
									<div className="text-center SFB text-sm font-medium text-gray-800 mt-4">
										Don&apos;t have an account?{" "}
										<label className="cursor-pointer SFB text-yellow-500 hover:underline">
											<Link to="/auth/signup">Sign up now</Link>
										</label>
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
