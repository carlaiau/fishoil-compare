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
      type: 'DHA',
      sortProperty: 'costPerDay'
		}
	}

  render(){
    const {oils, daily_dosage, type, sortProperty} = this.state
    
    let oilArray = []
    oils.edges.map( ({node}) => {
      const {DHA, EPA, ServingSize, CapsulesPerContainer, iherb_price} = node
      const capsulesPerDay = Math.ceil(daily_dosage / (type === 'DHA' ? DHA : (type === 'EPA' ? EPA : DHA + EPA ) ) * ServingSize)
      const daysPerBottle = Math.floor(CapsulesPerContainer / capsulesPerDay)

      node.capsulesPerDay = capsulesPerDay
      node.daysPerBottle = daysPerBottle
      node.costPerDay = (iherb_price / daysPerBottle).toFixed(2)
      oilArray.push(node)
    })
    
    // sort by the desired sort function
    oilArray.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
    

    const rows = oilArray.map( ({id, Image, Title, DHA, EPA, ServingSize, CapsulesPerContainer, iherb_link, iherb_price, iherb_reviews, iherb_avg_rating, capsulesPerDay, daysPerBottle, costPerDay }, index) => {
      iherb_link += "?rcode=NVR078"
      let boxClass = "media box";
      switch(index){
        case 0:
          boxClass += ' gold';
          break;
        case 1:
          boxClass += ' silver';
          break;
        case 2:
          boxClass += ' bronze';
          break;
      }
      
      return (
        <a href={iherb_link} target="_blank" rel="noopener noreferrer" className="bigLink">
          <article className={boxClass} key={id}>
            <div className="media-left" >
              <figure className="image is-128x128">
                <img src={`${Image.publicURL}`} style={{width: '250px'}}/>
              </figure>
            </div>
            <div className="media-content">
              <h3 className="is-size-4">
                {Title}
              </h3>
              <div className="columns is-vcentered">

                <div className="column is-four-fifths">
                  
                  <div className="columns">
                    <div className="column">
                      <p>
                        Each Capsule contains<br/>
                        <strong>
                          {DHA / ServingSize}mg DHA & {EPA / ServingSize}mg EPA
                        </strong>
                      </p>
                    </div>
                    <div className="column">
                      <p className="is-size-6">
                        ${iherb_price.toFixed(2)} Per container.<br/>
                        {CapsulesPerContainer} capsules</p>
                                      
                    </div>
                    <div className="column">
                      <p className="is-size-6">
                        <strong>{capsulesPerDay} capsules a day</strong><br/>
                        Container lasts {daysPerBottle} days
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="column">
                  <p>
                    <a href={iherb_link} className="button is-link is-large is-primary" target="_blank" rel="noopener noreferrer">
                      ${costPerDay}  <span className="is-size-7" style={{marginLeft: '5px'}}> per day</span>
                    </a><br/>

                    <span className="is-size-7">
                      {iherb_reviews} reviews with {iherb_avg_rating}/5 score
                    </span>  
                  </p>
                  
                </div>  
              </div>
            </div>
          </article>
        </a>
      )
    });


    return (
      <Layout>
        <SEO title="Home" />
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <h1 className="title">
                    Fish Oil
                  </h1>
                  <h2 className="subtitle"> 
                    Comparison Alpha 0.1
                  </h2>
                  <p>Calculations rely on purchasing the largest container size from iherb in USD</p>
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
                      </div>
                    </div>
                    <div className="column field">
                      <label className="label has-text-white">Sort By</label>
                      <div className="control">
                        <div className="select">
                          <select value={sortProperty} onChange={e => this.setState({sortProperty: e.target.value})}>
                            <option value="costPerDay">Cheapest Daily Cost</option>
                            <option value="capsulesPerDay">Least Daily Capsules</option>
                            <option value="iherb_price">Cheapest Container</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{padding: '20px 0'}}>
          <div className="container">    
            {rows}
          </div>
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
          iherb_reviews
          iherb_avg_rating
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