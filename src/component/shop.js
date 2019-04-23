import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { className } from 'postcss-selector-parser';

 

class Shop extends Component {

    constructor(props){
        super(props);
        this.state={
            results: [],
            inputval: ''
        }
      }

  handleClick = (id)=>{
    this.props.addToCart(id); 
    // console.log(id)
  } 

  onChangeSearchHandler = (event) => {
    // console.log(event.target.value) 
    this.setState({
        inputval: event.target.value
    })
    // console.log(this.state.inputval);
    this.filterresult(event.target.value);
    console.log(event.target.value)
  }

   filterresult = (val) => {
       var searchString= val
       var searchResult = this.props.items
    //    console.log(this.props.items)
       if(searchString.length > 0){
        //    console.log(searchString)
            searchResult = searchResult.filter(item => item.name.toLowerCase().match(searchString.toLowerCase()))
       } 
    //    console.log(searchResult);
       this.setState({
        results: searchResult
    })
       
   } 

  
  render() {
    
    

    let result = this.props.items;
    if (this.state.inputval.length > 0){
            result = this.state.results
            // console.log(result)
    } else {
            result = this.props.items;
    }
    const itemList = result.map(item => {        
        return (
            <tr key = {item.id}>
                <Link to = {'/' + item.id} key = {item.id}>
                    <th>{item.name}</th>
                </Link>
                <th>{item.title}</th>
                <th> ${item.price}</th>
                <th>
                    <button onClick={()=>{this.handleClick(item.id)}}>Add to cart</button>
                </th>
            </tr>
      )});

    let totalprice = 0;
    let quantity = 0;
    const quantities = this.props.addedItems.map(item => {
        let price = item.price * item.quantity;
        quantity += item.quantity;
        totalprice += price;
    });

    return (
        
        <div>
            <input 
            type='text' 
            placeholder='Search' 
            onChange={this.onChangeSearchHandler}
            value={this.state.inputval}
            />

        <div>
            <div>Cart: {quantity} Totalprice: ${totalprice}</div>
            
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th><Link to="/cart">My cart</Link></th>
                </tr>
                {itemList}
                </tbody>
            </table> 
            </div>
        </div>
    );
  }
};

const mapStateToProps = (state)=>{
  return {
      items: state.items,
      addedItems:state.addedItems
       }
  }

const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id) => dispatch({type: 'ADD', id:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop);
