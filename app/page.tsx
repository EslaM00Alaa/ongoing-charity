"use client";
import Image from "next/image";
import cover from "../public/cover.jpg";
import { fadeIn } from "./variants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure animation only runs on the client
    const timer = setTimeout(() => {
      window.location.href = "/home"; // Redirect after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen">
      <Image
        src={cover}
        alt="صدقة جارية عن روح المرحوم محمد صلاح ابراهيم بكر"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        {isClient && ( // Render animations only after confirming it's the client
          <>
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              className="text-2xl md:text-7xl font-bold mb-6 md:mb-12 leading-[1.6]"
            >
              صدقة جارية عن روح المرحوم <br></br>محمد صالح ابراهيم بكر
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              animate="show"
              className="text-lg md:text-3xl leading-[1.6]"
            >
              اللهم اجعل هذا العمل في ميزان حسناته، ونورًا له في قبره، واغفر له
              ولجميع أموات المسلمين.
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
