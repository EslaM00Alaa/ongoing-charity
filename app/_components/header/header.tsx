"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import logo from "../../../public/pray (1).png";
import styles from "./style.module.css";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1024);
    };

    // Check on initial load
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className={styles.header}>
      <div className="w-11/12 text-[#518676] lg:w-9/12 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" width={60} height={60} />
        </div>

        {/* Navigation Links for Large Screens */}
        {isLarge && (
        <nav className={`${styles.navLinks} hidden lg:flex`}>
          <Link href="/home" className={styles.navLink}>
            الرئيسية
          </Link>
          <Link href="/quran" className={styles.navLink}>
            القرآن
          </Link>
          <Link href="/alsera" className={styles.navLink}>
          السيرة النبوية
          </Link>
          <Link href="/ahadiths" className={styles.navLink}>
            الأربعين النووية
          </Link> 
          <Link href="/azkar" className={styles.navLink}>
            الأذكار
          </Link>
          
        </nav>
         )}

        {/* Menu Icon for Small Screens */}
        <div className={styles.menuIcon} onClick={() => setToggle(!toggle)}>
          {toggle ? <IoMdClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {toggle && (
        <div className={styles.mobileMenu} >
          <Link href="/home" className={styles.mobileLink} onClick={() => setToggle(false)}>
          الرئيسية
          </Link>
          <Link href="/quran" className={styles.mobileLink} onClick={() => setToggle(false)}>
            القرآن
          </Link>
          <Link href="/alsera" className={styles.mobileLink} onClick={() => setToggle(false)}>
          السيرة النبوية
          </Link>
          <Link href="/ahadiths" className={styles.mobileLink} onClick={() => setToggle(false)}>
            الأربعين النووية
          </Link>
          <Link href="/azkar" className={styles.mobileLink} onClick={() => setToggle(false)}>
            الأذكار
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
