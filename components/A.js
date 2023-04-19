import React from 'react'
import Link from 'next/link'
const A = ({className, href, text}) => {
  return (
    <Link href={href} className={className}>{text}</Link>
  )
}

export default A