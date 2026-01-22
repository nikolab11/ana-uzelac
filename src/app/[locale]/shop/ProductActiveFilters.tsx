"use client";

import { Collection, ProductFilter } from "@/types/api.types";
import { LocaleType } from "@/types/routing";
import { ReactNode } from "react";
import { XIcon } from "@/components/icons/XIcon";
import { useRouter } from "next/navigation";
import * as querystring from "querystring";
import { EUR_SYMBOL } from "@/utils/constants";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import parse from "html-react-parser";

interface Props {
  params: Partial<ProductFilter>;
  locale: LocaleType;
  collections: Collection[];
}

export function ProductActiveFilters({ params, collections, locale }: Props) {
  const router = useRouter();
  const { t } = useTranslationsWithParse("shop_page");

  const updateParams = (
    updateParams: (old: Partial<ProductFilter>) => Partial<ProductFilter>
  ) => {
    const updatedParams = updateParams(params);
    const stringified = querystring.stringify(updatedParams);
    if (stringified) {
      router.replace(`/shop?${stringified}`);
      return;
    }
    router.replace("/shop");
  };

  const hasAnyFilters =
    params.price_min ||
    params.price_max ||
    params.search ||
    (params.collection_ids && params.collection_ids.length > 0) ||
    (params.sizes && params.sizes.length > 0);

  return (
    <div
      className={
        "flex overflow-x-auto gap-2 md:gap-3 pb-2 md:pb-0 items-center"
      }
    >
      {(params.price_min || params.price_max) && (
        <FilterItem
          content={getPriceFilterTitle(params)}
          onDelete={() => {
            updateParams((prev) => {
              return {
                ...prev,
                price_min: undefined,
                price_max: undefined,
              };
            });
          }}
        />
      )}
      {params.search && (
        <FilterItem
          content={params.search}
          onDelete={() => {
            updateParams((prev) => {
              return {
                ...prev,
                search: undefined,
              };
            });
          }}
        />
      )}
      {params.collection_ids?.map((collectionId) => {
        // -1 represents "Original Pieces"
        if (collectionId === -1) {
          return (
            <FilterItem
              content="Original Pieces"
              key={collectionId}
              onDelete={() => {
                updateParams((prev) => {
                  return {
                    ...prev,
                    collection_ids: prev.collection_ids?.filter(
                      (c) => c !== collectionId
                    ),
                  };
                });
              }}
            />
          );
        }
        const collection = collections.find(
          (collection) => collection.collection_id === collectionId
        );
        if (!collection) {
          return null;
        }
        return (
          <FilterItem
            content={parse(collection.title[locale])}
            key={collectionId}
            onDelete={() => {
              updateParams((prev) => {
                return {
                  ...prev,
                  collection_ids: prev.collection_ids?.filter(
                    (c) => c !== collectionId
                  ),
                };
              });
            }}
          />
        );
      })}
      {params.sizes?.map((size) => {
        return (
          <FilterItem
            content={size}
            key={size}
            onDelete={() => {
              updateParams((prev) => {
                return {
                  ...prev,
                  sizes: prev.sizes?.filter((c) => c !== size),
                };
              });
            }}
          />
        );
      })}
      {hasAnyFilters && (
        <button
          onClick={() => {
            router.replace("/shop");
          }}
          className="text-xs md:text-sm  text-[var(--text-color)] whitespace-nowrap underline hover:no-underline cursor-pointer"
        >
          {t("clear_all")}
        </button>
      )}
    </div>
  );
}

function formatPrice(price: number): string {
  return price.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function getPriceFilterTitle(params: Partial<ProductFilter>) {
  if (params.price_min === undefined && params.price_max === undefined) {
    return "";
  }
  const priceMin =
    params.price_min === undefined
      ? "0"
      : `${formatPrice(params.price_min)}${EUR_SYMBOL}`;
  const priceMax =
    params.price_max === undefined
      ? "/"
      : `${formatPrice(params.price_max)}${EUR_SYMBOL}`;
  return `${priceMin} - ${priceMax}`;
}

interface FilterItemProps {
  content: ReactNode;
  onDelete?: () => void;
}

function FilterItem(props: FilterItemProps) {
  return (
    <div
      className={
        "bg-[#FCF7F1] px-2 md:px-3 py-1.5 md:py-2 rounded-2xl flex gap-2 md:gap-3 justify-between items-center whitespace-nowrap"
      }
    >
      <div className="text-xs font-medium">{props.content}</div>
      <div onClick={props.onDelete} className={"cursor-pointer flex-shrink-0"}>
        <XIcon size={2} />
      </div>
    </div>
  );
}
