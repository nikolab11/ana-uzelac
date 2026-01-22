import { ImagesResponse } from "@/types/api.types";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";

interface Props {
  images: ImagesResponse;
}

export function DifferentKindOfLuxurySection(props: Props) {
  const { t, tRaw } = useTranslationsWithParse("about_page");

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
            "text-center basis-sm grow flex flex-col justify-center items-center gap-2 md:gap-4 text-[var(--text-color)] py-[24px] md:py-[32px] px-4 md:px-12"
          }
        >
          <h3 className={"font-bold text-2xl md:text-4xl pb-4 md:pb-6"}>
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
            alt={tRaw("a_different_kind_of_luxury")}
            width={"100%"}
            height={"auto"}
            style={{
              maxHeight: "680px",
            }}
          />
        </div>
      </div>
      <div
        className={
          "pt-[40px] md:pt-[80px] grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4"
        }
      >
        <div className={"flex flex-col gap-2 md:gap-4 h-full"}>
          <div className={"relative w-full flex-1 min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_1}
              alt={tRaw("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
          <div className={"relative w-full flex-1 min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_6}
              alt={tRaw("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-2 md:gap-4 h-full"}>
          <div className={"relative w-full flex-[0.4] min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_4}
              alt={tRaw("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
          <div className={"relative w-full flex-[0.6] min-h-0"}>
            <img
              className={"w-full h-full object-cover"}
              src={props.images.about_page.about_page_7}
              alt={tRaw("a_different_kind_of_luxury")}
              loading={"lazy"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
