import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Collection } from "@/types/api.types";
import { FooterList } from "@/components/layout/FooterList";
import { LocaleType } from "@/types/routing";
import { Link } from "@/i18n/navigation";
import { FaInstagram, FaRegEnvelope, FaFacebookF } from "react-icons/fa";

interface Props {
  logo: string;
  collections: Collection[];
}

export function Footer(props: Props) {
  const t = useTranslations("footer");
  const locale = useLocale() as LocaleType;
  const headerT = useTranslations("header");
  return (
    <div style={{ backgroundColor: "#FCF7F1" }} className={"pt-8 md:pt-[48px]"}>
      {/* Desktop layout */}
      <div
        className={
          "hidden md:flex flex-row justify-between relative py-7 max-w-screen-xl mx-auto items-start gap-0"
        }
      >
        <Link href={"/home"}>
          <div className={"py-4 flex justify-start"}>
            <Image
              src={props.logo}
              alt={"Logo"}
              height={100}
              width={100}
              className="w-[100px] h-[100px]"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </Link>
        <div className={"flex flex-row justify-between gap-16"}>
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

      {/* Mobile layout */}
      <div
        className={
          "flex md:hidden flex-col items-center relative py-7 max-w-screen-xl mx-auto px-[var(--container-padding)]"
        }
      >
        {/* Logo */}
        <Link href={"/home"}>
          <div className={"py-4 flex justify-center"}>
            <Image
              src={props.logo}
              alt={"Logo"}
              height={100}
              width={100}
              className="w-20 h-20"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </Link>

        {/* Collections with smaller gap */}
        <div className="mt-4">
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
        </div>

        {/* Social media */}
        <div className="flex items-center gap-3 justify-center mt-6">
          <a
            href="https://www.instagram.com/anabyanauzelac?igsh=dTB1cHBhZ3h0Mjhx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#444444] hover:text-[#8a3ab9] transition-colors text-xl"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
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
            <FaFacebookF size={16} />
          </a>
          <span
            className="h-4 w-px bg-[#444444] mx-1"
            aria-hidden="true"
          ></span>
          <a
            href="mailto:ana@anauzelac.com"
            className="text-[#444444] hover:text-[#c71610] transition-colors text-xl"
            aria-label="Email"
          >
            <FaRegEnvelope size={18} />
          </a>
        </div>
      </div>

      {/* Line - shown on mobile between social and bottom section, on desktop between top and bottom */}
      <div className={"border-b-[#E7E7E7] border-b"}></div>

      {/* Bottom section */}
      <div
        className={
          "flex flex-col md:flex-row justify-between relative p-4 w-full gap-4 md:gap-0 max-w-screen-xl mx-auto"
        }
      >
        {/* Desktop: Designed by, Copyright, Social */}
        <div className="hidden md:flex flex-row justify-between w-full gap-0">
          {/*    <div className={"font-normal text-xs text-[#444444] text-left"}>
            Designed by{" "}
            <a
              href="https://www.dinadoesit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={"font-bold"}
            >
              DinaDoesIt.com
            </a>
          </div> */}
          <div className={"font-normal text-xs text-[#444444] text-left"}>
            {t("copyright")}
          </div>
          <div className="flex items-center gap-3 justify-start">
            <a
              href="https://www.instagram.com/anabyanauzelac?igsh=dTB1cHBhZ3h0Mjhx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444444] hover:text-[#8a3ab9] transition-colors text-xl"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
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
              <FaFacebookF size={16} />
            </a>
            <span
              className="h-4 w-px bg-[#444444] mx-1"
              aria-hidden="true"
            ></span>
            <a
              href="mailto:ana@anauzelac.com"
              className="text-[#444444] hover:text-[#c71610] transition-colors text-xl"
              aria-label="Email"
            >
              <FaRegEnvelope size={18} />
            </a>
          </div>
        </div>

        {/* Mobile: Designed by first, then Copyright (reversed order) */}
        <div className="flex md:hidden flex-col items-center gap-2">
          {/*    <div className={"font-normal text-xs text-[#444444] text-center"}>
            Designed by{" "}
            <a
              href="https://www.dinadoesit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={"font-bold"}
            >
              DinaDoesIt.com
            </a>
          </div> */}
          <div className={"font-normal text-xs text-[#444444] text-center"}>
            {t("copyright")}
          </div>
        </div>
      </div>
    </div>
  );
}
