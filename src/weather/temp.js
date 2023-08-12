// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=0e82478c8aa5e944030db0f9b8f3585d
import Weathercard from './weathercard';
import React ,{useState ,useEffect} from 'react'
import "./style.css"
const Temp = () => {

    const [searchValue ,setSearchValue] = useState("delhi");
   const [tempInfo , setTempInfo] = useState({});

    const getWeatherInfo = async () =>{
   try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0e82478c8aa5e944030db0f9b8f3585d`
     const res = await fetch(url);
     const data = await res.json();

     const { temp ,humidity ,pressure } = data.main;
     const { main: weathermood} = data.weather[0];
     const {name } =data;
     const {speed} = data.wind;
     const {country , sunset } = data.sys;

     const myNewWeatherInfo = {
         temp,
         humidity,
         pressure,
         weathermood,
         name,
         country,
         sunset,
         speed,
     };

     setTempInfo(myNewWeatherInfo);
     
    }
   catch (error){
       console.log(error);
   }
    };

    useEffect(() => {
    getWeatherInfo();
    },[]);

  return (
    <>
      <div className='wrap'>
          <div className='search'>
<input type="search" 
    placeholder='search'
    autoFocus
    id='search'
    className='searchTerm'
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
/>

<button className='searchButton' type='button' onClick={getWeatherInfo}>
    Search
</button>
          </div>
      </div>

      {/*  Our Temp cards */}
     <Weathercard tempInfo = {tempInfo} />
    </>
  )
};

export default Temp;