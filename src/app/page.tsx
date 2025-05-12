import HeroSection from "@/components/_homepage/_HeroSection";
import ProcessSection from "@/components/_homepage/_ProcessSection";
import ProjectSection from "@/components/_homepage/_ProjectSection";
import PartnerSection from "@/components/_homepage/_PartnerSection";
import FaqSection from "@/components/_homepage/_FaqSection";
import BottomLabel from "@/components/_homepage/BottomLabel";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
      <HeroSection />
      <ProjectSection />
      <ProcessSection />
      <PartnerSection />
      <FaqSection />
      <BottomLabel />
    </div>
  );
}
