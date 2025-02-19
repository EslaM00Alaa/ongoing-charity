"use client";
import React, { useState } from "react";
import Header from "../_components/header/header";
import Footer from "../_components/footer/footer";
import data from "../../data/azkar.json"; // Import JSON data
import { fadeIn } from "../variants";
import { motion } from "framer-motion";
import Link from "next/link";






// Define a type for the azkar item
type AzkarItem = {
  category: string;
  count: string;
  description: string;
  reference: string;
  content: string;
};

// Define a type for the azkar data
type AzkarData = Record<string, AzkarItem[]>; // Each key is a string and its value is an array of AzkarItem objects

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Cast imported data to AzkarData type
  const azkarData = data as AzkarData;

  // Flatten the data into an array of objects with a `name` property from `content`
  const azkars = Object.keys(azkarData).map((key) => ({ name: key }));

  const filteredAzkars = azkars.filter((azkar) =>
    (azkar.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

       <div className="text-center my-12" style={{ direction: "rtl" }}>
             <motion.h2
              variants={fadeIn("up",.1)}
              initial="hidden"
              animate="show"
             className="text-2xl text-[#518676] lg:text-6xl font-bold mb-4">الاذكار</motion.h2>
            <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="lg:mb-8 w-11/12 lg:w-5/12 mx-auto text-xl lg:text-3xl text-gray-600"
          >
            مجموعة من الأذكار والأدعية المأثورة عن النبي صلى الله عليه وسلم، تذكرك بالله وتبعث الطمأنينة في النفس.
          </motion.p>
           </div>

      <div className="mb-12 lg:my-12 w-full lg:w-9/12 mx-auto" style={{ direction: "rtl" }}>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          className="relative w-10/12 lg:w-3/12 mx-auto"
        >
          <input
            type="text"
            placeholder="البحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-5 text-2xl px-4 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#518676]"
          />
        </motion.div>
      </div>

      <div className="flex w-11/12 lg:w-9/12 flex-wrap mx-auto justify-start" style={{ direction: "rtl" }}>
        {filteredAzkars.length > 0 ? (
          filteredAzkars.map((azkar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="px-4 mb-8 w-10/12 mx-auto sm:w-6/12 lg:w-4/12 xl:w-3/12"
            >
              <Link href={`/azkar/${index}`}>
                <div className="bg-white cursor-pointer rounded-xl shadow-lg h-48 flex items-center justify-center text-center">
                  <h3 className="text-2xl w-9/12 mx-auto lg:text-4xl font-bold text-gray-800">{azkar.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="w-full text-center text-2xl text-gray-600">لا توجد نتائج مطابقة</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
