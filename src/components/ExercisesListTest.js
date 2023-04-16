import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExercisesListTest(props){

const [exercises, setExercises] = useState([])

const Exercise = (props)=>(
    
        <tr>
            <td>{props.exercise.username}{console.log(props.exercise._id)}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{(new Date(props.exercise.date)).toString().substring(4,15)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link>|<a href = "/" onClick={()=>{deleteExercise(props.exercise._id)}}>delete</a>
            </td>
        </tr>
    )

useEffect(()=>{
    axios.get('http://192.168.2.15:8001/exercises/'||'http://localhost:8001/exercises/')
        .then((response)=>{
            setExercises(response.data)
            
        })
},[])

const   exerciseList =()=>{
           return (exercises.length>0?exercises.map(exercise=>{return(<Exercise exercise={exercise}/>)}):"")
                
    }

    const deleteExercise=(id)=>{
       
        axios.delete('http://192.168.2.15:8001/exercises/'+id||'http://localhost:8001/exercises/'+id)
            .then(res=>console.log(res.data));
        console.log(exercises.filter(el=>el._id!==id))
      setExercises(exercises.filter(el=>el._id!==id))
    }

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
                            {exerciseList()}
                    </tbody>

                </table>
            </div>
)

}