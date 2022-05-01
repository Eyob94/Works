import React from 'react'
import  API_KEY from './API_KEY';
import './App.css';
import axios from 'axios';

const FIND_LOCATION = 'find_location'




const getApi = async(location, callback) =>{
  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  let rq = await axios.get(url).then(res=>res.data)
  console.log(rq)
  callback({type: FIND_LOCATION, data: rq})

}


const reducer = (state, action) =>{
  switch(action.type){
    case FIND_LOCATION:
          return {data: action.data}

    default:
      return state
      
  }
}


const initialState={
                    data:
                      {
                        name: 'a', 
                        main:{
                          temp: 0,
                          feels_like: 0
                        }, 
                        wind:{
                          speed:0
                        }
                      }
                    };

function App() {
  

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(()=>{
    const req = async() => {
      await getApi("Addis", dispatch)
    }
    req()
  }, [])

  const handleClick = (e) => {

    if(e.key === 'Enter'){
      e.preventDefault();  
     getApi(e.target.value, dispatch)
    }
  }


  return (
    <div className="App" >
      <div className="location">
        
       {state.data.name}
        <div className="burgers">

          <div className="burger"></div>
          <div className="burger"></div>
        </div>
      </div>

      <div className="temperature">
        {state.data.main.temp.toFixed()}<sup>°C</sup>
      </div>

      <div className="search" >
        <form >
          <input type="text" placeholder="Where?" onKeyDown={handleClick}/>
        </form>
      </div>

      <div className="more-info">
        <div className="feels-like">
          <span>{state.data.main.feels_like.toFixed()}</span>
         
          <span>Feels Like</span>
        </div>
        <div className="humidity">
        <span>{state.data.main.humidity}%</span>
          
          <span>Humidity</span>
        </div>
        <div className="winds">
          <span>{state.data.wind.speed.toFixed()} KPH</span>
          
          <span>Winds</span>
        </div>
      </div>
    </div>
  );
}

export default App;
