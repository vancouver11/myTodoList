import React from 'react';
import './editorTask.css';
import Error from '../error';



/* export default class EditorTask extends Component {


    render() { 
        const {
            editor, 
            editTask, 
            onChangeTextInEditor,
            onCommitChangeTask,
            onCancelChangeTask
        } = this.props

        let classEditor = "bgEdit";
        classEditor = editor ? classEditor + " visible": classEditor;

        return (  
            <div className={classEditor}>
            <div className="editTask">
                <h3>Редактировать задачу</h3>
                <input type='text'
                       value= {editTask.title || ''}
                       onChange={(event) => onChangeTextInEditor(editTask.id, event.target.value, 'title' )}
                />
                <textarea 
                          value= {editTask.more || ''}
                          onChange ={(event)=> onChangeTextInEditor(editTask.id, event.target.value, 'more')} />
                <button id="confirm"
                        onClick ={() => onCommitChangeTask(editTask.id)}
                >Подтвердить</button>
                <button id ="cancel"
                        onClick = {onCancelChangeTask}
                >Отменить</button>
            </div>
        </div>
        );
    }
} */
 


const EditorTask = ({editor, editTask, error, onChangeTextInEditor,onCommitChangeTask,onCancelChangeTask}) =>{
    let classEditor = "bgEdit";
    classEditor = editor ? classEditor + " visible": classEditor;
    return(
        <div className={classEditor}>
            <div className="editTask">
                <h3>Редактировать задачу</h3>
                <input type='text'
                       value= {editTask.title}
                       onChange={(event) => onChangeTextInEditor(editTask.id, event.target.value, 'title' )}
                />
                <textarea 
                          value= {editTask.more}
                          onChange ={(event)=> onChangeTextInEditor(editTask.id, event.target.value, 'more')} />
                <button id="confirm"
                        onClick ={() => onCommitChangeTask(editTask.id)}
                >Подтвердить</button>
                <button id ="cancel"
                        onClick = {onCancelChangeTask}
                >Отменить</button>
                {error !=='' && editor ? <Error error ={error}/> : ''}
            </div>
            
        </div>
    )
}

export default EditorTask; 