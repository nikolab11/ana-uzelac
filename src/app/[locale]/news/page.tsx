import { AppLayout } from "@/components/layout/AppLayout";
import { fetchNews } from "@/api/news";
import Image from "next/image";
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { NewsItem } from "@/components/news/NewsItem";
import { PageProps } from "@/types/pages.types";
import { BaseNews } from "@/types/api.types";
import { HeadText } from "@/components/common/HeadText";

export const revalidate = 300; // 5 minutes

export default async function NewsPage() {
  const news = await fetchNews();
  return (
    <AppLayout>
      <InnerPage news={news?.news || []} />
    </AppLayout>
  );
}

const SCROLL_ELEMENT_ID = "news-section";

function InnerPage({ images, news }: PageProps & { news: BaseNews[] }) {
  const { t } = useTranslationsWithParse();
  if (!images) {
    throw new Error("Missing images");
  }

  return (
    <>
      <div className="h-[50vh]  relative">
        <Image
          style={{
            objectFit: "cover",
          }}
          src="/hero.png"
          alt={"Image"}
          fill
        />
        <HeadText
          title={t("journal_page.the_journal")}
          buttonLabel={t("about_page.view_more")}
          scrollElementId={SCROLL_ELEMENT_ID}
        />
      </div>
      <div
        id={SCROLL_ELEMENT_ID}
        className={"px-[var(--container-padding)] py-10 md:py-20"}
      >
        <div
          className={"flex flex-wrap gap-4 md:gap-9 max-w-screen-xl mx-auto"}
        >
          {news.map((element) => {
            return (
              <div
                key={element.id}
                className="basis-full md:basis-sm pb-6 md:pb-9"
              >
                <NewsItem news={element} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
