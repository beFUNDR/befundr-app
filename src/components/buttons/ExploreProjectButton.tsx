import ButtonLabel from "@/components/buttons/_ButtonLabel";
import Link from "next/link";

const ExploreProjectButton = () => {
  return (
    <Link href="/projects">
      <ButtonLabel label="Explore Projects" />
    </Link>
  );
};

export default ExploreProjectButton;
