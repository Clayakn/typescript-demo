import * as React from 'react';
import { IoIosAirplane } from 'react-icons/io';
import './App.css';
// import logo from './logo.svg';

// import  Title from "./components/Title";


class App extends React.Component<{}, IState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      currentTask: '',
      tasks: []
    }
  }
 
  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    this.setState({
      currentTask: '',
      tasks: [
        ...this.state.tasks,
      {
        completed: false,
        id: this._timeInMilliseconds(),
        value: this.state.currentTask
      }]
    })
  }

  public changeHandle(e: any){
    this.setState({
      currentTask: e.target.value
    })
  }

  public deleteTask(id: number): void {
    const tasks: ITask[] = this.state.tasks.filter((task: ITask) => task.id !== id)
    this.setState({tasks})
  }
  public toggleDone(index: number): void {
    const task: ITask[] = this.state.tasks.splice(index,1)
    task[0].completed = !task[0].completed;
    const currentTasks: ITask[] = [...this.state.tasks, ...task];
    this.setState({tasks: currentTasks})
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      const deleteTask = () => {this.deleteTask(task.id)}
      const toggleDone = () => {this.toggleDone(index)}
      return(
        <div key={task.id}>
          <span style={{textDecoration: task.completed ? 'line-through' : ''}}>{task.value}</span>
          <button onClick={deleteTask}>Delete</button>
          <button onClick={toggleDone}>{task.completed ? "Undo" : "Complete"}</button>
          
        </div>
      )
    })
  }

  public render(): JSX.Element {
    window.console.log(this.state)
    const handleSubmit = (e: any) => {this.handleSubmit(e)}
    const changeHandle = (e: any) => {this.setState({currentTask: e.target.value})}
    return (
      <div className="App">
        <h1>React Typescript Todo List</h1>
        <IoIosAirplane />
        <form onSubmit={handleSubmit}>
        <input 
        type='text' 
        placeholder='Add a Task' 
        value={this.state.currentTask}
        onChange={changeHandle}
        />
        <button type='submit'>Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }
  private _timeInMilliseconds(): number {
    const date: Date = new Date()
    return date.getTime()
  }
}

interface IState {
  currentTask: string;
  tasks: ITask[];
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}


export default App;
