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
      <h4 className={"font-medium text-lg md:text-2xl pb-6 md:pb-[48px]"}>
        {t("proceed_to_payment")}
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
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", md: "1rem" },
              },
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
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
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
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
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
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
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
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
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
                    "& .MuiSelect-select": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
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
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
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
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", md: "1rem" },
              },
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
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
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
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
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
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
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
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
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
                    "& .MuiSelect-select": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
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
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
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
                #You have successfully created an order
              </div>
            )}
            {props.submitState === "error" && (
              <div className={"text-sm md:text-base"}>
                #There was an error creating an orderr
              </div>
            )}
          </div>
        </form>
      )}
      {props.isMobileForm && (
        <div className={"pt-6 md:pt-9"}>
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
              #You have successfully created an order
            </div>
          )}
          {props.submitState === "error" && (
            <div className={"text-sm md:text-base"}>
              #There was an error creating an orderr
            </div>
          )}
        </div>
      )}
    </div>
  );
}
