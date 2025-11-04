"use client";

import { Product } from "@/types/api.types";
import { useState } from "react";
import { ChevronLeft } from "@/components/icons/ChevronLeft";
import { ChevronRight } from "@/components/icons/ChevronRight";
import Image from "next/image";

interface Props {
  product: Product;
  alternative?: boolean;
  original?: boolean;
}

const buttonClasses =
  "border cursor-pointer border-white p-2 rounded-full transition-opacity child opacity-0 group-hover:opacity-100";

export function ProductItemImages(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative transition-all">
      <div
        className={"relative"}
        style={{
          width: "100%",
          ...(props.original
            ? {}
            : { minHeight: props.alternative ? "400px" : "500px" }),
        }}
      >
        {props.original ? (
          <img
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            src={props.product.images[activeIndex]}
            alt={props.product.name_eng}
          />
        ) : (
          <Image
            fill
            style={{
              objectFit: "cover",
              objectPosition: props.alternative ? "top" : "center",
            }}
            src={props.product.images[activeIndex]}
            alt={props.product.name_eng}
          />
        )}
      </div>
      <div className="group z-2 top-[0] absolute flex items-center justify-between h-full w-full p-4">
        <div>
          {activeIndex > 0 && (
            <button
              className={buttonClasses}
              onClick={() => {
                setActiveIndex((prev) => prev - 1);
              }}
            >
              <ChevronLeft stroke={"white"} />
            </button>
          )}
        </div>
        <div>
          {activeIndex < props.product.images.length - 1 && (
            <button
              className={buttonClasses}
              onClick={() => {
                setActiveIndex((prev) => prev + 1);
              }}
            >
              <ChevronRight stroke={"white"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
