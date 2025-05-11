import Image from "next/image";

const MobileWarning = () => {
  return (
    <div className="md:hidden not-even:flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <div className="relative w-full flex justify-center items-center h-20">
        <Image
          src="/images/logo.png"
          alt="beFUNDR logo"
          fill
          className="mb-6 object-contain"
          priority
        />
      </div>
      <p className="bodyStyle text-center">
        beFUNDR isn&apos;t yet available on mobile.
        <br />
        Please visit from a desktop.
      </p>
    </div>
  );
};

export default MobileWarning;
