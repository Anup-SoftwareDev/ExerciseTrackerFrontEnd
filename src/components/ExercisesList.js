import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props=>(
    
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}{console.log(props.exercise._id)}</td>
        <td>{props.exercise.duration}</td>
        {/*<td>{props.exercise.date.substring(0,10)}</td>*/}
        <td>{(new Date(props.exercise.date)).toString().substring(4,15)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link>|<a href = "#" onClick={()=>{props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)


export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.deletExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []};
    }

    componentDidMount(){
        //axios.get('http://localhost:8001/exercises/')
        console.log(this.state)
        axios.get('http://192.168.2.15:8001/exercises/'||'http://localhost:8001/exercises/')
            .then(response=>{
                this.setState({exercises: response.data})
            })
            .catch ((error)=>{
                console.log(error);
            })
    }

    deleteExercise(id){
        console.log('this:',this)
        axios.delete('http://localhost:8001/exercises/'+id)
            .then(res=>console.log(res.data));
       this.setState({
           exercises: (this.exercises.filter(el=>el._id!=id))
            
        })
    }

    exerciseList(){
        //console.log(this.state.exercises[0]?this.state.exercises[0].date.substring(0,10):'')
        let stringDate = this.state.exercises[0]?this.state.exercises[0].date:''
        let dateToLocal = new Date(stringDate.toString())
        return this.state.exercises.map(currentexercise=>{
            return<Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
        })
    }
    
    render(){
      
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className = 'thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>

                </table>
            </div>
        )
    }
}