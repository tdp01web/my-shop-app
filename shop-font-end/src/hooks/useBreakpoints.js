"use client";

import { useMediaQuery } from "@mui/material";

export const useBreakpoints = () => {
  const mobile = useMediaQuery("(max-width: 480px)");
  const tablet = useMediaQuery("(min-width: 768px)");
  const laptop = useMediaQuery("(min-width: 1024px)");
  const desktop = useMediaQuery("(min-width: 1536px)");

  return { mobile, tablet, laptop, desktop };
};
