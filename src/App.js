import {useState, useEffect, useRef} from 'react';
import './App.css';
import Map from './Map';
import axios from 'axios';
import seacgIcon from './images/search.svg';

function App() {
  // useState
  const [jobTitle, setJobTitle] = useState(null);
  const [zipcode, setZipCode] = useState(null);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useRef
  const zipCodeRef  = useRef('');
  const jobTitleRef = useRef('');


  // submit inputs pass to url 
  const handleSearch = () => {
    setIsLoading(true);

    // clear input fields
    zipCodeRef.current.value = null;
    jobTitleRef.current.value = null;

    const headUrl = 'https://api.adzuna.com/v1/api/jobs/us/search/10';
    setUrl(`${headUrl}?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_APP_KEY}&what=${jobTitle}&where=${zipcode}`)
  };

  const getSearchResult = () =>{
      console.log('SearchResult', data , data.length);
  };


  // fetch datas 
  useEffect(() => { 
    axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/50?app_id=20b29dfe&app_key=25d1198733160a904c3aa1f9953ca387&what=php&where=10002
    `)
    // axios.get(url)
    .then(res => {
        setData(res.data.results)
        console.log(res.data.results)
        setIsLoading(false)
    }).catch(err => {
        console.log(err)
    })
  }, [url]);

  return (
    <div className='app'>
      <div className="app-loading-spinner" />
      <nav>
        <img src={seacgIcon} alt='search icon'></img>
        <span>
          Job Search
        </span>
        <form onSubmit={e => { e.preventDefault(); handleSearch(); }}>
        <input
          required 
          ref={jobTitleRef}
          onChange = {(e)=> setJobTitle(e.target.value)} 
          type="text" 
          placeholder='Job title, keywords, or comany'
        />
        
        <input  
        required
          ref={zipCodeRef}
          onChange = {(e)=> setZipCode(e.target.value)} 
          type="number"
          placeholder='Zip code'>
        </input>
        <button className='submitBtn' disabled={isLoading} >Search</button>
        </form>
      </nav>
      {isLoading &&  
        <div class="search-loading-wrap">
        <div class="loading-search">
          <div class="searchImage">
            <div><div><div/><div/></div></div>
          </div>
        </div>
        </div>
      }
      <Map data={data}/>
    </div>
  );
}

export default App;
