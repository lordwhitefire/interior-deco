export const BANNER_DATA_QUERY = `
  *[_type == "banner"][0] {
    _id,
    title,
    heroSection {
      title,
      subtitle,
      ctaText,
      ctaLink
    },
    services[] {
      id,
      name,
      description,
      link
    },
    stylishSection {
      title,
      description,
      phoneNumber,
      phoneLabel,
      ctaText,
      ctaLink,
      featureImage
    }
  }
`;