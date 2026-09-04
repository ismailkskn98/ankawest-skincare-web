import {
  SITE_ASSETS,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
  isIndexingAllowed,
} from "@/config/site";

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = SITE_ASSETS.ogImage,
  type = "website",
  noIndex = false,
} = {}) {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const allowIndex = isIndexingAllowed() && !noIndex;
  const socialTitle = title || SITE_NAME;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: allowIndex
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
        },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
