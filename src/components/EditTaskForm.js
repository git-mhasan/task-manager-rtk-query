import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditTaskMutation } from '../features/tasks/tasksApi';

const EditTaskForm = ({ projectList, teamList, taskToEdit }) => {
    const navigate = useNavigate();

    const [editTask, { isLoading, isSuccess: isEditTaskSuccessfull }] = useEditTaskMutation();
    const [editedTask, setEditedTask] = useState({
        taskName: taskToEdit?.taskName,
        teamMember: taskToEdit?.teamMember,
        project: taskToEdit?.project,
        deadline: taskToEdit?.deadline,
        status: taskToEdit?.status
    });

    useEffect(() => {
        if (isEditTaskSuccessfull) navigate("/");
    }, [isEditTaskSuccessfull])

    const handleInputChange = (event) => {
        if (event.target.name === "teamMember") {
            setEditedTask({ ...editedTask, [event.target.name]: teamList.find(x => x.name === event.target.value) });
        } else if (event.target.name === "project") {
            setEditedTask({ ...editedTask, [event.target.name]: projectList.find(x => x.projectName === event.target.value) });
        } else {
            setEditedTask({ ...editedTask, [event.target.name]: event.target.value });
        }
    }

    const handleEditTask = (event) => {
        console.log(editedTask);
        event.preventDefault();
        editTask({ id: taskToEdit.id, data: editedTask });
    }

    return (
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={handleEditTask}>
                <div className="fieldContainer">
                    <label htmlFor="lws-taskName">Task Name</label>
                    <input
                        type="text"
                        name="taskName"
                        id="lws-taskName"
                        required
                        placeholder="Implement RTK Query"
                        value={editedTask?.taskName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="fieldContainer">
                    <label>Assign To</label>
                    <select name="teamMember" id="lws-teamMember"
                        required
                        value={editedTask?.teamMember?.name}
                        onChange={handleInputChange}
                    >
                        {
                            teamList?.map(teamOption => <option key={teamOption.id} value={teamOption.name}>{teamOption.name}</option>)
                        }

                    </select>
                </div>
                <div className="fieldContainer">
                    <label htmlFor="lws-projectName">Project Name</label>
                    <select id="lws-projectName" name="project" required
                        value={editedTask?.project?.projectName}
                        onChange={handleInputChange}>
                        {
                            projectList?.map(projectOption => <option key={projectOption.id} value={projectOption.projectName}>{projectOption.projectName}</option>)
                        }
                    </select>
                </div>

                <div className="fieldContainer">
                    <label htmlFor="lws-deadline">Deadline</label>
                    <input type="date" name="deadline" id="lws-deadline"
                        required
                        value={editedTask?.deadline}
                        onChange={handleInputChange} />
                </div>

                <div className="text-right">
                    <button type="submit" className="lws-submit" disabled={isLoading}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskForm;