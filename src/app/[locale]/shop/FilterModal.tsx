"use client";

import { useLocale } from "next-intl";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
} from "@mui/material";
import { XIcon } from "@/components/icons/XIcon";
import { ArrowDropdown } from "@/components/icons/ArrowDropdown";
import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";
import {
  EUR_SYMBOL,
  PRODUCT_SIZES,
  SORT_OPTIONS,
  SORT_OPTIONS_DATA,
} from "@/utils/constants";
import { Collection, ProductFilter } from "@/types/api.types";
import { LocaleType } from "@/types/routing";
import { useRouter } from "next/navigation";
import querystring from "querystring";
import { Circle } from "@/components/icons/Circle";

interface Props {
  open: boolean;
  onClose: () => void;
  collections: Collection[];
  minPrice: number;
  maxPrice: number;
  filters: Partial<ProductFilter>;
  originalProductsCount: number;
}

const containerStyle: CSSProperties = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const initalFilters: ProductFilter = {
  sizes: [],
  collection_ids: [],
  price_min: 0,
  price_max: 0,
  search: "",
  sortOption: "relevance",
};
type SeactionName = "price" | "collection" | "size" | "sort";

export function FilterModal(props: Props) {
  const { t } = useTranslationsWithParse("filter_and_sort");
  const locale = useLocale() as LocaleType;
  const router = useRouter();
  const [openSection, setOpenSection] = useState<SeactionName | undefined>(
    "collection"
  );
  const [currentFilters, setCurrentFilters] = useState({
    ...initalFilters,
    price_min: props.minPrice,
    price_max: props.maxPrice,
    ...props.filters,
  });
  const sliderValue = useMemo(() => {
    return [currentFilters.price_min, currentFilters.price_max];
  }, [currentFilters.price_max, currentFilters.price_min]);
  useEffect(() => {
    setCurrentFilters({
      ...initalFilters,
      price_min: props.minPrice,
      price_max: props.maxPrice,
      ...props.filters,
    });
  }, [props.filters, props.minPrice, props.maxPrice]);
  const handleClear = () => {
    setCurrentFilters({
      ...initalFilters,
      price_min: props.minPrice,
      price_max: props.maxPrice,
    });
  };
  const isEmptyForm =
    currentFilters.price_min === props.minPrice &&
    currentFilters.price_max === props.maxPrice &&
    currentFilters.collection_ids.length === 0 &&
    currentFilters.sizes.length === 0 &&
    currentFilters.sortOption === "relevance";

  // Calculate matching products count for collections section
  // Sum product counts from selected collections (including original pieces with -1)
  const getCollectionsMatchingCount = useMemo(() => {
    if (currentFilters.collection_ids.length === 0) return 0;

    let count = 0;

    // Sum up product counts from selected collections
    const selectedCollections = props.collections.filter((collection) =>
      currentFilters.collection_ids.includes(collection.collection_id)
    );

    // Get all products from selected collections and remove duplicates
    const allProducts = selectedCollections.flatMap(
      (collection) => collection.products
    );
    const uniqueProducts = Array.from(
      new Map(
        allProducts.map((product) => [product.product_id, product])
      ).values()
    );

    count += uniqueProducts.length;

    // If -1 (original pieces) is selected, add original products count
    // Note: We can't filter by sizes/price here without actual products,
    // so we use the total count. Filtering happens in filterProducts.
    if (currentFilters.collection_ids.includes(-1)) {
      count += props.originalProductsCount;
    }

    return count;
  }, [
    currentFilters.collection_ids,
    props.collections,
    props.originalProductsCount,
  ]);

  // Calculate matching products count for sizes section
  // Count unique products that have any of the selected sizes
  const getSizesMatchingCount = useMemo(() => {
    if (currentFilters.sizes.length === 0) return 0;

    // Get all products from all collections
    const allProducts = props.collections.flatMap(
      (collection) => collection.products
    );

    // Remove duplicates
    const uniqueProducts = Array.from(
      new Map(
        allProducts.map((product) => [product.product_id, product])
      ).values()
    );

    // Count products that have any of the selected sizes
    const filtered = uniqueProducts.filter((product) =>
      currentFilters.sizes.some((size) =>
        product.options.map((o) => o.size).includes(size)
      )
    );

    return filtered.length;
  }, [currentFilters.sizes, props.collections]);

  // Check if a collection has matching products given current filters
  const hasCollectionMatchingProducts = useMemo(() => {
    return (collectionId: number) => {
      // -1 represents "original pieces"
      if (collectionId === -1) {
        // Always enable if there are original products
        // We can't check sizes/price without actual products, so assume enabled
        return props.originalProductsCount > 0;
      }

      const collection = props.collections.find(
        (c) => c.collection_id === collectionId
      );
      if (!collection) return false;

      const products = collection.products.filter((product) => {
        // Filter by sizes if any are selected
        if (
          currentFilters.sizes.length > 0 &&
          !currentFilters.sizes.some((size) =>
            product.options.map((o) => o.size).includes(size)
          )
        ) {
          return false;
        }
        // Filter by price if changed from default
        if (
          currentFilters.price_min !== props.minPrice &&
          product.options.every((opt) => opt.price < currentFilters.price_min)
        ) {
          return false;
        }
        if (
          currentFilters.price_max !== props.maxPrice &&
          product.options.every((opt) => opt.price > currentFilters.price_max)
        ) {
          return false;
        }
        return true;
      });

      return products.length > 0;
    };
  }, [
    currentFilters.sizes,
    currentFilters.price_min,
    currentFilters.price_max,
    props.collections,
    props.minPrice,
    props.maxPrice,
    props.originalProductsCount,
  ]);

  // Check if a size has matching products given current filters
  const hasSizeMatchingProducts = useMemo(() => {
    return (size: string) => {
      // Get all products from collections (filtered by collection_ids if any)
      const allProducts = props.collections.flatMap((collection) => {
        // Filter by collection_ids if any are selected
        if (
          currentFilters.collection_ids.length > 0 &&
          !currentFilters.collection_ids.includes(collection.collection_id)
        ) {
          return [];
        }
        return collection.products;
      });

      // Remove duplicates
      const uniqueProducts = Array.from(
        new Map(
          allProducts.map((product) => [product.product_id, product])
        ).values()
      );

      // Check if any product has this size and matches other filters
      const matchingProducts = uniqueProducts.filter((product) => {
        // Must have this size
        if (!product.options.map((o) => o.size).includes(size)) {
          return false;
        }
        // Filter by price if changed from default
        if (
          currentFilters.price_min !== props.minPrice &&
          product.options.every((opt) => opt.price < currentFilters.price_min)
        ) {
          return false;
        }
        if (
          currentFilters.price_max !== props.maxPrice &&
          product.options.every((opt) => opt.price > currentFilters.price_max)
        ) {
          return false;
        }
        return true;
      });

      return matchingProducts.length > 0;
    };
  }, [
    currentFilters.collection_ids,
    currentFilters.price_min,
    currentFilters.price_max,
    props.collections,
    props.minPrice,
    props.maxPrice,
  ]);

  const handleSubmit = () => {
    const stringified = querystring.stringify(currentFilters);
    router.replace(`/shop?${stringified}`);
    props.onClose();
  };
  const onOpenChange = (name: SeactionName) => () => {
    setOpenSection((prev) => {
      if (prev === name) {
        return undefined;
      }
      return name;
    });
  };
  return (
    <Drawer anchor={"right"} onClose={props.onClose} open={props.open}>
      <div
        className={
          "p-9 md:w-[35vw] w-[100vw] max-w-[450px] overflow-auto h-full flex flex-col justify-between"
        }
        style={{
          backgroundColor: "#FCF7F1",
        }}
      >
        <div style={containerStyle} className={"overflow-auto grow"}>
          <div className={"flex justify-between items-center pb-7 "}>
            <h4
              className={
                "text-medium text-base uppercase text-[var(--text-color)]"
              }
            >
              {t("filter_by")}
            </h4>
            <div onClick={props.onClose} className={"cursor-pointer"}>
              <XIcon size={3} />
            </div>
          </div>
          <SearchSection
            open={openSection === "price"}
            onChange={onOpenChange("price")}
            title={t("filter_price")}
          >
            <div className={"pt-7"}>
              <Slider
                value={sliderValue}
                min={props.minPrice}
                onChange={(_, newValue) =>
                  setCurrentFilters((prev) => {
                    return {
                      ...prev,
                      price_min: newValue[0],
                      price_max: newValue[1],
                    };
                  })
                }
                sx={{
                  color: "var(--foreground)",
                }}
                slotProps={{
                  input: {
                    color: "var(--foreground)",
                  },
                  markLabel: {
                    className: "text-sm font-normal",
                    style: {
                      color: "var(--foreground)",
                      top: "-30px",
                    },
                  },
                  valueLabel: {
                    className: "text-sm font-normal",
                    style: {
                      color: "var(--foreground)",
                    },
                  },
                }}
                max={props.maxPrice}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `${value}${EUR_SYMBOL}`}
                marks={[
                  {
                    value: props.minPrice,
                    label: `${props.minPrice}${EUR_SYMBOL}`,
                  },
                  {
                    value: props.maxPrice,
                    label: `${props.maxPrice}${EUR_SYMBOL}`,
                  },
                ]}
              />
            </div>
          </SearchSection>
          <SearchSection
            open={openSection === "collection"}
            onChange={onOpenChange("collection")}
            title={t("collection")}
            count={getCollectionsMatchingCount}
          >
            {props.collections.map((collection) => {
              return (
                <div key={collection.collection_id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={currentFilters.collection_ids.includes(
                          collection.collection_id
                        )}
                        disabled={
                          !hasCollectionMatchingProducts(
                            collection.collection_id
                          )
                        }
                        onChange={(event, checked) => {
                          setCurrentFilters((prev) => {
                            return {
                              ...prev,
                              collection_ids: checked
                                ? [
                                    ...prev.collection_ids,
                                    collection.collection_id,
                                  ]
                                : prev.collection_ids.filter(
                                    (cId) => cId !== collection.collection_id
                                  ),
                            };
                          });
                        }}
                        sx={{
                          "&.Mui-disabled": {
                            color: "rgba(0, 0, 0, 0.26)",
                          },
                        }}
                      />
                    }
                    label={
                      <div
                        className={`font-normal text-sm ${
                          !hasCollectionMatchingProducts(
                            collection.collection_id
                          )
                            ? "text-gray-400"
                            : "text-[var(--text-color)]"
                        }`}
                      >
                        {`${collection.title[locale]} (${collection.products.length})`}
                      </div>
                    }
                  />
                </div>
              );
            })}
            {/* Original Pieces checkbox - last option */}
            <div key="original-pieces">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentFilters.collection_ids.includes(-1)}
                    disabled={!hasCollectionMatchingProducts(-1)}
                    onChange={(event, checked) => {
                      setCurrentFilters((prev) => {
                        return {
                          ...prev,
                          collection_ids: checked
                            ? [...prev.collection_ids, -1]
                            : prev.collection_ids.filter((cId) => cId !== -1),
                        };
                      });
                    }}
                    sx={{
                      "&.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.26)",
                      },
                    }}
                  />
                }
                label={
                  <div
                    className={`font-normal text-sm ${
                      !hasCollectionMatchingProducts(-1)
                        ? "text-gray-400"
                        : "text-[var(--text-color)]"
                    }`}
                  >
                    {`Original Pieces (${props.originalProductsCount})`}
                  </div>
                }
              />
            </div>
          </SearchSection>
          <SearchSection
            open={openSection === "size"}
            onChange={onOpenChange("size")}
            title={t("filter_size")}
            count={getSizesMatchingCount}
          >
            {PRODUCT_SIZES.map((size) => {
              return (
                <div key={size}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={currentFilters.sizes.includes(size)}
                        disabled={!hasSizeMatchingProducts(size)}
                        onChange={(event, checked) => {
                          setCurrentFilters((prev) => {
                            return {
                              ...prev,
                              sizes: checked
                                ? [...prev.sizes, size]
                                : prev.sizes.filter((s) => s !== size),
                            };
                          });
                        }}
                        sx={{
                          "&.Mui-disabled": {
                            color: "rgba(0, 0, 0, 0.26)",
                          },
                        }}
                      />
                    }
                    label={
                      <div
                        className={`font-normal text-sm ${
                          !hasSizeMatchingProducts(size)
                            ? "text-gray-400"
                            : "text-[var(--text-color)]"
                        }`}
                      >
                        {size}
                      </div>
                    }
                  />
                </div>
              );
            })}
          </SearchSection>
          <SearchSection
            open={openSection === "sort"}
            onChange={onOpenChange("sort")}
            title={t("sort_by")}
          >
            <List>
              {SORT_OPTIONS.map((sortOption) => {
                return (
                  <ListItem className={"pb-2"} disablePadding key={sortOption}>
                    <ListItemIcon
                      sx={{
                        minWidth: "24px",
                      }}
                    >
                      {currentFilters.sortOption === sortOption && (
                        <Circle fill={"var(--foreground)"} size={3} />
                      )}
                    </ListItemIcon>
                    <ListItemButton
                      onClick={() => {
                        setCurrentFilters((prev) => {
                          return {
                            ...prev,
                            sortOption: sortOption,
                          };
                        });
                      }}
                    >
                      <ListItemText
                        primary={t(
                          `${SORT_OPTIONS_DATA[sortOption].translation}`
                        )}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </SearchSection>
        </div>
        <div className={"flex gap-2 flex-col md:flex-row"}>
          {!isEmptyForm && (
            <Button
              onClick={handleClear}
              sx={{
                borderRadius: "0",
              }}
              variant={"outlined"}
              color={"var(--text-color)" as never}
              className={"grow text-[var(--text-color)] h-[48px]"}
            >
              {t("filter_clear")}
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            variant={"contained"}
            color={"inherit"}
            sx={{
              color: "white",
              background: "var(--foreground)",
              borderRadius: "0",
            }}
            className={"grow h-[48px]"}
          >
            {t("filter_apply")}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

function SearchSection(props: {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <Accordion
      expanded={props.open}
      onChange={props.onChange}
      slots={{
        heading: "div",
        root: "div",
      }}
    >
      <AccordionSummary
        sx={{
          color: "var(--text-color)",
        }}
        slotProps={{
          root: {
            sx: { p: 0 },
          },
        }}
        expandIcon={<ArrowDropdown />}
      >
        <>
          <div
            className={"uppercase text-sm text-[12px] text-[var(--text-color)]"}
          >
            {props.title}
            {props.count !== undefined && props.count > 0 && (
              <span> ({props.count})</span>
            )}
          </div>
        </>
      </AccordionSummary>
      <AccordionDetails>
        <div className={"px-6"}>{props.children}</div>
      </AccordionDetails>
    </Accordion>
  );
}
