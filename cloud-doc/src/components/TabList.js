import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  return (
    <ul className="nav nav-pills">
      {
        files.map(file => {
          return (
            <li
              className="nav-item"
              key={file.id}
            >
              <a 
                className="nav-link" 
                href="#"
              >
                {file.title}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unsaveIds: []
}

export default TabList