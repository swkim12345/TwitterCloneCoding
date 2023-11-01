import {authService, firebaseInstance} from "fbase";
import {useState} from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("")

	const toggleAccount = () => setNewAccount((prev) => !prev);

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
		console.log(data);
	}

	const onChange = (event) => {
		const {
			target: { name, value},
		} = event;
		if (name === "email") {
			setEmail(value);
		}
		else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let data;
			if (newAccount) {
				data = await authService.createUserWithEmailAndPassword(email, password);
			}
			else {
				data = await authService.createUserWithEmailAndPassword(email, password);
			}
			console.log(data);
		}
		catch(e) {
			setError(e.message);
		}
	};

 	return (
		<div>
			<form onSubmit={onSubmit}>
				<input 
				name="email"
				type="email"
				placeholder="Email" 
				required
				value={email}
				onChange={onChange} 
				/>
				<input 
				name="password"
				type="password"
				placeholder="Password"
				required
				value={password}
				onChange={onChange}
				/>
				<input type="submit" value={newAccount ? "Create Account" : "Log In"} />
				{error}
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? "Sign In" : "Create Account"}
			</span>
			<div>
				<button onClick={onSocialClick} name="Google">Continue with Google</button>
				<button onClick={onSocialClick} name="Github">Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
