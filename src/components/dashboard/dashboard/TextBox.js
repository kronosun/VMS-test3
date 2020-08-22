import React from 'react'
import PropTypes from 'prop-types'

const TextBox = props => {
    return (
        <div className="py-2 p-3">
                          <div class="card shadow mb-4" style={{height:"350px"}}>
                <div class="card-header py-3" >
                  <h6 class="m-0 font-weight-bold text-primary">Daily Logs</h6>
                </div>
                <div class="card-body">
                  <p>Everything is under control</p>
                  <p class="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.Before working with this theme, you should become familiar.</p>
                </div>
              </div>
        </div>
    )
}

TextBox.propTypes = {

}

export default TextBox
