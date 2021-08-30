import React from 'react'
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
export default function Loading() {
  const {isLoading} = useSelector(state => state.LoadingReducer)
  if(isLoading){
    return (
      <div style={{backgroundColor:'rgba(255,255,255,0.8)',position:'fixed',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,width:'100%',height:'100%'}}>
          <Spin size="large" />
      </div>
    )
  }else{
    return ''
  }
}
