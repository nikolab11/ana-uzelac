"use client";

import { useEffect } from "react";

interface Props {
  targetId: string;
  sentinelId: string;
}

export function PanelAdjuster({ targetId, sentinelId }: Props) {
  useEffect(() => {
    const target = document.getElementById(targetId) as HTMLElement | null;
    const sentinel = document.getElementById(sentinelId) as HTMLElement | null;
    if (!target || !sentinel) return;

    target.style.willChange = "transform";

    let raf = 0;
    const update = () => {
      const sentinelTop = sentinel.getBoundingClientRect().top;
      const visibleFooter = Math.max(0, window.innerHeight - sentinelTop);
      // Begin adjusting only after 200px of the footer is visible
      const effective = Math.max(0, visibleFooter);
      target.style.transform =
        effective > 0 ? `translateY(-${effective - 180}px)` : "translateY(0)";
    };

    const tick = () => {
      update();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      target.style.willChange = "auto";
    };
  }, [targetId, sentinelId]);

  return null;
}
