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

  const [sortOptions, setSortOptions] = useState({sortBy: 'title', direction: 'up', type: 'string'})

  useEffect(() => {
    setFilteredGames(games);
  }, [games])

  useEffect(() => {
    const applyFilter = games => {
      let filtered = games;
  
      filters.forEach(gameFilter => {
        if (gameFilter.type === 'bool') {
          if (gameFilter.value === 'true') {
            filtered = games.filter(game => game[gameFilter.attr] === true)
            filtered = filtered.filter(game => game[gameFilter.attr] === true)
          }
          if (gameFilter.value === 'false') {
            filtered = filtered.filter(game => game[gameFilter.attr] === false)
          }
        } else if (gameFilter.type === 'number') {
          if  (gameFilter.value !== '') {
            filtered = filtered.filter(game => game[gameFilter.attr] === parseInt(gameFilter.value));
          }
        } else {
          filtered = filtered.filter(game => game[gameFilter.attr].toLowerCase().includes(gameFilter.value.toLowerCase().trim()));
        }

        
      });

      tagFilter.forEach(tagId => {
        filtered = filtered.filter(game => game.tags.includes(tagId))
      });
  
      return filtered;
    }
		setFilteredGames(applyFilter(games));
  }, [games, filters, tagFilter]);

  useEffect(() => {
    const sortGames = (games) => {
      return [...games].sort((a, b) => {
        if (sortOptions.type === 'string') {
          if (sortOptions.direction === 'up') {
            return a[sortOptions.sortBy].localeCompare(b[sortOptions.sortBy])
          }
          else {
            return b[sortOptions.sortBy].localeCompare(a[sortOptions.sortBy])
          }
        } else {
          if (sortOptions.direction === 'up') {
            return  a[sortOptions.sortBy] - b[sortOptions.sortBy]
          } else {
            return b[sortOptions.sortBy] - a[sortOptions.sortBy]
          }
        }

      })
    }
    setSortedGames(sortGames(filteredGames));
  }, [filteredGames, sortOptions])


  const handleFilterChange = e => {
    const attr = e.target.id;
    const value = e.target.value;

    let type

    if (attr === 'is_favorite') {
      type = 'bool'
    } else if (attr === 'rating') {
      type = 'number'
    } else {
      type = 'text'
    }

    setFilters([...filters.filter(filter => filter.attr !== attr), {attr: attr, value: value, type: type}]);
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

  const handleSortChange = e => {
    const value = e.target.value.split(" ");
    setSortOptions({sortBy: value[0], direction: value[1], type: value[2]})
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
          <Row><h2>Filter</h2></Row>
          <Row xs={1} sm={2} lg={3} xxl={4} className="gx-5">
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
            <Col className="filter">
              <Form.Group className='mb-3' controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control min={0} max={5} type='number' placeholder='Filter Rating' className='filter' onChange={handleFilterChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='is_favorite'>
                <Form.Label>Favorite?</Form.Label>
                <Form.Select className='filter' aria-label="Filter for favorites" onChange={handleFilterChange}>
                  <option value='unset'>Show all</option>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row xs={1} sm={2} lg={3} xxl={4} className="gx-5">
            <Col>
              <Form.Group className='mb-3' controlId='is_favorite'>
                <Form.Label>Sort By</Form.Label>
                <Form.Select className='filter' aria-label="Filter for favorites" onChange={handleSortChange}>
                  <option value='title up string'>Title &uarr;</option>
                  <option value='title down string'>Title &darr;</option>
                  <option value='rating up number'>Rating &uarr;</option>
                  <option value='rating down number'>Rating &darr;</option>

                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Form.Group className='mb-3' controlId='tags'>
                <Form.Label>Categories</Form.Label>
                <div>
                  { tags &&
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