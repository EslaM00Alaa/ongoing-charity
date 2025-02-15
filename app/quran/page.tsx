"use client";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../_components/header/header";
import Footer from "../_components/footer/footer";
import { fadeIn } from "../variants";
import { motion } from "framer-motion";
import Link from "next/link";

import bgImage from "../../public/bg223.png"

// دالة لإزالة التشكيل من النصوص العربية
const removeDiacritics = (text: string): string => {
  return text
    .normalize("NFKD") // تطبيع النص
    .replace(/[\u064B-\u0652]/g, ""); // إزالة التشكيل
};

// تعريف نوع بيانات السورة
type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // جلب بيانات السور من API
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("http://api.alquran.cloud/v1/surah");
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        console.error("فشل في جلب بيانات السور:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // تصفية السور بناءً على البحث مع إزالة التشكيل
  const filteredSurahs = useMemo(() => {
    if (!searchTerm) return surahs;

    const normalizedSearch = removeDiacritics(searchTerm.toLowerCase());

    return surahs.filter((surah) => {
      const arabicName = removeDiacritics(surah.name.toLowerCase());
      const englishName = surah.englishName.toLowerCase();

      return arabicName.includes(normalizedSearch) || englishName.includes(normalizedSearch);
    });
  }, [searchTerm, surahs]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

      <div className="text-center my-12" style={{ direction: "rtl" }}>
        <motion.h2
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          className="text-2xl text-[#518676] lg:text-6xl font-bold mb-4"
        >
          القرآن الكريم
        </motion.h2>
        <motion.p
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        animate="show"
        className="lg:mb-8 w-11/12 lg:w-5/12 mx-auto text-xl lg:text-3xl text-gray-600"
      >
        القرآن الكريم، كلام الله المعجز، نورٌ وهدى للعالمين، فيه شفاءٌ للقلوب، ورحمةٌ للمؤمنين، ودستورٌ للحياة يرشدنا إلى طريق الحق والنجاة.
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
            placeholder="البحث عن سورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-5 text-2xl px-4 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#518676]"
          />
        </motion.div>
      </div>

      {/* قائمة السور */}
      <div className="flex w-11/12 lg:w-9/12 flex-wrap mx-auto justify-start" style={{ direction: "rtl" }}>
        {loading ? (
          <div className="w-full text-center text-2xl text-gray-600">جاري التحميل...</div>
        ) : filteredSurahs.length > 0 ? (
          filteredSurahs.map((surah) => (
<motion.div
  key={surah.number}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: surah.number * 0.02, duration: 0.8 }}
  className="px-4 mb-8 w-10/12 mx-auto sm:w-6/12 lg:w-4/12 xl:w-3/12 "
>
  <Link href={`/quran/${surah.number}`}>
    <div
      className="relative cursor-pointer rounded-xl  h-52 flex items-center justify-center text-center text-white "
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* خلفية شفافة لضمان وضوح النص */}
      <div className="pb-6 rounded-md">
        <h3 className="text-2xl w-9/12 mx-auto lg:text-4xl font-bold text-gray-800">
          {surah.name}
        </h3>
      </div>
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
