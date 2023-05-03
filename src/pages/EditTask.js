import React from 'react';
import { useParams } from 'react-router-dom';
import EditTaskForm from '../components/EditTaskForm';
import Navbar from '../components/Navbar';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import { useGetTaskQuery } from '../features/tasks/tasksApi';
import { useGetTeamMembersQuery } from '../features/teamMembers/teamMembersApi';

const EditTask = () => {
    const { taskId } = useParams();
    const { data: taskToEdit, isSuccess: isTastToEditSuccessfull } = useGetTaskQuery(taskId);
    const { data: projectDataList, isSuccess: isProjectQuerySuccess } = useGetProjectsQuery() || {};
    const { data: teamMemberList, isSuccess: isTeamQuerySuccess } = useGetTeamMembersQuery() || {};

    return (
        <div className="text-[#111827]">
            <Navbar />

            <div className="container relative">
                <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                    <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                        Edit Task
                    </h1>
                    {isProjectQuerySuccess && isTeamQuerySuccess && isTastToEditSuccessfull ?
                        <EditTaskForm
                            projectList={projectDataList}
                            teamList={teamMemberList}
                            taskToEdit={taskToEdit} />
                        : <div>Please wait...</div>
                    }

                </main>
            </div>
        </div>
    );
};

export default EditTask;