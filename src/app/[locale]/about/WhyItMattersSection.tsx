import { useTranslations } from "next-intl";

interface Props {
  image: string;
}

export function WhyItMattersSection({ image }: Props) {
  const t = useTranslations("about_page");
  return (
    <div
      className={
        "px-[var(--container-padding)] py-[40px] md:py-[80px] bg-black relative z-10"
      }
    >
      <div className="max-w-screen-xl mx-auto flex-col md:flex-row flex justify-between gap-3 md:gap-9">
        <div className={"relative md:basis-sm grow"}>
          <img
            src={image}
            alt={t("why_it_matters")}
            width={"100%"}
            height={"auto"}
          />
        </div>
        <div
          className={
            "text-center py-[24px] md:py-[32px] px-4 md:px-6 basis-sm grow flex flex-col justify-center items-center gap-2 md:gap-4 text-[var(--background)]"
          }
        >
          <h3 className={"font-bold text-2xl md:text-4xl pb-2 md:pb-4"}>
            {t("why_it_matters")}
          </h3>
          <p className={"text-sm md:text-base"}>
            {t("why_it_matters_description_1")}
          </p>
          <p className={"text-sm md:text-base"}>
            {t("why_it_matters_description_2")}
          </p>
          <p className={"text-sm md:text-base"}>
            {t("why_it_matters_description_3")}
          </p>
        </div>
      </div>
    </div>
  );
}
