import HeroSection from "@/components/homepage/_HeroSection";
import ProcessSection from "@/components/homepage/_ProcessSection";
import ProjectSection from "@/components/homepage/_ProjectSection";
import PartnerSection from "@/components/homepage/_PartnerSection";
import FaqSection from "@/components/homepage/_FaqSection";
import BottomLabel from "@/components/homepage/BottomLabel";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
      {/* Background Image
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div> */}
      <HeroSection />
      <ProjectSection />
      <ProcessSection />
      <PartnerSection />
      <FaqSection />
      <BottomLabel />
    </div>
  );
}
