"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import bgimage from "../../../public/sapha.jpg";
import nameImage from "../../../public/bg223.png";
import { fadeIn } from "../../variants";

// Define Surah and Ayah types
interface Ayah {
  number: number;
  text: string;
}

interface SurahData {
  number: number;
  name: string;
  ayahs: Ayah[];
}

const Surah: React.FC = () => {
  const params = useParams();
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  
  // المتغير الذي يحدد عدد الأحرف لكل بطاقة
  const maxCharsPerCard = 370;

  const index = parseInt(
    Array.isArray(params.index) ? params.index[0] : params.index || "1",
    10
  );

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await fetch(`http://api.alquran.cloud/v1/surah/${index}`);
        const data = await response.json();
        setSurahData(data.data);
      } catch (error) {
        console.error("Error fetching Surah data:", error);
      }
    };

    fetchSurah();
  }, [index]);

  // تقسيم الآيات حسب عدد الأحرف لكل بطاقة
  const groupAyahsByCharacters = (ayahs: Ayah[], maxChars: number): Ayah[][] => {
    const result: Ayah[][] = [];
    let currentGroup: Ayah[] = [];
    let currentCharCount = 0;

    ayahs.forEach((ayah) => {
      if (currentCharCount + ayah.text.length > maxChars && currentGroup.length > 0) {
        result.push(currentGroup);
        currentGroup = [];
        currentCharCount = 0;
      }
      currentGroup.push(ayah);
      currentCharCount += ayah.text.length;
    });

    if (currentGroup.length > 0) {
      result.push(currentGroup);
    }

    return result;
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col" style={{ direction: "rtl" }}>
      <motion.div variants={fadeIn("left", 0.2)} initial="hidden" animate="show">
        <Link href="/quran" className="font-bold text-xl lg:text-3xl flex items-center w-fit py-3 px-7 my-4 mr-4 bg-white rounded-xl">
          <span className="ml-2">
            <GoArrowRight />
          </span>
          <h3>الرجوع</h3>
        </Link>
      </motion.div>

      <motion.div variants={fadeIn("up", 0.5)} initial="hidden" animate="show" className="mt-8 text-center bg-opacity-70 backdrop-blur-sm">
        <div className="w-full relative lg:w-6/12 mx-auto px-5">
          <Image src={nameImage} alt="Surah Name" className="w-9/12 lg:w-5/12 my-0 mx-auto" />
          <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[24px] lg:-translate-y-[36px] text-center text-xl lg:text-4xl font-bold">
            {surahData?.name || "Loading..."} 
          </h2>
        </div>

        <div className="w-11/12 lg:w-6/12 mx-auto py-4 px-5 flex flex-col items-center justify-center text-center">
          {surahData?.ayahs?.length ? (
            groupAyahsByCharacters(surahData.ayahs, maxCharsPerCard).map((ayahGroup, groupIndex) => (
              <div
                key={groupIndex}
                className="mb-6 w-full relative"
                style={{
                  backgroundImage: `url(${bgimage.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "450px",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                {ayahGroup.map((ayah, idx) => (
                  <h2 key={idx} className="text-xl lg:text-4xl w-9/12 lg:w-7/12 mx-auto font-bold leading-[2] lg:leading-[3]">
                    {ayah.text} <span className="text-lg">({ayah.number})</span>
                  </h2>
                ))}
              </div>
            ))
          ) : (
            <h2 className="text-xl lg:text-3xl w-9/12 lg:w-7/12 mx-auto font-bold leading-[2]">لا توجد بيانات متوفرة</h2>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Surah;
