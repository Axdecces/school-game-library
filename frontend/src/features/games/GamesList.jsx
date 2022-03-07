import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Ratio from 'react-bootstrap/Ratio';

import Game from './Game';

import { selectAllGames } from "./gamesSlice";
import { selectAllTags } from "../tags/tagsSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './GamesList.scss';

function GamesList() {
  const games = useSelector(selectAllGames);
  const tags = useSelector(selectAllTags);

  const [filteredGames, setFilteredGames] = useState([]);
  const [sortedGames, setSortedGames] = useState([])
  const [filters, setFilters] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);

  useEffect(() => {
    setFilteredGames(games);
  }, [games])

  useEffect(() => {
    const applyFilter = games => {
      let filtered = games;
  
      filters.forEach(gameFilter => {
        filtered = games.filter(game => game[gameFilter.attr].toLowerCase().includes(gameFilter.value.toLowerCase().trim()));
      });

      tagFilter.forEach(tagId => {
        filtered = filtered.filter(game => game.tags.includes(tagId))
      });
  
      return filtered;
    }
		setFilteredGames(applyFilter(games));
  }, [games, filters, tagFilter]);

  useEffect(() => {
    const sortGames = (games, sortBy, direction, type) => {
      return [...games].sort((a, b) => {
        if (type === 'string') {
          if (direction === 'up') {
            return a[sortBy].localeCompare(b[sortBy])
          }
          else {
            return b[sortBy].localeCompare(a[sortBy])
          }
        } else {
          if (direction === 'up') {
            return  a[sortBy] - b[sortBy]
          } else {
            return b[sortBy] - a[sortBy]
          }
        }

      })
    }
    setSortedGames(sortGames(filteredGames, 'title', 'up', 'string'));
  }, [filteredGames])


  const handleFilterChange = e => {
    const attr = e.target.id;
    var value = e.target.value;

    setFilters([...filters, {attr: attr, value: value}]);
  }

  const handleFilterSelectChange = e => {
    const tagId =  parseInt(e.target.id);
    const checked = e.target.checked;

    if (checked) {
      setTagFilter([...tagFilter, tagId]);
    } else {
      setTagFilter(tagFilter.filter(e => e !== tagId ));
    }
  }



  return (
    <Container fluid>
      <Row className='mb-3'>
        <Col />
        <Col xs={10}><h1>Games</h1></Col>
        <Col />
      </Row>
      <Row className='mb-3'>
				<Col />
        <Col xs={10}>
          <h2>Filter</h2>
          <Row xs={1} sm={2} lg={3} xxl={4} className="g-5">
            <Col className="filter">
              <Form.Group className='mb-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' placeholder='Filter Title' className='filter' onChange={handleFilterChange} />
              </Form.Group>
            </Col>
            <Col className="filter">
              <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Filter Description' className='filter' onChange={handleFilterChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Form.Group className='mb-3' controlId='tags'>
                <Form.Label>Categories</Form.Label>
                <div>
                  { 
                    tags.map(tag => 
                      <Form.Check
                        inline
                        label={ tag.title }
                        id={ tag.id }
                        key={ tag.id }
                        onChange={handleFilterSelectChange}
                      />
                    )
                  }
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Col>
          
        
				<Col />
      </Row>
      <Row className='mb-5'>
        <Col />
        <Col xs={10}>
          <Row xs={1} sm={2} lg={3} xxl={4} className="g-5 justify-content-start">
            {sortedGames && sortedGames.map(game => {return <Game key={game.id} id={game.id} />})}
          </Row>
        </Col>
        <Col />
      </Row>
      
      <Ratio aspectRatio="1x1" className='fab'>
        <Button className='fab-button round' as={Link} to={'/games/new/'}>
          <FontAwesomeIcon icon={faPlus} size="2x" className='icon' />
        </Button>
      </Ratio>
    </Container>
    
  )
}

export default GamesList;