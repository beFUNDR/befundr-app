"use client";
import Link from "next/link";
import links from "./menu/links";

const Footer = () => {
  return (
    <div className="flex flex-col w-full gap-2 px-10  py-4 shadow-up">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-2 text-xs">
        {/* email contact */}
        <p className="flex gap-2">
          Mail :
          <a
            href="mailto:leolagrangeendoume@free.fr"
            className=" underline"
            target="_blank"
          >
            contact@befundr.xyz
          </a>
        </p>
        {/* menu reminder */}
        <div className="flex gap-4">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
