import React from 'react';

import { useSelector } from 'react-redux';

import Unlogged from './unlogged';
import Logged from './logged';


export default function Routes() {
    const token = useSelector(state => state.user.token);
    
    return token ? <Logged /> : <Unlogged />;
}