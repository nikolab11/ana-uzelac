import { ProductItem } from "@/components/products/ProductItem";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/api.types";
import { useTranslations } from "next-intl";
import { ChevronRight } from "@/components/icons/ChevronRight";

interface Props {
  products: Product[];
  discoverAllButton?: boolean;
  alternative?: boolean;
}

export function ProductsSection(props: Props) {
  const t = useTranslations("home_page");
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
        } md:flex-row gap-3 md:gap-[36px] w-full`}
      >
        {props.products.map((product, index) => {
          return (
            <div
              key={product.product_id}
              className={`${props.discoverAllButton ? "w-full" : "w-1/2"} md:${
                props.alternative && index % 2 === 1 ? "basis-1/3" : "basis-2/2"
              } ${
                !props.discoverAllButton && index >= 2 ? "hidden md:block" : ""
              }`}
            >
              <ProductItem
                alternative={props.alternative && index % 2 === 1}
                product={product}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
