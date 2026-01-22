import { Link } from "@/i18n/navigation";
import { BasePath, DynamicPath } from "@/types/routing";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  items: (
    | { path: BasePath; name: ReactNode; type: "base" }
    | {
        path: DynamicPath;
        name: ReactNode;
        params: Record<string, string | number>;
        type: "dynamic";
      }
  )[];
}

export function FooterList(props: Props) {
  return (
    <div className="text-center md:text-left">
      <div className={"font-bold text-sm text-[#484848] pb-2 md:pb-5"}>
        {props.title}
      </div>
      {props.items.map((item, index) => {
        return (
          <div className="pb-1.5" key={item.type === "dynamic" ? `${item.path}-${JSON.stringify(item.params)}` : item.path}>
            <Link
              className={"font-normal text-sm text-[#484848]"}
              href={
                item.type === "base"
                  ? item.path
                  : ({
                      pathname: item.path,
                      params: item.params,
                    } as never)
              }
            >
              {item.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
