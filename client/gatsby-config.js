module.exports = {
  siteMetadata: {
    title: `Omega3`,
    description: `Aggregation Service for Fish oil`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        //apiURL: `http://028469cb.ngrok.io`,
        apiURL: `http://da512e6c.ngrok.io`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`oil`]
      },
    },
    `gatsby-plugin-sass`,
    
  ]
}
