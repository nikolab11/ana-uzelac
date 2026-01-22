import { Button, Drawer } from "@mui/material";
import { useCartContext } from "@/context/cart/cart.context";
import { XIcon } from "@/components/icons/XIcon";
import { CSSProperties } from "react";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { ShoppingBag } from "@/components/icons/ShoppingBag";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ViewCartStep } from "@/components/cart/steps/ViewCartStep";
import { CheckoutStep } from "@/components/cart/steps/checkout/CheckoutStep";

const containerStyle: CSSProperties = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

export function CartMain() {
  const { t } = useTranslationsWithParse("shop_page");
  const { open, onOpenChange, items, step } = useCartContext();
  const onClose = () => onOpenChange(false);
  const router = useRouter();
  const pathname = usePathname();
  const hasItems =
    Object.values(items).flatMap((val) => Object.keys(val)).length > 0;
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: "100vw",
            md: hasItems || step === "checkout" ? "90vw" : "450px",
          },
          height: { xs: "100vh", md: "90vh" },
        },
      }}
    >
      <div className={`h-full w-full `}>
        {!hasItems && step !== "checkout" && (
          <EmptyCart
            onClose={() => {
              onClose();
              if (!pathname.endsWith("/shop")) {
                router.push("/shop");
              }
            }}
          />
        )}
        {hasItems && step === "cart" && <ViewCartStep />}
        {step === "checkout" && <CheckoutStep />}
      </div>
    </Drawer>
  );
}

function EmptyCart(props: { onClose: () => void }) {
  const { t } = useTranslationsWithParse("shop_page");
  const { onOpenChange } = useCartContext();

  return (
    <div
      className={
        "p-4 md:p-9 overflow-auto h-full flex flex-col justify-between"
      }
      style={{ backgroundColor: "#F6F1EB" }}
    >
      <div className={"flex justify-between items-center pb-4 md:pb-7"}>
        <h4
          className={
            "text-medium text-sm md:text-base uppercase text-[var(--text-color)]"
          }
        >
          {t("shopping_cart")}
        </h4>
        <div
          onClick={() => onOpenChange(false)}
          className={
            "cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          }
        >
          <XIcon size={4} />
        </div>
      </div>
      <div style={containerStyle} className={"overflow-auto grow"}>
        <div
          className={
            "flex flex-col h-full items-center justify-center gap-5 md:gap-5 px-4"
          }
        >
          <div className={"mb-2 md:mb-0"}>
            <ShoppingBag size={7} />
          </div>
          <p
            className={
              "text-sm md:text-sm font-normal text-center max-w-[280px] md:max-w-none"
            }
          >
            {t("cart_empty")}
          </p>
          <Button
            onClick={props.onClose}
            className={"font-medium touch-manipulation"}
            sx={{
              padding: { xs: "14px 28px", md: "10px 24px" },
              borderRadius: 0,
              fontSize: { xs: "0.875rem", md: "12px" },
              minHeight: { xs: "48px", md: "auto" },
              fontWeight: { xs: 600, md: 500 },
            }}
            variant={"contained"}
            color={"primary"}
          >
            {t("continue_shopping")}
          </Button>
        </div>
      </div>
    </div>
  );
}
