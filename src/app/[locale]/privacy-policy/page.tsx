import { useTranslations } from "next-intl";
import { AppLayout } from "@/components/layout/AppLayout";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy_policy_page");

  return (
    <AppLayout>
      <div
        className={
          "px-[var(--container-padding)] max-w-screen-xl mx-auto py-6 text-[#444444]"
        }
      >
        <h3 className={"pb-6 text-xl text-center font-bold"}>
          {t("privacy_policy_header")}
        </h3>
        <div className={"pb-6"}>
          <span className={"font-light italic"}>
            {t("privacy_policy_last_updated")}
          </span>
        </div>
        <p className={"pb-9"}>{t("privacy_policy_intro")}</p>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>
            {t("personal_information_we_collect")}
          </h4>
          <p className={"pb-4"}>
            {t("personal_information_we_collect_description_1")}
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: t("personal_information_we_collect_description_2"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>
            {t("how_we_use_your_information")}
          </h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("how_we_use_your_information_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("sharing_your_information")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("sharing_your_information_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("your_rights_eu_gdpr")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("your_rights_eu_gdpr_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("data_retention")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("data_retention_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("cookies")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("cookies_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("security")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("security_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("changes_to_this_policy")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("changes_to_this_policy_description_1"),
            }}
          />
        </div>
        <div className={"pb-9"}>
          <h4 className={"font-bold pb-4"}>{t("contact_us")}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: t("contact_us_description_1"),
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
}
