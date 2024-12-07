import { Link } from "react-router";

function Signup() {
  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);
  }



  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-white block">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-white block">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white block">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="mt-7 w-1/2 bg-white text-black py-3 rounded-md hover:bg-gray-100 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
