import React from 'react';
import { useGetTeamMembersQuery } from '../features/teamMembers/teamMembersApi';
import TeamMember from './TeamMember';

const TeamMemberList = () => {

    const { data: teamMemberList, isLoading, isError, error } = useGetTeamMembersQuery() || {};

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>Error loading data</p>
        );
    } else if (!isLoading && !isError && teamMemberList?.length === 0) {
        content = <p>No team member found!</p>;
    } else if (!isLoading && !isError && teamMemberList?.length > 0) {
        content = teamMemberList.map(teamMember => <TeamMember key={teamMember.id} teamMember={teamMember} />);
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            <div className="mt-3 space-y-4">

                {content}

            </div>
        </div>
    );
};

export default TeamMemberList;