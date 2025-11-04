import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CountdownTimer } from "@/app/[locale]/home/CountdownTimer";
import { Button } from "@mui/material";
import Image from "next/image";

interface Props {
  images: string[];
}

export function GrandOpeningSection(props: Props) {
  const t = useTranslations("home_page");
  return (
    <div className="flex flex-col md:flex-row gap-8 relative max-w-screen-xl mx-auto justify-between pt-[var(--vertical-padding)] px-[var(--container-padding)] md:px-0">
      <div className={"basis-sm w-full md:w-auto"}>
        <h3 className={"text-2xl md:text-4xl font-bold pb-5 text-[#444444]"}>
          {t("grand_opening")}
        </h3>
        <p className={"pb-3 text-sm md:text-base"}>
          {t("grand_opening_description")}
        </p>
        <Link href={"/shop"}>
          <Button
            className="text-transform-uppercase"
            variant={"contained"}
            color={"secondary"}
            sx={{
              color: "white",
              borderRadius: 0,
              padding: "12px 24px",
              border: "none",
              boxShadow: "none",
              textTransform: "capitalize",
            }}
          >
            {t("pre_order_now")}
          </Button>
        </Link>
        <div className={"pt-6"}>
          <h3 className="text-[#444444] text-lg md:text-2xl font-semibold">
            {t("countdown_to_launch")}
          </h3>
          <CountdownTimer labels={t("countdown_labels").split(", ")} />
        </div>
      </div>
      <div
        className={
          "flex flex-col md:flex-row gap-6 overflow-auto h-full justify-center items-center w-full md:w-auto"
        }
      >
        {props.images.map((image) => {
          return (
            <div className={"grow relative w-full md:w-auto"} key={image}>
              <Image
                style={{
                  objectFit: "cover",
                  height: "480px",
                  width: "100%",
                }}
                className="md:w-[300px]"
                src={image}
                alt={"Grand opening"}
                width={500}
                height={850}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
