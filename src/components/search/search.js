import React from 'react';
import './search.css';

const Search = ({onSearchHandler, searchText}) =>{
   return(
        <div className="wrap">
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Поиск"
                    value ={searchText}
                    onChange = { (e) => onSearchHandler(e.target.value)}/>
            </div>
        </div>
   ) 
}

export default Search;