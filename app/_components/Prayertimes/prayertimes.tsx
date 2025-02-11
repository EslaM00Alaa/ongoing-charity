"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import cover from "../../../public/masged.jpg";
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
const Prayertimes = () => {
  const [city, setCity] = useState("جاري تحديد الموقع...");
  const [prayerTimes, setPrayerTimes] = useState([]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Get city name using reverse geocoding
          const cityName = await getCityFromCoordinates(latitude, longitude);
          setCity(cityName);

          // Fetch prayer times for the city
          fetchPrayerTimes(cityName);
        },
        () => {
          setCity("تعذر تحديد الموقع");
        }
      );
    } else {
      setCity("ميزة تحديد الموقع غير مدعومة");
    }
  }, []);

  // Reverse geocoding to get the city name
  const getCityFromCoordinates = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address.city || data.address.town || "مدينة غير معروفة";
  };

  // Fetch prayer times using the Aladhan API
  const fetchPrayerTimes = async (cityName) => {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Egypt&method=5`
    );
    const data = await response.json();
    if (data.data && data.data.timings) {
      setPrayerTimes(data.data.timings);
    }
  };

  return (
    <div className="relative h-screen lg:h-[calc(100vh-310px)]">
      <Image
        src={cover}
        alt="Masged Cover"
        fill
        priority
        className="object-cover"
      />
      {/* Dark Layer */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Title and Advice */}
      <div className="absolute z-20 text-white w-full px-4 lg:px-0 text-center" style={{ direction: "rtl" }}>
        <div className="mt-32 lg:mt-64">
          <motion.h1
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl lg:text-7xl font-bold mb-4">مواقيت الصلاة</motion.h1>
          <motion.p
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg lg:text-4xl">احرص على أداء الصلاة في وقتها فهي عمود الدين وأعظم القربات</motion.p>
          
        </div>
      </div>

      {/* Prayer Times Cards */}
      <motion.div
      variants={fadeIn("up", 0.7)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="absolute bottom-0 left-0 right-0 z-10 backdrop-blur-sm py-6">
        <div className="w-11/12 lg:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer, index) => (
            <div key={index} className="bg-gray-300/30 text-white p-4 text-center rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-1">{`صلاة ${translatePrayer(prayer)}`}</h2>
              <span className="text-2xl">{prayerTimes[prayer] || "جاري التحميل..."}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Function to translate prayer names to Arabic
const translatePrayer = (prayer) => {
  const translations = {
    Fajr: "الفجر",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };
  return translations[prayer];
};

export default Prayertimes;
