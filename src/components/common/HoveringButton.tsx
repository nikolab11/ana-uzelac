"use client";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  label: ReactNode;
  icon?: ReactNode;
  mode?: "dark" | "light";
  inverted?: boolean;
}

export function HoveringButton(props: Props) {
  return (
    <div
      className={`hovering-button mt-2 md:mt-0 ${
        props.mode === "dark" ? "hovering-button-dark" : "hovering-button-light"
      }`}
      onClick={props.onClick}
      style={
        props.inverted
          ? {
              paddingRight: "0",
            }
          : {}
      }
    >
      <div
        className={`flex gap-2 md:gap-4 items-center ${
          props.inverted ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`border ${
            props.mode === "dark"
              ? `border-[var(--foreground)]`
              : "border-white"
          } p-1.5 rounded-full border-2 md:w-10 md:h-10 flex items-center justify-center`}
        >
          {props.icon || (
            <ChevronRight
              size={3.5}
              stroke={props.mode === "dark" ? "var(--foreground)" : "white"}
              className={props.inverted ? "rotate-180" : ""}
            />
          )}
        </div>
        <div
          className={`text-base font-light ${
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
