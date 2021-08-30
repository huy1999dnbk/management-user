import React from 'react'
import { Empty } from 'antd';
export default function Nodata() {
  return (
    <div style={{height:'100vh',display:'flex', justifyContent:'center',alignItems:'center'}} className="container-fluid">
      <Empty />
    </div>
  )
}

