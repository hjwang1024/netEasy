import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../../router';
import { actions } from './store';

const { addAction, downAction } = actions;

function Home(props: any) {
    // console.log('home', props);
    const dispatch = useDispatch();
    const handleAdd = () => {
        dispatch(addAction());
    };
    const handleDown = () => {
        dispatch(downAction(1111));
    };

    useEffect(() => {
        // console.log(addAction());
    });
    return (
        <div className='header'>
            {renderRoutes(props.route.routes || [])}
            <span>I am Home</span>
            {/* <span>{props}</span> */}
            <button onClick={() => handleAdd()} type='submit'>
                +
            </button>

            <button onClick={() => handleDown()} type='submit'>
                -
            </button>
        </div>
    );
}

export default Home;
