import { Collection } from "@/types/api.types";
import { useLocale } from "next-intl";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { LocaleType } from "@/types/routing";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface CollectionViewProps {
  collections: Collection[];
  image: string;
  isDrawer?: boolean;
}

export function CollectionsView(props: CollectionViewProps) {
  const locale = useLocale() as LocaleType;
  const isDrawer = props.isDrawer;
  const { t } = useTranslationsWithParse("shop_page");
  return (
    <div
      className={`${
        isDrawer
          ? "flex flex-col items-start gap-6 px-0"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-10 px-6 w-full max-w-screen-xl mx-auto"
      } py-9 md:pt-4`}
    >
      {props.collections.map((collection) => {
        const name = collection.title[locale];
        return (
          <Link
            key={collection.collection_id}
            href={{
              pathname: "/collections/[collectionId]",
              params: {
                collectionId: collection.collection_id,
              },
            }}
          >
            <div className={`${isDrawer ? "w-full" : "w-full"}`}>
              <div className={"font-medium text-xs uppercase pb-2"}>
                {t("collection")}
              </div>
              <div className={"font-bold text-xs uppercase pb-3"}>{name}</div>
              <div
                className={
                  "relative aspect-square mx-auto w-[260px] max-w-full"
                }
              >
                <Image
                  src={collection.images[0]}
                  alt={name}
                  fill
                  className={"object-cover brightness-110"}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
