"use client";

import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("filter_and_sort");
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
  const handleSubmit = () => {
    const stringified = querystring.stringify(currentFilters);
    router.replace(`/shop?${stringified}`);
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
          "p-9 md:w-[35vw] w-[100vw] overflow-auto h-full flex flex-col justify-between"
        }
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
              <XIcon size={4} />
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
                }}
                max={props.maxPrice}
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
            title={"#Collection"}
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
                      />
                    }
                    label={
                      <div className="font-normal text-sm text-[var(--text-color)]">{`${collection.title[locale]} (${collection.products.length})`}</div>
                    }
                  />
                </div>
              );
            })}
          </SearchSection>
          <SearchSection
            open={openSection === "size"}
            onChange={onOpenChange("size")}
            title={t("filter_size")}
          >
            {PRODUCT_SIZES.map((size) => {
              return (
                <div key={size}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={currentFilters.sizes.includes(size)}
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
                      />
                    }
                    label={
                      <div className="font-normal text-sm text-[var(--text-color)]">
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
                        primary={SORT_OPTIONS_DATA[sortOption].translation}
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
              className={"grow text-[var(--text-color)]"}
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
            className={"grow"}
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
}) {
  return (
    <Accordion
      expanded={props.open}
      onChange={props.onChange}
      disableGutters
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
        <div
          className={"uppercase text-sm font-medium text-[var(--text-color)]"}
        >
          {props.title}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={"px-6"}>{props.children}</div>
      </AccordionDetails>
    </Accordion>
  );
}
