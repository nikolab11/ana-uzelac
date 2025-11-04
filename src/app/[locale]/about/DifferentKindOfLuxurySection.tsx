import { ImagesResponse } from "@/types/api.types";
import { useTranslations } from "next-intl";

interface Props {
  images: ImagesResponse;
}

export function DifferentKindOfLuxurySection(props: Props) {
  const t = useTranslations("about_page");

  return (
    <div
      className={"max-w-screen-xl mx-auto py-[40px] md:py-[80px] px-4 md:px-0"}
    >
      <div
        className={
          " flex-col md:flex-row  flex justify-between  gap-3 md:gap-9"
        }
      >
        <div
          className={
            "text-center basis-sm grow flex flex-col justify-center items-center gap-2 md:gap-4 text-[var(--text-color)] py-[24px] md:py-[32px]"
          }
        >
          <h3 className={"font-bold text-2xl md:text-4xl pb-4 md:pb-8"}>
            {t("a_different_kind_of_luxury")}
          </h3>
          <p className={"text-sm md:text-base"}>
            {t("a_different_kind_of_luxury_description_1")}
          </p>
          <p className={"text-sm md:text-base"}>
            {t("a_different_kind_of_luxury_description_2")}
          </p>
          <p className={"text-sm md:text-base"}>
            {t("a_different_kind_of_luxury_description_3")}
          </p>
        </div>
        <div className={"relative basis-sm  grow"}>
          <img
            src={props.images.about_page.a_different_kind_of_luxury}
            alt={t("a_different_kind_of_luxury")}
            width={"100%"}
            height={"auto"}
            style={{
              maxHeight: "600px",
            }}
          />
        </div>
      </div>
      <div
        className={
          "pt-[40px] md:pt-[80px] grid grid-cols-1 md:grid-cols-2 gap-2"
        }
      >
        <div className={"flex flex-col gap-2 h-full"}>
          <div className={"relative w-full flex-1 min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_1}
              alt={t("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
          <div className={"relative w-full flex-1 min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_4}
              alt={t("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-2 h-full"}>
          <div className={"relative w-full flex-[0.4] min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_6}
              alt={t("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
          <div className={"relative w-full flex-[0.6] min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_7}
              alt={t("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
