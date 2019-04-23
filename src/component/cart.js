import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Cart extends Component {

    handleRemove = (id)=>{
        this.props.removeItem(id);
    }

    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
        // console.log(id)
    }

    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

  render() {
    // console.log(this.props.addedItems);
    let totalprice = 0;
    let quantity = 0;
    const itemList = this.props.addedItems.map(item => {
        let price = item.price * item.quantity;
        quantity += item.quantity;
        totalprice += price;
        return (
            <tr key = {item.id}>
                <th>{item.name}</th>
                <th>
                    <button onClick={()=>{this.handleAddQuantity(item.id)}}>+</button>
                    {item.quantity}
                    <button onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</button>
                </th>
                <th> ${price}</th>
                <th>
                    <button onClick={()=>{this.handleRemove(item.id)}}>X</button>
                </th>    
            </tr>
      )});
    // console.log(this.props.total)
    return (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th><Link to="/">back to store</Link></th>
              </tr>
              {itemList}
              <tr>
                <th>Total</th>
                <th>{quantity}</th>
                <th>${totalprice}</th>
                <th></th>
              </tr>
            </tbody>
          </table> 
        </div>
    );
  }
};

const mapStateToProps = (state)=>{
  return {
      items: state.addedItems,
      addedItems: state.addedItems
       }
  }

  const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id) => dispatch({type: 'REMOVE', id:id}),
        addQuantity: (id) => dispatch({type: 'ADDQ', id:id}),
        subtractQuantity: (id) => dispatch({type: 'SUBQ', id:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);