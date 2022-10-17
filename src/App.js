import {useState, useEffect, useRef} from "react";
import "./App.css";
import Map from "./Map";
import axios from "axios";
import seachIcon from "./images/search.svg";
import menuIcon from "./images/menu.svg";

function App() {
  // useState
  const [jobTitle, setJobTitle] = useState(null);
  const [zipcode, setZipCode] = useState(null);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  // useRef
  const zipCodeRef  = useRef("");
  const jobTitleRef = useRef("");

  // submit inputs pass to url 
  const handleSearch = () => {
    // update loading state
    setIsLoading(true);

    // clear input fields
    zipCodeRef.current.value = null;
    jobTitleRef.current.value = null;

    // close nav when submit button clicked
    setIsNavExpanded(false);
    
    // set url for fetch datas 
    const headUrl = "https://api.adzuna.com/v1/api/jobs/us/search/50";
    setUrl(`${headUrl}?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_APP_KEY}&what=${jobTitle}&where=${zipcode}`)
  };

  // fetch datas 
  useEffect(() => { 

    const fetchData = () => {
      axios.get(url)
      .then(res => {
          setData(res.data.results)
          setIsLoading(false)
      }).catch(err => {
          console.log(err)
      });
    };
    isLoading && fetchData();

  }, [url, isLoading]);

  return (
    <>
      {/* Nav Bar */}
      <nav>
        <div className= {isNavExpanded ? "nav-header showBorder" : "nav-header"}>
          <div className="nav-header-contents">
            <img src={seachIcon} alt="search icon"/>
            <span>
              Job Search
            </span>
          </div>
          <img  
              onClick={() => {
                setIsNavExpanded(!isNavExpanded)
              }} 
            className="menuIcon" 
            src={menuIcon} alt="menu icon"
          />
        </div>
        <form 
          className= {
            isNavExpanded ? "form show" : "form hide"
          }
          onSubmit={e => { e.preventDefault(); handleSearch(); }}>
          <input
            required 
            ref={jobTitleRef}
            onChange = {(e)=> setJobTitle(e.target.value)} 
            type="text" 
            placeholder="Job title, keywords, or comany"
          />
          <input  
          required
            ref={zipCodeRef}
            onChange = {(e)=> setZipCode(e.target.value)} 
            type="number"
            placeholder="Zip code">
          </input>
          <button className="submitBtn" disabled={isLoading} >Search</button>
        </form>
      </nav>
      {isLoading &&  
        <div className="search-loading-wrap">
          <div className="loading-search">
            <div className="searchImage">
              <div><div><div/><div/></div></div>
            </div>
          </div>
        </div>
      }

      {/* Map */}
      <Map data={data} setIsNavExpanded={setIsNavExpanded}/>
    </>
  );
}

export default App;
