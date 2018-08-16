import * as React from 'react';
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
 
  public handleSubmit(e: any){
    e.preventDefault();
    this.setState({
      currentTask: '',
      tasks: [
        ...this.state.tasks,
        this.state.currentTask
      ]
    })
  }

  public changeHandle(e: any){
    this.setState({
      currentTask: e.target.value
    })
  }

  public renderTasks(){
    return this.state.tasks.map((task: string, index: number) => {
      return(
        <div key={index}>
          {task}
        </div>
      )
    })
  }

  public render() {
    const handleSubmit = (e: any) => {this.handleSubmit(e)}
    const changeHandle = (e: any) => {this.setState({currentTask: e.target.value})}
    return (
      <div className="App">
        <h1>React Typescript Todo List</h1>
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
}

interface IState {
  currentTask: string;
  tasks: string[];
}

export default App;
