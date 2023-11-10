import {authService, firebaseInstance} from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXTwitter,
	faGoogle,
	faGithub,
} from "@fortawesome/free-brands-svg-icons"

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
		await authService.signInWithPopup(provider);
	}

 	return (
		<div className="authContainer">
			<FontAwesomeIcon
				icon={faXTwitter}
				color={"#FFFFFF"}
				size="3x"
				style={{marginBottom : 30}}
			/>
			<AuthForm/>
			<div className="authBtns">
				<button onClick={onSocialClick} name="Google" className="authBtn">
					Continue with Google <FontAwesomeIcon icon={faGoogle} />
				</button>
				<button onClick={onSocialClick} name="Github" className="authBtn">
					Continue with Github <FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
};

export default Auth;
