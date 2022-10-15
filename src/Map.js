import {useState} from 'react';
import MapBox, { Marker, Popup }  from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Moment from 'react-moment';
import pinIcon from './images/pin.png';
import companyIcon from './images/building.png';
import locationIcon from './images/placeholder.png'

const Map = ({data}) => {
    const [hoveredJob, setHoveredJob] = useState(null);  

    // set delfault location to New York 
    const [viewState, setViewState] = useState({
            longitude: -73.9516030004786,
            latitude: 40.72557300071668,
            zoom: 10
    });

    // {data &&
    //   data.length === 0 &&
    //    console.log('noresult')}

  return (
    <MapBox
        {...viewState}
        onMove={e => setViewState(e.viewState)}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN} >

        {data && data.map(job => (
          <Marker
            key={job.id}
            latitude={job.latitude}
            longitude={job.longitude}
            zoom = {20}
          >
            <button
              className="marker-btn"
              onMouseEnter={e => {
                e.preventDefault();
                console.log(job);
                console.log(job.title);
                setHoveredJob(job);
              }}
            >
              <img className='pin' src={pinIcon} alt="map pin" />
            </button>
          </Marker>
        ))}

         {/* if no search result */}
        <div className='noSearhResult'>
          <div className='noSearhResult-text'>
            <img />
            <h1>Sorry, no jobs found for that search.</h1>
              <p>Search Suggestions: Check your keyword and location above</p>
          </div>
        </div>

        {/* job details pop up when pin hovered */}
        { hoveredJob ? (
          <Popup
            latitude={hoveredJob.latitude}
            longitude={hoveredJob.longitude}
            onClose={() => {
              setHoveredJob(null);
            }}
          >
          <div className='popUp'>
            <h2>{hoveredJob.title}</h2>

            <h4>
              <img className='companyIcon' src={companyIcon} alt="company icon" /> 
              {hoveredJob.company.display_name}
            </h4>

            <strong>
              <img className='locationIcon' src={locationIcon} alt="location icon" /> 
              {hoveredJob.location.display_name}
            </strong>
            <div className='location-detail'>
              {(hoveredJob.location.area).map((area, index) =>(
                  index === ((hoveredJob.location.area.length) -1) ?
                  <span key={index}>{area}</span>:
                  <span key={index}>{area} , </span>
              ))}
            </div>    
            <div className='JobDetailInfo'> 
              <span className="jobLabel">
                {hoveredJob.category.label} 
              </span>
              <p>
                Posted: <Moment format="MM/DD/YYYY">{hoveredJob.created}</Moment> 
              </p>
               <span>Job id:  {hoveredJob.id}</span>
            </div>
            <p>{hoveredJob.description}</p>

            <a className="redirectLink" href={hoveredJob.redirect_url} rel="noreferrer" target="_blank">Learn more</a>
            
          </div>
        </Popup>
        ) : null}   
    </MapBox>
  )
}

export default Map