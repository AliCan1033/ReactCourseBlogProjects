import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useHistory } from 'react-router-dom';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {


    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => { //get
        setPosts(data);
    }, [data])

    useEffect(() => { //seraching
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])
 

    return (
        <DataContext.Provider value={{
            search, setSearch, 
            searchResults, fetchError, isLoading,//Home and Nav and Header
            posts, setPosts//EditPost
             //PostPage
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;