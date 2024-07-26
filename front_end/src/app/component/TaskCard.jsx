import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, updateTask } from '../service/taskService'
import TaskForm from './TaskForm'

const TaskCard = ({ task }) => {
    const dispatch = useDispatch()
    const {roles, id} = useSelector(state => state.auth)
    const [isEditContext, setEditContext] = useState(false)
    const handleUpdateTask = (isDone) => {
        const formResult = {...task}
        formResult.done = isDone
        formResult.authorId = id
        console.log(formResult)
        dispatch(updateTask({body: formResult}))
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask({id : task.id}))
    }
    const toggleEditContext = () => setEditContext(!isEditContext)

    return (
        <>{isEditContext
        ?<TaskForm isEditContext actions={{toggleEditContext}} task={task}/>
        :<div className="card mx-auto mb-2 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task?.description}</p>
                <div className='d-flex justify-content-between'>
                    {!!roles.find(e => e === "ROLE_ADMIN") && <>
                        <div>
                            <button onClick={toggleEditContext} className='btn btn-outline-primary btn-sm rounded-pill'><i className="bi bi-pencil"></i></button>
                            <button onClick={handleDeleteTask} className='btn btn-outline-danger btn-sm rounded-pill'><i className="bi bi-trash3"></i></button>
                        </div>
                        {task.done
                            ? <a className="btn btn-outline-danger btn-sm rounded-pill"
                                onClick={() => handleUpdateTask(false)}><i className="bi bi-x-lg"></i> A faire</a>
                            : <a className="btn btn-outline-success btn-sm rounded-pill"
                                onClick={() => handleUpdateTask(true)}><i className="bi bi-check2"></i> Fait</a>
                        }
                    </>}
                </div>
            </div>
        </div>
        }</>
    )
}

export default TaskCard