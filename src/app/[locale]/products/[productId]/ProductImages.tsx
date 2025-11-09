"use client";

import { Product } from "@/types/api.types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { ProductImagesView } from "@/app/[locale]/products/[productId]/ProductImagesView";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useMediaQuery, useTheme } from "@mui/material";
import { BackButton } from "@/components/common/BackButton";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export function ProductImages({ product }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const t = useTranslations("shop_page");
  const router = useRouter();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const totalWidth = ref.current.scrollWidth;
    const imageWidth =
      totalWidth / (isMd ? product.images.length + 0.8 : product.images.length);
    ref.current.scrollTo({
      behavior: "smooth",
      left: Math.max(0, imageWidth * (activeIndex - (isMd ? 0.2 : 0))),
    });
  }, [activeIndex, product.images.length, isMd]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className={"relative overflow-hidden w-full h-full"}>
      {!open && (
        <div className="absolute top-4 left-4 md:top-[var(--container-padding)] md:left-[var(--container-padding)] z-1400">
          <BackButton
            label={t("back")}
            onClick={() => {
              router.push("/shop");
            }}
          />
        </div>
      )}
      {createPortal(
        <ProductImagesView
          images={product.images}
          open={open}
          onClose={() => setOpen(false)}
        />,
        document.body
      )}
      <div ref={ref} className={"h-full overflow-hidden w-full h-full"}>
        <div
          className={`flex h-full`}
          style={{
            width: isMd
              ? `${product.images.length * 50 + 40}%`
              : `${product.images.length * 100}%`,
          }}
        >
          {product.images.map((image, index) => (
            <div
              className={"relative"}
              style={{
                width: isMd
                  ? `${100 / (product.images.length + 0.8)}%`
                  : `100%`,
                height: "100%",
              }}
              key={index}
            >
              <Image
                style={{
                  objectFit: "cover",
                }}
                fill
                src={image}
                alt={"Image"}
                onClick={() => setOpen(true)}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={"absolute bottom-4 left-4 md:bottom-[64px] md:left-[80px]"}
      >
        <ImageCarousel
          images={product.images}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
      </div>
    </div>
  );
}
