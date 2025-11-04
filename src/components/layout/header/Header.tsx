"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  HeaderMode,
  HeaderWrapper,
} from "@/components/layout/header/HeaderWrapper";
import { Collection } from "@/types/api.types";
import { CollectionMenuItem } from "@/components/layout/header/CollectionsMenuItem";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { LocalesMenu } from "@/components/layout/header/LocalesMenu";
import { CollectionViewContainer } from "@/components/layout/header/CollectionViewContainer";
import { CollectionsView } from "@/components/layout/header/CollectionView";
import { LocaleType } from "@/types/routing";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { SearchInput } from "@/components/layout/header/SearchInput";
import { ReactNode, useState } from "react";
import { CartButton } from "@/components/layout/header/CartButton";
import { HeaderLink } from "@/components/layout/header/HeaderLink";
import { Drawer } from "@mui/material";
import { HamburgerIcon } from "@/components/icons/HamburgerIcon";
import { XIcon } from "@/components/icons/XIcon";

interface Props {
  logo: string;
  productsImage: string;
  mode: HeaderMode;
  collections: Collection[];
  additionalContent?: ReactNode;
}

export function Header(props: Props) {
  const t = useTranslations("header");
  const locale = useLocale() as LocaleType;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <HeaderWrapper mode={props.mode}>
      {/* Mobile Header Bar */}
      <div key="mobile-header" className="md:hidden flex justify-between items-center py-4">
        <button
          onClick={toggleDrawer}
          className="cursor-pointer p-2"
          aria-label="Open menu"
        >
          <HamburgerIcon size={7} />
        </button>
        <div className="flex items-center gap-4">
          <Link href={"/home"}>
            <Image src={props.logo} alt={"Logo"} width={60} height={41} />
          </Link>
          <CartButton label={t("cart")} hideLabel />
        </div>
      </div>

      {/* Desktop Header */}
      <div key="desktop-header" className={"hidden md:block relative"}>
        <Link href={"/home"}>
          <div className="flex justify-center pb-4 pt-4">
            <Image src={props.logo} alt={"Logo"} width={80} height={55} />
          </div>
        </Link>
        <div className="flex gap-3 justify-between pb-4 overflow-x-auto items-end max-w-screen-xl mx-auto">
          <div className={"flex gap-3 items-center"}>
            <SearchIcon />
            <SearchInput placeholder={t("search")} />
          </div>
          <div className="flex flex-1 justify-center items-end gap-[32px]">
            <HeaderLink href={"/home"}>{t("home")}</HeaderLink>
            <HeaderLink href={"/shop"}>{t("shop")}</HeaderLink>
            <div className={"text-sm app-link"}>
              <CollectionMenuItem collections={props.collections} />
            </div>
            <HeaderLink href={"/news"}>{t("news")}</HeaderLink>
            <HeaderLink href={"/about"}>{t("about")}</HeaderLink>
          </div>
          <div className="flex pl-9 gap-9 justify-end items-center">
            <div>
              <div className="flex gap-2 items-center justify-end cursor-pointer">
                <GlobeIcon size={5} />
                <LocalesMenu locale={locale} />
              </div>
            </div>
            <CartButton label={t("cart")} />
          </div>
        </div>
        <CollectionViewContainer>
          <CollectionsView
            collections={props.collections}
            image={props.productsImage}
          />
        </CollectionViewContainer>
      </div>

      {/* Mobile Drawer */}
      <Drawer key="mobile-drawer" anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <div className="w-[80vw] max-w-[400px] h-full flex flex-col bg-[#FCF7F1]">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-[var(--text-color)] uppercase">Menu</h2>
            <button
              onClick={closeDrawer}
              className="cursor-pointer p-2 -mr-2"
              aria-label="Close menu"
            >
              <XIcon size={4} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {/* Search Section */}
            <div className="flex gap-3 items-center pb-6 border-b border-gray-200">
              <SearchIcon />
              <SearchInput placeholder={t("search")} />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6">
              <HeaderLink href={"/home"} onClick={closeDrawer}>
                {t("home")}
              </HeaderLink>
              <HeaderLink href={"/shop"} onClick={closeDrawer}>
                {t("shop")}
              </HeaderLink>
              <div className="text-sm app-link">
                <CollectionMenuItem key="collection-menu-item" collections={props.collections} />
                <CollectionViewContainer key="collection-view-container" isDrawer>
                  <CollectionsView
                    collections={props.collections}
                    image={props.productsImage}
                    isDrawer
                  />
                </CollectionViewContainer>
              </div>
              <HeaderLink href={"/news"} onClick={closeDrawer}>
                {t("news")}
              </HeaderLink>
              <HeaderLink href={"/about"} onClick={closeDrawer}>
                {t("about")}
              </HeaderLink>
            </div>

            {/* Language */}
            <div className="flex flex-col gap-6 pt-6 border-t border-gray-200 mt-auto">
              <div className="flex gap-2 items-center cursor-pointer">
                <GlobeIcon size={5} />
                <LocalesMenu locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {props.additionalContent && (
        <div key="additional-content">
          {props.additionalContent}
        </div>
      )}
    </HeaderWrapper>
  );
}
