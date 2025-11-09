import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/Footer";
import { fetchImages } from "@/api/images";
import { fetchAllCollections } from "@/api/products";
import { cloneElement, ReactElement } from "react";
import { HeaderMode } from "@/components/layout/header/HeaderWrapper";
import { PageProps } from "@/types/pages.types";
import { notFound } from "next/navigation";

export async function AppLayout({
  children,
  mode,
  headerContent,
  omitFooter,
  smallHeader,
}: Readonly<{
  children: ReactElement<PageProps>;
  mode?: HeaderMode;
  headerContent?: ReactElement<PageProps>;
  omitFooter?: boolean;
  smallHeader?: boolean;
}>) {
  const [images, collections] = await Promise.all([
    fetchImages(),
    fetchAllCollections(),
  ]);
  if (!collections || !images) {
    return notFound();
  }
  return (
    <div className={`antialiased relative flex flex-col h-screen bg-[#F6F1EB]`}>
      <Header
        mode={mode || "regular"}
        productsImage={images.home_page.rooftops_in_paris}
        collections={collections.collections}
        additionalContent={
          headerContent &&
          cloneElement(headerContent, {
            images,
            collections: collections.collections,
          })
        }
        logo={images.logo.logo_png}
        smallHeader={smallHeader}
      />
      <div
        id={"app-container"}
        className={"flex-1 overflow-y-auto relative"}
        style={{ scrollbarGutter: "stable" }}
      >
        {cloneElement(children, {
          images,
          collections: collections.collections,
        })}
        {!omitFooter && (
          <Footer
            collections={collections.collections}
            logo={images.logo.logo_png}
          />
        )}
      </div>
    </div>
  );
}
