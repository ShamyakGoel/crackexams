import React from 'react'
import Link from 'next/link'
const A = ({className, href, text}) => {
  return (
    <Link href={href}><a className={className}>{text}</a></Link>
  )
}

export default A