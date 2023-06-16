"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const DaoCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const DaoFeed = () => {
    const [allDaos, setAllDaos] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchDaos = async () => {
        const response = await fetch("/api/daos");
        const data = await response.json();

        setAllDaos(data);
    };

    useEffect(() => {
        fetchDaos();
    }, []);

    const filterDaos = (searchtext) => {
        // const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        // return allPosts.filter(
        //     (item) =>
        //         regex.test(item.creator.username) ||
        //         regex.test(item.tag) ||
        //         regex.test(item.prompt)
        // );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterDaos(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterDaos(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* All Daos */}
            {searchText ? (
                <DaoCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <DaoCardList data={allDaos} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default DaoFeed;