import React, { Component } from 'react';
import Search from '../search';
import './app.css';
import Tasks from '../tasks';
import CompletedTasks from '../completedTasks';
import NewTask from '../newTask';
import Error from '../error';

export default class App  extends Component {
	
	titleLength = 40;
	moreLength = 100;
	 componentDidMount(){
	
		/* localStorage.clear(); */
		if(localStorage.getItem('works') !== null) {
			
			let works = localStorage.getItem('works');
			this.setState( JSON.parse(works));
		} 
	/* 	console.log(new Date(works.tasks[0].date));
		console.log(this.state.tasks[0].date) */
		
	}

	componentDidUpdate(prevProps, prevState) {

		if(this.myTasks.length === 0 && prevState.numberPage > 1) {
			this.changePage();
		}  
		if(this.completedTasks.length === 0 && prevState.numberPageDone > 1) {
			this.changePageDone();
		}  

		if (this.isDiff(this.state, prevState)) {
		  localStorage.setItem('works', JSON.stringify(this.state));
		}
	  
	  }

	  isDiff = (a,b) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	  }

    state = { 
		tasks:[],
		editorTask:false,
		editTask:{
			title:'',
			more: '',
		},
		newTask:{
			title:'',
			more: '',
		},
		error: '',
		filter: {
			importantProcess: false,
			importantCompleted: false,
			timeProcess: false,
			timeDone: false
		},
		searchText : '',
		numberPage: 1,
		numberPageDone: 1,
		maxId: 100
	 }

	 onToogleImpotant = (id) =>{
		 
		this.setState( ({tasks}) =>{

			return {
				tasks: this.toogleProperty(tasks,id, 'important', false),
				
			}
		})
	 }

	 onDoneHandler = (id) =>{
		this.setState( ({tasks}) =>{
			return {
				tasks: this.toogleProperty(tasks,id, 'completed',true)
			}
		})


	 }
	 
	 onDeleteTask = (id) =>{
		 this.setState(({tasks})=>{
			 const index = tasks.findIndex( element => element.id === id);
			return{
				tasks: [...tasks.slice(0, index), ...tasks.slice(index+1)]
			}  

		});

		

	 }

	 toogleProperty = (array, id, propName, dateChanging) =>{
		
		const index = array.findIndex( element => element.id === id);
		const oldItem = array[index];
		const date = dateChanging ? new Date() : oldItem.date
		const newItem = {...oldItem, [propName]:!oldItem[propName], 'date':date};
		return [...array.slice(0, index), newItem, ...array.slice(index+1)];
	 }


	addTask = () =>{
		 if(
			 this.checkLengthText(this.state.newTask.title, 'Длинный заголовок',this.titleLength) &&
			 this.checkLengthText(this.state.newTask.more, 'Длинное описание',this.moreLength) &&
			 this.checkEmptyText(this.state.newTask.title, 'Пустой заголовок') &&
			 this.checkEmptyText(this.state.newTask.more, 'Пустое поле с описанием') &&
			 !this.state.editorTask

		 ){
			this.setState(
				({tasks, newTask, maxId}) =>{
					const data = {
						...newTask,
						id : maxId++,
						date : +new Date(),
						completed : false,
						important : false,
					}
					
					return {
						tasks: [...tasks, data],
						newTask: {title: "", more: ""},
						error: '',
						maxId : maxId++
					}
				}
			)
		 }

			
	}

	 checkLengthText = (text, error, number) =>{
        if(text.length > number){
            this.setState(
                {error}
            )
            return false
        } 
            return true;            
	}
	

	checkEmptyText = (text, error) =>{
        if(text.length === 0){
            this.setState(
                {error}
            )
            return false
        } 
            return true;            
    }



	 onInputChange = (text) =>{
        this.setState(
			({newTask}) =>{
				return{
					newTask : {...newTask, title:text}
				}
			}
        )
    }

    onTextAreaChange = (text) =>{
		this.setState(
			({newTask}) =>{
				return{
					newTask : {...newTask, more:text}
				}
			}
        )
    }



	 onEditTask = (id) => {
	
		this.setState(
			({tasks}) =>{
				const index  = tasks.findIndex( task => task.id === id);
				return{
					editorTask:true,
					editTask: tasks[index]
				}
			}
			 
		)
		 
	 }

	 onChangeTextInEditor = (id, text, property) =>{
	   this.setState(
		   ({tasks, editTask}) =>{
			const index  = tasks.findIndex( task => task.id === id);
			const changedItem = {...tasks[index], ...editTask};
			changedItem[property] = text;
			return{
				editTask : changedItem
			
			}
	   })
	}



	onCancelChangeTask = () =>{
		this.setState({editorTask: false}) 
	}


	onCommitChangeTask = (id) =>{
		if(
			this.checkLengthText(this.state.editTask.title, 'Длинный заголовок',this.titleLength) &&
			this.checkLengthText(this.state.editTask.more, 'Длинное описание',this.moreLength) &&
			this.checkEmptyText(this.state.editTask.title, 'Пустой заголовок') &&
			this.checkEmptyText(this.state.editTask.more, 'Пустое поле с описанием') 
		){
			this.setState(
				({tasks, editTask}) =>{
				  let index  = tasks.findIndex( task => task.id === id); 
				 return{
					 tasks : [...tasks.slice(0, index), editTask, ...tasks.slice(index+1)],
					 editorTask : false,
					 error: ''
				 }
			}) 
		} 

	}


	onImportantFilterHandler = (property) =>{
		this.setState(
			({filter,numberPage, numberPageDone}) =>{
			let page = numberPage === 0 ? 1 : numberPage ;
			let pageDone = numberPageDone === 0 ? 1 : numberPageDone ;
					return{
						filter: {...filter, [property]: !filter[property]},
						numberPage: page,
						numberPageDone: pageDone
					}		
				}
			)
	}

	onTimeFilterHandler = (property) =>{
		
		this.setState(
			({filter}) =>{
					return{
						filter: {...filter, [property]: !filter[property]}
					}		
				}
			)
	}

	onSearchHandler = (searchText) =>{
		this.setState ({searchText});
		
	}

	onSetPageHandler = (property, numberPage) => {
		
		this.setState(
				{
					[property]: numberPage
				}
			);
	
	}

	changePage = () =>{
		this.setState(({numberPage}) =>{
			
			return {
				numberPage: --numberPage
			}
		})
	}

	changePageDone = () =>{
		this.setState(({numberPageDone}) =>{
			return {
				numberPageDone: --numberPageDone
			}
		})
	}

	myTasks = [];
	completedTasks =[];

	


	
    render() { 





		if(this.state.filter.importantProcess === false ){
			this.myTasks = this.state.tasks.filter(task => task.completed  === false)
		}  
		if(this.state.filter.importantCompleted  === false  ){
			this.completedTasks = this.state.tasks.filter(task => task.completed  === true)
		}  

 		if(this.state.filter.importantProcess === true ){
			this.myTasks = this.state.tasks.filter(task => task.important === true && task.completed  === false) 
		}  
		if(this.state.filter.importantCompleted === true  ){
			this.completedTasks = this.state.tasks.filter(task => task.important === true && task.completed === true)
		}

		if(this.state.filter.timeProcess === true){
			this.myTasks.sort( (item1, item2) => +new Date(item2.date) - +new Date(item1.date)); 
			
		}

		if(this.state.filter.timeDone === true){
			this.completedTasks.sort( (item1, item2) => +new Date(item2.date) - +new Date(item1.date)) ;
		}

		if(this.state.searchText !== '') {
			this.myTasks = this.myTasks.filter (
					task => task.completed === false &&
					task.title.toLowerCase().includes(this.state.searchText.toLowerCase())
				);

				this.completedTasks = this.completedTasks.filter (
					task => task.completed === true &&
					task.title.toLowerCase().includes(this.state.searchText.toLowerCase())
				); 
						 
		}

		//-----------------
	
		
		let pagination = this.myTasks.length/4;
		let numbers = 0;
		if(pagination <= 1) {
		} else{
			numbers = Math.ceil(pagination)
		}

		
		this.myTasks = this.myTasks.slice( 4*(this.state.numberPage-1) , 4*this.state.numberPage);


		//=============

		//-----------------
		let paginationDone = this.completedTasks.length/4;
		let numbersDone = 0;
		if(paginationDone <= 1) {
		} else{
			numbersDone = Math.ceil(paginationDone)
		}

		
		this.completedTasks = this.completedTasks.slice( 4*(this.state.numberPageDone-1) , 4*this.state.numberPageDone) 
		//=============
		
        return ( 
	<React.Fragment>
		<Search 
			onSearchHandler = {this.onSearchHandler}
			searchText ={this.state.searchText}/>
		<div className="wrap wrapTask">
			
			<Tasks done ={false}
				   data = {this.myTasks}
				   editor = {this.state.editorTask}
				   editTask = {this.state.editTask}
				   error ={this.state.error}
				   onImportantHandler = {this.onToogleImpotant}
				   onDoneHandler = {this.onDoneHandler}
				   onDeleteTask = {this.onDeleteTask}
				   onEditTask = {this.onEditTask}
				   onChangeTextInEditor ={this.onChangeTextInEditor}
				   onCommitChangeTask = {this.onCommitChangeTask}
				   onCancelChangeTask = {this.onCancelChangeTask}
				   onImportantFilterHandler = {this.onImportantFilterHandler}
				   property = 'importantProcess'
				   onTimeFilterHandler = {this.onTimeFilterHandler}
				   timeFilter = 'timeProcess'
				   importantProcessFilter ={this.state.filter.importantProcess}
				   timeProcessSort = {this.state.filter.timeProcess}
				   pagination ={numbers}
				   pageNum = 'numberPage'
				   onSetPageHandler ={this.onSetPageHandler}
			/>

			<Tasks done ={true}
				   data = {this.completedTasks }
				   onDeleteTask = {this.onDeleteTask}
				   onImportantFilterHandler = {this.onImportantFilterHandler}
				   property = 'importantCompleted'
				   onTimeFilterHandler = {this.onTimeFilterHandler}
				   timeFilter = 'timeDone'
				   importantCompletedFilter ={this.state.filter.importantCompleted}
				   timeDoneSort = {this.state.filter.timeDone}
				   pagination ={numbersDone}
				   pageNum ='numberPageDone'
				   onSetPageHandler ={this.onSetPageHandler}
				   
			/>
			
	
		</div>
		<div className="wrap new">
			<NewTask onNewTaskHandler = {this.addTask}
					 onInputChange ={this.onInputChange}
					 onTextAreaChange = {this.onTextAreaChange}
					 title ={this.state.newTask.title}
					 more ={this.state.newTask.more }/>
		</div>
		{this.state.error !== '' && !this.state.editorTask  ? <Error error={this.state.error}/> : ''}
	</React.Fragment>
		);
         
    }
}

 