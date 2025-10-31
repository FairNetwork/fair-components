import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
  press: {
    scale: 0.98,
    transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] },
  },
};

export const borderPulse = (colors: string[]): Variants => ({
  rest: {
    background: `radial-gradient(circle, ${colors[0]} 0%, rgba(0,0,0,0) 70%)`,
    opacity: 0,
  },
  active: {
    background: [
      `radial-gradient(circle, ${colors[0]} 0%, rgba(0,0,0,0) 60%)`,
      `radial-gradient(circle, ${colors[1]} 0%, rgba(0,0,0,0) 65%)`,
      `radial-gradient(circle, ${colors[2]} 0%, rgba(0,0,0,0) 70%)`,
    ],
    opacity: [0.5, 0.7, 0.4],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
});

