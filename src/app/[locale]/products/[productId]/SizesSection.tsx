"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import { ArrowDropdown } from "@/components/icons/ArrowDropdown";
import { useTranslations } from "next-intl";
import { AlertIcon } from "@/components/icons/AlertIcon";
import { ProductOption } from "@/types/api.types";

interface Props {
  options: ProductOption[];
  selected?: ProductOption;
  onChange: (val: ProductOption) => void;
  error?: string;
}

export function SizesSection(props: Props) {
  const t = useTranslations("shop_page");

  return (
    <div className="w-full px-4 md:px-6 py-3 md:py-2 border-white border-b text-xs md:text-sm font-normal">
      <Accordion
        defaultExpanded
        disableGutters
        className="w-full"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{
            color: "var(--text-color)",
            backgroundColor: "transparent",
          }}
          slotProps={{
            root: {
              sx: { p: 0 },
            },
          }}
          expandIcon={<ArrowDropdown />}
        >
          <div
            className={
              "text-xs md:text-sm font-medium text-[var(--text-color)]"
            }
          >
            {t("size")}
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, backgroundColor: "transparent" }}>
          <div>
            {props.error && (
              <div className={"flex gap-2 items-center pb-3 md:pb-4 "}>
                <AlertIcon size={3} />
                <div className={"text-[#CC0000] font-normal text-xs"}>
                  {props.error}
                </div>
              </div>
            )}
            <div className="py-2">
              <Grid sx={{ padding: 0 }} container spacing={1}>
                {props.options.map((option) => {
                  return (
                    <Grid
                      sx={{ padding: 0, textAlign: "center" }}
                      key={option.size}
                      size={{ md: 6, sm: 12 }}
                    >
                      <div
                        onClick={() => props.onChange(option)}
                        className={
                          "text-sm font-normal border-[var(--foreground)] border py-3 px-3 cursor-pointer hover:shadow-lg transition"
                        }
                        style={{
                          color:
                            props.selected === option ? "white" : undefined,
                          background:
                            props.selected === option ? "#DBAC50" : undefined,
                          borderColor:
                            props.selected === option ? "#DBAC50" : undefined,
                        }}
                      >
                        {option.size}
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
