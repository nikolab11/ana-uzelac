import Image from "next/image";
import { ProductsSection } from "@/app/[locale]/home/ProductsSection";
import { fetchAllProducts } from "@/api/products";
import { CollectionsSection } from "@/app/[locale]/home/CollectionsSection";
import { FooterImage } from "@/components/layout/FooterImage";
import { useTranslations } from "next-intl";
import { HoveringButton } from "@/components/common/HoveringButton";
import { GrandOpeningSection } from "@/app/[locale]/home/GrandOpeningSection";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "@/i18n/navigation";
import { PageProps } from "@/types/pages.types";
import { getTranslations } from "next-intl/server";
import parse from "html-react-parser";

export const revalidate = 300; // 5 minutes

export default async function Home() {
  return (
    <AppLayout mode="hover">
      <InnerPage />
    </AppLayout>
  );
}

/**
 * Reorders images for specific products based on product_id
 * - product_id 6: last image comes first
 * - product_id 8: 2nd image (index 1) comes first
 */
function reorderProductImages(product: any): any {
  if (!product.images || product.images.length === 0) {
    return product;
  }

  const reorderedProduct = { ...product };
  const images = [...product.images];

  if (product.product_id === 6 && images.length > 0) {
    // Move last image to first position
    const lastImage = images[images.length - 1];
    const otherImages = images.slice(0, images.length - 1);
    reorderedProduct.images = [lastImage, ...otherImages];
  } else if (product.product_id === 8 && images.length >= 2) {
    // Move 2nd image (index 1) to first position
    const secondImage = images[1];
    const otherImages = images.filter((_, index) => index !== 1);
    reorderedProduct.images = [secondImage, ...otherImages];
  }

  return reorderedProduct;
}

async function InnerPage({ images, collections }: PageProps) {
  const products = await fetchAllProducts();
  const t = await getTranslations("home_page");
  if (!images || !collections || !products) {
    throw new Error("Missing images and collections");
  }

  console.log(products.products);

  // Filter and reorder images for specific products
  const filteredProducts = products.products.collection_products
    .filter(
      (product: any) =>
        product.product_id === 1 ||
        product.product_id === 6 ||
        product.product_id === 8
    )
    .map(reorderProductImages);

  return (
    <>
      <div className="min-h-screen relative">
        <Image
          style={{
            objectFit: "cover",
          }}
          src={images.home_page.header}
          alt={"Image"}
          fill
          priority
          quality={90}
        />
        {/* Dark overlay for mobile to improve text visibility */}
        <div className="md:hidden absolute inset-0 bg-black/20 z-0" />
        <HeadText />
      </div>
      <GrandOpeningSection
        images={[
          images.home_page.grand_opening_1,
          images.home_page.grand_opening_2,
          images.home_page.grand_opening_3,
        ]}
      />

      <div className={"max-w-screen-xl mx-auto py-[var(--vertical-padding)]"}>
        <ProductsSection discoverAllButton products={filteredProducts} />
      </div>
      <div
        className={
          "flex md:flex-row flex-col-reverse md:flex-row justify-between items-center md:py-[var(--vertical-padding)] py-0 max-w-screen-xl mx-auto gap-9 px-[var(--container-padding)] md:px-0"
        }
      >
        <p
          className={
            "text-base font-normal md:basis-xl text-center md:text-left"
          }
        >
          {parse(t("discover_collections_description"))}
        </p>
        <h3
          className={
            "text-3xl md:text-6xl md:basis-3xl font-bold text-center md:text-end"
          }
        >
          {parse(t("discover_collections"))}
        </h3>
      </div>
      <CollectionsSection collections={collections} />
      <FooterImage img={images.home_page.wearing_the_moment} />
    </>
  );
}

function HeadText() {
  const t = useTranslations("home_page");
  return (
    <div
      className={
        "absolute w-full h-full flex flex-col md:flex-row justify-center md:justify-between max-w-screen-xl mx-auto flex-wrap gap-3 md:gap-5 items-center px-[var(--container-padding)] md:px-0 z-10"
      }
      style={{
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div className={"md:basis-xl md:text-left text-center"}>
        <h3
          className={
            "text-4xl md:text-7xl text-bold text-[var(--background)] pb-3 playfair"
          }
        >
          {t("new_scarf_collections")}
        </h3>
        <p
          className={
            "text-[var(--background)] font-normal text-lg md:text-2xl playfair"
          }
        >
          {t("winter_2026")}
        </p>
      </div>
      <div>
        <Link href={"/shop"}>
          <HoveringButton label={t("shop_now")} />
        </Link>
      </div>
    </div>
  );
}
