import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOutProject } from '../features/projects/projectsSlice';

const Project = ({ project }) => {
    const { projectName, colorClass } = project || {};
    const { filterOut } = useSelector(state => state?.projects) || {};
    const dispatch = useDispatch();
    const handleCheckChange = () => {
        dispatch(filterOutProject(projectName));
    }

    return (
        <div className="checkbox-container">
            <input type="checkbox" className={`${colorClass}`} checked={!filterOut?.includes(projectName)}
                onChange={handleCheckChange} />
            <p className="label">{projectName}</p>
        </div>
    );
};

export default Project;