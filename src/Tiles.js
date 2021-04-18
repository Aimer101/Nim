
import ReactDOM from 'react-dom';
import './index.css';
import React from 'react';
import MachineLearning from './Play';


const SingleBlock = (props) => {
    

    return <>
    <div className = "p-4 border border-dark available" id = {props.id} >X</div>
    </>

}

const Blocks = (props) => {
    
    const width = 2*(props.unique) + 1
    var item = []

    for(let i = 0; i < width; i++){
        item.push(<SingleBlock key = {`${props.unique} ${i}`}id = {`${props.unique} ${i}`} />)   
    }

    return <>
        {
            item.map((inside) => { return inside})
        }

        </>
}

const BuildTiles = (props) => {
    var element = []
    var tall = props.yaxis
    for(var i = 0; i < tall; i++){

        const ff = React.createElement("h1",
        {key: i, className: "d-flex justify-content-center"},
        <Blocks unique = {i} />)
        element.push(ff)
    }

    ReactDOM.render(
        <React.StrictMode>
            <br></br>
            
          <MachineLearning height = {props.yaxis}/>
        </React.StrictMode>,
        document.getElementById('height')
      );
    

    
    return (
        <>
        {
            element.map((item) => {
                return item
            })
        }
        
        
        </>
    )
    
}

  export default BuildTiles;

