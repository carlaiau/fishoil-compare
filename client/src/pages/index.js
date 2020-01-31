import React from "react"
import { graphql, } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"



export default class IndexPage extends React.Component{

  constructor(props){
    console.log(props)
		super(props);
		this.state = {
			oils: props.data.oils
		}
	}

  render(){
    const oils = this.state.oils.edges.map( ({node}) => {
      const {id, Image, Title, DHA, EPA, ServingSize, CapsulesPerContainer, iherb_link, iherb_price} = node
      return (
        <tr key={id}>
          <td><img src={`${Image.publicURL}`} style={{width: '200px'}}/></td>
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
}

export const query = graphql`
  query {
    oils: allStrapiOil {
      edges {
        node {
          id
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