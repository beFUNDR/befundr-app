import Link from "next/link";
import ButtonLabelSecondary from "./_ButtonLabelSecondary";

const ApplyButton = () => {
  return (
    <Link href="/apply">
      <ButtonLabelSecondary label="Apply as builder" />
    </Link>
  );
};

export default ApplyButton;
