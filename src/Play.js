import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {train, ai_move, Nim} from './Nim'


var clicked = []
var available = {} /* Object of available box */
var nim_array = [] /* Available item in array form */
var Ai = null
var Human = null

function change_color(id){

    const height = id[0]
   
    const isValid = () => {
        if(clicked.length < 1)
        {
            return true
        }
        else
        
            var last_element = [...clicked][0][0]

            if(last_element !== height){
                return false
            }else {
                return true
            }   
        

    }    



        const element = document.getElementById(id)
        const color = window.getComputedStyle(element).backgroundColor
        const pink = "rgb(219, 112, 147)"
        const white = "rgb(255, 255, 255)"
        ReactDOM.render(
            <React.StrictMode>
              <Error action = {false}/>
            </React.StrictMode>,
            document.getElementById('warning')
          );

    
        
        if(color === white && isValid()){
            element.style.backgroundColor = pink
            return clicked.push(id)
        }
        /* If item is clicked from other pile, error is shown */
        else if(color === white && !isValid()){
            const faulty = "Invalid Move (Must Select Item From The Same Row)"

            return ReactDOM.render(
                <React.StrictMode>
                  <Error action = {true} mistake ={faulty}/>
                </React.StrictMode>,
                document.getElementById('warning')
              );

        }
        else if(color === pink){
            element.style.backgroundColor = white
            return clicked.pop()


        }
}

function next_move(){

    ReactDOM.render(
        <React.StrictMode>
          <PlayTime turn = "AI" />
        </React.StrictMode>,
        document.getElementById('ml')
      );

    

    const ff  = ai_move(Ai, nim_array)
    
    update_ai(ff)

    if(nim_array.every(Nim.isFinish)){
        return winner("Win")

    }
    return ReactDOM.render(
        <React.StrictMode>
          <PlayTime turn = "Human" />
        </React.StrictMode>,
        document.getElementById('ml')
      );
}

const Error = (props) => {
    if(props.action){

        return <><p className="d-flex justify-content-center" style={{color: "red"}}>{props.mistake}</p> </>
    }else{
        return <></>
    }
    
}

function handleClick(item){
    /* If none item is picked, error is shown */
    if(item.length === 0){
        const faulty = "Must at least select 1 item"
        return ReactDOM.render(
            <React.StrictMode>
              <Error action = {true} mistake = {faulty}/>
            </React.StrictMode>,
            document.getElementById('warning')
          );
    }

    /* By Default error should be none */
    ReactDOM.render(
        <React.StrictMode>
          <Error action = {false}/>
        </React.StrictMode>,
        document.getElementById('warning')
      );


    
    
    item.map((id) => {
        
        var element = document.getElementById(id)
        element.removeEventListener('click', () => change_color(id), true)

        element.style.backgroundColor = 'rgb(239, 192, 80)'
        element.style.color = 'rgb(239, 192, 80)'  
         

        available[id[0]] = available[id[0]].filter(el => el !== id)  
        return nim_array[id[0]] -= 1 
    })
    clicked = []
    if(nim_array.every(Nim.isFinish)){
        return winner("Lose")

    }
    return next_move()
    
}

const PlayTime = (props) => {

    if(props.turn === "Human"){
        return <>
    <div className = "d-flex justify-content-center">

    <button className="btn btn-outline-primary" onClick = {() => handleClick(clicked)}>MAKE MOVE</button>

    </div>
    </>
    /* If AI TURN, REMOVE THE BUTTON TO MAKE MOVE */
    }else {
        
        return <></>
    }
    
    
}

function playtime(){
    if(Human === 0){
        ReactDOM.render(
            <React.StrictMode>
              <PlayTime turn = "Human"/>
            </React.StrictMode>,
            document.getElementById('ml')
          );
          
    }else{
        next_move();
        
    }
}


const MachineLearning = (props) => {


    const time_to_train = useRef(null)
    const height = props.height

    const handleSubmit = (e) => {
       
        const el = document.getElementById('height')
        while (el.firstChild) el.removeChild(el.firstChild);

        document.getElementById('ml-train').style.display = "block"
        e.preventDefault();
        setTimeout(function(){
        Ai = train(time_to_train.current.value, height)

            document.getElementById('ml-train').style.display = "none"
            addListener(height); 
        Human = Math.floor(Math.random() * 2); 
        ReactDOM.render(
            <React.StrictMode>
              <Rules />
            </React.StrictMode>,
            document.getElementById('instruction')
          );

        playtime();
        },1000)

        

        
    }

    return <>
    
   <form id="form-height" className="d-flex justify-content-center" onSubmit = {handleSubmit}>
       <label >Times for AI to Train</label>&nbsp;&nbsp; 
       <input type="number" id="train" required min="1" ref = {time_to_train}/>&nbsp;&nbsp;
       <button className="btn btn-outline-primary" >GO</button>
   </form>
   </>
}

function addListener(height){
    
    for(let i = 0; i < height; ++ i){
        available[i] = []
        nim_array[i] = 0
        const width = 2*i + 1
        for(let j = 0; j < width; j++){
        available[i].push(`${i} ${j}`)
        nim_array[i] += 1

            var element = document.getElementById(`${i} ${j}`)
            element.addEventListener('click', () => change_color(`${i} ${j}`))
        }
    }
    
    
}

function update_ai(action){
    const blocks = action[1]
    const pile = action[0]

    for(let i = 0; i < blocks; i++){
        clicked.push(available[pile][i])
        nim_array[pile] -= 1
    }


    clicked.map((id) => {
        
        var element = document.getElementById(id)

        element.style.backgroundColor = 'rgb(221, 65, 36)'
        element.style.color = 'rgb(221, 65, 36)'
         

        return available[pile] = available[pile].filter(el => el !== id)  
    })
    clicked = []
    
}

const Rules = () => {
    return <>
    <br></br>
    <br></br>

    <div className="d-flex justify-content-center" style = {{color: "white"}}>
            <p>Rules of the game: </p>
            
            <ul>
              <li>The turn on which you can move is set to random</li>
              <li>You must pick at least 1 item on each turn</li>
              <li>You cannot pick item from different row</li>
              <li>Whoever pick the last 1 item lose the game</li>
            </ul>
          </div>
    </>
}

const Winner = (props) => {

    const el = document.getElementById('ml')
    const el2 = document.getElementById('instruction')

    while (el.firstChild) el.removeChild(el.firstChild);
    while (el2.firstChild) el2.removeChild(el2.firstChild);

    return <>
    <br></br>
    <br></br>
    <div className = "d-flex justify-content-center">
    
    <h1 >You {props.result}</h1><br></br>

    </div>
    <br></br>
    <div className= "d-flex justify-content-center">
    <button className="btn btn-outline-primary" onClick = {() => window.location.reload()}>REMATCH?</button>

    </div>

    
    
    </>
}

function winner(result){
    ReactDOM.render(
        <React.StrictMode>
          <Winner result = {result}/>
        </React.StrictMode>,
        document.getElementById('tiles')
      );
}



export default MachineLearning;
