import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import Link from "next/link";

const ApplyButton = () => {
  return (
    <Link href="/apply">
      <ButtonLabelSecondary label="Apply now" />
    </Link>
  );
};

export default ApplyButton;
