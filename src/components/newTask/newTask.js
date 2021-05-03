import React, {Component} from 'react';
import './newTask.css';

export default  class NewTask extends Component{
   
  

    render(){

        const{
            onTextAreaChange,
            onInputChange,
            onNewTaskHandler,
            title,
            more 
        } = this.props;
        return(
            <>
            <div className="newTask">
                <input type="text"
                        placeholder="Добавить задачу"
                        onChange = {(e) => onInputChange(e.target.value)}
                        value ={title}
                        />
            </div>
            <div className="taskMore">
                <textarea
                    placeholder="Подробное описание задачи"
                    onChange = {(e) => onTextAreaChange(e.target.value)}
                    value ={more}/>
            </div>
            <div className="btnAdd">
                <button onClick={onNewTaskHandler}>Добавить</button>
            </div>
           
        </>
        )
    }
}

