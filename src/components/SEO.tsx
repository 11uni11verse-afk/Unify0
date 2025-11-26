import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = [],
  image, 
  url,
  type = 'website',
  structuredData
}: SEOProps) => {
  const siteUrl = 'https://unify0.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const fullTitle = `${title} | UnifyO`;
  
  const defaultKeywords = [
    "international students", 
    "study abroad", 
    "student community", 
    "connect students", 
    "unifyo", 
    "global network", 
    "university students",
    "study abroad app",
    "student networking platform"
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(", ");

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="UnifyO" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:site" content="@Uni_fyO" />
      <meta name="twitter:creator" content="@Uni_fyO" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="UnifyO" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || siteUrl} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};