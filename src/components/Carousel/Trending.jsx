import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import styles from '../../style'
import MovieCard from '../Cards/MovieCard'
import fetchData from '../../helper/fetchData'

const Trending = (props) => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [Movies, setMovies] = useState([])

  const upload = async () => {
    setInitialLoading(true)
    let slug = `all-movies/${props.id}`

    if (props.title === 'Trending') {
      slug = 'trending'
    }

    try {
      const response = await fetchData(slug, 1)
      if (response.success) {
        setMovies(response.data.results)
        setInitialLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    upload()
  }, [])

  return (
    <>
      {' '}
      {!initialLoading ? (
        <div className={`${styles.boxWidth} py-4`}>
          {' '}
          <div className='flex justify-between items-center px-4'>
            <h2 className={`${styles.heading3} text-gray-900 dark:text-white`}>
              {props.title}
            </h2>
            <p className=''>
              <Link
                className={`${styles.paragraph} text-gray-900 dark:text-dimWhite dark:hover:text-white duration-200`}
                to={'/category/movie/' + props.title + '/' + props.id}
              >
                Show all
              </Link>
            </p>
          </div>
          <Splide
            options={{
              type: 'loop',
              perPage: '6',
              pagination: false,
              breakpoints: {
                400: {
                  perPage: 2,
                },
                764: {
                  perPage: 3,
                },
                1024: {
                  perPage: 4,
                },
                1280: {
                  perPage: 5,
                },
                1400: {
                  perPage: 6,
                },
              },
            }}
            aria-label='My Favorite Images'
            className='justify-center'
          >
            {Movies.map((movie) => {
              return (
                <SplideSlide key={movie.id}>
                  <MovieCard movie={movie} />
                </SplideSlide>
              )
            })}
          </Splide>{' '}
        </div>
      ) : (
        <div className='flex justify-center py-8'>
          <Oval
            height='50'
            width='50'
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading'
          />
        </div>
      )}
    </>
  )
}

Trending.defaultProps = {
  title: 'Trending',
}

export default Trending
