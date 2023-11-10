import {dbService, storageService} from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
		<div className="nweet">
			{editing ? (
				<>
					<form onSubmit={onSubmit} className="container nweetEdit">
						<input 
						onChange={onChange} 
						value={newNweet} 
						required 
						placeholder="Edit your nweet"
						autoFocus
						className="formInput"
						/>
						<input type="submit" value="Update Nweet" className="formBtn"/>
					</form>
					<button onClick={onEditingClick} className="formBtn cancelBtn">
						Cancel
					</button>
				</>
			) : (
			<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img src={nweetObj.attachmentUrl} width="100px" height="100px" alt="Tweet File" />
					)}
					{isOwner && (
					<div className="nweet__actions">
						<span onClick={onDeleteClick}>
							<FontAwesomeIcon icon={faTrash} />
						</span>
						<span onClick={onEditingClick}>
							<FontAwesomeIcon icon={faPencilAlt} />
						</span>
					</div>
				)}
			</>
		)}
		</div>
	);
};

export default Nweet;
