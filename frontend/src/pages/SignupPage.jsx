import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../api/authApi";
import Navbar from "../components/Navbar";
export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    username: "",
    password: "",
    role: "RIDER",
    gender: "OTHER",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    vehicle: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const buildPayload = () => {
    const payload = {
      name: form.name,
      nickname: form.nickname || undefined,
      username: form.username,
      password: form.password,
      role: form.role,
      gender: form.gender,
      contact: {
        email: form.email,
        phone: form.phone
      },
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode
      }
    };

    if (form.vehicle) {
      payload.vehicle = form.vehicle;
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = buildPayload();
      await signupRequest(payload);
      setSuccess("Account created successfully!");
      setForm((prev) => ({
        ...prev,
        password: ""
      }));
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
              +
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              Create Account
            </h1>
          </div>
          <p className="text-sm text-slate-500 text-center">
            Sign up as Rider, Driver, or Admin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Info */}
            <section>
              <h2 className="text-sm font-semibold text-slate-700 mb-2">
                Basic Information
              </h2>
              <div className="h-px bg-slate-200 mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={50}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Nickname */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Nickname (optional)
                  </label>
                  <input
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={50}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter nickname"
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Username
                  </label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={20}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Choose a username"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-slate-300 px-3 py-2 pr-16 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="RIDER">Rider</option>
                    <option value="DRIVER">Driver</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="text-sm font-semibold text-slate-700 mb-2">
                Contact Information
              </h2>
              <div className="h-px bg-slate-200 mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section>
              <h2 className="text-sm font-semibold text-slate-700 mb-2">
                Address
              </h2>
              <div className="h-px bg-slate-200 mb-4" />

              <div className="space-y-3">
                {/* Street */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Street
                  </label>
                  <input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">
                      City
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City"
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">
                      State
                    </label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="State"
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">
                      Postal Code
                    </label>
                    <input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                      maxLength={6}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 560001"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Vehicle */}
            <section>
              <h2 className="text-sm font-semibold text-slate-700 mb-2">
                Vehicle (optional)
              </h2>
              <div className="h-px bg-slate-200 mb-4" />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Vehicle ID (Mongo ObjectId)
                </label>
                <input
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle document ID (if any)"
                />
                <p className="text-xs text-slate-500">
                  Leave empty if not assigned yet.
                </p>
              </div>
            </section>

            {/* Error / Success + Submit */}
            <section>
              {error && (
                <p className="text-sm text-red-500 mb-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-600 mb-2">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </section>
          </div>
        </form>
      </div>
    </div></>
  );
}
