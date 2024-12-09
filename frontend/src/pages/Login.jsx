import { Link } from "react-router"
import useLogin from "../hooks/useLogin"

function Login() {
  const { login, loading, error } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await login(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-white block">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              required
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
              required
            />
          </div>
          {error && <div className="mx-auto p-2 text-white bg-red-500 shadow-lg rounded-md text-center">{error}</div>}
          <div className="w-full text-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-1/2 bg-white text-black py-3 rounded-md hover:bg-gray-100 transition duration-200"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div >
    </div >
  );
}

export default Login;
