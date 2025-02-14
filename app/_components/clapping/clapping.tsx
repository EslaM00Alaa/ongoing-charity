"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const bgImage = "/clapping.jpg";
const sound = "/clapping.mp3";

const Clapping = () => {
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio(sound);
    audio.play();

    audio.onended = () => {
      router.push("/azkar");
    };

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [router]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Clapping"
        layout="fill"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />
    </div>
  );
};

export default Clapping;
