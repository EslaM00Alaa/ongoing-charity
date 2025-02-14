"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useParams } from "next/navigation";
import data from "../../../data/ahadith.json"; // Import JSON data
import bgimage from "../../../public/85215.jpg"; // Background image
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
type Hadith = {
  name: string;
  hadith: string;
};

const Hadith = () => {
  const params = useParams(); // Get all route parameters
  const index = parseInt(params.index); // Ensure it's a number
  const [ahadiths] = useState<Hadith[]>(data.ahadiths);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage: `url(${bgimage.src})`,
        direction: "rtl",
      }}
    >
        <motion.div
         variants={fadeIn("left",.2)}
         initial="hidden"
         animate="show"
        >
     <Link
        href="/ahadiths"
        className="font-bold text-xl lg:text-3xl flex items-center w-fit py-3 px-7 my-4 mr-4 bg-white rounded-xl"
      >
        <span className="ml-2">
          <GoArrowRight />
        </span>
        <h3>الرجوع</h3>
      </Link>
        </motion.div>
    

      <motion.div
        variants={fadeIn("up",.5)}
        initial="hidden"
        animate="show"
       className="mt-8 text-center bg-opacity-70 backdrop-blur-sm">
        <div className="w-11/12 lg:w-6/12 mx-auto py-2 px-5 bg-[#518676] text-white rounded-t-xl">
          <h2 className="text-3xl font-bold">{ahadiths[index].name}</h2>
        </div>
        <div className="w-11/12 lg:w-6/12 mx-auto py-4 px-5 bg-white rounded-b-xl">
        <h2 className="text-2xl font-bold text-start leading-[2]">
            {ahadiths[index].hadith}
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default Hadith;
