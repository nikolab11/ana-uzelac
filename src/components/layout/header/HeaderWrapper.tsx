"use client";

import { ReactNode, useLayoutEffect, useState } from "react";
import { CollectionSubmenuContextProvider } from "@/context/collection-submenu/CollectionSubmenu.context-provider";

export type HeaderMode = "hover" | "regular";

interface Props {
  children: ReactNode;
  mode: HeaderMode;
}

const baseClassName =
  "px-[var(--container-padding)] bg-[#FCF7F1] z-1000 w-full";

export function HeaderWrapper(props: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  
  useLayoutEffect(() => {
    if (props.mode === "regular") {
      return;
    }
    const handler = () => {
      const element = document.getElementById("app-container");
      if (!element) {
        return;
      }
      const scrollTop = element.scrollTop;
      setScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handler, true);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [props.mode]);

  useLayoutEffect(() => {
    if (props.mode === "regular") {
      return;
    }
    const calculateScrollbarWidth = () => {
      const element = document.getElementById("app-container");
      if (!element) {
        return;
      }
      // Calculate scrollbar width: outerWidth - innerWidth
      const scrollbarWidth = element.offsetWidth - element.clientWidth;
      setScrollbarWidth(scrollbarWidth);
    };
    
    calculateScrollbarWidth();
    window.addEventListener("resize", calculateScrollbarWidth);
    
    return () => {
      window.removeEventListener("resize", calculateScrollbarWidth);
    };
  }, [props.mode]);

  const shouldBeTransparent = props.mode === "hover" && !scrolled;
  
  return (
    <CollectionSubmenuContextProvider>
      <div
        className={`${baseClassName} ${shouldBeTransparent ? "header-transparent" : ""}`}
        style={{
          opacity: scrolled || props.mode === "regular" ? "1" : undefined,
          position: props.mode === "hover" ? "absolute" : "relative",
          width: props.mode === "hover" && scrollbarWidth > 0 ? `calc(100% - ${scrollbarWidth}px)` : undefined,
        }}
      >
        {props.children}
      </div>
    </CollectionSubmenuContextProvider>
  );
}
