import React from "react";
import Image from "next/image";
import im1 from "../../../public/islamic.png";
import im2 from "../../../public/muhammad.png";
import im3 from "../../../public/quran.png";
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
const Service = () => {
  return (
    <div className="mb-96">
      {/* Title and Description */}
      <div className="text-center mt-36">
        <motion.h1
         variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl lg:text-6xl font-bold text-[#518676]">خدماتنا</motion.h1>
        <motion.p
         variants={fadeIn("up", 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-xl w-11/12 lg:w-4/12 mx-auto font-semibold text-gray-500 mt-4">
          نسعى دائمًا لتيسير حياتك الروحية، فجمعنا لك الأذكار، الأحاديث النبوية وآيات القرآن الكريم لتكون في متناول يدك.
        </motion.p>
      </div>

      {/* Service Cards */}
      <motion.div
       variants={fadeIn("up", 0.7)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      className="my-24 w-11/12 lg:w-9/12 flex flex-col lg:flex-row justify-between items-stretch mx-auto gap-10">
        {[{
            image: im1,
            title: "الأذكار",
            description: "أذكار الصباح والمساء لتكون رفيقة يومك وتمنحك السكينة.",
          },
          {
            image: im2,
            title: "الأربعين النووية",
            description: "مجموعة من الأحاديث النبوية الشريفة لتستلهم منها الحكمة والنصيحة.",
          },
          {
            image: im3,
            title: "القرآن",
            description: "نصوص القرآن الكريم لتمكنك من القراءة والاستماع والتدبر.",
          }
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white w-full cursor-pointer lg:w-3/12 p-5 flex flex-col justify-center items-center rounded-xl transition-transform transform hover:scale-105 shadow-lg"
          >
            <div className="w-32 h-32 rounded-full flex justify-center items-center bg-gray-100 mt-6 mb-8">
              <Image className="w-24 h-24" src={service.image} alt={service.title} />
            </div>
            <h4 className="text-4xl font-semibold text-gray-700 mb-4">{service.title}</h4>
            <p className="text-xl lg:text-3xl mt-2 mb-12 w-9/12 text-gray-500 text-center">{service.description}</p>
          </div>
        ))}
     
      </motion.div>
      
    </div>
  );
};

export default Service;
