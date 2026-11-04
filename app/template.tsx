"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Set once the first page has mounted; later navigations then animate. */
const session = { hasMounted: false };

/**
 * Page transition. Next.js re-mounts a template on every navigation, so each
 * new page fades and settles in. The very first load is left alone so the
 * page paints instantly (important for Largest Contentful Paint).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [isNavigation] = useState(() => session.hasMounted);

  useEffect(() => {
    session.hasMounted = true;
  }, []);

  const animate = isNavigation && !reduceMotion;

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
