import { fetchAllProducts } from "@/api/products";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductItem } from "@/components/products/ProductItem";
import { LoadMoreProductsWrapper } from "@/app/[locale]/shop/LoadMoreProductsWrapper";
import {
  parseFilters,
  Product,
  ProductFilter,
  ProductFilterRaw,
} from "@/types/api.types";
import { ProductActiveFilters } from "@/app/[locale]/shop/ProductActiveFilters";
import { PageProps } from "@/types/pages.types";
import { useLocale, useTranslations } from "next-intl";
import { LocaleType } from "@/types/routing";
import { calculatePrices, filterProducts } from "@/utils/product.utils";
import { ShopHeader } from "@/app/[locale]/shop/ShopHeader";
import { Grid } from "@mui/material";
import { notFound } from "next/navigation";

export const revalidate = 300; // 5 minutes

export default async function ShopPage(props: {
  searchParams: Promise<Partial<ProductFilterRaw>>;
}) {
  const params = parseFilters(await props.searchParams);
  const productsResponse = await fetchAllProducts();
  if (!productsResponse) {
    return notFound();
  }
  const usedFilters =
    (params.sizes?.length || 0) + (params.collection_ids?.length || 0);
  const totalParams = Object.keys(params).length;
  const products =
    totalParams > 0
      ? filterProducts(productsResponse.products.collection_products, params)
      : productsResponse.products.collection_products;

  // Original pieces should be shown when:
  // 1. No collection filter is applied (collection_ids is undefined/empty)
  // 2. OR -1 (original pieces) is explicitly selected in collection_ids
  const hasOriginalPiecesSelected =
    params.collection_ids?.includes(-1) ?? false;
  const noCollectionFilter =
    !params.collection_ids || params.collection_ids.length === 0;
  const shouldShowOriginalPieces =
    hasOriginalPiecesSelected || noCollectionFilter;

  // When -1 is explicitly selected, show ALL original pieces regardless of other filters
  // When no collection filter is applied, filter original pieces normally
  const additionalProducts = shouldShowOriginalPieces
    ? hasOriginalPiecesSelected
      ? productsResponse.products.original_products // All original pieces when -1 is selected
      : totalParams > 0
      ? filterProducts(productsResponse.products.original_products, params)
      : productsResponse.products.original_products
    : [];
  const prices = calculatePrices(productsResponse);
  return (
    <div>
      <AppLayout
        headerContent={
          <ShopHeader
            usedFilters={usedFilters}
            totalProducts={products.length + additionalProducts.length}
            filters={params}
            minPrice={prices.min}
            maxPrice={prices.max}
            originalProductsCount={
              productsResponse.products.original_products.length
            }
          />
        }
      >
        <InnerPage
          params={params}
          products={products}
          additionalProducts={additionalProducts}
          shouldShowOriginalPieces={shouldShowOriginalPieces}
          hasOriginalPiecesSelected={hasOriginalPiecesSelected}
        />
      </AppLayout>
    </div>
  );
}

function InnerPage({
  collections,
  params,
  products,
  additionalProducts,
  shouldShowOriginalPieces,
  hasOriginalPiecesSelected,
}: PageProps & {
  params: Partial<ProductFilter>;
  products: Product[];
  additionalProducts: Product[];
  shouldShowOriginalPieces: boolean;
  hasOriginalPiecesSelected: boolean;
}) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("shop_page");
  if (!collections) {
    throw new Error("Collections not found");
  }
  return (
    <div>
      <div className={"max-w-screen-xl mx-auto pb-6 px-4 md:px-0"}>
        {Object.keys(params).length > 0 && (
          <div className={"pt-2 md:pt-2"}>
            <ProductActiveFilters
              params={params}
              collections={collections}
              locale={locale}
            />
          </div>
        )}
        <Grid spacing={2} container className="pt-4 md:pt-6">
          {products.map((product) => {
            return (
              <Grid
                key={product.product_id}
                size={{ xs: 12, sm: 6, md: 4 }}
                className={"pb-4 md:pb-8"}
              >
                <ProductItem product={product} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* Show original pieces section when -1 is selected or no collection filter */}
      {shouldShowOriginalPieces ? (
        <LoadMoreProductsWrapper
          text={t("load_more_items")}
          initialOpen={hasOriginalPiecesSelected}
        >
          <div
            className={
              "px-4 md:px-[var(--container-padding)] py-4 md:py-6 bg-black"
            }
          >
            <h4
              className={
                "uppercase font-medium text-sm md:text-base text-[var(--background)] py-6 md:py-9 max-w-screen-xl mx-auto px-4 md:px-0"
              }
            >
              {t("the_scarves")}
            </h4>
            {additionalProducts.length > 0 ? (
              <Grid
                spacing={2}
                container
                className="pt-4 md:pt-6 max-w-screen-xl mx-auto px-4 md:px-0"
              >
                {additionalProducts.map((product) => {
                  return (
                    <Grid
                      key={product.product_id}
                      size={{ xs: 12, sm: 6, md: 4 }}
                      className={"pb-4 md:pb-8"}
                    >
                      <ProductItem original dark product={product} />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <div className="text-center py-8 text-[var(--background)]">
                No original pieces match the current filters.
              </div>
            )}
          </div>
        </LoadMoreProductsWrapper>
      ) : null}
    </div>
  );
}
