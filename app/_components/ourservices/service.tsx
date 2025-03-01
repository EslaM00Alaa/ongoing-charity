import React from "react";
import Image from "next/image";
import im1 from "../../../public/islamic.png";
import im2 from "../../../public/muhammad.png";
import im3 from "../../../public/quran.png";
import im4 from "../../../public/ahadith.png";
import bg from "../../../public/bgservice.jpg";
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
import Link from "next/link";

const Service = () => {
  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to darken the background slightly */}
      <div className="absolute inset-0 "></div>

      {/* Content Section */}
      <div className="relative z-10 w-full">
        {/* Title and Description */}
        <div className="text-center mt-36">
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold text-[#518676]"
          >
            خدماتنا
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl w-11/12 lg:w-4/12 mx-auto font-semibold text-gray-700 mt-4"
          >
            نسعى دائمًا لتيسير حياتك الروحية، فجمعنا لك الأذكار، الأحاديث النبوية وآيات القرآن الكريم لتكون في متناول يدك.
          </motion.p>
        </div>

        {/* Service Cards */}
        <motion.div
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="my-24 w-11/12 lg:w-9/12 flex flex-col lg:flex-row justify-between items-stretch mx-auto gap-10"
        >
          {[
            {
              href: "quran",
              image: im3,
              title: "القرآن",
              description: "نصوص القرآن الكريم لتمكنك من القراءة والاستماع والتدبر.",
            }
            ,
            {
              href: "azkar",
              image: im1,
              title: "الأذكار",
              description: "أذكار الصباح والمساء لتكون رفيقة يومك وتمنحك السكينة.",
            }
            ,
            {
              href: "alsera",
              image: im2,
              title: "السيرة النبوية",
              description: "سيرة النبي محمد ﷺ من مولده إلى وفاته، تتضمن الأحداث والمواقف التي شكلت الإسلام.",
            },
            {
              href: "ahadiths",
              image: im4,
              title: "الأربعين النووية",
              description: "مجموعة من الأحاديث النبوية الشريفة لتستلهم منها الحكمة والنصيحة.",
            }
          ].map((service, index) => (
            <Link
              href={`${service.href}`}
              key={index}
              className="bg-white w-full cursor-pointer lg:w-3/12 p-5 flex flex-col justify-center items-center rounded-xl transition-all duration-700 ease-in-out transform hover:scale-105 shadow-lg hover:bg-[#518676] hover:text-white group"
            >
              <div className="w-32 h-32 rounded-full flex justify-center items-center bg-gray-100 mt-6 mb-8">
                <Image className="w-24 h-24" src={service.image} alt={service.title} />
              </div>
              <h4 className="text-4xl font-semibold text-gray-700 mb-4 group-hover:text-white">
                {service.title}
              </h4>
              <p className="text-xl lg:text-3xl mt-2 mb-12 w-9/12 text-gray-500 text-center group-hover:text-gray-200">
                {service.description}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Service;
