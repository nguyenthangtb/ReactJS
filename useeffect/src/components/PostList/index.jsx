import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    posts: PropTypes.array,
    onPostClick: PropTypes.func,
};

PostList.defaultProps = {
    posts: [],
    onPostClick: null,
}

function PostList(props) {
    
    const { posts, onPostClick } = props;


    function handlePostClick(post){
        if(onPostClick){
            onPostClick(post);
        }
    }

    return (
        <div>
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} onClick={() => handlePostClick(post)}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;