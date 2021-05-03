import React from 'react';
import './tasks.css';
import Filters from '../filters';
import Task from '../task/task';
import EditiorTask from '../editorTask';

const Tasks = (
		{
			done,
			data,
			editor, 
			error,
			onImportantHandler,
			onDoneHandler,
			onDeleteTask,onEditTask,
			editTask,
			onChangeTextInEditor,
			onCommitChangeTask,
			onCancelChangeTask,
			onImportantFilterHandler,
			property,
			onTimeFilterHandler,
			timeFilter,
			importantCompletedFilter,
			importantProcessFilter,
			timeProcessSort,
			timeDoneSort,
			pagination,
			onSetPageHandler,
			pageNum
		}
	) =>{

		let myTasks = [];
		let edit = "";
		let titleSection ="";
		let classTask = "tasks";
		if(done){

			myTasks = data
			.map( (task, index) => <Task completed ={task.completed}
										key ={task.id} 
										id = {task.id}
										 title={task.title} 
										 date ={
											 task.date
											} 
										 more ={task.more}
										 important ={task.important}
										 onDeleteTask = {onDeleteTask}
										
									/>);
			titleSection  = "Выполненные задачи";
			classTask = "completedTasks";								
		} else {

			myTasks = data
			.map( (task, index) => <Task key ={task.id} 
										 id = {task.id}
										 title={task.title} 
										 date ={
											 task.date
											} 
										 more ={task.more}
										 important ={task.important}
										 onImportantHandler={onImportantHandler}
										 onDoneHandler = {onDoneHandler}
										 onDeleteTask = {onDeleteTask}
										 onEditTask = {onEditTask}
										 
									/>);
			edit =(
				<EditiorTask    editor={editor}
								editTask={editTask}
								error ={error}
								onChangeTextInEditor ={onChangeTextInEditor}  
								onCommitChangeTask={onCommitChangeTask}
								onCancelChangeTask ={onCancelChangeTask}
				/>
			)

			titleSection  = "Мои задачи";	
		}

		let statusFilterImportant = importantProcessFilter;
		if(property === 'importantCompleted'){
			statusFilterImportant= importantCompletedFilter;
		}
		let statusFilterSort = timeProcessSort;
		if(timeFilter === 'timeDone'){
			statusFilterSort = timeDoneSort;
		}

		let numPages = [];
		for (let i = 0; i < pagination; i++) {
			numPages.push(i+1);	
		}

		let paginationLinks = numPages.map( num => {
			return (
				<div 
					key ={num}
				 	className ="pagination"
					onClick = {() => onSetPageHandler(pageNum, num)}>{num}</div>
			)
		})

		 
	
    return(
        <div className={classTask}>
			<Filters 
				onImportantFilterHandler ={onImportantFilterHandler}
				property ={property}
				onTimeFilterHandler = {onTimeFilterHandler}
				timeFilter ={timeFilter}
				statusFilterImportant = {statusFilterImportant}
				statusFilterSort = {statusFilterSort}
			/>
			<h1>{titleSection}</h1>
			<ul>
				{myTasks }
			</ul>
			{edit}
			
			<div className ="wrapPagination">
				{paginationLinks}
			</div>
			
			
		</div>
		
    )
}

export default Tasks;