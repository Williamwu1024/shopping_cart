import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
 

class Detail extends Component {

    handleClick = (id)=>{
        this.props.addToCart(id); 
        // console.log(id)
      } 
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
  
  render() {
      

    const selected_id = this.props.match.params.id;

    console.log(typeof(parseInt(selected_id)));
    // console.log(this.props.items);
    const selectedItem = this.props.items.find(item =>  item.id === parseInt(selected_id))
    // console.log(selectedItem);

    let totalprice = 0;
    let quantity = 0;
    const quantities = this.props.addedItems.map(item => {
        let price = item.price * item.quantity;
        quantity += item.quantity;
        totalprice += price;
    });
    return (
        <>
            <div>Cart: {quantity} Totalprice: ${totalprice}</div>
                <tr>
                    <th><Link to="/">back to store</Link></th>
                    <th><Link to="/cart">My cart</Link></th>
                    
                </tr>

                <tr>
                    <th>{selectedItem.name}</th>
                    <th>
                        <button onClick={()=>{this.handleClick(parseInt(selected_id))}}>Add to cart</button>
                        <button onClick={()=>{this.handleRemove(parseInt(selected_id))}}>Remove</button>
                    </th>
                </tr>

                <tr>
                    <th>Calories</th>
                    <th>{selectedItem.calories}</th>
                </tr>
                <tr>
                    <th>Fiber</th>
                    <th>{selectedItem.fiber}</th>
                </tr>
                <tr>
                    <th>Vitamin C</th>
                    <th>{selectedItem.vitamin}</th>
                </tr>
            </>
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
        addToCart: (id) => dispatch({type: 'ADD', id:id}),
        removeItem: (id) => dispatch({type: 'REMOVE', id:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail);
