import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../service/taskService'
import TaskCard from '../component/TaskCard'
import TaskForm from '../component/TaskForm'

const TaskListView = () => {

    const dispatch = useDispatch()
    const {taskList} = useSelector(state => state.task)
    const {id, roles, isLogged} = useSelector(state => state.auth)
    const [isAddMode, setAddMode] = useState(false)
    const toggleAddMode = () => setAddMode(!isAddMode)

    useEffect(() => {
        console.log('on use effect')
        if (isLogged) dispatch(getAllTasks())
    }, [id])

    return (
        <>
            <h3>Liste des trucs à faire</h3>
            <div className='row gx-2 h-100'>

                <div className="col rounded-1 border border-light-subtle">
                {!!roles.find(e => e === "ROLE_ADMIN") && (isAddMode
                    ? <TaskForm actions={{toggleAddMode}} />
                    : <button className='btn btn-outline-primary w-100 mt-2' onClick={toggleAddMode}>Ajouter une tâche</button>
                )}
                </div>
                <div className="col rounded-1 border border-light-subtle">
                    <h4 className='text-center mb-4'>A faire</h4>
                    <div className='p-2'>
                        {taskList.map(c => !c.done &&
                            <TaskCard task={c} key={c.id} />
                        )}
                    </div>
                </div>
                <div className="col rounded-1 border border-light-subtle">
                    <h4 className='text-center mb-4'>Fait</h4>

                    <div className='p-2'>
                        {taskList.map(c => c.done &&
                            <TaskCard task={c} key={c.id} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskListView