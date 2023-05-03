import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../features/tasks/tasksApi';
import TaskItem from './TaskItem';

const TasksList = () => {
    const { data: taskItemsList, isLoading, isError, error } = useGetTasksQuery() || {};
    const { filterOut } = useSelector(state => state?.projects) || {};
    const { searchString } = useSelector(state => state?.tasks) || {};


    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (!isLoading && isError) {
        content = (
            <p>Error loading data</p>
        );
    } else if (!isLoading && !isError && taskItemsList?.length === 0) {
        content = <p>No tasks found!</p>;
    } else if (!isLoading && !isError && taskItemsList?.length > 0) {
        content = taskItemsList
            .filter(task => task?.taskName?.toLowerCase().includes(searchString.toLowerCase()))
            .filter(task => !filterOut?.includes(task?.project?.projectName))
            .map(taskItem => <TaskItem key={taskItem.id} taskItem={taskItem} />);
    }

    return (
        <div className="lws-task-list">
            {content}
        </div>
    );
};

export default TasksList;