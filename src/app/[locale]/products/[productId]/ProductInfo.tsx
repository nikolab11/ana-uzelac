"use client";

import { Collection, Product, ProductOption } from "@/types/api.types";
import { LocaleType } from "@/types/routing";
import { SizesSection } from "@/app/[locale]/products/[productId]/SizesSection";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "@/components/icons/ShoppingBag";
import { useState } from "react";
import { useCartContext } from "@/context/cart/cart.context";
import { AddedToCartSnackbar } from "@/app/[locale]/products/[productId]/AddedToCartSnackbar";
import { formatNumber } from "@/utils/product.utils";

interface Props {
  product: Product;
  collections: Collection[];
  locale: LocaleType;
}

export function ProductInfo({ product, locale, collections }: Props) {
  const collection = collections.find(
    (c) => c.collection_id === product.collection_id
  );
  const [selectedOption, setSelectedOption] = useState<
    ProductOption | undefined
  >(undefined);
  const [showError, setShowError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const onOptionSelect = (opt: ProductOption) => {
    setSelectedOption(opt);
    setShowError(false);
  };
  const { addItem } = useCartContext();
  const onSubmit = () => {
    if (!selectedOption) {
      setShowError(true);
      return;
    }
    addItem(product, selectedOption);
    setOpenSnackbar(true);
  };
  const t = useTranslations("shop_page");
  return (
    <div>
      <AddedToCartSnackbar
        product={product}
        option={selectedOption}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      />
      <div className={"py-3 md:py-4 bg-[#FFFCF7E6] md:opacity-80"}>
        <div className={"px-4 md:px-6 py-3 md:py-4 border-white border-b"}>
          <h4 className={"pb-2 text-lg md:text-xl font-normal"}>
            {product[`name_${locale}`]}
          </h4>
          {selectedOption && (
            <p className={"text-xs md:text-sm font-light"}>{`${formatNumber(
              selectedOption.price
            )} ${product.currency}`}</p>
          )}
        </div>
        {collection && (
          <div
            className={
              "px-4 md:px-6 py-3 md:py-4 border-white border-b flex justify-between gap-4 md:gap-[80px] text-xs md:text-sm font-normal"
            }
          >
            <p>{t("collection")}</p>
            <p>{collection.title[locale]}</p>
          </div>
        )}
        <SizesSection
          error={showError ? t("please_choose_a_size") : undefined}
          selected={selectedOption}
          onChange={onOptionSelect}
          options={product.options}
        />
        <div className={"px-4 md:px-6 py-3 md:py-4 border-white border-b"}>
          <Button
            className={"w-full"}
            sx={{
              borderRadius: 0,
            }}
            onClick={onSubmit}
            startIcon={<ShoppingBag stroke={"white"} size={4} />}
            color={"primary"}
            variant={"contained"}
          >
            {t("add_to_cart")}
          </Button>
        </div>
        <div className={"px-4 md:px-6 py-3 md:py-4"}>
          <div
            className={"text-xs md:text-sm"}
            dangerouslySetInnerHTML={{
              __html: product[`short_description_${locale}`] || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
