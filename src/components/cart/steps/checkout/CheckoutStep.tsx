"use client";
import { useTranslations } from "next-intl";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { CheckoutDetails } from "@/types/cart";
import { PersonDetails } from "@/components/cart/steps/checkout/PersonDetails";
import {
  AddressDetails,
  SubmitState,
} from "@/components/cart/steps/checkout/AddressDetails";
import { ItemsDrawer } from "@/components/cart/steps/checkout/ItemsDrawer";
import { BackButton } from "@/components/common/BackButton";
import { useCartContext } from "@/context/cart/cart.context";
import axios from "axios";

export type CheckoutStep = "person" | "address";

export function CheckoutStep() {
  const t = useTranslations("shop_page");
  const { onOpenChange, items, onClear } = useCartContext();
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

  useLayoutEffect(() => {
    // Only scroll on desktop where steps are separate
    if (window.innerWidth >= 768) {
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
      await axios.post("/order", { ...formState, items });
      setSubmitState("success");
      onClear();
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
      {/* Mobile: absolute positioned back button */}
      <div className={"md:hidden"}>
        <BackButton
          label={t("back_to_cart")}
          onClick={() => onOpenChange(submitState === "pending", "cart")}
        />
      </div>
      <div className={"flex-1 flex flex-col md:flex-row pt-16 md:pt-0"}>
        {/* Main content area */}
        <div className={"flex-1 flex flex-col md:flex-row md:overflow-hidden"}>
          <div
            className={
              "px-4 md:px-9 pt-4 md:pt-9 pb-4 md:pb-9 w-full md:w-[70vw] md:overflow-y-auto md:h-full"
            }
          >
            {/* Desktop: back button in normal flow */}
            <div className={"hidden md:block mb-4"}>
              <BackButton
                label={t("back_to_cart")}
                onClick={() => onOpenChange(submitState === "pending", "cart")}
              />
            </div>
            <h4
              className={
                "uppercase text-sm md:text-base font-medium mb-6 md:mb-0"
              }
            >
              {t("checkout")}
            </h4>
            <div className={"md:hidden mb-6"}>
              {submitState === "pending" && <ItemsDrawer />}
            </div>
            {/* Mobile: show both forms in single form, Desktop: show based on activeStep */}
            <div className={"md:hidden"}>
              <form
                id={"mobile-checkout-form"}
                onSubmit={(e) => {
                  e.preventDefault();
                  // Validate all required fields before submitting
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
            {/* Desktop: step-based */}
            <div className={"hidden md:block md:mt-9"}>
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
          {/* Desktop sidebar */}
          <div className={"hidden md:block md:w-[30vw]"}>
            {submitState === "pending" && <ItemsDrawer />}
          </div>
        </div>
      </div>
    </div>
  );
}
