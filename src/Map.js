import {useState} from "react";
import MapBox, { Marker, Popup }  from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Moment from "react-moment";
import pinIcon from "./images/pin.png";
import companyIcon from "./images/building.png";
import locationIcon from "./images/placeholder.png";
import noResultImage from "./images/noResult.svg";

const Map = ({data, setIsNavExpanded}) => {

  const [hoveredJob, setHoveredJob] = useState(null);  

  // Set delfault location to New York 
  const [viewState, setViewState] = useState({
    longitude: -73.9516030004786,
    latitude: 40.72557300071668,
    zoom: 10
  });

  return (
    <>
      {/* Loader */}
      <div className="loading-layer">
        <div className="app-loading-spinner" />
      </div>

      {/* Map */}
      <MapBox
        {...viewState}
        onMove={e => setViewState(e.viewState)}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN} >

        {/* Markers on the map (Job locations) */}
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
                setIsNavExpanded(false);
                setHoveredJob(job);
              }}
            >
              <img className="pin" src={pinIcon} alt="map pin" />
            </button>
          </Marker>
        ))}

        {/* If no search result */}
        { data && 
          data.length === 0 &&
          <div className="noSearhResult">
            <div className="noSearhResult-contents">
              <div className="responsiveImgWrap"><img src={noResultImage} alt="no result found"/></div>
                <h1>Sorry, no jobs found for that search.</h1>
                <p>Search Suggestion: </p>
                <p>Check your keyword and location above</p>
            </div>
          </div>}

        {/* Job details (pop up when map pin hovered)  */}
        { hoveredJob ? (
          <Popup
              latitude={hoveredJob.latitude}
              longitude={hoveredJob.longitude}
              onClose={() => {
                setHoveredJob(null);
              }}
            >
            <div className="popUp">
            <a href={hoveredJob.redirect_url}> </a>
              <h2>{hoveredJob.title}</h2>
              <h4>
                <img className="companyIcon" src={companyIcon} alt="company icon" />
                {hoveredJob.company.display_name}
              </h4>
              <strong>
                <img className="locationIcon" src={locationIcon} alt="location icon" />
                {hoveredJob.location.display_name}
              </strong>
              <div className="location-detail">
                {(hoveredJob.location.area).map((area, index) =>(
                    index === ((hoveredJob.location.area.length) -1) ?
                    <span key={index}>{area}</span>:
                    <span key={index}>{area} , </span>
                ))}
              </div>
              <div className="JobDetailInfo">
                <span className="jobLabel">
                  {hoveredJob.category.label}
                </span>
                <p>
                  Posted: <Moment format="MM/DD/YYYY">{hoveredJob.created}</Moment>
                </p>
                {/* <span>Job id: {hoveredJob.id}</span> */}
              </div>
              <p>{hoveredJob.description}</p>
              <div className="linkWrap">
                <a className="redirectLink" href={hoveredJob.redirect_url} rel="noreferrer" target="_blank">
                  Discover more
                </a>
              </div>
            </div>
          </Popup>
        ) : null}
      </MapBox>
    </>
  )
}

export default Map