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
    axios.get(url)
    .then(res => {
        setData(res.data.results)
        setIsLoading(false)
    }).catch(err => {
        console.log(err)
    })
  }, [url]);

  return (
    <div className='app'>
      {isLoading && <div className="loading-spinner">
      </div>}
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
          placeholder='Job, Title ...'
        />
        
        <input  
        required
          ref={zipCodeRef}
          onChange = {(e)=> setZipCode(e.target.value)} 
          type="text"
          placeholder='Zip Code'>
        </input>
        <button className='submitBtn' disabled={isLoading} >Search</button>
        </form>
      </nav>
      
      <Map data={data}/>
    </div>
  );
}

export default App;
