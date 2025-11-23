// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   InputAdornment,
//   IconButton
// } from "../../node_modules/@mui/material";
// import { Visibility, VisibilityOff, Login } from "../../node_modules/@mui/icons-material";
// import { loginRequest } from "../api/authApi";
// import { useAuthStore } from "../store/authStore";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const login = useAuthStore((state) => state.login);

//   const [form, setForm] = useState({
//     username: "",
//     password: ""
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await loginRequest(form);
//       // Expecting backend to return { token, role }
//       const { token, role } = res.data;

//       login(token, role); // store in Zustand
//       if (role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Login failed. Please check credentials."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardContent className="p-6 md:p-8">
//           <div className="flex flex-col items-center mb-6">
//             <div className="flex items-center gap-2 mb-1">
//               <Login />
//               <Typography variant="h5" component="h1" className="font-semibold">
//                 Welcome Back
//               </Typography>
//             </div>
//             <Typography variant="body2" color="text.secondary">
//               Log in to access your dashboard
//             </Typography>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <TextField
//               label="Username"
//               name="username"
//               type="text"
//               value={form.username}
//               onChange={handleChange}
//               fullWidth
//               required
//               size="small"
//             />

//             <TextField
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={form.password}
//               onChange={handleChange}
//               fullWidth
//               required
//               size="small"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       edge="end"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />

//             {error && (
//               <Typography
//                 variant="body2"
//                 className="text-red-500 text-sm mt-1"
//               >
//                 {error}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               className="mt-2 normal-case"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <Typography variant="body2" color="text.secondary">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Sign up
//               </Link>
//             </Typography>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginRequest(form);
      // Expecting backend to return { token, role }
      const { token, role } = res.data;

      login(token, role); // store in Zustand
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (<>
  
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
              {/* Simple "login" icon substitute */}
              <span>↪</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              Welcome Back
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Log in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 mt-1">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div></>
  );
}
