"use client";

import { Footer } from "./components/footer";
import Navigation from "./components/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Page() {
  const router = useRouter();

  return (
    <>
      <Navigation />

      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold text-blue-700 drop-shadow-lg mb-6">
            Welcome to the Future 🌟
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Explore cutting-edge research and innovative discoveries.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/researches")}
            className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Dive into Research 📚
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}

export default Page;
