import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";

//support routing by creating a new component

class Movie extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId));
    }

    render() {
        const ActorInfo = ({Actors}) => {
            return Actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.FirstActorsFirstName}</b> {actor.FirstCharacterFirstName}
                    <p></p>
                    <b>{actor.SecondActorsFirstName}</b> {actor.FirstCharacterFirstName}
                    <p></p>
                    <b>{actor.SecondActorsFirstName}</b> {actor.ThirdCharacterFirstName}
                </p>
            );
        };

        const ReviewInfo = ({Reviews}) => {
            return Reviews.map((review, i) =>
                <p key={i}>
                <b>{review.user}</b> {review.comment}
                    <Glyphicon glyph={'star'} /> {review.rate}
                </p>
            );
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imagelink} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo Actors={currentMovie.Actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgrating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo Reviews={currentMovie.Reviews} /></Panel.Body>
                </Panel>
            );
        };
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));