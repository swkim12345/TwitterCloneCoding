import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth"
import Home from "routes/Home"
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({refreshUser, isLoggedIn, userObj}) =>
{
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj}/> }
			<Routes>
				<>
				{isLoggedIn ?(
					<>
						<Route exact path="/" element={<Home userObj={userObj}/>} />
						<Route exact path="/Profile" element={<Profile refreshUser={refreshUser} userObj={userObj}/> } />
					</>
				) : (
					<Route path="/" element={<Auth />} />
				)}
				<Route path="*" element={<Navigate replace to="/"/>} />
				</>
			</Routes>
		</Router>
	);
};

export default AppRouter;
