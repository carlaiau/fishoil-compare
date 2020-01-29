import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"



const IndexPage = ( {data} ) => {
  console.log(data.allStrapiOil.edges)

  const oils = data.allStrapiOil.edges.map( ({node}) => {
    const {Image, Title, DHA, EPA, ServingSize, CapsulesPerContainer, iherb_link, iherb_price} = node
    return (
      <tr>
        <td><img src={`${Image.publicURL}`} style={{width: '150px'}}/></td>
        <td>{Title}</td>
        <td>{DHA}</td>
        <td>{EPA}</td>
        <td>{ServingSize}</td>
        <td>{CapsulesPerContainer}</td>
        <td>
          <a href={iherb_link} target="_blank" rel="noopener noreferrer">
            ${iherb_price.toFixed(2)}
          </a>
        </td>
        
      </tr>
    )
  });


  return (
    <Layout>
      <SEO title="Home" />
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Title</td>
            <td>DHA</td>
            <td>EPA</td>
            <td>Serving Size</td>
            <td>Capsules Per Container</td>
            <td>Price (iHerb)</td>
          </tr>
        </thead>
        <tbody>
          {oils}
        </tbody>
      </table>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allStrapiOil {
      edges {
        node {
          Title
          iherb_link
          iherb_price
          ServingSize
          DHA
          EPA
          CapsulesPerContainer
          Image {
            publicURL
          }
        }
      }
    }
  }
`