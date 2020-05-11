import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

PostFilterForm.propTypes = {
    onSummit: PropTypes.func,
    
};

PostFilterForm.defaultProps = {
    onSummit: null
}

function PostFilterForm(props) {

    const { onSummit }= props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeOutRef = useRef(null);

    function handleSearchTermChange(e){

        const value = e.target.value;

        setSearchTerm(value);

        if(!onSummit) return;

        //clear timeout
        if(typingTimeOutRef.current){
            clearTimeout(typingTimeOutRef.current);
        }
        
        //await
        typingTimeOutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            }
            onSummit(formValues);
        }, 400);
        
    }

    return (
        <form>
            <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}/>
            </form>
    );
}

export default PostFilterForm;