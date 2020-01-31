import React from "react"
import { graphql, } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"


export default class IndexPage extends React.Component{

  constructor(props){
    console.log(props)
		super(props);
		this.state = {
      oils: props.data.oils,
      daily_dosage: 2000,
      type: 'DHA'
      
		}
	}

  render(){
    const {oils, daily_dosage, type} = this.state 
    const rows = oils.edges.map( ({node}) => {
      const {id, Image, Title, DHA, EPA, ServingSize, CapsulesPerContainer, iherb_link, iherb_price} = node

      const capsulesPerDay = Math.ceil(daily_dosage / (type === 'DHA' ? DHA : (type === 'EPA' ? EPA : DHA + EPA ) ) * ServingSize)
      
      const daysPerBottle = Math.floor(CapsulesPerContainer / capsulesPerDay)
      const costPerDay  = (iherb_price / daysPerBottle).toFixed(2)
      return (
        <tr key={id}>
          <td><img src={`${Image.publicURL}`} style={{width: '250px'}}/></td>
          <td>
            <h3 className="is-size-4">
              {Title}
            </h3>
            <div className="columns">
              <div className="column">
                <p>
                  {CapsulesPerContainer} capsules.<br/>
                  {ServingSize} capsules per serving.
                </p>
              </div>
              <div className="column">
                <p>
                  {DHA} DHA<br/>
                  {EPA} EPA
                </p>    
              </div>
            </div>
            
          </td>
          <td className="is-vcentered">{capsulesPerDay}</td>
          <td>{daysPerBottle}</td>
          <td>
            <a href={iherb_link} className="button is-link is-large is-light" target="_blank" rel="noopener noreferrer">
              ${costPerDay} / Day <br/>
              ${iherb_price.toFixed(2)}
            </a>
          </td>
          <td>
            <a href={iherb_link} className="button is-link is-light" target="_blank" rel="noopener noreferrer">
              ${iherb_price.toFixed(2)}
            </a>
          </td>
        </tr>
      )
    });

    return (
      <Layout>
        <SEO title="Home" />
        <section className="hero is-medium is-info">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <h1 className="title">
                    Fish Oil
                  </h1>
                  <h2 className="subtitle"> 
                    Compare
                  </h2>
                  <p>Calculations rely on purchasing the largest container size.</p>
                </div>
                <div className="column">
                  <div className="columns">
                    <div className="column field">
                      <label className="label has-text-white">Daily Requirement</label>
                      <div className="control">
                        <div className="select">
                          <select value={daily_dosage} onChange={e => this.setState({daily_dosage: e.target.value})}>
                            <option value="500">500mg</option>
                            <option value="1000">1000mg</option>
                            <option value="1500">1500mg</option>
                            <option value="2000">2000mg</option>
                            <option value="2500">2500mg</option>
                            <option value="3000">3000mg</option>
                            <option value="3500">3500mg</option>
                            <option value="4000">4000mg</option>
                            <option value="4500">4500mg</option>
                            <option value="5000">5000mg</option>
                            <option value="6000">6000mg</option>
                            <option value="7000">7000mg</option>
                            <option value="8000">8000mg</option>
                            <option value="9000">9000mg</option>
                            <option value="10000">10,000mg</option>
                            <option value="12000">12,000mg</option>
                            <option value="14000">14,000mg</option>
                            <option value="16000">16,000mg</option>
                            <option value="18000">18,000mg</option>
                            <option value="20000">20,000mg</option>
                          </select>
                        </div>
                        <p className="help">Total Daily Dosage (1000mg = 1g)</p>
                      </div>
                    </div>
                    <div className="column field">
                      <label className="label has-text-white">Type</label>
                      <div className="control">
                        <div className="select">
                          <select value={type} onChange={e => this.setState({type: e.target.value})}>
                            <option value="combined">Combined</option>
                            <option value="DHA">DHA</option>
                            <option value="EPA">EPA</option>
                          </select>
                        </div>
                        <p className="help">Your type of daily requirement</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
        
          <form>


          </form>
          <table className="table is-hoverable">
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td>Daily Capusles</td>
                <td>Days</td>
                <td>iHerb</td>
                <td>Amazon</td>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
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