import groq from 'groq'

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`
export const PAGES_QUERY = groq`*[_type == "page"]{
  title,
  slug,
  body
}
`

export const NAVIGATION_QUERY = groq`*[_type == "navigation"] {
  header {
    link[] {
      navLink{
        label,
        "link": *[(_type == "product" || _type == "page" || _type == "collection") && _id == ^.linkInternal.reference._ref][0],
      },
      subNavigation[] {
        label,
        linkInternal,
        "link": *[(_type == "product" || _type == "page" || _type == "collection") && _id == ^.linkInternal.reference._ref][0],
      },
    }
  },
  footer {
    link[] {
      navLink{
        label,
        "link": *[(_type == "product" || _type == "page" || _type == "collection") && _id == ^.linkInternal.reference._ref][0],
      },
      subNavigation[] {
        label,
        linkInternal,
        "link": *[(_type == "product" || _type == "page" || _type == "collection") && _id == ^.linkInternal.reference._ref][0],
      },
    }
  }
}`
