import React from 'react';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import Project from './Project';

const ProjectList = () => {
    const { data: projectDataList, isLoading, isError, error } = useGetProjectsQuery() || {};

    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>Error...</p>
        );
    } else if (!isLoading && !isError && projectDataList?.length === 0) {
        content = <p>No projects found!</p>;
    } else if (!isLoading && !isError && projectDataList?.length > 0) {
        content = projectDataList.map(project => <Project key={project.id} project={project} />);
    }

    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">
                {
                    content
                }

            </div>
        </div>
    );
};

export default ProjectList;