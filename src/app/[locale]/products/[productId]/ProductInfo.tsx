"use client";

import { Collection, Product, ProductOption } from "@/types/api.types";
import { LocaleType } from "@/types/routing";
import { SizesSection } from "@/app/[locale]/products/[productId]/SizesSection";
import { Button } from "@mui/material";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { ShoppingBag } from "@/components/icons/ShoppingBag";
import { useState } from "react";
import { useCartContext } from "@/context/cart/cart.context";
import { AddedToCartSnackbar } from "@/app/[locale]/products/[productId]/AddedToCartSnackbar";
import { formatNumber } from "@/utils/product.utils";
import { FIRST_SIZE_ONLY_PRODUCT_IDS } from "@/utils/constants";
import parse from "html-react-parser";

interface Props {
  product: Product;
  collections: Collection[];
  locale: LocaleType;
}

export function ProductInfo({ product, locale, collections }: Props) {
  // Fix logic: properly match the collection by collection_id, handling number/string and fallback
  // Both product.collection_id and c.collection_id *could* be string or number
  const collection =
    collections.find(
      (c) => String(c.collection_id) === String(product.collection_id)
    ) ||
    collections.find(
      (c) =>
        // fallback: some products from API might be missing .collection_id field or have a mismatch
        c.products?.some &&
        Array.isArray(c.products) &&
        c.products.some(
          (p: any) => String(p.product_id) === String(product.product_id)
        )
    );

  const [selectedOption, setSelectedOption] = useState<
    ProductOption | undefined
  >(product.options?.[0]);
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
    const collectionName = collection ? collection.title[locale] : undefined;
    addItem(product, selectedOption, collectionName);
    setOpenSnackbar(true);
  };
  const { t, tRaw } = useTranslationsWithParse("shop_page");
  return (
    <div>
      <AddedToCartSnackbar
        product={product}
        option={selectedOption}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      />
      <div className={"py-3 md:py-4 bg-[#FFFCF7] md:opacity-95"}>
        <div
          className={
            "px-4 md:px-6 py-3 md:py-2 border-white border-b flex flex-col items-center md:items-start"
          }
        >
          <h4
            className={
              "pb-2 text-lg md:text-xl font-normal text-center md:text-left"
            }
          >
            {parse(product[`name_${locale}`])}
          </h4>
          {selectedOption && (
            <p
              className={
                "text-xs md:text-sm font-light text-center md:text-left"
              }
            >{`${formatNumber(selectedOption.price, 0)} ${
              product.currency
            }`}</p>
          )}
        </div>
        {collection && (
          <div
            className={
              "px-4 md:px-6 py-3 md:py-2 border-white border-b flex justify-between gap-4 md:gap-[80px] text-xs md:text-sm font-normal"
            }
          >
            <p>{t("collection")}</p>
            <p>{parse(collection.title[locale])}</p>
          </div>
        )}
        <div className="flex justify-center md:justify-start">
          <SizesSection
            error={showError ? tRaw("please_choose_a_size") : undefined}
            selected={selectedOption}
            onChange={onOptionSelect}
            options={product.options}
            disabledIndexes={
              FIRST_SIZE_ONLY_PRODUCT_IDS.includes(product.product_id)
                ? [1]
                : undefined
            }
          />
        </div>
        <div className={"px-4 md:px-6 py-3 md:py-2 border-white border-b"}>
          <Button
            className={"w-full"}
            sx={{
              borderRadius: 0,
              height: { xs: "48px", md: "48px" },
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
          <div className={"text-xs md:text-sm text-center md:text-left"}>
            {parse(product[`short_description_${locale}`] || "")}
          </div>
        </div>
      </div>
    </div>
  );
}
