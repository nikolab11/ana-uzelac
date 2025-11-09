import { useTranslations } from "next-intl";
import { AppLayout } from "@/components/layout/AppLayout";
import parse from "html-react-parser";

export default function TermsConditionsPage() {
  const t = useTranslations("terms_conditions_page");

  return (
    <AppLayout>
      <div
        className={
          "px-[var(--container-padding)] max-w-screen-xl mx-auto py-6 text-[#444444]"
        }
      >
        <h3 className={"pb-6 text-xl text-center font-bold"}>
          {t("terms_conditions_header")
            .split("&")
            .reduce<React.ReactNode[]>((acc, part, idx, arr) => {
              acc.push(part);
              if (idx < arr.length - 1) {
                acc.push(
                  <span
                    key={idx}
                    style={{ fontFamily: '"Abhaya Libre", serif' }}
                  >
                    &
                  </span>
                );
              }
              return acc;
            }, [])}
        </h3>
        <div className={"pb-6"}>
          <span className={"font-light italic"}>
            {t("terms_conditions_last_updated")}
          </span>
        </div>
        <p className={"pb-9"}>{t("terms_conditions_intro")}</p>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("overview")}</h4>
          <p>{parse(t("overview_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("products_and_availability")}</h4>
          <p>{parse(t("products_and_availability_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("pricing_and_payment")}</h4>
          <p>{parse(t("pricing_and_payment_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("orders")}</h4>
          <p>{parse(t("orders_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("shipping")}</h4>
          <p>{parse(t("shipping_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("returns_and_exchanges")}</h4>
          <p>{parse(t("returns_and_exchanges_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("intellectual_property")}</h4>
          <p>{parse(t("intellectual_property_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>
            {t("personal_information_section")}
          </h4>
          <p>{parse(t("personal_information_section_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("limitation_of_liability")}</h4>
          <p>{parse(t("limitation_of_liability_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("governing_law")}</h4>
          <p>{parse(t("governing_law_description_1"))}</p>
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("contact_terms")}</h4>
          <p>{parse(t("contact_terms_description_1"))}</p>
        </div>
      </div>
    </AppLayout>
  );
}
