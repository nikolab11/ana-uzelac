import { CollectionSection } from "@/types/api.types";
import { useLocale } from "next-intl";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { LocaleType } from "@/types/routing";
import { SectionImages } from "@/app/[locale]/collections/[collectionId]/SectionImages";
import Image from "next/image";
import Link from "next/link";
import { HoveringButton } from "@/components/common/HoveringButton";

interface Props {
  section: CollectionSection;
  inverted: boolean;
  collectionId: number;
  productId?: number;
}

export function CollectionSectionView(props: Props) {
  const locale = useLocale() as LocaleType;
  const { tRaw } = useTranslationsWithParse("home_page");

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-8 md:gap-20">
      <div
        className={`flex flex-col md:flex-row py-6 md:py-15 ${
          props.inverted ? "md:flex-row-reverse" : ""
        } gap-4 md:gap-[72px] items-center md:items-center justify-between pb-6 md:pb-[80px]`}
      >
        <h3
          className={
            "grow text-nowrap font-bold text-3xl md:text-6xl text-center md:text-left"
          }
        >
          {props.section.title[locale]}
        </h3>
        <p
          className={`text-sm md:text-base font-normal text-center ${
            props.inverted ? "md:text-left" : "md:text-right"
          } md:pl-6 pl-0`}
        >
          {props.section.description[locale]}
        </p>
      </div>
      <div
        className={`flex flex-col md:flex-row ${
          props.inverted ? "md:flex-row-reverse" : ""
        } gap-6 md:gap-[72px] items-center md:items-center justify-between`}
      >
        <div className={"w-full md:w-[55%]"}>
          <h4
            className={`pb-3 md:pb-4 font-bold text-2xl md:text-4xl text-center ${
              props.inverted ? "md:text-right" : "md:text-left"
            }`}
          >
            {props.section.contentTitle["eng"]}
          </h4>
          <p
            className={`text-sm md:text-base font-normal text-center ${
              props.inverted ? "md:text-right" : "md:text-left"
            }`}
          >
            {props.section.content[locale]}
          </p>
          <div
            className={`pt-3 md:pt-4 flex justify-center ${
              props.inverted ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <Link
              href={
                props.productId
                  ? `/products/${props.productId}`
                  : `/shop?collection_ids=${props.collectionId}`
              }
            >
              <HoveringButton
                inverted={props.inverted}
                mode="dark"
                label={tRaw("shop_now")}
              />
            </Link>
          </div>
        </div>
        <div className={"w-full md:grow"}>
          <SectionImages section={props.section} />
        </div>
      </div>
      <div
        className={
          "flex flex-col md:flex-row gap-3 md:gap-5 pt-6 md:pt-9 md:overflow-x-auto"
        }
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {props.section.sideImages.map((image, index) => {
          return (
            <Image
              key={index}
              alt={"saffs"}
              src={image}
              style={{
                width: "100%",
              }}
              width={250}
              height={300}
              className="w-full md:w-auto"
            />
          );
        })}
      </div>
    </div>
  );
}
