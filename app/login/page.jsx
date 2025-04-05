'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
  
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        
      });
  
      if (result?.error) {
        console.error("Login error:", result.error);
        setError(result.error);
      } else {
        console.log("Login successful, redirecting...");
        router.push("/");
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      setError("An error occurred during login");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold text-gray-900">Sign in</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-center">
          If You Don't Have Account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up here
          </Link>
        </p>


      </div>
    </div>
  );
}