import {useState} from 'react';
import MapBox, { Marker, Popup }  from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pin from './pin.png';

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
              <img className='pin' src={pin} alt="map pin" />
            </button>
          </Marker>
        ))}

         {/* if no search result */}
        <div className='noSearhResult'>
          <h1>Sorry, no jobs found for that search.</h1>
          Search Suggestions:
          <ul>
            <li>Check your keyword and location above</li>
            <li>Increase your search radius in filters</li>
            <li>Try removing filters to find additional jobs</li>
          </ul>
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
            <h4>{hoveredJob.company.display_name}</h4>
            <strong>{hoveredJob.location.display_name}</strong>
            <p>{hoveredJob.description}</p>
            <a href={hoveredJob.redirect_url} rel="noreferrer" target="_blank">view job</a>
          </div>
        </Popup>
        ) : null}   
    </MapBox>
  )
}

export default Map