import Image from "next/image";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
interface Props {
  img: string;
}

export function FooterImage(props: Props) {
  const t = useTranslations("wearing_the_moment_section");
  return (
    <div className="relative h-[50vh] md:h-[75vh]">
      <Image src={props.img} alt={""} fill objectFit={"cover"} />
      <div
        className={
          "absolute top-0 flex justify-center flex-col gap-3 items-center  w-full h-full pl-[var(--container-padding)] pr-[var(--container-padding)] md:pl-[20%] md:pr-[20%]"
        }
      >
        <h3
          className={
            'text-[var(--background)] font-bold text-3xl md:text-[56px] pb-8 text-center font-["Playfair Display"]'
          }
        >
          {t("wearing_the_moment")}
        </h3>
        <div>
          <div className={"pb-6"}>
            <p
              className={
                "text-[var(--background)] font-light text-sm md:text-base break-keep text-center"
              }
            >
              {parse(t("wearing_the_moment_description_1"))}
            </p>
          </div>
          <div className={"pb-3"}>
            <p
              className={
                "text-[var(--background)] font-light text-sm md:text-base break-keep text-center"
              }
            >
              {parse(t("wearing_the_moment_description_2"))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
