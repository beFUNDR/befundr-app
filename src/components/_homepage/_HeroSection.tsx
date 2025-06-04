"use client";
import StatsGrid from "./StatsGrid";
import FeaturesList from "./FeaturesList";
import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import { useEffect, useState } from "react";
import ExploreProjectButton from "../buttons/ExploreProjectButton";
import ApplyButton from "../buttons/ApplyButton";
import Image from "next/image";

const HeroSection = () => {
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVideoVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatedBlock className="flex flex-col w-full">
      <div className="w-full relative h-[300px] overflow-hidden">
        <video
          src="/videos/video_homepage_compress.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover max-h-[400px] transition-opacity duration-1000 ${
            videoVisible ? "opacity-50 md:opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent" />
        <div className="absolute md:hidden bottom-1/5 left-1/2 -translate-x-1/2 w-full md:w-2/3 max-w-[600px]  p-6">
          <div className="relative w-full h-[120px]">
            <Image
              alt="logo"
              src={"/images/logo.png"}
              className="object-contain"
              priority
              fill
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row gap-12 py-16 px-4">
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h1 className=" h1Style mb-4 ">
            beFUNDR, the{" "}
            <strong className="text-accent">decentralized incubator</strong>
          </h1>
          <p className="bodyStyle max-w-xl">
            With beFUNDR, get in early to fund and contribute to the next Alpha,
            led by trusted builders, backed by real communities.
          </p>
          <p className="bodyStyle max-w-xl">
            We handpick the most promising projects from the top builders,
            endorsed by Solana&apos;s OG
          </p>
          <p className="bodyStyle max-w-xl mb-6">
            Our mission: help the next wave of killer apps emerge. In doing so,
            we also aim to empower communities and bring value to their assets —
            whether tokens or NFTs.
          </p>
          <FeaturesList />
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <ExploreProjectButton />
            <ApplyButton />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <StatsGrid />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default HeroSection;
