import React, { useState, useEffect } from 'react'
import { Layout } from 'antd';
import { Route } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout;
export default function UserTemplateLogin(props) {
  const [mount,setMount] = useState(false)
  const [{width,height},setSize] = useState({width:Math.round(window.innerWidth),height:Math.round(window.innerHeight)})
  useEffect(() => {
    setMount(true)
    window.onresize = () => {
      setSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
    }
    return () => {
      setMount(false)
    }
  },[])
  let { Component, ...restRoute } = props
  return <Route {...restRoute} render={(propsRoute) => {
    return <>
      <Layout>
        <Sider width={width/2} style={{ backgroundImage: `url(${require("../assets/img/bglogin.jpg").default})`,height:height,backgroundSize:'100%'}} />
        <Layout>
          <Content>
            <Component {...propsRoute} />
          </Content>
        </Layout>
      </Layout>
    </>
  }} />
}


