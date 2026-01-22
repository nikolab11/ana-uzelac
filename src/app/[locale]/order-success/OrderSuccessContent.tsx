"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { useRouter } from "@/i18n/navigation";
import { useCartContext } from "@/context/cart/cart.context";
import { OrderStatusResponse, getOrderStatus } from "@/api/stripe";
import { Button, CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { t } = useTranslationsWithParse("order_page");
  const router = useRouter();
  const { onClear } = useCartContext();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkOrderStatus() {
      if (!sessionId) {
        setError("no_session_id");
        setLoading(false);
        return;
      }

      try {
        const result = await getOrderStatus(sessionId);
        if (result && result.status === "paid") {
          setOrder(result);
          onClear();
        } else if (result && result.status === "pending") {
          setError("payment_pending");
        } else {
          setError("payment_not_confirmed");
        }
      } catch {
        setError("error_checking_status");
      } finally {
        setLoading(false);
      }
    }

    checkOrderStatus();
  }, [sessionId, onClear]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F6F1EB] px-4">
        <CircularProgress sx={{ color: "#333" }} />
        <p className="mt-4 text-sm text-[#444444]">{t("verifying_payment")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F6F1EB] px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl md:text-3xl font-medium text-[#333333] mb-4">
            {t("payment_issue")}
          </h1>
          <p className="text-sm md:text-base text-[#444444] mb-8">
            {t(error)}
          </p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/shop")}
            sx={{
              borderRadius: 0,
              padding: { xs: "14px 32px", md: "12px 32px" },
              fontSize: { xs: "0.875rem", md: "0.875rem" },
              fontWeight: { xs: 600, md: 400 },
              minHeight: { xs: "48px", md: "auto" },
              textTransform: "uppercase",
            }}
          >
            {t("back_to_shop")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F6F1EB] px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "#2E7D32" }}
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-medium text-[#333333] mb-4">
          {t("order_confirmed")}
        </h1>

        <p className="text-sm md:text-base text-[#444444] mb-2">
          {t("thank_you_for_your_order")}
        </p>

        <p className="text-sm md:text-base text-[#444444] mb-8">
          {t("confirmation_email_sent")}
        </p>

        {order && (
          <div className="bg-white/50 rounded-lg p-6 md:p-8 mb-8 text-left">
            <h2 className="text-lg md:text-xl font-medium text-[#333333] mb-4 text-center">
              {t("order_summary")}
            </h2>

            <div className="border-b border-[#E5E5E5] pb-4 mb-4">
              <div className="flex justify-between text-sm text-[#444444] mb-2">
                <span>{t("order_number")}</span>
                <span className="font-medium">#{order.order_id}</span>
              </div>
              <div className="flex justify-between text-sm text-[#444444]">
                <span>{t("email")}</span>
                <span>{order.customer_email}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm text-[#444444]"
                >
                  <span>
                    {item.name}
                    {item.size && (
                      <span className="text-xs text-[#666666] ml-2">
                        ({item.size})
                      </span>
                    )}
                    <span className="text-xs text-[#666666] ml-2">
                      x{item.quantity}
                    </span>
                  </span>
                  <span>
                    {order.currency} {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E5E5] pt-4">
              <div className="flex justify-between text-base font-medium text-[#333333]">
                <span>{t("total")}</span>
                <span>
                  {order.currency} {order.total_amount}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/shop")}
            sx={{
              borderRadius: 0,
              padding: { xs: "14px 32px", md: "12px 32px" },
              fontSize: { xs: "0.875rem", md: "0.875rem" },
              fontWeight: { xs: 600, md: 400 },
              minHeight: { xs: "48px", md: "auto" },
              textTransform: "uppercase",
            }}
          >
            {t("continue_shopping")}
          </Button>
        </div>
      </div>
    </div>
  );
}
