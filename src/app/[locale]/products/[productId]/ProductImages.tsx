"use client";

import { Product } from "@/types/api.types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { ProductImagesView } from "@/app/[locale]/products/[productId]/ProductImagesView";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useMediaQuery, useTheme } from "@mui/material";
import { BackButton } from "@/components/common/BackButton";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
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
  const { t } = useTranslationsWithParse("shop_page");
  const router = useRouter();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const images = ref.current.querySelectorAll("img");
    if (!images[activeIndex]) return;
    const targetImage = images[activeIndex] as HTMLElement;
    const scrollLeft = targetImage.offsetLeft - (isMd ? targetImage.offsetWidth * 0.2 : 0);
    ref.current.scrollTo({
      behavior: "smooth",
      left: Math.max(0, scrollLeft),
    });
  }, [activeIndex, isMd]);
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
      <div ref={ref} className={"h-full overflow-hidden w-full"}>
        <div className={"flex h-full"}>
          {product.images.map((image, index) => (
            <Image
              key={index}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "auto",
                height: "100%",
                flexShrink: 0,
              }}
              src={image}
              alt={"Image"}
              onClick={() => setOpen(true)}
            />
          ))}
          {isMd && <div style={{ minWidth: "40vw", flexShrink: 0 }} />}
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
