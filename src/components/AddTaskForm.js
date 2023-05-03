import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddTaskMutation } from '../features/tasks/tasksApi';

const AddTaskForm = ({ projectList, teamList }) => {
    const navigate = useNavigate()
    const [addTask, { isLoading, isSuccess: isAddTaskSuccessfull }] = useAddTaskMutation();

    const [newTask, setNewTask] = useState({
        taskName: "",
        teamMember: {},
        project: {},
        deadline: "",
        status: "pending"
    });

    useEffect(() => {
        if (isAddTaskSuccessfull) navigate("/");
    }, [isAddTaskSuccessfull])


    const handleInputChange = (event) => {
        if (event.target.name === "teamMember") {
            setNewTask({ ...newTask, [event.target.name]: teamList.find(x => x.name === event.target.value) });
        } else if (event.target.name === "project") {
            setNewTask({ ...newTask, [event.target.name]: projectList.find(x => x.projectName === event.target.value) });
        } else {
            setNewTask({ ...newTask, [event.target.name]: event.target.value });
        }
    }

    const handleAddTask = (event) => {
        event.preventDefault();
        addTask(newTask);
    }

    return (
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={handleAddTask}>
                <div className="fieldContainer">
                    <label htmlFor="lws-taskName">Task Name</label>
                    <input
                        type="text"
                        name="taskName"
                        id="lws-taskName"
                        required
                        placeholder="Implement RTK Query"
                        value={newTask?.taskName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="fieldContainer">
                    <label>Assign To</label>
                    <select name="teamMember" id="lws-teamMember"
                        required
                        value={newTask?.teamMember?.name}
                        onChange={handleInputChange}
                    >
                        <option value="" hidden defaultValue>Select Job</option>
                        {
                            teamList?.map(teamOption => <option key={teamOption.id} value={teamOption.name}>{teamOption.name}</option>)
                        }

                    </select>
                </div>
                <div className="fieldContainer">
                    <label htmlFor="lws-projectName">Project Name</label>
                    <select id="lws-projectName" name="project" required
                        value={newTask?.project?.projectName}
                        onChange={handleInputChange}>
                        <option value="" hidden defaultValue>Select Project</option>
                        {
                            projectList?.map(projectOption => <option key={projectOption.id} value={projectOption.projectName}>{projectOption.projectName}</option>)
                        }

                    </select>
                </div>

                <div className="fieldContainer">
                    <label htmlFor="lws-deadline">Deadline</label>
                    <input type="date" name="deadline" id="lws-deadline" required
                        value={newTask.deadline}
                        onChange={handleInputChange} />
                </div>

                <div className="text-right">
                    <button type="submit" className="lws-submit" disabled={isLoading}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;