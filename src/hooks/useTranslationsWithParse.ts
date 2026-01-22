import { useTranslations } from "next-intl";
import parse from "html-react-parser";

type TranslationKey = Parameters<ReturnType<typeof useTranslations>>[0];

export function useTranslationsWithParse(
  namespace?: Parameters<typeof useTranslations>[0]
) {
  const translate = useTranslations(namespace);

  const t = (key: TranslationKey) => parse(translate(key));
  const tRaw = (key: TranslationKey) => translate(key);

  return { t, tRaw };
}
