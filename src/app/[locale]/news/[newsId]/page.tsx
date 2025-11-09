import { AppLayout } from "@/components/layout/AppLayout";
import { fetchNewsById } from "@/api/news";
import Image from "next/image";
import { News } from "@/types/api.types";
import { LocaleType } from "@/types/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { HeadText } from "@/components/common/HeadText";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

interface Params {
  newsId: string;
}

const CONTENT_ID = "news-content-id";

export const revalidate = 300; // 5 minutes

export default async function NewsShowPage(props: { params: Promise<Params> }) {
  const [{ newsId }, locale] = await Promise.all([
    props.params,
    getLocale() as Promise<LocaleType>,
  ]);
  const news = await fetchNewsById(newsId);
  if (!news) {
    return notFound();
  }
  const title = news[`title_${locale}`];
  const t = await getTranslations();
  return (
    <AppLayout smallHeader mode="hover">
      <div>
        <div className="h-[320px] relative">
          <Image
            style={{
              objectFit: "cover",
            }}
            src={news.thumbnail}
            alt={"Image"}
            fill
          />
          <HeadText
            title={title}
            scrollElementId={CONTENT_ID}
            buttonLabel={t("about_page.view_more")}
          />
        </div>
        <div
          id={CONTENT_ID}
          className={"px-4 md:px-[var(--container-padding)] py-6 md:py-12"}
        >
          <div
            className={
              "flex flex-col gap-3 md:gap-4 content-wrapper max-w-screen-xl mx-auto"
            }
          >
            {parse(news[`content_${locale}`])}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface HeadTextProps {
  news: News;
}
