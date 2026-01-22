import { Collection, Product } from "@/types/api.types";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { ProductsSection } from "@/app/[locale]/home/ProductsSection";
import { HoveringButton } from "@/components/common/HoveringButton";
import { LocaleType } from "@/types/routing";
import { Link } from "@/i18n/navigation";

interface Props {
  collections: Collection[];
}

/**
 * Reorders products to display in order: 1, 2, 4, 3 (by product_id)
 */
function reorderProducts(products: Product[]): Product[] {
  const order = [9, 1, 2, 4, 3];
  const orderedProducts: Product[] = [];
  const restProducts: Product[] = [];

  // First, add products in the specified order
  order.forEach((productId) => {
    const product = products.find((p) => p.product_id === productId);
    if (product) {
      orderedProducts.push(product);
    }
  });

  // Then, add any remaining products that weren't in the order list
  products.forEach((product) => {
    if (!order.includes(product.product_id)) {
      restProducts.push(product);
    }
  });

  return [...orderedProducts, ...restProducts];
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
  const { t, tRaw } = useTranslationsWithParse("home_page");
  const name = props.collection.title[locale];

  const description =
    props.collection.title["eng"]?.toLocaleLowerCase()?.split(" ")?.join("_") +
    "_description";

  return (
    <div className={"md:pt-[var(--vertical-padding)] pt-5"}>
      <div className="relative h-[calc(100dvh-90px)]">
        <Image
          fill
          src={props.collection.homepage_image}
          alt={name}
          style={{
            objectFit: "cover",
          }}
          className="md:object-center object-[70%_center]"
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
          className="max-w-xl mx-auto absolute md:min-w-[1280px] w-full md:w-auto px-20 md:px-0 max-w-screen-xl mx-auto"
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
              className={
                "text-[var(--background)] text-sm md:text-base pt-[20px] text-center md:text-left md:max-w-[50%]"
              }
            >
              {t(description)}
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
                <HoveringButton label={tRaw("view_collection")} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={" py-6 max-w-screen-xl mx-auto"}>
        <ProductsSection
          alternative={props.alternative}
          products={
            props.alternative
              ? reorderProducts(props.collection.products)?.reverse()
              : reorderProducts(props.collection.products)
          }
          isFirst={props.collection.collection_id == 1}
        />
      </div>
    </div>
  );
}
