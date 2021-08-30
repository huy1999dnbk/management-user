import logo from './logo.svg';
import './App.css';
import UserTemplateLogin from './templates/UserTemplateLogin';
import SignInUser from './page/SignInUser';
import SignUpUser from './page/SignUpUser';
import { Switch, Route } from 'react-router-dom'
import ManagementUser from './page/ManagementUser';
import { ACCESS_TOKEN } from './utils/system';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux'
import Loading from './component/Loading';
import HomeTemplate from './templates/HomeTemplate';
import ProjectManagement from './page/ProjectManagement';
import Nodata from './page/Nodata';
import ModalHOC from './HOC/ModalHOC';
function App() {
  const { userLogin } = useSelector(state => state.UserReducer)
  return (
    <div>
      <Loading />
      <ModalHOC />
      <Switch>
        <UserTemplateLogin exact path='/signin' Component={SignInUser} />
        <UserTemplateLogin exact path='/signup' Component={SignUpUser} />
        <UserTemplateLogin exact path='/' Component={SignInUser} />
        {userLogin.accessToken ? <>
          <HomeTemplate exact path='/projectmanagement' Component={Nodata} />
          <HomeTemplate exact path='/createproject' Component={Nodata} />
          <HomeTemplate exact path='/home' Component={ManagementUser} />
          <HomeTemplate exact path='/cyberboard' Component={Nodata} />
        </> : <Redirect to="/signin" />}
      </Switch>
    </div>
  );
}

export default App;
