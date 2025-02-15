import React from 'react';
import Image from 'next/image';
import im1 from "../../../public/image22.png";
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
const Pray = () => {
  return (
    <div className='bg-white py-12'>
      <div className='w-11/12 lg:w-8/12 mx-auto flex flex-col lg:flex-row items-center justify-between'>
        {/* صورة الدعاء */}
        <motion.div
         variants={fadeIn("up", 0.2)}
         initial="hidden"
         whileInView="show"
         viewport={{ once: true }}
        className='flex-shrink-0 w-60 h-60 md:w-96 md:h-96'>
        <Image src={im1} alt="دعاء للمرحوم" width={500} height={500} className="w-full h-full object-cover" />
        </motion.div>


        {/* نص الأدعية */}
        <div  className='text-center lg:text-start text-gray-800 text-lg leading-relaxed' style={{"direction":"rtl"}}>
          <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className='text-3xl lg:text-5xl font-bold mb-4 text-gray-900'>
            دعاء للمرحوم <br></br> محمد صالح ابراهيم بكر  
          </motion.h2>
          {[  
                "اللهم اغفر له وارحمه، وعافه واعف عنه، وأكرم نزله ووسع مدخله.",  
                "اللهم اجعل قبره روضة من رياض الجنة، ولا تجعله حفرة من حفر النار.",  
                "اللهم نقه من الذنوب والخطايا كما ينقى الثوب الأبيض من الدنس.",  
                "اللهم ابدله داراً خيراً من داره، وأهلاً خيراً من أهله، وزوجاً خيراً من زوجه.",  
                "اللهم اجعل هذا العمل صدقة جارية تنير قبره وتكون في ميزان حسناته.",  
                "اللهم اغفر لجميع أموات المسلمين واجعل مثواهم الجنة."  
                ].map((text, index) => (
                <motion.p
                    key={index}
                    variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { delay: index * 1, duration: 0.8 } }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className='text-xl lg:text-2xl line-clamp-2 mb-3'
                >
                    {text}
                </motion.p>
                ))}

        </div>
      </div>
    </div>
  );
};

export default Pray;
