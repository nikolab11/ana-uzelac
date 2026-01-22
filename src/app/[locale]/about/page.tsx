import { AppLayout } from "@/components/layout/AppLayout";
import { PageProps } from "@/types/pages.types";
import Image from "next/image";
import { HeadText } from "@/components/common/HeadText";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { Link } from "@/i18n/navigation";
import { HoveringButton } from "@/components/common/HoveringButton";
import { ImagesResponse } from "@/types/api.types";
import { WhyItMattersSection } from "@/app/[locale]/about/WhyItMattersSection";
import { DifferentKindOfLuxurySection } from "@/app/[locale]/about/DifferentKindOfLuxurySection";
import { FooterImage } from "@/components/layout/FooterImage";
import { ArtThatFindsYouSection } from "@/app/[locale]/about/ArtThatFindsYouSection";

export default function AboutPage() {
  return (
    <AppLayout>
      <InnerPage />
    </AppLayout>
  );
}
const ABOUT_ELEMENT_ID = "about-description";

function InnerPage({ images }: PageProps) {
  const { t } = useTranslationsWithParse("about_page");
  if (!images) {
    throw new Error("Missing images");
  }
  return (
    <>
      <div className="h-[50vh] md:h-full relative">
        <Image
          style={{
            objectFit: "cover",
          }}
          src={images.about_page.header_about}
          alt={"Image"}
          fill
        />
        <HeadText
          title={t("founder_story")}
          buttonLabel={t("view_more")}
          scrollElementId={ABOUT_ELEMENT_ID}
        />
      </div>
      <AboutDescription />
      <MainImages images={images} />
      <WhyItMattersSection image={images.about_page.why_it_matters} />
      <DifferentKindOfLuxurySection images={images} />
      <ArtThatFindsYouSection image={images.about_page.art_that_finds_you} />
      <FooterImage img={images.home_page.wearing_the_moment} />
    </>
  );
}

function AboutDescription() {
  const { t, tRaw } = useTranslationsWithParse("about_page");

  return (
    <div
      id={ABOUT_ELEMENT_ID}
      className={"bg-black text-[var(--background)] text-center"}
    >
      <div
        className={
          "flex flex-col justify-center items-center py-[32px] md:py-[64px] md:px-[var(--container-padding)] px-4 md:px-0 max-w-screen-xl mx-auto gap-2 md:gap-6"
        }
      >
        <h3 className={"font-bold text-2xl md:text-4xl pb-4"}>
          {t("about_ana_uzelac")}
        </h3>
        <p className={"font-normal text-sm md:text-base"}>
          {t("ana_uzelac_description_1")}
        </p>
        <p className={"font-normal text-sm md:text-base"}>
          {t("ana_uzelac_description_2")}
        </p>
        <p className={"font-normal text-sm md:text-base"}>
          {t("ana_uzelac_description_5")}
        </p>

        <Link href={"/shop"}>
          <HoveringButton label={t("explore_collections")} />
        </Link>
      </div>
    </div>
  );
}

function MainImages({ images }: { images: ImagesResponse }) {
  const { tRaw } = useTranslationsWithParse("about_page");

  return (
    <div
      className={
        "md:max-h-[600px] max-w-screen-xl mx-auto md:h-full py-[8px] md:py-[64px] px-4 md:px-0 flex flex-wrap md:flex-row justify-between gap-1 md:gap-6 text-base font-normal text-[#FCF7F1] uppercase"
      }
    >
      <div
        className={
          "relative w-[calc(50%-2px)] md:w-auto md:grow h-[180px] md:h-auto md:min-h-0"
        }
      >
        <Image
          style={{
            objectFit: "cover",
          }}
          className="md:max-h-[500px]"
          src={images.about_page.about_page_1}
          alt={tRaw("ana_uzelac")}
          fill
        />
        {/* <HeadText position={'end'}>{t('ana_uzelac')} </HeadText> */}
      </div>
      <div
        className={
          "relative w-[calc(50%-2px)] md:w-auto md:grow h-[180px] md:h-auto md:min-h-0"
        }
      >
        <Image
          style={{
            objectFit: "cover",
          }}
          className="md:max-h-[500px]"
          src={images.about_page.about_page_3}
          alt={tRaw("moodboard")}
          fill
        />
        {/* <HeadText position={'end'}>{t('moodboard')}</HeadText> */}
      </div>
      <div
        className={
          "relative w-full md:w-auto md:grow h-[180px] md:h-auto md:min-h-0"
        }
      >
        <Image
          style={{
            objectFit: "cover",
          }}
          className="md:max-h-[500px]"
          src={images.about_page.about_page_5}
          alt={tRaw("work_in_progress")}
          fill
        />
        {/* 	<HeadText position={'end'}>
					{t('work_in_progress')}
				</HeadText> */}
      </div>
    </div>
  );
}
