import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({ text, className = "", delay = 0, as: Tag = "span" }: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  const directionMap = {
    up: { y: 60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };
  const { x, y } = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
