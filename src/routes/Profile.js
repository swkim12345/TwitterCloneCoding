import { authService, dbService} from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet"

const Profile = ({refreshUser, userObj}) => {
	const [nweets, setNweets] = useState([]);
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const onLogOutClick = () => authService.signOut();

	const onChange = (event) => {
		const {
			target: {value},
		} = event;
		setNewDisplayName(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await userObj.updateProfile({displayName : newDisplayName});
			refreshUser();
		};
	};

	
	const getMyNweets = async () => {
		const nweet = await dbService
		.collection("nweets")
		.where("creatorId", "==", userObj.uid)
		.orderBy("createdAt", "asc")
		.get();

		const newArray = nweet.docs.map((doc) => ({
			id : doc.id, 
			...doc.data(),
		}));
		setNweets(newArray);
	};

	useEffect(() => {
		getMyNweets();
	}, []);

	return (
		<div className="container">
			<form onSubmit={onSubmit} className="profileForm">
				<input type="text"
				onChange={onChange}
				value={newDisplayName}
				placeholder="Display name" 
				autoFocus
				className="formInput"
				/>
				<input 
				type="submit" 
				value="Update Profile" 
				className="formBtn"
				style={{
					marginTop: 10,
				}}
				/>
			</form>
			<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
				Log Out
			</span>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</div>
	);
};

export default Profile;
