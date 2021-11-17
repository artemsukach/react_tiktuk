import React from "react";
import { Link } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import users from './../user-feed.json';
import { BsFillPlayFill } from "react-icons/bs";


function formatCount(count, decimals = 2) {
	const COUNT_ABBRS = ['', 'K', 'M', 'B'];
	const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
	let result = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
	result += `${COUNT_ABBRS[i]}`;
	return result;
}


export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount() {
		fetch(`https://tiktok33.p.rapidapi.com/trending/feed`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "tiktok33.p.rapidapi.com",
				"x-rapidapi-key": "796206ac04msh4aa4dd84d7cbfe5p1815c1jsnb6510601499a"
			}
		})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}
	render() {
		let user = {};
		user = {
			'avatar': users.itemList[0].author.avatarMedium,
			'name': users.itemList[0].author.nickname,
			'nickname': users.itemList[0].author.uniqueId,
			'following': users.itemList[0].authorStats.followingCount,
			'follower': users.itemList[0].authorStats.followerCount,
			'heartCount': users.itemList[0].authorStats.heartCount,
			'bio': users.itemList[0].author.signature,
			'playCount': users.itemList[0].stats.playCount
		}
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div className="container-max my-3">
					<Row className="mb-3">
						<Col xl={3} lg={3} md={3} sm={3} xs={3} className="d-flex justify-content-center align-items-center">
							<Link to="/user" width={100} height={100} className="d-block text-center">
								<Image width={100} src={user.avatar} alt="avatar" roundedCircle />
							</Link>
						</Col>
						<Col xl={9} lg={9} md={9} sm={9} xs={9} className="d-flex flex-column">
							<Stack gap={2} className="name-wrapper">
								<Link to="/user" className="nickname-link text-dark fw-bold fs-3">{user.nickname}</Link>
								<Link to="/user" className="name-link text-dark fs-6">{user.name}</Link>
							</Stack>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex">
							<Stack gap={3} direction="horizontal">
								<p className="m-0 text-muted text-center">
									<span className="fw-bold">{formatCount(user.following)}</span> Following</p>
								<p className="m-0 text-muted text-center">
									<span className="fw-bold">{formatCount(user.follower)}</span> Followers</p>
								<p className="m-0 text-muted text-center">
									<span className="fw-bold">{formatCount(user.heartCount)}</span> Likes</p>
							</Stack>
						</Col>
					</Row>
					<Row className="border-bottom border-light">
						<Col xl={12} lg={12} md={12} sm={12} xs={12}>
							<p>{user.bio}</p>
						</Col>
					</Row>
					<Row className="mt-3">
						{items.map(item => (
							<Col xl={4} lg={4} md={4} sm={4} xs={6} className="px-1 mb-3" key={item.id}>
								<Stack gap={2} direction="horizontal" className="name-wrapper justify-content-center mb-2">
									<BsFillPlayFill />
									<p className="text-center m-0">{formatCount(user.playCount)}</p>
								</Stack>
								<video className="w-100 rounded" controls>
									<source src={item.videoUrl} type="video/mp4" />
								</video>
							</Col>
						))
						}
					</Row>
				</div>
			);
		}
	}
}