"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const bgImage = "/clapping.jpg"; // ✅ Correct reference for images in public
const sound = "/clapping.mp3"; // ✅ Correct reference for audio files in public

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
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Image src={bgImage} alt="Clapping" width={500} height={500} className="max-w-full h-auto" />
    </div>
  );
};

export default Clapping;
