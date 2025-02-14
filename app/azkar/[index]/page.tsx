"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useParams } from "next/navigation";
import data from "../../../data/azkar.json"; // Import JSON data
import bgimage from "../../../public/85215.jpg"; // Background image
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
import Clapping from "@/app/_components/clapping/clapping";

type AzkarItem = {
  category: string;
  count: string;
  description: string;
  reference: string;
  content: string;
};

const Hadith = () => {
  const params = useParams();
  const [curIndex, setCurIndex] = useState(0);
  const [curCount, setCurCount] = useState(0);
  const [finished, setFinished] = useState(false); // Track if all Azkars are completed

  const index = parseInt(Array.isArray(params.index) ? params.index[0] : params.index || "0");
  const azkarData: Record<string, AzkarItem[]> = data;
  const azkars = Object.keys(azkarData);

  const Azkars = azkarData[azkars[index]] || [];

  const handleClick = () => {
    setCurCount((prev) => {
      if (prev + 1 >= +Azkars[curIndex].count) {
        if (curIndex + 1 < Azkars.length) {
          setCurIndex(curIndex + 1);
          return 0;
        }
        setFinished(true); // Mark as finished when all Azkars are completed
        return prev;
      }
      return prev + 1;
    });
  };

  // Show Clapping component if finished
  if (finished) {
    return <Clapping />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage: `url(${bgimage.src})`,
        direction: "rtl",
      }}
    >
      <motion.div variants={fadeIn("left", 0.2)} initial="hidden" animate="show">
        <Link
          href="/azkar"
          className="font-bold text-xl lg:text-3xl flex items-center w-fit py-3 px-7 my-4 mr-4 bg-white rounded-xl"
        >
          <span className="ml-2">
            <GoArrowRight />
          </span>
          <h3>الرجوع</h3>
        </Link>
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        animate="show"
        className="mt-8 text-center bg-opacity-70 backdrop-blur-sm"
      >
        <div className="w-11/12 lg:w-6/12 mx-auto py-4 px-5 bg-white rounded-t-xl">
          <h2 className="text-2xl font-bold text-start leading-[2]">
            {Azkars[curIndex]?.content || "لا توجد أذكار متوفرة"}
          </h2>
        </div>

        <div className="flex justify-between items-center w-11/12 lg:w-6/12 mx-auto py-2 px-5 bg-[#518676] text-white rounded-b-xl">
          <div className="w-4/12 text-center"></div>

          <div className="w-4/12 text-center">
            <button
              className="w-20 py-3 mx-auto bg-white text-[#518676] rounded-2xl flex items-center justify-center font-bold text-xl"
              onClick={handleClick}
            >
              اضغط
            </button>
          </div>

          <div className="w-4/12 text-center">
            <span className="text-lg font-bold">العدد:</span>
            <p>{curCount}/{Azkars[curIndex]?.count || 0}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hadith;
