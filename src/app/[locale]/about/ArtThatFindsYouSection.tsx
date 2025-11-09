import { useTranslations } from "next-intl";

interface Props {
  image: string;
}

export function ArtThatFindsYouSection({ image }: Props) {
  const t = useTranslations("about_page");
  return (
    <div className={"px-[var(--container-padding)] bg-black relative z-10"}>
      <div className="max-w-screen-xl mx-auto flex-col md:flex-row py-[40px] md:py-[80px] flex justify-between gap-3 md:gap-9">
        <div className={"relative md:basis-sm grow"}>
          <img
            src={image}
            alt={t("art_that_finds_you")}
            width={"100%"}
            height={"auto"}
          />
        </div>
        <div
          className={
            "text-center py-[24px] md:py-[32px] px-4 md:px-12 basis-sm grow flex flex-col justify-center items-center gap-2 md:gap-4 text-[var(--background)]"
          }
        >
          <h3 className={"font-bold text-2xl md:text-4xl pb-2 md:pb-6"}>
            {t("art_that_finds_you")}
          </h3>
          <p className={"text-sm light-text font-light  md:text-base"}>
            {t("art_that_finds_you_description_1")}
          </p>
          <p className={"text-sm light-text font-light  md:text-base"}>
            {t("art_that_finds_you_description_2")}
          </p>
        </div>
      </div>
    </div>
  );
}
