import { Helmet } from "react-helmet";

interface IOpenGraph {
  title: string;
  url?: string;
  image?: string;
  description?: string;
}

const OpenGraph = ({ title, url, image, description }: IOpenGraph) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url || "https://online-mart-vite-test.vercel.app/"} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default OpenGraph;
