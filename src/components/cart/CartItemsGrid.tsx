import { Grid, IconButton, SxProps, Theme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useCartContext } from "@/context/cart/cart.context";
import { EUR_SYMBOL } from "@/utils/constants";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";
import { LocaleType } from "@/types/routing";
import { XIcon } from "@/components/icons/XIcon";
import { formatNumber } from "@/utils/product.utils";

const buttonSx: SxProps<Theme> = {
  borderRadius: 0,
};

export function CartItemsGrid() {
  const t = useTranslations("shop_page");
  const { items, updateItem, removeItem } = useCartContext();
  const rows = Object.values(items).flatMap((val) => {
    return Object.values(val);
  });
  const locale = useLocale() as LocaleType;
  return (
    <div>
      <Grid
        className={"font-normal text-xs md:text-sm pb-4 md:pb-8"}
        container
        spacing={2}
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Grid
          size={4}
          sx={{ fontSize: "12px", fontWeight: 400, color: "#444444" }}
        >
          {t("item")}
        </Grid>
        <Grid
          size={2}
          sx={{ fontSize: "12px", fontWeight: 400, color: "#444444" }}
        >
          {t("size")}
        </Grid>
        <Grid
          size={3}
          sx={{ fontSize: "12px", fontWeight: 400, color: "#444444" }}
        >
          {t("quantity")}
        </Grid>
        <Grid size={2} sx={{ fontSize: "12px", fontWeight: 400 }}>
          {t("price")}
        </Grid>
      </Grid>
      {rows.map((row, index) => {
        console.log(row);
        const isLast = index === rows.length - 1;
        return (
          <div
            key={`${row.product.product_id}_${row.option.size}`}
            className={`${
              isLast ? "border-b-0 md:border-b" : "border-b"
            } border-[#E5E5E5] pb-4 md:pb-0 ${
              isLast ? "mb-0 md:mb-0" : "mb-4 md:mb-0"
            }`}
          >
            <Grid
              className={"font-normal text-xs md:text-sm mt-0 md:mt-5"}
              container
              spacing={2}
            >
              <Grid size={{ xs: 12, md: 4 }}>
                <div className={"flex gap-3 md:gap-6 items-center pb-5"}>
                  <div
                    className={
                      "flex-shrink-0 relative w-[70px] h-[70px] md:w-[100px] md:h-[100px] overflow-hidden"
                    }
                  >
                    <Image
                      src={row.product.images[0]}
                      alt={row.product.name_eng}
                      fill
                      className={"object-cover"}
                    />
                  </div>
                  <div className={"flex-1 min-w-0"}>
                    <h4
                      className={
                        "font-medium text-sm md:text-sm leading-tight mb-1"
                      }
                    >
                      {row.product[`name_${locale}`]}
                    </h4>
                    <h4
                      style={{
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "12px",
                        lineHeight: "100%",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                        color: "#444444",
                        paddingTop: "2px",
                      }}
                    >
                      {row.collection_name}
                    </h4>
                    <div className={"flex items-center gap-2 md:hidden"}>
                      <span className={"text-xs text-[#838383]"}>
                        {t("size")}:
                      </span>
                      <span className={"text-xs font-medium"}>
                        {row.option.size}
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid size={{ xs: 0, md: 2 }} className={"hidden md:block"}>
                <div className={"flex gap-6 items-center h-full"}>
                  {row.option.size}
                </div>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <div
                  className={
                    "flex gap-3 md:gap-3 items-center h-full justify-between md:justify-start pt-2 md:pt-0"
                  }
                >
                  <div
                    className={
                      "flex items-center gap-2 md:gap-2  md:bg-transparent rounded px-2 py-1 md:px-0 md:py-0"
                    }
                  >
                    <IconButton
                      sx={{
                        ...buttonSx,
                        width: "24px",
                        height: "24px",
                        minWidth: "24px",
                        minHeight: "24px",
                        backgroundColor: "#DEDFDF",
                        "&:hover": {
                          backgroundColor: "#DEDFDF",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "#DEDFDF",
                          opacity: 0.5,
                        },
                      }}
                      disabled={row.count === 1}
                      size={"small"}
                      onClick={() => {
                        updateItem(row.product, row.option, row.count - 1);
                      }}
                      color={"primary"}
                      className={"touch-manipulation"}
                    >
                      <RemoveIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                    <div
                      className={
                        "text-sm md:text-sm font-medium min-w-[24px] text-center"
                      }
                    >
                      {row.count}
                    </div>
                    <IconButton
                      onClick={() => {
                        updateItem(row.product, row.option, row.count + 1);
                      }}
                      sx={{
                        ...buttonSx,
                        width: "24px",
                        height: "24px",
                        minWidth: "24px",
                        minHeight: "24px",
                        backgroundColor: "#444444",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#444444",
                        },
                      }}
                      size={"small"}
                      color={"primary"}
                      className={"touch-manipulation"}
                    >
                      <AddIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </div>
                  <div className={"flex items-center gap-3 md:hidden"}>
                    <p className={"font-bold text-sm"}>
                      {formatNumber(row.option.price * row.count) + EUR_SYMBOL}
                    </p>
                    <IconButton
                      onClick={() => {
                        removeItem(row.product, row.option);
                      }}
                      size={"small"}
                      sx={{ minWidth: "44px", minHeight: "44px" }}
                      className={"touch-manipulation"}
                    >
                      <XIcon />
                    </IconButton>
                  </div>
                </div>
              </Grid>
              <Grid size={{ xs: 0, md: 2 }} className={"hidden md:block"}>
                <div className={"flex gap-6 items-center h-full"}>
                  <p className={"font-bold"}>
                    {formatNumber(row.option.price * row.count, 0) + EUR_SYMBOL}
                  </p>
                </div>
              </Grid>
              <Grid size={{ xs: 0, md: 1 }} className={"hidden md:block"}>
                <div className={"flex items-center h-full"}>
                  <IconButton
                    onClick={() => {
                      removeItem(row.product, row.option);
                    }}
                    size={"small"}
                  >
                    <XIcon />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
