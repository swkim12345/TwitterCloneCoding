import {dbService, storageService} from "fbase";
import {useEffect, useState} from "react";
import Nweet from "components/Nweet"
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [attachment, setAttachment] = useState("");

	useEffect(() => {
		dbService.collection("nweets").onSnapshot((snapshot) => {
			const newArray = snapshot.docs.map((document) => ({
				id: document.id,
				...document.data(),
			}));
			setNweets(newArray);
		});
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		let attachmentUrl = ""
		if (attachment !== ""){
			const attachmentRef = storageService
			.ref()
			.child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, "data_url");
			attachmentUrl = await response.ref.getDownloadURL();
		}
		await dbService.collection("nweets").add({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		});
		setNweet("");
		setAttachment(""); //변수 초기화
	};

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: {value},
		} = event;
		setNweet(value);
	};

	const onFileChange = (event) => {
		console.log(event.target.files);
		const {
			target : {files}
		} = event;
		const theFile = files[0];
		console.log(theFile);
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			console.log(finishedEvent);
			const {
				target : {result}, //currentTarget이 NULL임
			} = finishedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	}

	const onClearAttachment = () => setAttachment("");

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
				value={nweet}
				onChange={onChange}
				type="text"
				placeholder="What's on your mind?"
				maxLength={120}
				/>
				<input type="file" accept="image/*" onChange={onFileChange}/>
				<input type="submit" value="Nweet" />
				{attachment && (<div>
					<img src={attachment} width="500px" height="500px" />
					<button onClick={onClearAttachment}>Clear</button>
				</div>
				)}
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</>
	)
}

export default Home;
