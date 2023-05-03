import React from 'react';
import AddTaskForm from '../components/AddTaskForm';
import Navbar from '../components/Navbar';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import { useGetTeamMembersQuery } from '../features/teamMembers/teamMembersApi';

const AddTask = () => {
    const { data: projectDataList, isSuccess: isProjectQuerySuccess } = useGetProjectsQuery() || {};
    const { data: teamMemberList, isSuccess: isTeamQuerySuccess } = useGetTeamMembersQuery() || {};

    return (
        <div className="text-[#111827]">
            <Navbar />

            <div className="container relative">
                <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                    <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                        Create Task for Your Team
                    </h1>

                    {isProjectQuerySuccess && isTeamQuerySuccess ?
                        <AddTaskForm
                            projectList={projectDataList}
                            teamList={teamMemberList} />
                        : <div>Please wait...</div>
                    }

                </main>
            </div>
        </div>
    );
};

export default AddTask;