import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Collection } from "@/types/api.types";
import { FooterList } from "@/components/layout/FooterList";
import { LocaleType } from "@/types/routing";
import { Link } from "@/i18n/navigation";
import { FaInstagram, FaFacebook, FaRegEnvelope } from "react-icons/fa";

interface Props {
  logo: string;
  collections: Collection[];
}

export function Footer(props: Props) {
  const t = useTranslations("footer");
  const locale = useLocale() as LocaleType;
  const headerT = useTranslations("header");
  return (
    <div className={"pt-8 md:pt-[48px]"}>
      <div
        className={
          "flex flex-col md:flex-row justify-between relative py-7 px-[var(--container-padding)] max-w-screen-xl mx-auto items-center md:items-start gap-12 md:gap-0"
        }
      >
        <Link href={"/home"}>
          <div className={"py-4 flex justify-center md:justify-start"}>
            <Image
              src={props.logo}
              alt={"Logo"}
              height={100}
              width={100}
              className="w-20 h-20 md:w-[100px] md:h-[100px]"
            />
          </div>
        </Link>
        <div
          className={
            "flex flex-col md:flex-row justify-center md:justify-between gap-6 md:gap-9"
          }
        >
          <FooterList
            title={"Collections"}
            items={[
              {
                name: headerT("shop"),
                path: "/shop",
                type: "base",
              },
              ...props.collections.map((item) => {
                return {
                  type: "dynamic",
                  name: item.title[locale],
                  path: "/collections/[collectionId]",
                  params: { collectionId: item.collection_id },
                } as const;
              }),
            ]}
          />
          <FooterList
            title={t("about")}
            items={[
              {
                path: "/story",
                name: t("story"),
                type: "base",
              },
              {
                path: "/news",
                type: "base",
                name: t("news"),
              },
            ]}
          />
          <FooterList
            title={t("legals")}
            items={[
              {
                path: "/privacy-policy",
                type: "base",
                name: t("privacy_policy"),
              },
              {
                path: "/terms-conditions",
                type: "base",
                name: t("terms_conditions"),
              },
            ]}
          />
        </div>
      </div>
      <div className={"border-b-[#E7E7E7] border-b"}></div>
      <div
        className={
          "flex flex-col md:flex-row justify-between relative p-4  w-full gap-4 md:gap-0 max-w-screen-xl mx-auto"
        }
      >
        <div
          className={
            "font-normal text-xs text-[#444444] text-center md:text-left"
          }
        >
          Designed by{" "}
          <a
            href="https://www.dinadoesit.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={"font-bold"}
          >
            DinaDoesIt.com
          </a>
        </div>
        <div
          className={
            "font-normal text-xs text-[#444444] text-center md:text-left"
          }
        >
          {t("copyright")}
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#444444] hover:text-[#8a3ab9] transition-colors text-xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <span
            className="h-4 w-px bg-[#444444] mx-1"
            aria-hidden="true"
          ></span>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#444444] hover:text-[#1877f3] transition-colors text-xl"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <span
            className="h-4 w-px bg-[#444444] mx-1"
            aria-hidden="true"
          ></span>
          <a
            href="mailto:info@example.com"
            className="text-[#444444] hover:text-[#c71610] transition-colors text-xl"
            aria-label="Email"
          >
            <FaRegEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}
