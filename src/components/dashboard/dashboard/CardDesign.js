import React from 'react'
import PropTypes from 'prop-types'

const CardDesign = ({title,value,logo,color,colorlogo}) => {
    return (
        <div className="py-2 mt-4 px-2">
        <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div style={{fontSize:'1rem'}} className={`font-weight-bold text-secondary text-uppercase mb-1`}>{title}</div>
              <div style={{fontSize:'2rem'}} className="h5 mb-0 font-weight-bold text-gray-800">{value?value:<div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>}</div>
            </div>
            <div className="col-auto">
              <i style={{fontSize:'2.5rem'}} className={`fas fa-${logo} fa-2x text-${colorlogo}`}></i>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

CardDesign.propTypes = {

}

export default CardDesign
