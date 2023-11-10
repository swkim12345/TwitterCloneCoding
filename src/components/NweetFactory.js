import {v4 as uuidv4} from "uuid";
import {dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons"

const NweetFactory = ({userObj}) => {
	const [nweet, setNweet] = useState("");
	const [attachment, setAttachment] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		if (nweet === "")
		{
			return;
		}
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
		if (Boolean(theFile)){
			reader.readAsDataURL(theFile);
		}
	}

	const onClearAttachment = () => setAttachment("");

	return (
		<form onSubmit={onSubmit} className="factoryForm">
			<div className="factoryInput__container">
				<input
				value={nweet}
				onChange={onChange}
				type="text"
				placeholder="What's on your mind?"
				maxLength={120}
				/>
			</div>
			<label htmlFor="attach-file" className="factoryInput__label">
				<span>Add photes</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input 
				id="attach-file"
				type="file" 
				accept="image/*" 
				onChange={onFileChange}
				style={{
					opacity: 0,
				}}
			/>
			<input type="submit" value="Nweet" />
			{attachment && (<div>
				<img 
					src={attachment} 
					alt="TweetImage"
					style={{
						backgroundImage: attachment,
					}}
				/>
				<div className="factoryForm__clear" onClick={onClearAttachment}>
					<span>Remove</span>
					<FontAwesomeIcon icon={faTimes} />
				</div>
			</div>
			)}
		</form>
	);
};

export default NweetFactory;
