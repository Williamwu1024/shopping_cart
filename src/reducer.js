const initState = {
    items: [
        {id:1,name:'Apple',title:'Eat one everyday, may keep the doctor away',calories: 90,fiber:'Average',vitamin:'Average', price:12},
        {id:2,name:'Grape',title:'Wine is great. but grapes is even better', calories: 80,fiber:'High',vitamin:'Low', price:11},
        {id:3,name:'Pineapple',title:"Enjoy but don't forget to peer first", calories: 110,fiber:'Low',vitamin:'Average',price:8},
    ],
    addedItems:[],
    total: 0,
    selected: []

}
const Reducer= (state = initState,action)=>{
    switch (action.type) {
        case 'INITIAL':
            return action.payload

        case 'REMOVE':
            let itemToRemove= state.addedItems.filter(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
            
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }

        case 'ADDQ':
            addedItem = state.addedItems.filter(item=> item.id === action.id)[0]
            // console.log(addedItem.quantity)
            addedItem.quantity += 1 
            newTotal = state.total + addedItem.price
            // console.log(newTotal)
            return{
                ...state,
                addedItems: [...state.addedItems],
                total: newTotal,
            }

        case 'SUBQ':
            addedItem = state.addedItems.filter(item=> item.id === action.id)[0] 
            if(addedItem.quantity === 1){
                let new_items = state.addedItems.filter(item=>item.id !== action.id)
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            } else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    addedItems: [...state.addedItems],
                    total: newTotal
                }
            }


        case 'ADD':
            // console.log(action.id)
            let addedItem = state.items.filter(item=> item.id === action.id)[0];
            // console.log(addedItem);
            let existed_item = state.addedItems.filter(item=> action.id === item.id)[0];
            if(existed_item)
            {   
                
                addedItem.quantity += 1; 
                return{
                    ...state,
                    addedItems: [...state.addedItems],
                    total: state.total + addedItem.price 
                    }
            }
            else{
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price 
            
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }

        default:
            return {
                ...state
            }
        
    }
}
export default Reducer;