import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SessionCard = props => {
    return (
        <Fragment>
          <div className="col-xl-2 col-md-6 mb-4">

                <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center p-0">
                    <div className="col mr-2">
                      <div className="text-sm font-weight-bold text-dark text-uppercase mb-1">Session 1</div>
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">08.00 - 11.00</div>
                    </div>
                    <div className="col-auto">
                      <i className="btn fas fa-times fa-2x text-danger-300 p-0" style={{fontSize: "2.5em",color: "red"}}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </Fragment>
    )
}

SessionCard.propTypes = {

}

export default SessionCard
