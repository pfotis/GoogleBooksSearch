import React, { Component } from 'react';

// Components
import Jumbotron from '../Components/Jumbotron';
import Card from '../Components/Card';
import Form from '../Components/Form';
import Book from '../Components/Book';
import { Col, Row, Container } from '../Components/Grid';
import { List } from '../Components/List';

// API call
import API from '../utils/API';


// Search Books class component
class SearchBooks extends Component {
	
	// Components initial state
	state = {
		books: [],
		q: '',
		message: 'Search For A Book!',
	};

	// Function to handle input change in search bar
	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	// Function to get books for search query
	getBooks = () => {
		API.getBooks(this.state.q)
			.then((res) =>
				this.setState({
					books: res.data,
				})
			)
			.catch(() =>
				this.setState({
					books: [],
					message: 'No Books Found!',
				})
			);
	};

	// Handle search form submit function
	handleFormSubmit = (event) => {
		event.preventDefault();

		// Get books for search query
		this.getBooks();
	};

	// function to save book in database
	handleBookSave = (id) => {
		const book = this.state.books.find((book) => book.id === id);

		API.saveBook({
			googleId: book.id,
			title: book.volumeInfo.title,
			subtitle: book.volumeInfo.subtitle,
			link: book.volumeInfo.infoLink,
			authors: book.volumeInfo.authors,
			description: book.volumeInfo.description,
			image: book.volumeInfo.imageLinks.thumbnail,
		}).then(() => this.getBooks());
	};

	render() {
		return (
			<Container>
				<div className="main-container">
					<Row>
						<Col size="md-12">
							<Jumbotron>
								<h1 className="text-center">Google Books Search</h1>
							</Jumbotron>
						</Col>
						<Col size="md-12">
							<Card
								title=" Book Search"
								icon="far fa-book"
							>
								<Form
									handleInputChange={
										this.handleInputChange
									}
									handleFormSubmit={
										this.handleFormSubmit
									}
									q={this.state.q}
								/>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col size="md-12">
							<Card title="Search Results">
								{this.state.books.length ? (
									<List>
										{this.state.books.map(
											(book) => (
												<Book
													key={ book.id }
													title={	book.volumeInfo.title }
													subtitle={ book.volumeInfo.subtitle }
													link={ book.volumeInfo.infoLink }
													authors={book.volumeInfo.authors.join(', ')}
													description={ book.volumeInfo.description }
													image={ book.volumeInfo.imageLinks.thumbnail }
													Button={() => (
														<button
															onClick={() => this.handleBookSave( book.id )}
															className="btn btn-primary ml-2" >
															Save
														</button>
													)}
												/>
											)
										)}
									</List>
								) : (
									<h5 className="text-center">
										{this.state.message}
									</h5>
								)}
							</Card>
						</Col>
					</Row>
				</div>
			</Container>
		);
	}
}

export default SearchBooks;
