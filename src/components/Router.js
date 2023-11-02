import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth"
import Home from "routes/Home"
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = (props) =>
{
	const {isLoggedIn} = props;
	return (
		<Router>
			{isLoggedIn && <Navigation/> }
			<Routes>
				{isLoggedIn ?(
					<Route exact path="/" element={<Home />} />
				) : (
					<Route exact path="/" element={<Auth />} />
				)}
			</Routes>
			<Routes>
				<Route exact path="/Profile" element={<Profile />} />

			</Routes>
		</Router>
	);
};

export default AppRouter;
