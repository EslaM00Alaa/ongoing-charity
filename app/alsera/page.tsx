"use client";
import React, { useState } from "react";
import Header from "../_components/header/header";
import Footer from "../_components/footer/footer";
import { fadeIn } from "../variants";
import { motion } from "framer-motion";
import Link from "next/link";
import data from "../../data/alsera.json"; // استيراد بيانات السيرة النبوية

type Lesson = {
  name: string;
  url: string;
};

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // قائمة الدروس (الفلترة حسب البحث)
  const filteredLessons = data.filter((lesson: Lesson) =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

      {/* عنوان الصفحة */}
      <div className="text-center my-12" style={{ direction: "rtl" }}>
        <motion.h2
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          className="text-2xl text-[#518676] lg:text-6xl font-bold mb-4"
        >
          السيرة النبوية
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          className="lg:mb-8 w-11/12 lg:w-5/12 mx-auto text-xl lg:text-3xl text-gray-600"
        >
          سيرة النبي محمد ﷺ من مولده إلى وفاته، تتضمن الأحداث والمواقف التي شكلت الإسلام
        </motion.p>
      </div>

      {/* مربع البحث */}
      <div className="mb-12 lg:my-12 w-full lg:w-9/12 mx-auto" style={{ direction: "rtl" }}>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          className="relative w-10/12 lg:w-3/12 mx-auto"
        >
          <input
            type="text"
            placeholder="البحث عن درس..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-5 text-2xl px-4 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#518676]"
          />
        </motion.div>
      </div>

      {/* قائمة الدروس */}
      <div className="flex flex-wrap justify-center w-11/12 lg:w-9/12 mx-auto" style={{ direction: "rtl" }}>
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson: Lesson, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="p-4 w-11/12  sm:w-8/12 lg:w-5/12 xl:w-4/12"
            >
              <Link href={`/alsera/${index}`}>
                <div className="bg-white shadow-lg min-h-36 text-start rounded-xl p-6  hover:bg-gray-100 transition duration-300">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#518676]">{lesson.name}</h3>
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
