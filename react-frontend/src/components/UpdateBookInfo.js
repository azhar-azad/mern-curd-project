import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../App.css';

class UpdateBookInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isbn: '',
            author: '',
            description: '',
            published_date: '',
            publisher: ''
        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/books/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    isbn: res.data.isbn,
                    author: res.data.author,
                    description: res.data.description,
                    published_date: res.data.published_date,
                    publisher: res.data.publisher
                });
            })
            .catch(err => {
                console.log('Error from UpdateBookInfo');
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            title: this.state.title,
            isbn: this.state.isbn,
            author: this.state.author,
            description: this.state.description,
            published_date: this.state.published_date,
            publisher: this.state.publisher
        };

        axios
            .put(`http://localhost:5000/api/books/${this.props.match.params.id}`, data)
            .then(res => {
                this.props.history.push(`/show-book/${this.props.match.params.id}`);
            })
            .catch(err => {
                console.log('Error in UpdateBookInfo_put');
            });
    }

    render() {
        return(
            <div class="UpdateBookInfo">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Book List
                            </Link>
                        </div>
                        <div class="col-md-8 m-auto">
                            <h1 class="display-4 text-center">Edit Book</h1>
                            <p class="lead text-center">
                                Update Book's Info
                            </p>
                        </div>
                    </div>

                    <div class="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Title of the Book"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />
                            </div>
                            <br />

                            <div class="form-group">
                                <label htmlFor="isbn">ISBN</label>
                                <input type="text"
                                    className="form-control"
                                    name="isbn"
                                    placeholder="ISBN"
                                    value={this.state.isbn}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div class="form-group">
                                <label htmlFor="author">Author</label>
                                <input type="text"
                                    className="form-control"
                                    name="author"
                                    placeholder="Author"
                                    value={this.state.author}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div class="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div class="form-group">
                                <label htmlFor="published_date">Published Date</label>
                                <input type="text"
                                    className="form-control"
                                    name="published_date"
                                    placeholder="Published Date"
                                    value={this.state.published_date}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div class="form-group">
                                <label htmlFor="publisher">Publisher</label>
                                <input type="text"
                                    className="form-control"
                                    name="publisher"
                                    placeholder="Publisher of this Book"
                                    value={this.state.publisher}
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" class="btn btn-coutline-info btn-lg btn-block">
                                Update Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default UpdateBookInfo;