import React from 'react'
import { Route } from 'react-router-dom'
import Menu from '../component/Menu'
export default function HomeTemplate(props) {
  let { Component, ...restRoute } = props
  return <Route {...restRoute} render={(propsRoute) => {
    return <>
      <div style={{ height: '100vh', display: 'flex' }}>
     
          <Menu />
     
        <Component {...propsRoute} />
      </div>
    </>
  }} >

  </Route>
}
