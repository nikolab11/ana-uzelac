import { fetchSingleProduct } from "@/api/products";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductImages } from "@/app/[locale]/products/[productId]/ProductImages";
import { Product } from "@/types/api.types";
import { ProductInfo } from "@/app/[locale]/products/[productId]/ProductInfo";
import { useLocale, useTranslations } from "next-intl";
import { LocaleType } from "@/types/routing";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { PageProps } from "@/types/pages.types";
import { ProductSideImages } from "@/app/[locale]/products/[productId]/ProductSideImages";
import parse from "html-react-parser";
import { BackButton } from "@/components/common/BackButton";
import { PanelAdjuster } from "@/app/[locale]/products/[productId]/PanelAdjuster";

interface Params {
  productId: string;
}

export const revalidate = 300; // 5 minutes

export default async function ProductShowPage(props: {
  params: Promise<Params>;
}) {
  const { productId } = await props.params;
  const product = await fetchSingleProduct(Number(productId));
  if (!product) {
    return notFound();
  }
  return (
    <AppLayout mode="regular" omitFooter>
      <InnerPage product={product} />
    </AppLayout>
  );
}

interface Props {
  product: Product;
}

function InnerPage({ product, collections, images }: Props & PageProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("shop_page");

  return (
    <div className={"w-full relative md:h-full"}>
      <div className={"w-full overflow-x-hidden md:h-full"}>
        <div className={"relative h-[60vh] md:h-full"}>
          <ProductImages product={product} />
        </div>
        <div
          id="product-info-fixed"
          className={
            "px-4 md:px-0 md:fixed md:top-[144px] md:z-12 md:right-[5%] md:shadow-2xl relative md:ml-2 w-full md:w-auto md:max-w-[375px]"
          }
          style={{
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: "75vh",
          }}
        >
          <ProductInfo
            locale={locale}
            product={product}
            collections={collections || []}
          />
        </div>
      </div>
      <div
        className={
          "px-4 md:px-[var(--container-padding)] md:w-[calc(100%-420px)] py-6 flex flex-col gap-4 md:gap-7 justify-center items-center"
        }
      >
        <div
          className={
            "bg-[#FCF7F1] w-full p-4 md:p-6 flex flex-col gap-4 md:gap-7 justify-center items-center"
          }
        >
          <h4 className={"font-normal text-lg md:text-xl capitalize"}>
            {t("the_inspiration")}
          </h4>
          <p className={"font-normal text-xs md:text-sm text-center"}>
            {parse(product[`inspiration_${locale}`] || "")}
          </p>
        </div>
        <ProductSideImages images={product.images_down || []} />
        <div
          className={
            "bg-[#FCF7F1] w-full p-4 md:p-6 flex flex-col gap-4 md:gap-7 justify-center items-center"
          }
        >
          <h4 className={"font-normal text-lg md:text-xl"}>
            {t("description")}
          </h4>
          <p className={"font-normal text-xs md:text-sm text-center"}>
            {parse(product[`description_${locale}`])}
          </p>
        </div>
      </div>
      {/* Sentinel before footer for collision detection */}
      <div id="footer-sentinel" style={{ height: 1 }} />
      <Footer
        collections={collections || []}
        logo={images?.logo.logo_png || ""}
      />
      {/* Client adjuster deducts visible footer height from panel */}
      <PanelAdjuster
        targetId="product-info-fixed"
        sentinelId="footer-sentinel"
      />
    </div>
  );
}
