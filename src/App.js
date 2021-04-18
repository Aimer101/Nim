import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import BuildTiles from './Tiles';


const HeightInput = () => {
  const heightContainer = useRef(0)
  useEffect(() => {
    document.getElementById('heightB').disabled = true;
  })

  const receiveInput = (e) =>{

      
      ReactDOM.render(
        <React.StrictMode>
          <br></br>
          
          <br></br>

          <BuildTiles yaxis = {heightContainer.current.value}/>
        </React.StrictMode>,
        document.getElementById('tiles')
      );
      e.preventDefault()
  }

  const handleC = (e) => {
    const height = heightContainer.current.value
    if( height >2 && height < 10){
      document.getElementById('heightB').disabled = false;
    }else{
      document.getElementById('heightB').disabled = true;
    }
  }

  return <>

   <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
  

   <br></br>
   <br></br>
   <br></br>
   <br></br>
  <form id="form-height" className="d-flex justify-content-center">

      <label >SPECIFY HEIGHT OF PILES BETWEEN 3 TO 9: </label> &nbsp;&nbsp;&nbsp;&nbsp; 

      
      <input type="number" id="height" required min="3" max="9" ref = {heightContainer} onChange = {handleC}/>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <button id = "heightB" className="btn btn-primary" onClick = {receiveInput} >Create Block</button>
  </form>
  </>
}

const Loading = () => {
  useEffect(() => {
    document.getElementById("ml-train").style.display = "none";
  })
        
  return <>
<div className = "d-flex justify-content-center">
<span className="loader"><span className="loader-inner"></span></span>
<br></br>

<p style = {{color: "white"}}> &nbsp; Training is in progress . . . <p id = "time"></p></p>

<div>


</div>  

</div>
</>  }

ReactDOM.render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>,
  document.getElementById('ml-train')
);

export default HeightInput;
