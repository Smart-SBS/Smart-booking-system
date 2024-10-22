import React from 'react'
import { Link } from 'react-router-dom'

const CommonFooter = () => {
  return (
    <footer className="px-4">
      <p className="mb-0 text-muted">© 2024 <Link to="https://Pixelwibes.com/" target="_blank" title="pixelwibes">SBS</Link>, All Rights Reserved | Website Developed by Smartscripts Private Limited</p>
    </footer>
  )
}

export default CommonFooter