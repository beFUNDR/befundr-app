import ButtonLabel from "@/components/buttons/_ButtonLabel";
import Link from "next/link";

const IncubationProcessButton = () => {
  return (
    <Link href="/incubation">
      <ButtonLabel label="Incubation process" />
    </Link>
  );
};

export default IncubationProcessButton;
