import { Collection } from "@/types/api.types";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ProductsSection } from "@/app/[locale]/home/ProductsSection";
import { HoveringButton } from "@/components/common/HoveringButton";
import { LocaleType } from "@/types/routing";
import { Link } from "@/i18n/navigation";

interface Props {
  collections: Collection[];
}

export function CollectionsSection(props: Props) {
  return (
    <div
      className={
        "py-0 md:py-[var(--vertical-padding)] md:px-0 px-[var(--container-padding)]"
      }
    >
      {props.collections.map((collection, index) => {
        return (
          <CollectionItem
            collection={collection}
            key={collection.collection_id}
            alternative={index % 2 === 1}
            isFirst={index === 0}
          />
        );
      })}
    </div>
  );
}

function CollectionItem(props: {
  collection: Collection;
  alternative?: boolean;
  isFirst?: boolean;
}) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("home_page");
  const name = props.collection.title[locale];

  return (
    <div className={"pt-[var(--vertical-padding)]"}>
      <div className="relative h-[50vh] md:h-[75vh]">
        <Image
          fill
          src={props.collection.images[0]}
          alt={name}
          style={{
            objectFit: "cover",
          }}
          priority={props.isFirst}
          quality={85}
        />
        <div
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "1280px",
          }}
          className="max-w-xl mx-auto absolute md:min-w-[1280px] px-[var(--container-padding)] md:px-0 max-w-screen-xl mx-auto"
        >
          <div
            className=" w-full h-full flex justify-center gap-5 flex-col "
            style={{ maxWidth: "100%", padding: "0" }}
          >
            <h3
              className={
                "text-[var(--background)] font-bold text-3xl md:text-7xl text-center md:text-left"
              }
            >
              {name}
            </h3>
            <div
              style={{ maxWidth: "100%" }}
              className={
                "text-[var(--background)] text-sm md:text-base pt-[20px] text-center md:text-left"
              }
            >
              {props.collection.subtitle[locale]}
            </div>
            <div className="flex justify-center md:justify-start">
              <Link
                href={{
                  pathname: "/collections/[collectionId]",
                  params: {
                    collectionId: props.collection.collection_id,
                  } as never,
                }}
              >
                <HoveringButton label={t("view_collection")} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={" py-6 max-w-screen-xl mx-auto"}>
        <ProductsSection
          alternative={props.alternative}
          products={props.collection.products}
        />
      </div>
    </div>
  );
}
