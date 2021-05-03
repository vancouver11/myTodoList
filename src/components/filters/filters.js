import React from 'react';
import './filters.css';

const Filters = ({onImportantFilterHandler, property,onTimeFilterHandler, timeFilter, statusFilterImportant,statusFilterSort}) =>{
    const FilterImportantClass = statusFilterImportant ? "fa fa-flag-o fa-lg importantItem": "fa fa-flag-o fa-lg";
    const FilterSortClass = statusFilterSort ? "fa fa-clock-o fa-lg importantItem": "fa fa-clock-o fa-lg";
    const  arrowTime = statusFilterSort ?<>&uarr;</> : <>&darr;</>
    return(
    <div className="filter">
        <i className = {FilterSortClass}
            aria-hidden="true"
            onClick = {() => onTimeFilterHandler(timeFilter)}>{arrowTime}
        </i> 
        <i className = {FilterImportantClass}
            aria-hidden="true" 
            onClick ={() => onImportantFilterHandler(property)}>
        </i>
    </div>
    )
}

export default Filters;