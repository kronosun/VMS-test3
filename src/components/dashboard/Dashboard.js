import React, { Fragment, useEffect ,useState} from 'react';
import PropTypes from 'prop-types'

const Dashboard = props => {
    useEffect(()=>{
        console.log("App !");
    },[]);
    return (
        <div>
            <h1>Admin Dashboard</h1>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard;
