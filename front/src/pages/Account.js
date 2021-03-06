import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ChangeProfil from '../components/changeProfil';
import Posts from '../components/Posts';

const Account = () => {

	useEffect(() => {
		getUser();
		//getPostsFromUser();
	});

	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [imageProfile, setImageProfile] = useState();
	const [admin, setAdmin] = useState(0);
	const [post, setPost] = useState([]);
	const [profilModal, setProfilModal] = useState(false);
	const [adminId, setAdminId] = useState();
	let { id } = useParams();
	const userId = JSON.parse(localStorage.userId);
	const token = JSON.parse(localStorage.token);
	const navigate = useNavigate()

	const handleProfil = (e) => {
		setProfilModal(true)
	}

	const getUser = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if (res.data.lastName)
				setLastName(res.data.lastName);
			if (res.data.firstName)
				setFirstName(res.data.firstName);
			if (res.data.email)
				setEmail(res.data.email);

			setImageProfile(res.data.imageProfile)
			getAdmin();

			if (res.data.error) {
				console.log(res.data.error)
			}
		})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAdmin = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			setAdmin(res.data.admin);
			setAdminId(res.data.UID)
			

			if (res.data.error) {
				console.log(res.data.error)
			}
		})
			.catch((err) => {
				console.log(err);
			});

	};

	const deleteProfile = () => {
		
		if (window.confirm("atention cette action est ireversible")) {
			axios({
				method: "DELETE",
				url: `${process.env.REACT_APP_API_URL}api/auth/${id}`,

				headers: {
					authorization: `Bearer ${token}`
				}
			}).then((res) => {
				if (admin === 1)
					navigate("/home")
				else
				navigate("/")
			})
				.catch((err) => {
					console.log(err);
				});
		}
		else {
			return;
		}
	}

	const getPostsFromUser = () => {
		axios.get(`${process.env.REACT_APP_API_URL}api/post/user-posts/${id}`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if (res.data.error) {
				console.log(res.data.error)

			}
			else {
				setPost(res.data)
			}
		})
	}

	return (
		<section>
			<div className='account-container'>
				<div className='image-container'>
					<img src={imageProfile} id="image-profile-account" alt='profile' ></img>
				</div>

				{userId === id || admin === 1 ? (
					<div className='user-prentation'>
						<p>nom: {lastName}</p>
						<p> Prenom: {firstName}</p>
						<p>Contact : {email}</p>
						<li onClick={handleProfil} id="show-profil" className="active-btn">Modifier</li>

						{profilModal && <ChangeProfil userId={userId}
							admin={admin}
						/>}

						{(userId === id && admin !== 1) ||  (admin === 1 && id !== adminId)  ? (
							<li onClick={deleteProfile} id="delete_profile" className='active-btn'>Supprimer ce profile</li>
						)
							: ("")
						} 
						<br />
					</div>
				) : (
					<div className='user-prentation'>
						<p> nom: {lastName}</p>
						<p> Prenom: {firstName}</p>
						<p>Contact: {email}</p>
					</div>

				)}
			</div>

			<li onClick={getPostsFromUser} id="show-post" className='active-btn'> Afficher les posts</li>
			<div className='post-container' >
				{post.map(post => (
					<Posts
						key={post.post_id}
						posterName={post.firstName}
						message={post.message}
						date={post.dateCreation}
						postId={post.post_id}
						postUserId={post.post_user_id}
						like={post.total_like}
						imageProfile={post.post_imageurl}
						imagePost={post.imageurl}
						admin={admin}
						getAllPosts={getPostsFromUser}
					/>
				))}
			</div>
		</section>
	)
}

export default Account;

