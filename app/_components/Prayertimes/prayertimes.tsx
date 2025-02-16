"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import cover from "../../../public/masged.jpg";
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const Prayertimes: React.FC = () => {
  const [city, setCity] = useState<string>("جاري تحديد الموقع...");
const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const cityName = await getCityFromCoordinates(latitude, longitude);
          setCity(cityName);
          fetchPrayerTimes(cityName);
        } catch (error) {
          setCity("المنيا");
          fetchPrayerTimes("المنيا");
        }
      },
      () => {
        setCity("المنيا");
        fetchPrayerTimes("المنيا");
      }
    );
  } else {
    setCity("المنيا");
    fetchPrayerTimes("المنيا");
  }
}, []);

const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address.city || data.address.town || "مدينة غير معروفة";
  } catch {
    return "مدينة غير معروفة";
  }
};

const fetchPrayerTimes = async (cityName: string) => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Egypt&method=5`
    );
    const data = await response.json();
    if (data.data && data.data.timings) {
      setPrayerTimes(data.data.timings);
    }
  } catch {
    console.error("Failed to fetch prayer times.");
  }
};
const convertTo12HourFormat = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour < 12 ? "ص" : "م";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  // Convert numbers to Arabic numerals
  const toArabicNumbers = (num: number) => num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

  return `${toArabicNumbers(formattedHour)}:${toArabicNumbers(minute)} ${suffix}`;
};


const translatePrayer = (prayer: string): string => {
  const translations: Record<string, string> = {
    Fajr: "الفجر",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };
  return translations[prayer] || prayer;
};



  return (
    <div className="relative h-screen lg:h-[calc(100vh-310px)]">
      <Image src={cover} alt="Masged Cover" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div
        className="absolute z-20 text-white w-full px-4 lg:px-0 text-center"
        style={{ direction: "rtl" }}
      >
        <div className="mt-12 lg:mt-64">
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl lg:text-7xl font-bold mb-4"
          >
            مواقيت الصلاة
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg lg:text-4xl"
          >
            احرص على أداء الصلاة في وقتها فهي عمود الدين وأعظم القربات
          </motion.p>
        </div>
      
      </div>

      <motion.div
        variants={fadeIn("up", 0.7)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 z-10 backdrop-blur-sm py-6"
      >
        <div className="w-11/12 lg:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer, index) => (
            <div
              key={index}
              className="bg-gray-300/30 text-white p-4 text-center rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold mb-1">{`صلاة ${translatePrayer(prayer)}`}</h2>
              <span className="text-2xl" style={{"direction":"rtl"}} >
              {prayerTimes ? convertTo12HourFormat(prayerTimes[prayer as keyof PrayerTimes]) : "جاري التحميل..."}
              </span>

            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Prayertimes;
