"use client";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  label: string;
  icon?: ReactNode;
  mode?: "dark" | "light";
}

export function HoveringButton(props: Props) {
  return (
    <div
      className={`hovering-button mt-2 md:mt-0 ${
        props.mode === "dark" ? "hovering-button-dark" : "hovering-button-light"
      }`}
      onClick={props.onClick}
    >
      <div className="flex gap-2 md:gap-4 items-center">
        <div
          className={`border ${
            props.mode === "dark"
              ? `border-[var(--foreground)]`
              : "border-white"
          } p-2 rounded-full border-2`}
        >
          {props.icon || (
            <ChevronRight
              size={5}
              stroke={props.mode === "dark" ? "var(--foreground)" : "white"}
            />
          )}
        </div>
        <div
          className={`text-base font-bold ${
            props.mode === "dark"
              ? `text-[var(--foreground)]`
              : "text-[var(--background)]"
          }`}
        >
          {props.label}
        </div>
      </div>
    </div>
  );
}
