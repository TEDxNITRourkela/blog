import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { bpMaxSM, bpMaxMD } from '../lib/breakpoints'
import { useTheme } from '../components/Theming'

const Article = ({ post }) => {
  const theme = useTheme()
  return (
    <div
      css={css`
        background: ${theme.colors.imageBg};
        :not(:first-of-type) {
          margin-top: 60px;
          ${bpMaxMD} {
            margin-top: 40px;
          }
          ${bpMaxSM} {
            margin-top: 20px;
          }
        }
        :first-of-type {
          margin-top: 20px;
          ${bpMaxSM} {
            margin-top: 20px;
          }
        }
        .gatsby-image-wrapper {
        }
        display: flex;
        flex-direction: column;
      `}
    >
      {post.frontmatter.banner && (
        <Link
          aria-label={`View ${post.frontmatter.title} article`}
          to={`/${post.fields.slug}`}
        >
          <Img
            css={css`
              width: 100%;
              height: 400px;
              object-fit: cover;
              ${bpMaxSM} {
                height: 350px;
              }
            `}
            sizes={post.frontmatter.banner.childImageSharp.fluid}
          />
        </Link>
      )}
      <div
        css={css`
          padding: 40px;
          ${bpMaxSM} {
            padding: 20px;
          }
        `}
      >
        <h2
          css={css`
            margin-top: 30px;
            margin-bottom: 10px;
          `}
        >
          <Link
            aria-label={`View ${post.frontmatter.title} article`}
            to={`/${post.fields.slug}`}
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        {/* <small>{post.frontmatter.date}</small> */}
        <p
          css={css`
            margin-top: 10px;
          `}
        >
          {post.excerpt}
        </p>{' '}
        <Link
          to={`/${post.fields.slug}`}
          aria-label={`view "${post.frontmatter.title}" article`}
        >
          Read Article →
        </Link>
      </div>
    </div>
  )
}

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, categories },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page
    .map(id => allMdx.edges.find(edge => edge.node.id === id))
    .filter(post => post !== undefined)

  return (
    <Layout site={site} noSubscribeForm>
      <SEO />
      <Container noVerticalPadding>
        {posts.map(({ node: post }) => (
          <Article key={post.id} post={post} />
        ))}
        <div css={css({ marginTop: '30px' })}>
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          )}
          {previousPagePath && (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          )}
        </div>
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { isPost: { eq: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
