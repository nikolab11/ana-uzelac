import { ProductItem } from "@/components/products/ProductItem";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/api.types";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { ChevronRight } from "@/components/icons/ChevronRight";

interface Props {
  products: Product[];
  discoverAllButton?: boolean;
  alternative?: boolean;
  isFirst?: boolean;
}

export function ProductsSection(props: Props) {
  const { t } = useTranslationsWithParse("home_page");

  return (
    <div
      className={`${
        props.discoverAllButton ? "px-[var(--container-padding)]" : ""
      } md:px-0`}
    >
      {props.discoverAllButton && (
        <div className="flex justify-end">
          <Link href={"/shop"}>
            <div className="border cursor-pointer gap-3 items-center flex justify-between border-[#444444] text-[#444444] rounded-lg px-[16px] py-[8px] text-sm md:text-base">
              <div> {t("discover_all_items")} </div>
              <div>
                <ChevronRight stroke={"#444444"} />
              </div>
            </div>
          </Link>
        </div>
      )}
      <div
        className={`${props.discoverAllButton ? "pt-9" : ""} md:pt-9 flex ${
          props.discoverAllButton ? "flex-col" : "flex-row"
        } md:flex-row gap-3 md:gap-[22vpx] w-full`}
      >
        {props.products.map((product, index) => {
          let images: string[] = [];

          if (product.product_id === 1 && props) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/da+-+falling+rabbit.png",
              "https://live.staticflickr.com/65535/55074194159_8c9108de80_b.jpg",
            ];
          } else if (product.product_id === 8) {
            if (!(props.products[0].product_id === 9)) {
              images = [
                "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/da+-+night sky.png",
                "https://live.staticflickr.com/65535/55074135668_9cb7ab168a_z.jpg",
              ];
            } else {
              images = [
                "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/the+magical+south+-+night+sky.png",
                "https://live.staticflickr.com/65535/55074135668_9cb7ab168a_z.jpg",
              ];
            }
          } else if (product.product_id === 6) {
            if (props.alternative) {
              images = [
                "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/9934a02f0fe3bfe8b2ca8c2601a704d688026a46.jpg",
                "https://live.staticflickr.com/65535/55074195279_803f6b487e_z.jpg",
              ];
            } else {
              images = [
                "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/da+-+lioness.png",
                "https://live.staticflickr.com/65535/55074195279_803f6b487e_z.jpg",
              ];
            }
          } else if (product.product_id === 2) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/the+moon+rabbit+-+Wushu+Nanquan.png",
              "https://live.staticflickr.com/65535/55073939001_09a24be682_b.jpg",
            ];
          } else if (product.product_id === 4) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/the+moon+rabbit+-+moon+rabbits.png",
              "https://live.staticflickr.com/65535/55073035812_4f274cdb88_b.jpg",
            ];
          } else if (product.product_id === 3) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/the+moon+rabbit+-+rooftops+in+Paris.png",
              "https://live.staticflickr.com/65535/55074194129_d24ba7b407_b.jpg",
            ];
          } else if (product.product_id === 5) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/a1877112e19ed95822268adb32c5852fa2bb3de8.jpg",
              "https://live.staticflickr.com/65535/55073036872_a63f094d19_z.jpg",
            ];
          } else if (product.product_id === 9) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/the+magical+south+-+sky+mountains.png",
              "https://live.staticflickr.com/65535/55074135658_208ccfb55d_z.jpg",
            ];
          } else if (product.product_id === 7) {
            images = [
              "https://anauzelac.s3.eu-north-1.amazonaws.com/homepage/the+magical+south+-+garden+day+and+night.png",
              "https://live.staticflickr.com/65535/55073034552_ff893c767f_z.jpg",
            ];
          } else {
            images = product.images;
          }

          return (
            <div
              key={product.product_id}
              className={`${props.discoverAllButton ? "w-full" : "w-1/2"} md:${
                props.alternative && index % 2 === 1 ? "basis-1/4" : "basis-2/2"
              } ${
                !props.discoverAllButton && index >= 2 ? "hidden md:block" : ""
              }`}
            >
              <ProductItem
                alternative={props.alternative && index % 2 === 1}
                product={product}
                discoverAllButton={props.discoverAllButton}
                customImages={images.length > 0 ? images : undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
