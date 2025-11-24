import { Product } from "@/types/api.types";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShoppingBag } from "@/components/icons/ShoppingBag";
import { ProductItemImages } from "@/components/products/ProductItemImages";
import { LocaleType } from "@/types/routing";
import { IconButton } from "@mui/material";
import { formatNumber, getMinProductPrice } from "@/utils/product.utils";
import { MailIcon } from "@/components/icons/MailIcon";

interface Props {
  product: Product;
  original?: boolean;
  dark?: boolean;
  alternative?: boolean;
  discoverAllButton?: boolean;
}

export function ProductItem(props: Props) {
  const locale = useLocale() as LocaleType;
  const name = props.product[`name_${locale}`];
  const productLink = {
    pathname: "/products/[productId]" as const,
    params: { productId: props.product.product_id },
  };

  const t = useTranslations("shop_page");

  return (
    <div className={props.dark ? "text-[var(--background)]" : undefined}>
      {props.original ? (
        <ProductItemImages
          product={props.product}
          alternative={props.alternative}
          original={props.original}
        />
      ) : (
        <Link href={productLink}>
          <ProductItemImages
            product={props.product}
            alternative={props.alternative}
            original={props.original}
            discoverAllButton={props.discoverAllButton}
          />
        </Link>
      )}
      <div className="py-2 flex justify-between items-center">
        <div>
          {props.original ? (
            <>
              <div className={"text-sm font-light"}>{name}</div>
              <div
                className={"text-sm font-light text-[var(--secondary-color)]"}
              >
                {t("contact_the_artist_for_original_painting")}
              </div>
            </>
          ) : (
            <Link href={productLink}>
              <div>
                <div className={"text-sm font-light"}>{name}</div>
                <div className={"pb-2  text-sm font-light"}>
                  {`${formatNumber(getMinProductPrice(props.product), 0)}${
                    props.product.currency
                  }`}
                </div>
              </div>
            </Link>
          )}
        </div>
        {props.original && (
          <div>
            <a
              href={`mailto:${
                process.env.ORDER_MAIL
              }?subject=${encodeURIComponent(
                `Product information - ${props.product.name_eng}`
              )}`}
            >
              <div
                className={`border ${
                  props.dark ? "border-white" : "border-[#444444]"
                } rounded-full`}
              >
                <IconButton>
                  <MailIcon fill={props.dark ? "#FCF7F1" : "#444444"} />
                </IconButton>
              </div>
            </a>
          </div>
        )}
        {!props.original && (
          <div>
            <Link
              href={{
                pathname: "/products/[productId]",
                params: { productId: props.product.product_id },
              }}
            >
              <div
                className={`border ${
                  props.dark ? "border-white" : "border-[#444444]"
                } rounded-full`}
              >
                <IconButton sx={{ width: "32px", height: "32px" }}>
                  <ShoppingBag
                    size={3}
                    stroke={props.dark ? "white" : "#444444"}
                  />
                </IconButton>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
