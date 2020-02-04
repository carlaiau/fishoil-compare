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
      node.DHAPerCap = DHA / ServingSize
      node.EPAPerCap = EPA / ServingSize

      oilArray.push(node)
    })
    
    // sort by the desired sort function
    if(sortProperty != 'DHAPerCap' && sortProperty != 'EPAPerCap'){
      oilArray.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
    } else{
      oilArray.sort((a, b) => (a[sortProperty] < b[sortProperty]) ? 1 : -1)
    }
    

    const rows = oilArray.map( ({id, Image, Title, DHA, EPA, ServingSize, CapsulesPerContainer, iherb_link, iherb_price, iherb_reviews, iherb_avg_rating, capsulesPerDay, daysPerBottle, costPerDay }, index) => {
      iherb_link += "?rcode=NVR078"
      let boxClass = "box";
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
        <article className={boxClass} key={id}>
        <div className="columns is-vcentered">
          <div className="column">
            <figure className="">
              <a href={iherb_link} target="_blank" rel="noopener noreferrer">
                <img src={`${Image.publicURL}`}/>
              </a>
            </figure>
          </div>
          <div className="column is-three-fifths">
            <a href={iherb_link} target="_blank" rel="noopener noreferrer">
              <h3 className="is-size-4">
                {Title}
              </h3>
            </a>
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
                  <strong>${iherb_price.toFixed(2)} Per container</strong><br/>
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
            <p className="has-text-centered">
              <a href={iherb_link} className="button is-link is-large is-primary" target="_blank" rel="noopener noreferrer">
                ${costPerDay}  <span className="is-size-7" style={{marginLeft: '5px'}}> per day</span>
              </a><br/>
              <span className="is-size-7">
                {iherb_reviews} reviews<br/> with {iherb_avg_rating}/5 score
              </span>  
            </p>
          </div>  
        </div>
      </article>
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
                  <p>This is a work in progress.<br/>All Feedback appreciated!<br/>
                  <a class="home" href="https://carlaiau.com" target="_blank" rel="noopener noreferrer">carlaiau.com</a>
                  </p>
                </div>
                <div className="column is-three-quarters bubble">
                  <p>Fish oil omega 3 concentration varies significantly between products. 
                    This tool guides you to make a more informed purchase.
                    It is best suited for people who have already determined their desired daily dosage of Omega 3.
                    All Prices are aggregated from iherb daily and based in USD.</p>
                  <p>Links for further information: <a href="https://en.wikipedia.org/wiki/Docosahexaenoic_acid" target="_blank" rel="noopener noreferrer">DHA</a>, <a href="https://en.wikipedia.org/wiki/Eicosapentaenoic_acid" target="_blank" rel="noopener noreferrer">EPA</a> and 
                  a recent deep dive into the topic on Peter Attia's <a href="https://peterattiamd.com/billharris/" target="_blank" rel="noopener noreferrer">Podcast</a>. We have no affiliation, merely fans.
                  </p>

                </div>
              </div>

            </div>
          </div>
        </section>
        <div className="container sorter">
          <nav className="level">
              <div className="level-left">
                <div className="level-item  has-text-centered">
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">Dose</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <div className="select is-fullwidth is-rounded">
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
                      </div>
                    </div>
                  </div>
                <div className="level-item  has-text-centered" >
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label type">Type</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <div className="select is-rounded">
                            <select value={type} onChange={e => this.setState({type: e.target.value})}>
                              <option value="combined">Combined</option>
                              <option value="DHA">DHA</option>
                              <option value="EPA">EPA</option>
                            </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="level-right">
                <div className="level-item has-text-centered">
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Sort By</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <div className="select is-rounded">
                            <select value={sortProperty} onChange={e => this.setState({sortProperty: e.target.value})}>
                              <option value="costPerDay">Daily Cost</option>
                              <option value="capsulesPerDay">Daily Capsules</option>
                              <option value="iherb_price">Container Cost</option>
                              <option value="DHAPerCap">DHA</option>
                              <option value="EPAPerCap">EPA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          </nav>
        </div>
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