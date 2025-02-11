import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-white py-6">
      <div className="w-11/12 lg:w-9/12 mx-auto text-center">
        <p className="text-2xl">جميع الحقوق محفوظة © 2025</p>
        <p className="mt-2 text-xl">
          تصميم وتطوير بواسطة 
          <span className="text-green-500 font-bold mx-3">
            <a href="https://web.facebook.com/profile.php?id=100008757813336&locale=ar_AR" target="_blank" rel="noopener noreferrer">
              إسلام
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
