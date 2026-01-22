import { useCartContext } from "@/context/cart/cart.context";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { CartItemsGrid } from "@/components/cart/CartItemsGrid";
import { Button, Drawer } from "@mui/material";
import { EUR_SYMBOL, SHIPPING_PRICE } from "@/utils/constants";
import { formatNumber } from "@/utils/product.utils";
import { BackButton } from "@/components/common/BackButton";
import { XIcon } from "@/components/icons/XIcon";
import { useRouter } from "@/i18n/navigation";

export function ViewCartStep() {
  const { onOpenChange, totalItems, totalPrice } = useCartContext();
  const router = useRouter();

  const { t, tRaw } = useTranslationsWithParse("shop_page");
  return (
    <div className={"h-full relative bg-[#F6F1EB] flex flex-col md:flex-row"}>
      <div
        onClick={() => onOpenChange(false)}
        className={
          "absolute top-4 md:top-[64px] right-4 md:right-9 cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
        }
      >
        <XIcon size={4} />
      </div>
      <div
        className={
          "pl-4 md:pl-[var(--container-padding)] relative w-full md:w-[70vw] h-full pr-4 md:pr-9 pt-16 md:pt-9 pb-32 md:pb-0"
        }
      >
        <BackButton
          initialExpanded
          label={tRaw("back_to_shop")}
          onClick={() => {
            onOpenChange(false);
            router.push("/shop");
          }}
        />
        <div className="flex flex-col sm:flex-row pb-4 md:pb-9 items-start sm:items-center justify-between gap-2 md:gap-0">
          <h4
            className={
              "uppercase font-medium text-sm md:text-base py-3 md:py-6"
            }
          >
            {t("shopping_cart")}
          </h4>
          <h4 className={"uppercase font-medium text-xs md:text-base"}>
            {`${totalItems} ${totalItems > 1 ? t("items") : t("item")}`}
          </h4>
        </div>
        <div
          className={"overflow-y-auto pb-48 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"}
        >
          <CartItemsGrid />
        </div>
        <div
          className={
            "absolute left-4 md:left-[var(--container-padding)] bottom-5 md:bottom-[32px] text-[#838383] text-[10px] md:text-xs font-normal"
          }
        >
          {t("free_shipping_for_all_orders")}
        </div>
      </div>
      <div className={"w-full md:w-auto"}>
        {/* Mobile: bottom-anchored summary */}
        <Drawer
          variant={"permanent"}
          anchor={"bottom"}
          className={"md:hidden"}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              height: "auto",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              boxShadow: "0 -10px 30px rgba(0,0,0,0.15)",
            },
          }}
        >
          <div
            className={
              "px-4 py-4 flex flex-col w-full bg-[#FCF7F1] gap-4 border-t border-[#E5E5E5]"
            }
          >
            <div>
              <h4 className={"uppercase font-medium text-sm py-2"}>
                {t("summary")}
              </h4>
            </div>
            <div className={"grow flex flex-col gap-3"}>
              <div className={"flex justify-between gap-4"}>
                <div className={"font-medium text-xs"}>{t("subtotal")}</div>
                <div className={"font-bold text-xs"}>{`${formatNumber(
                  totalPrice
                )}${EUR_SYMBOL}`}</div>
              </div>
              <div className={"flex justify-between gap-4"}>
                <div className={"font-medium text-xs"}>{t("shipping")}</div>
                <div className={"font-bold text-xs"}>{`${formatNumber(
                  SHIPPING_PRICE
                )}${EUR_SYMBOL}`}</div>
              </div>
            </div>
            <div
              className={
                "flex justify-between gap-4 pt-4 border-t border-[#E5E5E5]"
              }
            >
              <div className={"font-medium text-sm"}>{t("total")}</div>
              <div className={"font-bold text-sm"}>{`${formatNumber(
                totalPrice + SHIPPING_PRICE
              )}${EUR_SYMBOL}`}</div>
            </div>
            <div>
              <Button
                color={"primary"}
                variant={"contained"}
                sx={{
                  borderRadius: 0,
                  padding: { xs: "14px 20px", md: "12px 30px" },
                  width: "100%",
                  fontSize: { xs: "0.875rem", md: "0.875rem" },
                  fontWeight: { xs: 600, md: 400 },
                  minHeight: { xs: "48px", md: "auto" },
                }}
                onClick={() => {
                  onOpenChange(true, "checkout");
                }}
                className={"touch-manipulation"}
              >
                {t("checkout_button")}
              </Button>
            </div>
          </div>
        </Drawer>
        {/* Desktop sidebar */}
        <Drawer
          variant={"permanent"}
          anchor={"right"}
          className={"hidden md:block"}
          sx={{
            "& .MuiDrawer-paper": {
              position: "absolute",
              width: "30vw",
              height: "100%",
              bottom: "auto",
              top: 0,
              maxWidth: "350px",
              overflowX: "hidden",
            },
          }}
        >
          <div
            className={
              "relative md:max-w-[350px] overflow-x-hidden px-4 md:px-9 py-4 md:py-6 flex flex-col w-full md:w-[30vw] h-full bg-[#FCF7F1] gap-4 md:gap-2 border-t md:border-t-0 border-[#E5E5E5]"
            }
            style={{
              backgroundColor: "#FCF7F1",
            }}
          >
            {/* Summary close button aligned with left back button */}
            <div
              onClick={() => onOpenChange(false)}
              className={
                "hidden md:flex absolute top-6 right-4 md:right-9 cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] items-center justify-center z-10"
              }
              aria-label={tRaw("close")}
              role="button"
            >
              <XIcon size={4} />
            </div>
            <div>
              <h4
                className={
                  "uppercase font-medium text-sm md:text-base py-2 md:py-15"
                }
              >
                {t("summary")}
              </h4>
            </div>
            <div className={"grow flex flex-col gap-3 md:gap-4"}>
              <div className={"flex justify-between gap-4 md:gap-9"}>
                <div className={"font-medium text-xs md:text-sm"}>
                  {t("subtotal")}
                </div>
                <div className={"font-bold text-xs md:text-sm"}>
                  {`${formatNumber(totalPrice)}${EUR_SYMBOL}`}
                </div>
              </div>
              <div className={"flex justify-between gap-4 md:gap-9"}>
                <div className={"font-medium text-xs md:text-sm"}>
                  {t("shipping")}
                </div>
                <div className={"font-bold text-xs md:text-sm"}>
                  {`${formatNumber(SHIPPING_PRICE)}${EUR_SYMBOL}`}
                </div>
              </div>
            </div>
            <div
              className={
                "flex justify-between gap-4 md:gap-9 pt-4 md:pt-2 pb-4 md:pb-0 border-t border-[#E5E5E5] md:border-t-0"
              }
            >
              <div className={"font-medium text-sm md:text-sm"}>
                {t("total")}
              </div>
              <div className={"font-bold text-sm md:text-sm"}>
                {`${formatNumber(totalPrice + SHIPPING_PRICE)}${EUR_SYMBOL}`}
              </div>
            </div>
            <div>
              <Button
                color={"primary"}
                variant={"contained"}
                sx={{
                  borderRadius: 0,
                  padding: { xs: "14px 20px", md: "12px 30px" },
                  width: "100%",
                  fontSize: { xs: "0.875rem", md: "0.875rem" },
                  fontWeight: { xs: 600, md: 400 },
                  minHeight: { xs: "48px", md: "auto" },
                }}
                onClick={() => {
                  onOpenChange(true, "checkout");
                }}
                className={"touch-manipulation"}
              >
                {t("checkout_button")}
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
