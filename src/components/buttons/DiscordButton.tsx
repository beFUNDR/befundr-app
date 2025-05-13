import Image from "next/image";

type Props = {
  href: string;
};

const DiscordButton = ({ href }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center border-2 border-accent text-accent font-bold rounded-full px-2 text-lg min-w-20 max-w-30 min-h-10 hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
    >
      <Image
        src="/images/icons/discord.svg"
        alt="Discord"
        width={28}
        height={28}
      />
    </a>
  );
};

export default DiscordButton;
