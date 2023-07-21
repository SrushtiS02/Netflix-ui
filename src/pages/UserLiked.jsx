import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, getUsersLikedMovies } from '../store';
import { useSelector, useDispatch } from "react-redux";
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import styled from "styled-components";
import NotAvailable from '../Components/NotAvailable';
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import SelectGenre from '../Components/SelectGenre';
import Card from '../Components/Card'; // Import the Card component if it's defined in a separate file

const UserLiked = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
 
  const movies = useSelector((state) => state.netflix.movies);
  
  const [email, setEmail] = useState(undefined); // Fixed typo: serEmail -> setEmail
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [dispatch, email]);

 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='content flex column'>
        <h1>My List</h1>
        <div className='grid flex'>
          {movies.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default UserLiked;
