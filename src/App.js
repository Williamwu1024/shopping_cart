import React, { Component } from 'react';
import Navbar from './component/header';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import './App.css'; 

class App extends Component {

  handleClick = (id)=>{
    this.props.addToCart(id); 
    console.log(id)
  } 

  
  render() {
    return (
      <>
        <div className="row header align-items-center ">
          <h1>React-Redux Store</h1>
        </div> 
        
        <p className = "word">Welcome to the React Store</p>
        <BrowserRouter>
          <div className="container">   
            <Navbar />  
          </div>  
        </BrowserRouter>
      </>
      
    );
  }
};

const mapStateToProps = (state)=>{
  return {
      items: state.items
       }
  }

const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id) => dispatch({type: 'ADD', id:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


