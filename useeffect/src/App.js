import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFilterForm from './components/PostFilterForm';

function App() {


  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page:1,
    title_like: '',
    // TODO ...
  })

  useEffect(() =>{
    async function fetchPostList(){
      try {
        const parameterQuery = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${parameterQuery}`;
        const res = await fetch(requestUrl);
        const resJson = await res.json();

        const { data, pagination} = resJson;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('error', error.message);
      }
    }

    fetchPostList();
  }, [filters])


  function handlePageChange(newPage){
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  function handleFilterChange(newFilters){
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    })
  }

  function handlePostClick(post){
    console.log(post);
  }

  return (
    <div className="App">
      <h1>UseEffect - ReactJs</h1>
      <PostFilterForm onSummit={handleFilterChange}/>
      <PostList posts={ postList } onPostClick={handlePostClick}/>
      <Pagination pagination={pagination} onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;
