import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'

const Hero = () => {
  const theme = useTheme()
  return (
    <section
      css={css`
        color: ${theme.colors.white};
        width: 100%;
        background: ${theme.colors.primary};
        padding: 20px 0 30px 0;
        display: flex;
      `}
    >
      <Container
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <h1
          css={css`
            color: ${theme.colors.white};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin: 0;
            max-width: ${rhythm(15)};
          `}
        >
          Your blog says the things you want to say.
        </h1>
      </Container>
      <div
        css={css`
          height: 150px;
          overflow: hidden;
        `}
      />
    </section>
  )
}

const Article = ({ post }) => {
  const theme = useTheme()
  return (
    <div
      css={css({
        marginBottom: '40px',
        borderRadius: '7px',
        padding: '0px',
        background: theme.colors.imageBg,
      })}
    >
      {post?.frontmatter?.banner && (
        <Link
          aria-label={`View ${post.frontmatter.title} article`}
          to={`/${post.fields.slug}`}
        >
          <Img
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'center',
            }}
            sizes={post.frontmatter.banner.childImageSharp.fluid}
          />
        </Link>
      )}

      <div style={{ padding: '20px 25px' }}>
        <h2
          css={{
            marginBottom: rhythm(0.3),
            marginTop: '0px',
            transition: 'all 150ms ease',
            ':hover': {
              color: theme.colors.primary,
            },
          }}
        >
          <Link
            to={post.frontmatter.slug}
            aria-label={`View ${post.frontmatter.title}`}
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <Description>
          {post.excerpt}{' '}
          <Link
            to={post.frontmatter.slug}
            aria-label={`View ${post.frontmatter.title}`}
          >
            Read Article →
          </Link>
        </Description>
      </div>
    </div>
  )
}

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site} noSubscribeForm>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        {allMdx.edges.map(({ node: post }) => (
          <Article key={post.id} post={post} />
        ))}
        <Link to="/blog" aria-label="Visit blog page">
          View all articles
        </Link>
        <hr />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
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
