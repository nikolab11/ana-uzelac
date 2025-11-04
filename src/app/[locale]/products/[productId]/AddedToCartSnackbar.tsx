"use client";
import { Product, ProductOption } from "@/types/api.types";
import { Button, Snackbar } from "@mui/material";
import { XIcon } from "@/components/icons/XIcon";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LocaleType } from "@/types/routing";
import { useCartContext } from "@/context/cart/cart.context";

interface Props {
  product: Product;
  option?: ProductOption;
  open: boolean;
  onClose: () => void;
}

export function AddedToCartSnackbar(props: Props) {
  const locale = useLocale() as LocaleType;
  const { onOpenChange } = useCartContext();
  const t = useTranslations("shop_page");
  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      onClose={props.onClose}
      sx={{
        "@media (max-width: 768px)": {
          left: "50% !important",
          right: "auto !important",
          transform: "translateX(-50%) !important",
        },
      }}
    >
      <div
        className={
          "p-4 md:p-5 md:pl-9 bg-white min-w-[280px] md:min-w-[400px] max-w-[calc(100vw-32px)]"
        }
      >
        <div
          className={
            "flex items-center pb-3 md:pb-4 gap-4 md:gap-[60px] justify-between"
          }
        >
          <h4 className={"text-sm md:text-base"}>#Added to Cart</h4>
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
            <p className={"text-xs md:text-sm font-light"}>
              {`${t("size")}: ${props.option?.size}`}
            </p>
          </div>
        </div>
        <div
          className={
            "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 justify-between"
          }
        >
          <button
            onClick={() => onOpenChange(true)}
            className={
              "grow px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-[var(--secondary-color)] hover:text-[var(--background)] transition-all cursor-pointer"
            }
          >
            #View cart
          </button>
          <Button
            onClick={() => onOpenChange(true, "checkout")}
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
}
