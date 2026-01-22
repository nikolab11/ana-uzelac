"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { Collection } from "@/types/api.types";
import { LocaleType } from "@/types/routing";
import { HeadText } from "@/components/common/HeadText";
import { CollectionSectionView } from "@/app/[locale]/collections/[collectionId]/CollectionSectionView";
import { FooterImage } from "@/components/layout/FooterImage";
import { PageProps } from "@/types/pages.types";
import { HoveringButton } from "@/components/common/HoveringButton";
import Link from "next/link";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

const SCROLL_ELEMENT_ID = "main-collection-section";

export function InnerPage({
  collection,
  images,
}: { collection: Collection } & PageProps) {
  const locale = useLocale() as LocaleType;
  const { t, tRaw } = useTranslationsWithParse("shop_page");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images if there are multiple images
  useEffect(() => {
    if (collection.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % collection.images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [collection.images.length]);

  return (
    <div>
      <div className="h-[50vh] md:min-h-screen relative overflow-hidden">
        {collection.images.map((image, index) => (
          <Image
            key={index}
            style={{
              objectFit: "cover",
              transition: "opacity 0.4s ease-in-out",
              opacity: index === currentImageIndex ? 1 : 0,
            }}
            src={image}
            alt={`Image ${index + 1}`}
            fill
            className={`absolute inset-0 z-0`}
          />
        ))}
        <div className="absolute inset-0 z-20">
          <HeadText
            title={parse(collection.title[locale])}
            position={"center"}
            buttonLabel={t("explore_collection")}
            scrollElementId={SCROLL_ELEMENT_ID}
          >
            <p
              className={
                "text-[var(--background)] text-base md:text-xl font-light text-center"
              }
            >
              {parse(collection.subtitle[locale])}
            </p>
          </HeadText>
        </div>
      </div>
      <div id={SCROLL_ELEMENT_ID} className={"bg-[#F6F1EB]"}>
        <div className={"py-12 md:py-16 px-4 md:px-0 max-w-screen-xl mx-auto"}>
          <p className={"text-sm md:text-base font-light text-center"}>
            {parse(collection.description[locale])}
          </p>
        </div>
        {collection.sections.map((section, index) => {
          console.log(collection);
          const product = collection.products.find(
            (p) => p.name_eng === section.contentTitle["eng"]
          );

          return (
            <div
              key={section.title[locale]}
              className={`px-4 md:px-[var(--container-padding)] py-6 md:py-9  ${
                index % 2 === 0 ? "bg-[#FCF7F1]" : ""
              }`}
            >
              <CollectionSectionView
                section={section}
                inverted={index % 2 === 1}
                collectionId={collection.collection_id}
                productId={product?.product_id}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`pb-10 pt-10 md:pb-[80px] md:pt-[80px]  px-4 md:px-0  flex flex-col justify-center items-center gap-3 md:gap-4 ${
          collection.sections.length % 2 === 0 ? "bg-[#FCF7F1]" : ""
        }`}
      >
        <p
          className={
            "text-sm md:text-base font-normal text-center md:max-w-[50%]"
          }
        >
          {parse(collection.neki_opis[locale])}
        </p>
        <Link href={`/shop?collection_ids=${collection.collection_id}`}>
          <HoveringButton mode={"dark"} label={t("shop_collection")} />
        </Link>
      </div>
      <FooterImage img={images?.home_page.wearing_the_moment || ""} />
    </div>
  );
}
