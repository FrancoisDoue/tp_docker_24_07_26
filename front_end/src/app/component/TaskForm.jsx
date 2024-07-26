import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../shared/form/Input'
import { postTask, updateTask } from '../service/taskService'

const TaskForm = ({actions, isEditContext, task}) => {
    const {id} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const schemaRef = {
        title: useRef(),
        description: useRef(),
    }

    const handleTaskSubmit = (e) => {
        e.preventDefault()
        const formResult = {
            ...isEditContext && {id: task.id, done: task.done},
            title: schemaRef.title.current.value,
            description: schemaRef.description.current.value,
            authorId: id,
        }
        console.log(formResult)
        if (!isEditContext) {
            dispatch(postTask({body: formResult}))
            actions.toggleAddMode()
        } else {
            dispatch(updateTask({body: formResult}))
            actions.toggleEditContext()
        }
    }

    return (
        <form className="card mx-auto mb-2 shadow-sm w-100 mt-4" onSubmit={handleTaskSubmit}>
            <div className='card-body'>
                {!isEditContext && <h5 className='card-title'>Ajouter une tâche:</h5>}
                <Input name={"title"} givenRef={schemaRef.title} label={"Titre"} value={task?.title || ""} isRequired />
                <Input name={"description"} givenRef={schemaRef.description} label={"Description"} value={task?.description || ""} isRequired />
                {!isEditContext
                    ? <button className='btn btn-outline-primary w-100'> Ajouter</button>
                    : <div className='d-flex justify-content-between'>
                        <a onClick={() => actions.toggleEditContext()} className='btn btn-outline-danger btn-sm'>Annuler</a>
                        <button className='btn btn-outline-primary btn-sm'>Modifier</button>
                    </div>
                }
            </div>
        </form>
    )
}

export default TaskForm