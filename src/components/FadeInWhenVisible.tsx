'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const variants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function FadeInWhenVisible({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full flex flex-col items-center justify-center laptop:flex-row gap-[33px] max-w-[1200px]"
        >
        {children}
    </motion.div>
  );
}
