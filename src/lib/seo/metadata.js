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
  canonicalUrl,
  socialTitle,
  socialDescription,
} = {}) {
  const url = canonicalUrl
    ? canonicalUrl.startsWith("http") ? canonicalUrl : absoluteUrl(canonicalUrl)
    : absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const allowIndex = isIndexingAllowed() && !noIndex;
  const resolvedSocialTitle = socialTitle || title || SITE_NAME;
  const resolvedSocialDescription = socialDescription || description;

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
      title: resolvedSocialTitle,
      description: resolvedSocialDescription,
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
      title: resolvedSocialTitle,
      description: resolvedSocialDescription,
      images: [imageUrl],
    },
  };
}
