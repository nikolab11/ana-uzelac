import { CheckoutDetails } from "@/types/cart";
import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { COUNTRY_CODES } from "@/utils/country-codes";

export type SubmitState = "pending" | "success" | "error";

interface Props {
  formState: CheckoutDetails;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onProceed: () => void;
  submitState: SubmitState;
  isMobileForm?: boolean;
}

export function AddressDetails(props: Props) {
  const t = useTranslations("shop_page");
  return (
    <div className={"w-full md:w-[70%]"} id={"address-step"}>
      <h4 className={"font-medium text-lg md:text-2xl pb-2 md:pb-[48px]"}>
        {t("order_details")}
      </h4>
      {props.isMobileForm ? (
        <div>
          <TextField
            required
            fullWidth
            variant={"standard"}
            name={"address"}
            onChange={props.onChange}
            value={props.formState.address}
            label={t("address")}
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
            <div className={"grow-[7]"}>
              <TextField
                required
                fullWidth
                variant={"standard"}
                name={"city"}
                onChange={props.onChange}
                value={props.formState.city}
                label={t("city")}
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
            <div className={"grow"}>
              <TextField
                required
                fullWidth
                variant={"standard"}
                name={"zipCode"}
                onChange={props.onChange}
                value={props.formState.zipCode}
                label={t("zip_code")}
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
          <div className={"pt-4 md:pt-9"}>
            <TextField
              required
              fullWidth
              variant={"standard"}
              name={"country"}
              onChange={props.onChange}
              value={props.formState.country}
              label={t("country")}
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
          <div className={"pt-4 md:pt-9"}>
            <TextField
              fullWidth
              variant={"standard"}
              name={"state"}
              onChange={props.onChange}
              value={props.formState.state}
              label={t("state_province")}
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
          <div
            className={
              "flex flex-col sm:flex-row justify-between gap-3 pt-4 md:pt-9 items-end"
            }
          >
            <div className={"grow w-full sm:w-auto"}>
              <FormControl fullWidth required>
                <InputLabel
                  id={"country-code-label"}
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      md: "1rem",
                      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      paddingLeft: "0",
                      marginLeft: "-15px",
                      paddingTop: "5px",
                    },
                    color: "#444444",
                    opacity: 0.8,
                  }}
                >
                  {t("country_code")}
                </InputLabel>
                <Select
                  onChange={props.onChange as never}
                  labelId={"country-code-label"}
                  variant={"standard"}
                  name={"countryCode"}
                  value={props.formState.countryCode}
                  sx={{
                    opacity: 0.8,
                    "& .MuiSelect-select": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      color: "#444444",
                      fontWeight: 400,
                    },
                  }}
                >
                  {COUNTRY_CODES.map((code) => {
                    return (
                      <MenuItem key={code.code} value={code.code}>
                        {code.dial_code}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={"grow-[2] w-full sm:w-auto"}>
              <TextField
                required
                fullWidth
                variant={"standard"}
                name={"phoneNumber"}
                onChange={props.onChange}
                value={props.formState.phoneNumber}
                label={t("phone_number")}
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
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onProceed();
          }}
        >
          <TextField
            required
            fullWidth
            variant={"standard"}
            name={"address"}
            onChange={props.onChange}
            value={props.formState.address}
            label={t("address")}
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
            <div className={"grow-[7]"}>
              <TextField
                required
                fullWidth
                variant={"standard"}
                name={"city"}
                onChange={props.onChange}
                value={props.formState.city}
                label={t("city")}
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
            <div className={"grow"}>
              <TextField
                required
                fullWidth
                variant={"standard"}
                name={"zipCode"}
                onChange={props.onChange}
                value={props.formState.zipCode}
                label={t("zip_code")}
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
          <div className={"pt-4 md:pt-9"}>
            <TextField
              required
              fullWidth
              variant={"standard"}
              name={"country"}
              onChange={props.onChange}
              value={props.formState.country}
              label={t("country")}
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
          <div className={"pt-4 md:pt-9"}>
            <TextField
              fullWidth
              variant={"standard"}
              name={"state"}
              onChange={props.onChange}
              value={props.formState.state}
              label={t("state_province")}
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
          <div
            className={
              "flex flex-col sm:flex-row justify-between gap-3 pt-4 md:pt-9 items-end"
            }
          >
            <div className={"grow w-full sm:w-auto"}>
              <FormControl fullWidth required>
                <InputLabel
                  id={"country-code-label"}
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      md: "1rem",
                      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      paddingLeft: "0",
                      marginLeft: "-15px",
                      paddingTop: "5px",
                    },
                    color: "#444444",
                    opacity: 0.8,
                  }}
                >
                  {t("country_code")}
                </InputLabel>
                <Select
                  onChange={props.onChange as never}
                  labelId={"country-code-label"}
                  variant={"standard"}
                  name={"countryCode"}
                  value={props.formState.countryCode}
                  sx={{
                    opacity: 0.8,
                    "& .MuiSelect-select": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      color: "#444444",
                      fontWeight: 400,
                    },
                  }}
                >
                  {COUNTRY_CODES.map((code) => {
                    return (
                      <MenuItem key={code.code} value={code.code}>
                        {code.dial_code}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={"grow-[2] w-full sm:w-auto"}>
              <TextField
                required
                fullWidth
                variant={"standard"}
                name={"phoneNumber"}
                onChange={props.onChange}
                value={props.formState.phoneNumber}
                label={t("phone_number")}
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
          <div className={"pt-6 md:pt-9"}>
            {props.submitState === "pending" && (
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
                {t("proceed_to_payment")}
              </Button>
            )}
            {props.submitState === "success" && (
              <div className={"text-sm md:text-base"}>
                {t("you_have_successfully_created_an_order")}
              </div>
            )}
            {props.submitState === "error" && (
              <div className={"text-sm md:text-base"}>
                {t("there_was_an_error_creating_an_order")}
              </div>
            )}
          </div>
        </form>
      )}
      {props.isMobileForm && (
        <div
          className={
            "md:hidden fixed left-0 right-0 bottom-0 z-1201 bg-[#FCF7F1] border-t border-[#E5E5E5] p-4"
          }
        >
          {props.submitState === "pending" && (
            <Button
              className={"uppercase touch-manipulation"}
              type={"submit"}
              form={"mobile-checkout-form"}
              color={"primary"}
              sx={{
                borderRadius: 0,
                padding: { xs: "14px 24px", md: "12px 24px" },
                fontSize: { xs: "0.875rem", md: "0.875rem" },
                minHeight: { xs: "48px", md: "auto" },
                fontWeight: { xs: 600, md: 400 },
                width: "100%",
              }}
              variant={"contained"}
            >
              {t("proceed_to_payment")}
            </Button>
          )}
          {props.submitState === "success" && (
            <div className={"text-sm md:text-base"}>
              {t("you_have_successfully_created_an_order")}
            </div>
          )}
          {props.submitState === "error" && (
            <div className={"text-sm md:text-base"}>
              {t("there_was_an_error_creating_an_order")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
