import { authService, dbService} from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet"

const Profile = ({userObj}) => {
	const [nweets, setNweets] = useState([]);
	const onLogOutClick = () => authService.signOut();

	const getMyNweets = async () => {
		const nweet = await dbService
		.collection("nweets")
		.where("creatorId", "==", userObj.uid)
		.orderBy("createdAt", "asc")
		.get();

		console.log(nweet);

		console.log(nweet.docs.map((doc) => doc.data()));

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
		<>
			<div>
				<button onClick={onLogOutClick}>Log Out</button>
			</div>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={true} />
				))}
			</div>
		</>
	);
};

export default Profile;
