// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
// import Card from 'react-bootstrap/Card';

// import {Link} from 'react-router-dom';

// export class ProfileMovies extends React.Component {
//   constructor() {
//     super();

//     this.state = {};
//   };

//   render() {
//     const {movie, onClick} = this.props;

//     if (!movie) return null

//     return (
//       <Card border="info" style={{ width: '16rem' }}>
//         <Card.Img variant="top" src={movie.imagePath} />
//         <Card.Body>
//           <Card.Title>{movie.title}</Card.Title>
//           <Card.Text>{movie.description}</Card.Text>
//           <Link to={`/movies/${movie._id}`}>
//             <Button variant="info">Details</Button>
//           </Link>
//           <Button variant="danger" onClick={() => onClick(movie._id)}>Remove</Button>
//         </Card.Body>
//       </Card>
//     );
//   }
// }

// ProfileMovies.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     imagePath: PropTypes.string.isRequired
//   }).isRequired,
// }