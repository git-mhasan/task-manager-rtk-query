import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchfilter } from '../features/tasks/tasksSlice';
import logo from '../images/logo.svg';

const Navbar = () => {
    const dispatch = useDispatch();
    const { searchString } = useSelector(state => state?.tasks) || {};


    const handleSearch = (event) => {
        dispatch(searchfilter(event.target.value));
    }

    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <img src={logo} alt='logo' />
                </Link>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                    <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask"
                        value={searchString} onChange={handleSearch} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;