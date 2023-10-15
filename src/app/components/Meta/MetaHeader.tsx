import { getLang } from "@app/utils/localstorage";
import { Helmet } from "react-helmet-async";

interface IMeta {
  title: string;
  keywords?: string;
  description?: string;
}

const MetaHeader = ({ title, keywords, description }: IMeta) => {
  const lang = getLang();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta httpEquiv="content-language" content={lang} />
    </Helmet>
  );
};

export default MetaHeader;
