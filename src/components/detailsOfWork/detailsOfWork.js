import React from 'react';
import './detailsOfWork.css';

const DetailsOfWork = ({more, uncovered}) =>{
    let classDetails = 'detailsOfWork';
    if(!uncovered){
        classDetails += ' visibleDetails'
    }

    return(
        <div className={classDetails} >
           {more}
        </div>
    )
}
export default DetailsOfWork;