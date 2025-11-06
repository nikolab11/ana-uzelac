"use client";

import { FilterIcon } from "@/components/icons/FilterIcon";
import { useState } from "react";
import { FilterModal } from "@/app/[locale]/shop/FilterModal";
import { Collection, ProductFilter } from "@/types/api.types";
import { useTranslations } from "next-intl";

interface Props {
  usedFilters: number;
  totalProducts: number;
  minPrice: number;
  filters: Partial<ProductFilter>;
  maxPrice: number;
  collections?: Collection[];
  originalProductsCount: number;
}

export function ShopHeader({
  totalProducts,
  usedFilters,
  minPrice,
  maxPrice,
  collections,
  filters,
  originalProductsCount,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const t = useTranslations("shop_page");

  return (
    <div
      className={
        "flex justify-between items-center max-w-screen-xl mx-auto px-4 md:px-0"
      }
    >
      <div className={"flex justify-between items-center gap-2 py-3"}>
        <div className={"text-sm md:text-base font-medium uppercase"}>
          {t("products")}
        </div>
        <div className={"font-medium text-[10px] tracking-wider"}>
          ({totalProducts})
        </div>
      </div>
      <div
        onClick={() => setOpenModal((prev) => !prev)}
        className={
          "flex justify-between gap-2 md:gap-3 border-l border-l-[#F6F1EB] cursor-pointer relative pl-2 md:pl-2 py-3"
        }
      >
        <div>
          <FilterIcon />
        </div>
        <div className={"font-medium text-xs md:text-sm leading-[14px]"}>
          {t("filter")}{" "}
          {usedFilters > 0 && (
            <span
              className={"absolute pl-1 top-[8px] text-[10px] tracking-wider"}
            >
              ({usedFilters})
            </span>
          )}
        </div>
      </div>
      <FilterModal
        collections={collections || []}
        minPrice={minPrice}
        filters={filters}
        maxPrice={maxPrice}
        open={openModal}
        onClose={() => setOpenModal(false)}
        originalProductsCount={originalProductsCount}
      />
    </div>
  );
}
