"use client";

import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@mui/material";
import { useCartContext } from "@/context/cart/cart.context";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export function OrderCancelledContent() {
  const { t } = useTranslationsWithParse("order_page");
  const router = useRouter();
  const { onOpenChange, totalItems } = useCartContext();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F6F1EB] px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <HighlightOffIcon
            sx={{ fontSize: 80, color: "#D32F2F" }}
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-medium text-[#333333] mb-4">
          {t("payment_cancelled")}
        </h1>

        <p className="text-sm md:text-base text-[#444444] mb-2">
          {t("payment_cancelled_description")}
        </p>

        <p className="text-sm md:text-base text-[#444444] mb-8">
          {t("items_still_in_cart")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {totalItems > 0 && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => onOpenChange(true, "checkout")}
              sx={{
                borderRadius: 0,
                padding: { xs: "14px 32px", md: "12px 32px" },
                fontSize: { xs: "0.875rem", md: "0.875rem" },
                fontWeight: { xs: 600, md: 400 },
                minHeight: { xs: "48px", md: "auto" },
                textTransform: "uppercase",
              }}
            >
              {t("try_again")}
            </Button>
          )}
          <Button
            color="primary"
            variant="outlined"
            onClick={() => router.push("/shop")}
            sx={{
              borderRadius: 0,
              padding: { xs: "14px 32px", md: "12px 32px" },
              fontSize: { xs: "0.875rem", md: "0.875rem" },
              fontWeight: { xs: 600, md: 400 },
              minHeight: { xs: "48px", md: "auto" },
              textTransform: "uppercase",
              borderColor: "#333",
              color: "#333",
              "&:hover": {
                borderColor: "#000",
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          >
            {t("continue_shopping")}
          </Button>
        </div>
      </div>
    </div>
  );
}
