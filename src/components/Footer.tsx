"use client";
import Link from "next/link";
import links from "./menu/links";
import Image from "next/image";

// Icônes Lucide custom pour Discord et Telegram (SVG inline)
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.112.112 0 0 0-.119.056c-.524.96-.995 1.973-1.41 3.032a18.524 18.524 0 0 0-5.017 0A13.06 13.06 0 0 0 8.02 3.157a.115.115 0 0 0-.119-.057A19.736 19.736 0 0 0 3.677 4.369a.105.105 0 0 0-.047.043C.533 9.045-.32 13.579.099 18.057a.117.117 0 0 0 .045.082c2.104 1.548 4.13 2.489 6.13 3.104a.112.112 0 0 0 .123-.042c.472-.65.893-1.34 1.256-2.062a.112.112 0 0 0-.061-.155c-.669-.252-1.304-.549-1.917-.892a.112.112 0 0 1-.011-.188c.129-.098.258-.2.382-.304a.112.112 0 0 1 .114-.018c4.014 1.83 8.36 1.83 12.33 0a.112.112 0 0 1 .115.017c.124.104.253.206.383.304a.112.112 0 0 1-.01.188 12.298 12.298 0 0 1-1.918.893.112.112 0 0 0-.06.154c.363.723.784 1.413 1.257 2.063a.112.112 0 0 0 .123.041c2-.615 4.027-1.556 6.13-3.104a.115.115 0 0 0 .045-.081c.5-5.177-.838-9.673-3.573-13.645a.093.093 0 0 0-.048-.044ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z"
      fill="currentColor"
    />
  </svg>
);
const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21.944 2.694a1.2 1.2 0 0 0-1.23-.19L2.7 9.7a1.2 1.2 0 0 0 .09 2.26l4.6 1.44 2.02 6.18a1.2 1.2 0 0 0 2.04.44l2.86-2.92 4.18 3.06a1.2 1.2 0 0 0 1.89-.7l2.7-15.3a1.2 1.2 0 0 0-.13-.98ZM9.7 15.1l-1.3-3.98 8.18-5.14-6.88 6.12Zm2.1 4.02-.01-.01.01.01Zm1.13-1.13-1.13 1.13-2.02-6.18 8.18-5.14-5.03 10.19Zm7.13 1.13-4.18-3.06 2.86-2.92a1.2 1.2 0 0 0 .28-1.18l-1.2-4.02 6.88-6.12-2.7 15.3a1.2 1.2 0 0 1-1.89.7Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 px-4">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={"/images/logo.png"}
              alt="beFUNDR logo"
              width={150}
              height={40}
            />
          </div>
          {/* Menu */}
          <nav className="flex gap-6 text-sm md:text-lg">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className=" hover:text-accent transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Socials */}
          <div className="flex gap-6 items-center">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/discordGray.svg"
                alt="Discord"
                width={30}
                height={30}
                className="text-custom-gray-400"
              />
            </a>
            <a
              href="https://t.me/+QOBxwqiwEkVkNTFk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/telegramGray.svg"
                alt="Telegram"
                width={30}
                height={30}
                className="text-custom-gray-400"
              />
            </a>
            <a
              href="https://x.com/befundr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/xGray.svg"
                alt="X"
                width={30}
                height={30}
                className="text-custom-gray-400"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2">
          <span className=" text-sm">
            © 2025 beFUNDR · All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
