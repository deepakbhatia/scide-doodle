'use client';
import Link from 'next/Link'
import TopLists from "@components/TopList";
const Landing = () => {
    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col w-[50%]">
                    <section className=" max-w-7xl flex flex-col h-screen justify-center items-center">
                        <div className="max-w-7xl m-10 px-4 sm:px-6">
                            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                                <div className="text-center pb-12 md:pb-16 bg-clip-border hover:bg-clip-padding">
                                    <h1
                                        className="text-12xl text-gray-800 md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                                        data-aos="zoom-y-out"
                                    >
                                        It is Machine learning, but{" "}
                                        <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-500 to-teal-300">
                                Collaborative & Decentralized
                                </span>
                                    </h1>
                                    <div className="max-w-3xl mx-auto">
                                        <p
                                            className="text-xl text-gray-400 mb-8"
                                        >
                                            Platform for Collaborating on datasets and machine learning models built on top of FEVM, allowing enthusiasts to
                                            build models and make them available to the public for inferencing.
                                        </p>
                                        <button className="items-center  bg-zinc-800 hover:bg-blue-700 text-teal-600 rounded-md font-extrabold p-3 shadow-lg"
                                                onClick={() => {
                                                    // Calling the connectWallet function when user clicks on the button
                                                    //connectWallet();
                                                }}
                                        >
                                            <span>Connect wallet</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex flex-col  h-screen  w-[50%]">

                    <section className="relative flex flex-col items-center mt-10">
                        <TopLists />
                    </section>



                </div>
            </div>
        </>
    );
}

export default Landing