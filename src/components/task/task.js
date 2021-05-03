import React, { Component } from 'react';
import './task.css';
import DetailsOfWork from '../detailsOfWork';


export default class Task extends Component {

    state = {
        uncovered: true
    }

    onToogleDetails = () =>{
        this.setState(
            ({uncovered}) =>{
                return {
                    uncovered: !uncovered
                }
            }
        )
    }

    transformTime = (param) =>{
        return param < 10 ? '0' + param : param
     }


    render(){
            const {id,
               completed, 
               title, 
               important, 
               date, 
               more,
               onImportantHandler, 
               onDoneHandler,
               onDeleteTask,
               onEditTask,
          
            } = this.props

            const {uncovered} = this.state;

           const dateFormat = (
                      this.transformTime(new Date(date).getHours()) + ":"+
                      this.transformTime(new Date(date).getMinutes() ) + ":"+
                      this.transformTime(new Date(date).getSeconds()) + " "+
                      this.transformTime(new Date(date).getDate()) + "/"+
                      this.transformTime((new Date(date).getMonth() + 1))  + "/"+
                       new Date(date).getFullYear()
            ) 


            let icons  = (
                <i  className="fa fa-times fa-lg"
                    aria-hidden="true"
                    onClick ={() => onDeleteTask(id)}>
                </i>
            );

            let commitDone = "";
            const classImp = important ? "fa fa-flag-o fa-lg importantItem" : "fa fa-flag-o fa-lg";

            if(!completed){
                icons = (
                    <React.Fragment>
                        <i className="fa fa-pencil fa-lg"
                           aria-hidden="true"
                           onClick = {() => onEditTask(id)}>
                        </i>
                        <i className="fa fa-times fa-lg"
                           aria-hidden="true"
                           onClick ={() => onDeleteTask(id)}>
                        </i>
                        <i className = {classImp}
                           aria-hidden="true" 
                           onClick ={() => onImportantHandler(id)}>
                        </i>
                    </React.Fragment>
                );

                commitDone = (
                    <div className ='done'>
                        <button onClick = {() => onDoneHandler(id)}>Выполнено</button>
                    </div>
                )
            }
           
            const importantClass = important ?  'important': '';

            return(
                <li>
                    <div className="title">
                        <span className={importantClass}> {title} </span>
                        <div className='more' onClick ={ this.onToogleDetails} >Подробнее ...</div>
                        <DetailsOfWork more ={more} uncovered={uncovered}/>
                        {commitDone}
                    </div>
                    
                    <div className="contain">
                        
                        <div className="icon">
                            {icons}
                        </div>
                        <div className='date'>{dateFormat}</div> 
                    </div>
                                    
                    
                </li>
            )    
    }

    
}


