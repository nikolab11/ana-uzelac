import { CheckoutDetails } from "@/types/cart";
import { ChangeEvent } from "react";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { Button, TextField } from "@mui/material";

interface Props {
  formState: CheckoutDetails;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onProceed: () => void;
  showProceedButton?: boolean;
  isMobileForm?: boolean;
}

export function PersonDetails(props: Props) {
  const { t } = useTranslationsWithParse("shop_page");
  return (
    <div className={"w-full md:w-[70%]"} id={"person-step"}>
      <h4 className={"font-medium text-lg md:text-2xl pb-2 md:pb-[48px]"}>
        {t("who_is_ordering")}
      </h4>

      {props.isMobileForm ? (
        <div>
          <TextField
            type={"email"}
            required
            fullWidth
            className={"mb-4"}
            variant={"standard"}
            label={t("email")}
            onChange={props.onChange}
            name={"email"}
            value={props.formState.email}
            sx={{
              opacity: 0.67,
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", md: "1rem" },
                color: "#444444",
                fontWeight: 400,
                "::placeholder": {
                  color: "#444444",
                  opacity: 1,
                  fontWeight: 300,
                },
              },
              "& .MuiInputLabel-root": { color: "#444444" },
            }}
          />
          <div
            className={
              "flex flex-col sm:flex-row justify-between gap-3 pt-4 md:pt-9"
            }
          >
            <TextField
              required
              fullWidth
              variant={"standard"}
              name={"firstName"}
              onChange={props.onChange}
              value={props.formState.firstName}
              label={t("first_name")}
              sx={{
                opacity: 0.8,
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: "#444444",
                  fontWeight: 400,
                  "::placeholder": {
                    color: "#444444",
                    opacity: 1,
                    fontWeight: 300,
                  },
                },
                "& .MuiInputLabel-root": { color: "#444444" },
              }}
            />
            <TextField
              required
              fullWidth
              variant={"standard"}
              name={"lastName"}
              onChange={props.onChange}
              value={props.formState.lastName}
              label={t("last_name")}
              sx={{
                opacity: 0.8,
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: "#444444",
                  fontWeight: 400,
                  "::placeholder": {
                    color: "#444444",
                    opacity: 1,
                    fontWeight: 300,
                  },
                },
                "& .MuiInputLabel-root": { color: "#444444" },
              }}
            />
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onProceed();
          }}
        >
          <TextField
            type={"email"}
            required
            fullWidth
            className={"mb-4"}
            variant={"standard"}
            label={t("email")}
            onChange={props.onChange}
            name={"email"}
            value={props.formState.email}
            sx={{
              opacity: 0.8,
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", md: "1rem" },
                color: "#444444",
                fontWeight: 400,
                "::placeholder": {
                  color: "#444444",
                  opacity: 1,
                  fontWeight: 300,
                },
              },
              "& .MuiInputLabel-root": { color: "#444444" },
            }}
          />
          <div
            className={
              "flex flex-col sm:flex-row justify-between gap-3 pt-4 md:pt-9"
            }
          >
            <TextField
              required
              fullWidth
              variant={"standard"}
              name={"firstName"}
              onChange={props.onChange}
              value={props.formState.firstName}
              label={t("first_name")}
              sx={{
                opacity: 0.8,
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: "#444444",
                  fontWeight: 400,
                  "::placeholder": {
                    color: "#444444",
                    opacity: 1,
                    fontWeight: 300,
                  },
                },
                "& .MuiInputLabel-root": { color: "#444444" },
              }}
            />
            <TextField
              required
              fullWidth
              variant={"standard"}
              name={"lastName"}
              onChange={props.onChange}
              value={props.formState.lastName}
              label={t("last_name")}
              sx={{
                opacity: 0.8,
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: "#444444",
                  fontWeight: 400,
                  "::placeholder": {
                    color: "#444444",
                    opacity: 1,
                    fontWeight: 300,
                  },
                },
                "& .MuiInputLabel-root": { color: "#444444" },
              }}
            />
          </div>
          {props.showProceedButton !== false && (
            <div className={"pt-6 md:pt-9"}>
              <Button
                className={"uppercase touch-manipulation"}
                type={"submit"}
                color={"primary"}
                sx={{
                  borderRadius: 0,
                  padding: { xs: "14px 24px", md: "12px 24px" },
                  fontSize: { xs: "0.875rem", md: "0.875rem" },
                  minHeight: { xs: "48px", md: "auto" },
                  fontWeight: { xs: 600, md: 400 },
                }}
                variant={"contained"}
              >
                {t("proceed_to_shipping")}
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
