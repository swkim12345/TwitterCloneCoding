import {dbService, storageService} from "fbase";
import { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const onDeleteClick = async () => {
		const ok = window.confirm("삭제하시겠습니까?");
		if (ok) {
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
			if (nweetObj.attachmentUrl !== "")
				await storageService.refFromURL(nweetObj.attachmentUrl).delete();
		}
	}

	const onChange = (event) => {
		const {
			target : {value},
		} = event;
		setNewNweet(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet});
		setEditing(false);
	}

	const onEditingClick = () => setEditing((prev) => !prev);

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input onChange={onChange} value={newNweet} required />
						<input type="submit" value="Update Nweet" />
					</form>
					<button onClick={onEditingClick}>Cancel</button>
				</>
			) : (
			<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img src={nweetObj.attachmentUrl} width="100px" height="100px" />
					)}
					{isOwner && (
					<>
						<button onClick={onDeleteClick}>Delete Nweet</button>
						<button onClick={onEditingClick}>Edit Nweet</button>
					</>
				)}
			</>
		)}
		</div>
	);
};

export default Nweet;
