import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Shop from './shop';
import Detail from './detail';
import Cart from './cart';
// import './header.css'

const Navbar = ()=>{
    return(
            <div>
                <Switch>
                    <Route path = "/" exact component={Shop} />
                    <Route path = "/cart" exact component={Cart} />
                    <Route path = "/:id" exact component={Detail} />
                    
                </Switch>
            </div>        
    )
}
export default Navbar;