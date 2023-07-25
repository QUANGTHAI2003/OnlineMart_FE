// import { Dates } from "@app/configs/dates";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export type LanguageType = "vi" | "en";

const localLanguage = (localStorage.getItem("lang") as LanguageType) || "vi";

const useLanguage = (): { language: LanguageType; setLanguage: (locale: LanguageType) => Promise<void> } => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback(
    async (locale: LanguageType) => {
      // Dates.setLocale(locale);
      localStorage.setItem("lang", locale);
      await i18n.changeLanguage(locale);
    },
    [i18n]
  );

  useEffect(() => {
    localLanguage && handleChangeLanguage(localLanguage);
  }, [handleChangeLanguage]);

  return useMemo(
    () => ({ language: i18n.language as LanguageType, setLanguage: handleChangeLanguage }),
    [handleChangeLanguage, i18n.language]
  );
};

export default useLanguage;
