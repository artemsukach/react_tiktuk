import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";


function formatCount(count, decimals = 2) {
	const COUNT_ABBRS = ['', 'K', 'M', 'B'];
	const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
	let result = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
	result += `${COUNT_ABBRS[i]}`;
	return result;
}

// function isVisible(elem) {

// 	let coords = elem.getBoundingClientRect();

// 	let windowHeight = document.documentElement.clientHeight;

// 	let topVisible = coords.top > 0 && coords.top < windowHeight;

// 	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
// 	return topVisible || bottomVisible;
// }

// function showVisible() {
// 	for (let video of document.querySelectorAll('video')) {
// 		if (isVisible(video)) {
// 			video.play();
// 		} else {
// 			video.pause();
// 		}
// 	}
// }

// showVisible();
// window.onscroll = showVisible();


export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount() {
		fetch("https://tiktok33.p.rapidapi.com/trending/feed", {
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
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ListGroup variant="flush">
					{items.map(item => (
						<ListGroup.Item key={item.id} >
							<Row className="justify-content-center mb-3">
								<Col xl={4} lg={4} md={2} sm={2} xs={3} className="d-flex align-items-center justify-content-end">
									{/* <a href="https://www.google.com" width={50}><Image alt="avatar" src={item.authorMeta.avatar} width={50} height={50} roundedCircle /></a> */}
									<Link to={`/user/${item.authorMeta.name}`} width={50}><Image alt="avatar" src={item.authorMeta.avatar} width={50} height={50} roundedCircle /></Link>
								</Col>
								<Col xl={8} lg={8} md={10} sm={10} xs={9}>
									<Stack gap={2} className="name-wrapper">
										{/* <a href="https://www.google.com" className="nickname-link text-dark fw-bold">{item.authorMeta.name}</a>
										<a href="https://www.google.com" className="name-link text-dark ">{item.authorMeta.nickName}</a> */}
										<Link to={`/user/${item.authorMeta.name}`} className="nickname-link text-dark fw-bold">{item.authorMeta.name}</Link>
										<Link to={`/user/${item.authorMeta.name}`} className="name-link text-dark">{item.authorMeta.nickName}</Link>
									</Stack>
								</Col>
							</Row>
							<Row>
								<Col xl={{ span: 8, offset: 4 }} lg={{ span: 8, offset: 4 }} md={{ span: 10, offset: 2 }} sm={{ span: 10, offset: 2 }} xs={12}>
									<p dangerouslySetInnerHTML={{ __html: item.text.replace(/#(\w+)/g, '<a class="hashtag text-dark" href="https://www.google.com">#$1</a>') }}></p>
								</Col>
							</Row>
							<Row className="justify-content-end align-items-end">
								<Col xl={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} md={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }} xs={10}>
									<video className="w-100 rounded" controls>
										<source src={item.videoUrl} type="video/mp4" />
									</video>
								</Col>
								<Col xl={4} lg={4} md={2} sm={2} xs={2} className="p-0 pb-1">
									<Stack gap={2} className="flex-column">
										<div><FaRegCommentDots /></div>
										<div>{formatCount(item.commentCount)}</div>
									</Stack>
									<Stack gap={2}>
										<div><FcLike /></div>
										<div>{formatCount(item.diggCount)}</div>
									</Stack>
								</Col>
							</Row>
						</ListGroup.Item>
					))
					}
				</ListGroup >
			);
		}
	}
}