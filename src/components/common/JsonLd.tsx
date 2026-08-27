import React from 'react';

interface JsonLdProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'Person' | 'Product' | 'FAQPage' | 'BreadcrumbList' | 'AggregateRating' | 'Review' | string;
  data: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
