import React from 'react';
import './completedTasks.css';
import Task from '../task';


const CompletedTasks = ({data}) =>{
    const myTasks = data
                        .filter( task => task.completed === true)
                        .map( (task,index) => <Task 
                                        key={index}
                                        title={task.title} 
                                        date ={task.date.year} 
                                        more ={task.more}
                                        completed={task.completed}
                                        />
                            );
    return(
        <div className="completedTasks">
            <div className="filter">
                <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                
                <i className="fa fa-flag-o fa-lg" aria-hidden="true"></i>
            </div>
            <h1>Выполненные задачи</h1>
            <ul>
              {myTasks}
            </ul>
        </div>
    )
}

export default CompletedTasks;