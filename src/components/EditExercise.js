import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";



export default function EditExercise(props){
    let exerciseId = useParams()

    console.log(exerciseId.id)
    
    const initialState = {
            username: "",
            description: '',
            duration: 0,
            date: new Date(),
            users: []
    }
    const [exercise, setExercise] = useState(initialState)
    const [user, setUser] = useState();
    console.log('Before UseEffect', exercise )
 
    useEffect(()=>{
        axios.get('http://192.168.2.15:8001/users/'||'http://localhost:8001/users/')
        .then(response => {
                setExercise(exercise=>({...exercise,
                    'users': response.data.map(user=>user.username)
                }))
        })
        //axios.get('http://localhost:8001/exercises/'+`${'6431e80d44a9466d9e7ef92e'}`)
        //axios.get('http://192.168.2.15:8001/exercises/'+`${exerciseId.id}`||'http://localhost:8001/exercises/'+`${exerciseId.id}`)
        axios.get(`http://192.168.2.15:8001/exercises/${exerciseId.id}`||`http://localhost:8001/exercises/${exerciseId.id}`)
                .then(response => response.data)
                .then(exercise =>  setUser(exercise.username))                         
        
        
        axios.get(`http://192.168.2.15:8001/exercises/${exerciseId.id}`||`http://localhost:8001/exercises/${exerciseId.id}`)
                .then(response => setExercise(exercise => ({...exercise, 
                    'description': response.data.description,
                    'username': response.data.username,
                    'duration': response.data.duration,
                    'date': new Date(response.data.date)}
                    ))
                )

        },
        // eslint-disable-next-line
        []);

        const handleChangeUsername = (e)=>{
            setUser(e.target.value)
            setExercise(exercise => ({...exercise, 
                [e.target.name]: e.target.value
                }
                ))
        }
        const handleChange = (e)=>{
            console.log(e)
            setExercise(exercise => ({...exercise, 
                [e.target.name]: e.target.value
                }
                ))
        }

        const onChangeDate = (date)=>{
            setExercise(exercise => ({...exercise, 
                'date': new Date(date)
                }
                ));
        }

        const onSubmit = (e)=>{
            e.preventDefault();
            console.log(exercise);
    
            //axios.post('http://localhost:8001/exercises/update/'+this.props.match.params.id, exercise)
            axios.post((`http://192.168.2.15:8001/exercises/update/${exerciseId.id}`)||(`http://localhost:8001/exercises/update/${exerciseId.id}`), exercise)
            .then(res=> console.log(res.data));
    
         window.location = '/';
            
        }

//console.log(exercise, user)
        return(
            <div>
                {/*console.log("In return:",exercise, user)*/}
                <h3 style ={{marginTop: '1em'}}>Edit Exercise Log</h3>
                <form onSubmit={onSubmit}>
                        <div className= "form-group" style ={{display:'flex', flexDirection: 'column'}}>
                            <label>Username:</label>
                            <select
                            required
                            name = 'username'
                            className="form-control"
                            value = {user}
                            onChange={handleChangeUsername}
                            >
                                    {exercise.users.map((user)=>{

                                            return<option key ={user} value={user}>{user}</option>
                                        
                                        })}
                            </select>
                        </div>
                        <div className= "form-group" style ={{display:'flex', flexDirection: 'column'}}>
                            <label>Description:</label>
                            <input name='description' value={exercise.description} onChange={handleChange} ></input>
                        </div>
                        <div className= "form-group" style ={{display:'flex', flexDirection: 'column'}}>
                            <label>Duration(in minutes):</label>
                            <input name='duration' value={exercise.duration} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                                <label>Date:</label>
                                <div>
                                    <DatePicker
                                     selected = {exercise.date}
                                     onChange = {onChangeDate}
                                    />
                                </div>
                        </div>
                        <div className = "form-group" style ={{marginTop: '1em'}}>
                                
                                <input 
                                    type ="submit"
                                    value="Edit Exercise Log"
                                    className= "btn btn-primary"
                                />
                        </div>
                </form>
            </div>
        )
    
}