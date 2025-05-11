import Link from "next/link";
import ButtonLabel from "./_ButtonLabel";

const ExploreProjectButton = () => {
  return (
    <Link href="/projects">
      <ButtonLabel label="Explore Projects" />
    </Link>
  );
};

export default ExploreProjectButton;
