"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedBlockProps {
  children: React.ReactNode;
  show?: boolean;
  className?: string;
}

export const AnimatedBlock = ({
  children,
  className = "",
  show = true,
}: AnimatedBlockProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          ref={ref}
          key="animated-block"
          initial={{ opacity: 0, y: 30, height: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            height: "auto",
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            y: 30,
            height: 0,
            transition: { duration: 0.5, ease: "easeIn" },
          }}
          className={`overflow-hidden ${className}`}
        >
          <div className="will-change-transform">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
