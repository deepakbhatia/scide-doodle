"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const ProposalCardList = ({ data, handleTagClick }) => {
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

const ProposalFeed = () => {
    const [allProposals, setAllProposals] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchProposals = async ({id}) => {
        const response = await fetch("/api/daos/"+ id +"/proposals");
        const data = await response.json();

        setAllProposals(data);
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    const filterProposals = (searchtext) => {
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
                const searchResult = filterProposals(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterProposals(tagName);
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

            {/* All Proposals */}
            {searchText ? (
                <ProposalCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <ProposalCardList data={allProposals} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default ProposalFeed;