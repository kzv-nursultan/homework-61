import React from 'react';
import './CountryName.css';

const CountryNames = props => {

    return(
        <li onClick={()=>props.clicked(props.code)}>
            {props.name}
        </li>
    );
};

export default CountryNames;
