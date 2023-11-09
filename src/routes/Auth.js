import {authService, firebaseInstance} from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
	const onSocialClick = async (event) => {
		const {
			target: {name}
		} = event;
		let provider;
		if (name === "Google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		}
		else if (name === "Github"){
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		const data = await authService.signInWithPopup(provider);
	}

 	return (
		<div>
			<AuthForm/>
			<div>
				<button onClick={onSocialClick} name="Google">Continue with Google</button>
				<button onClick={onSocialClick} name="Github">Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
