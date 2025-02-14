"use client";
import React, { useState } from "react";
import Header from "../_components/header/header";
import Footer from "../_components/footer/footer";
import data from "../../data/ahadith.json"; // Import JSON data
import { fadeIn } from "../variants";
import { motion } from "framer-motion";
import Link from 'next/link';

// Define the type for each hadith object
type Hadith = {
  name: string;
  hadith: string;
};

const Page: React.FC = () => {
  const [ahadiths] = useState<Hadith[]>(data.ahadiths); // Initialize state with ahadith data
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state

  // Filter the ahadiths based on the search term
  const filteredAhadiths = ahadiths.filter((hadith) =>
    hadith.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

      <div className="text-center my-12" style={{ direction: "rtl" }}>
        <motion.h2
         variants={fadeIn("up",.1)}
         initial="hidden"
         animate="show"
        className="text-2xl text-[#518676] lg:text-6xl font-bold mb-4">الأربعين النووية</motion.h2>
        <motion.p
         variants={fadeIn("up",.3)}
         initial="hidden"
         animate="show"
        className="lg:mb-8 text-xl lg:text-3xl text-gray-600">
          هنا تجد قائمة بالأحاديث النبوية الواردة في الأربعين النووية.
        </motion.p>
      </div>

      <div className="mb-12 lg:my-12 w-full lg:w-9/12 mx-auto" style={{ direction: "rtl" }}>
        <motion.div
         variants={fadeIn("up", .4)}
         initial="hidden"
         animate="show"
        className="relative w-10/12 lg:w-3/12 mx-auto">
          <input
            type="text"
            placeholder="البحث عن الحديث بالاسم"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-5 text-2xl px-4 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#518676]"
          />
        </motion.div>
      </div>

      <div className="flex w-11/12 lg:w-9/12 flex-wrap mx-auto justify-start" style={{"direction":"rtl"}}>
        {filteredAhadiths.length > 0 ? (
          filteredAhadiths.map((hadith, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="px-4 mb-8 w-10/12 mx-auto sm:w-6/12 lg:w-4/12 xl:w-3/12"
            >
              <Link href={`/ahadiths/${index}`}>
                <div className="bg-white cursor-pointer rounded-xl shadow-lg h-48 flex items-center justify-center text-center">
                  <h3 className="text-2xl lg:text-4xl font-bold text-gray-800">{hadith.name}</h3>
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
