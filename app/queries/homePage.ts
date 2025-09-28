export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    _id,
    heroSection {
      title,
      subtitle,
      ctaText
    }
  }
`;