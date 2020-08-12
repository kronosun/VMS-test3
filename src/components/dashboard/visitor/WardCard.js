import React, { Fragment ,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {dummyApi} from '../../../actions/api';
import IndivualCard from './IndivualCard';

const WardCard = props => {
    return (
        <div className="p-4">
        <IndivualCard />

        </div>
    )
}

WardCard.propTypes = {

}

export default WardCard;

// <h1>Hello</h1>
// <h1>{JSON.stringify(data)}</h1>
// <h1>{JSON.stringify(data)}</h1>
// <h1>{JSON.stringify(data)}</h1>