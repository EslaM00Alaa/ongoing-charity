"use client";
import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import bgimage from "../../../public/85215.jpg";
import data from "../../../data/alsera.json";
import { fadeIn } from "../../variants";

const Page: React.FC = () => {
  const router = useRouter();
  const { index } = useParams();
  const currentIndex = parseInt(index as string, 10) || 0;

  // تأكد من أن الفهرس في النطاق الصحيح
  const isValidIndex = currentIndex >= 0 && currentIndex < data.length;

  // استرجاع الفيديو الحالي
  const currentVideo = isValidIndex ? data[currentIndex] : data[0];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgimage.src})`,
        direction: "rtl",
      }}
    >
      {/* زر الرجوع */}
      <motion.div variants={fadeIn("left", 0.2)} initial="hidden" animate="show" className="self-start">
        <Link
          href="/alsera"
          className="font-bold text-xl lg:text-3xl flex items-center w-fit py-3 px-7 my-4 bg-white rounded-xl"
        >
          <span className="ml-2">
            <GoArrowRight />
          </span>
          <h3>الرجوع</h3>
        </Link>
      </motion.div>

      {/* فيديو في الوسط */}
      <div className="flex flex-col justify-center items-center w-full flex-1">
        <motion.div variants={fadeIn("up", 0.3)} initial="hidden" animate="show" className="w-full  sm:w-11/12 lg:w-7/12">
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full min-h-96 h-full rounded-lg shadow-lg"
              src={currentVideo.url}
              title={currentVideo.name}
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* أزرار التنقل بين الفيديوهات */}
        <div className="flex justify-between w-full sm:w-11/12 lg:w-7/12 mt-4">
          <button
            className={`px-6 py-3 rounded-lg font-bold ${
              currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#518676] text-white "
            }`}
            disabled={currentIndex === 0}
            onClick={() => router.push(`/alsera/${currentIndex - 1}`)}
          >
            الفيديو السابق
          </button>

          <button
            className={`px-6 py-3 rounded-lg font-bold ${
              currentIndex === data.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#518676] text-white "
            }`}
            disabled={currentIndex === data.length - 1}
            onClick={() => router.push(`/alsera/${currentIndex + 1}`)}
          >
            الفيديو التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
