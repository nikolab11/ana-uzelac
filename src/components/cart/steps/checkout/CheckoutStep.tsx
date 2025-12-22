"use client";
import { useTranslations, useLocale } from "next-intl";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CheckoutDetails } from "@/types/cart";
import { PersonDetails } from "@/components/cart/steps/checkout/PersonDetails";
import {
  AddressDetails,
  SubmitState,
} from "@/components/cart/steps/checkout/AddressDetails";
import { ItemsDrawer } from "@/components/cart/steps/checkout/ItemsDrawer";
import { BackButton } from "@/components/common/BackButton";
import { useCartContext } from "@/context/cart/cart.context";
import { XIcon } from "@/components/icons/XIcon";
import { buildCheckoutRequest, createCheckoutSession } from "@/api/stripe";

export type CheckoutStep = "person" | "address";

export function CheckoutStep() {
  const t = useTranslations("shop_page");
  const locale = useLocale() as "eng" | "fr";
  const { onOpenChange, items } = useCartContext();
  const [submitState, setSubmitState] = useState<SubmitState>("pending");
  const [activeStep, setActiveStep] = useState<CheckoutStep>("person");
  const [formState, setFormState] = useState<CheckoutDetails>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    state: "",
    countryCode: "",
    phoneNumber: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Track direction for desktop animation
  const prevStepRef = useRef<CheckoutStep>("person");
  const [direction, setDirection] = useState<"up" | "down">("up");
  useEffect(() => {
    const prev = prevStepRef.current;
    if (prev !== activeStep) {
      if (prev === "person" && activeStep === "address") {
        setDirection("up"); // coming from bottom on next
      } else if (prev === "address" && activeStep === "person") {
        setDirection("down"); // coming from top on back
      }
      prevStepRef.current = activeStep;
    }
  }, [activeStep]);

  useLayoutEffect(() => {
    // Only scroll on desktop where steps are separate
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const id = `${activeStep}-step`;
      const element = document.getElementById(id);
      if (!element) return;
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [activeStep]);
  const onSubmit = async () => {
    try {
      setSubmitState("loading");
      const request = buildCheckoutRequest(items, formState, locale);
      const response = await createCheckoutSession(request);

      if (response.status === 200 && response.data.checkout_url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.checkout_url;
      } else {
        setSubmitState("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    }
  };
  return (
    <div
      className={
        "min-h-full md:h-full bg-[#FCF7F1] relative flex flex-col md:flex-row"
      }
    >
      <div
        onClick={() => onOpenChange(false)}
        className={
          "absolute top-4 md:top-9 right-8 md:right-9 cursor-pointer touch-manipulation min-w=[44px] min-h-[44px] flex items-center justify-center z-10"
        }
      >
        <XIcon size={4} />
      </div>
      {/* Mobile: absolute positioned back button */}
      <div className={"md:hidden"}>
        <BackButton
          initialExpanded
          label={t("back_to_cart")}
          onClick={() => onOpenChange(submitState === "pending", "cart")}
        />
      </div>
      <div
        className={
          "flex-1 flex flex-col md:flex-row pt-16 md:pt-0 bg-[#F6F1EB]"
        }
      >
        {/* Main content area */}
        <div className={"flex-1 flex flex-col md:flex-row md:overflow-hidden"}>
          <div
            className={
              "px-4 md:px-9 pt-4 md:pt-9 pb-48 md:pb-9 w-full md:flex-1 md:w-auto md:overflow-y-auto md:h-full"
            }
            style={{ backgroundColor: "#F6F1EB" }}
          >
            {/* Desktop: back button */}
            <div className={"hidden md:block mb-4"}>
              <BackButton
                initialExpanded
                label={t("back_to_cart")}
                onClick={() => onOpenChange(submitState === "pending", "cart")}
              />
            </div>
            {/* Mobile title */}
            <h4
              className={"md:hidden uppercase text-sm font-medium mb-6 md:mb-0"}
            >
              {t("checkout")}
            </h4>
            <div className={"md:hidden mb-6"}>
              {submitState === "pending" && <ItemsDrawer />}
            </div>
            {/* Mobile: show both sections inside a single form */}
            <div className={"md:hidden"}>
              <form
                id={"mobile-checkout-form"}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    formState.email &&
                    formState.firstName &&
                    formState.lastName &&
                    formState.address &&
                    formState.city &&
                    formState.zipCode &&
                    formState.country &&
                    formState.countryCode &&
                    formState.phoneNumber
                  ) {
                    onSubmit();
                  }
                }}
              >
                <PersonDetails
                  formState={formState}
                  onProceed={() => setActiveStep("address")}
                  onChange={onChange}
                  showProceedButton={false}
                  isMobileForm={true}
                />
                <div className={"pt-8"}>
                  <AddressDetails
                    submitState={submitState}
                    formState={formState}
                    onProceed={onSubmit}
                    onChange={onChange}
                    isMobileForm={true}
                  />
                </div>
              </form>
            </div>
            {/* Desktop: title left, form right */}
            <div className={"hidden md:flex items-start gap-9 md:pt-10"}>
              <div className={"shrink-0 pr-4"}>
                <h4 className={"uppercase text-base font-medium m-0"}>
                  {t("checkout")}
                </h4>
              </div>
              <div className={"flex-1"}>
                {/* Animated wrapper keyed by step for desktop only */}
                <div
                  key={activeStep}
                  className={
                    direction === "up" ? "slide-in-up" : "slide-in-down"
                  }
                >
                  {activeStep === "person" && (
                    <PersonDetails
                      formState={formState}
                      onProceed={() => setActiveStep("address")}
                      onChange={onChange}
                      showProceedButton={true}
                    />
                  )}
                  {activeStep === "address" && (
                    <AddressDetails
                      submitState={submitState}
                      formState={formState}
                      onProceed={onSubmit}
                      onChange={onChange}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Mobile: full stacked forms shown above */}
          </div>
          {/* Desktop sidebar */}
          <div className={"hidden md:block md:w-[350px] md:flex-shrink-0"}>
            {submitState === "pending" && <ItemsDrawer />}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .slide-in-up {
            animation: slideInUp 300ms ease both;
          }
          .slide-in-down {
            animation: slideInDown 300ms ease both;
          }
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInDown {
            from {
              opacity: 0;
              transform: translateY(-16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </div>
  );
}
