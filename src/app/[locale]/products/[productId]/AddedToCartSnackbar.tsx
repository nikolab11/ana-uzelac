"use client";
import { Product, ProductOption } from "@/types/api.types";
import { Button, Snackbar } from "@mui/material";
import { XIcon } from "@/components/icons/XIcon";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { LocaleType } from "@/types/routing";
import { useCartContext } from "@/context/cart/cart.context";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";

interface Props {
  product: Product;
  option?: ProductOption;
  open: boolean;
  onClose: () => void;
}

export function AddedToCartSnackbar(props: Props) {
  const locale = useLocale() as LocaleType;
  const { onOpenChange } = useCartContext();
  const { t } = useTranslationsWithParse("shop_page");

  // Guard for client-only portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const content = (
    <Snackbar
      open={props.open}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      onClose={props.onClose}
      sx={{
        top: "144px !important",

        "@media (max-width: 768px)": {
          top: "0 !important",
          left: "0 !important",
          right: "0 !important",
          transform: "none !important",
          width: "100vw !important",
          maxWidth: "100vw !important",
        },
      }}
    >
      <div
        className={
          "p-4 md:p-5 md:pl-9 bg-white w-full md:w-auto md:min-w-[400px]"
        }
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.4)",
          backgroundColor: "#FCF7F1",
        }}
      >
        <div
          className={
            "flex items-center pb-3 md:pb-4 gap-4 md:gap-[60px] justify-between"
          }
        >
          <h4
            className={"text-sm md:text-base uppercase flex items-center gap-2"}
          >
            <IoCheckmark size={17} /> {t("added_to_cart")}
          </h4>
          <div
            onClick={props.onClose}
            className={"cursor-pointer flex-shrink-0"}
          >
            <XIcon size={3} />
          </div>
        </div>
        <div className={"flex items-center pb-6 md:pb-8 gap-4 md:gap-8"}>
          <div
            className={
              "relative basis-[70px] md:basis-[100px] h-[84px] md:h-[120px] flex-shrink-0"
            }
          >
            <Image
              src={props.product.images[0]}
              fill
              alt={props.product.name_eng}
            />
          </div>
          <div className={"min-w-0 flex-1"}>
            <h4 className={"font-semibold text-xs md:text-sm pb-1 md:pb-2"}>
              {props.product[`name_${locale}`]}
            </h4>
            <p className={"text-xs md:text-sm font-light"}>{`${t("size")}: ${
              props.option?.size
            }`}</p>
          </div>
        </div>
        <div
          className={
            "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 justify-between"
          }
        >
          <button
            onClick={() => {
              props.onClose();
              onOpenChange(true);
            }}
            className={
              "uppercase grow px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-[var(--secondary-color)] hover:text-[var(--background)] transition-all cursor-pointer"
            }
          >
            {t("view_cart")}
          </button>
          <Button
            onClick={() => {
              props.onClose();
              onOpenChange(true, "checkout");
            }}
            className={"grow"}
            variant={"contained"}
            color={"primary"}
            sx={{
              padding: { xs: "8px 12px", md: "8px 16px" },
              borderRadius: 0,
              fontSize: { xs: "0.75rem", md: "0.875rem" },
            }}
          >
            {t("checkout_button")}
          </Button>
        </div>
      </div>
    </Snackbar>
  );

  return createPortal(content, document.body);
}
