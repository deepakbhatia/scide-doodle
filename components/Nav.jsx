'use client'
import Link from 'next/Link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
//import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropdown] = useState(false)
    useEffect( () => {
        const setProviders = async () => {
            // const response = await getProviders()
            // await setProviders(response)
        }

        setProviders()
    }, [])
    return (
        <nav className={"flex-between w-full mb-0 pt-2"}>
            <Link href="/" className={"flex gap-2 flex-center"}>
                <Image
                    src={"/assets/images/logo.svg"}
                    width={30}
                    height={50}
                />
                <p className={"logo_text"}>Promptopia</p>
            </Link>

            <div className={"sm:flex hidden relative"}>
                {isUserLoggedIn? (

                        <div className={"flex"}>
                            <Image
                                src={"/assets/images/logo.svg"}
                                width={37}
                                height={37}
                                className={"rounded-full"}
                                alt={"Profile"}
                                onClick={ () => setToggleDropdown( (prev) => !prev) }
                            />
                            {toggleDropDown && (
                                <div className={"dropdown"}>
                                    <Link
                                        href={"/profile"}
                                        className={"dropdown_link"}
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <button type="button"
                                        onClick={ () => {}}
                                        className="outline_btn">Sign Out
                                    </button>
                                    <Link href={"/daos/create"}
                                          className={"black_btn mt-3"}
                                          onClick={() => setToggleDropdown(false)}
                                    >
                                        Build a Dao
                                    </Link>
                                    <Link href={"/datasets/add"}
                                          className={"black_btn  mt-3"}
                                          onClick={() => setToggleDropdown(false)}
                                    >
                                        Add a dataset
                                    </Link>
                                    <Link
                                        href={"/ml-models/add"}
                                        className={"black_btn  mt-3"}
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Add a model
                                    </Link>
                                {/*<Link href={"/profile"} >*/}
                                {/*    <Image*/}
                                {/*        src={"/assets/images/logo.svg"}*/}
                                {/*        width={37}*/}
                                {/*        height={37}*/}
                                {/*        className={"rounded-full"}*/}
                                {/*        alt={"Profile"} />*/}
                                {/*    </Link>*/}
                                    </div>
                            )}
                    </div>

                ):(
                    <>
                        {providers && Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => {}}
                                        className={'black_btn'}
                                    >
                                    </button>
                                ))}
                    </>
                )
                }
            </div>

            {/* Mobile Navigation */}
            <div className={"sm:hidden flex relative"}>
                {isUserLoggedIn ? (
                    <div className={"flex"}>
                        <Image
                            src={"/assets/images/logo.svg"}
                            width={37}
                            height={37}
                            className={"rounded-full"}
                            alt={"Profile"}
                            onClick={ () => setToggleDropdown( (prev) => !prev)}
                        />
                        {toggleDropDown && (
                            <div className={"dropdown"}>
                                <Link
                                    href={"/profile"}
                                    className={"dropdown_link"}
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/profile"}
                                    className={"dropdown_link"}
                                    onClick={() => setToggleDropdown(false)}
                                    >
                                    Create Prompt
                                </Link>
                                <button
                                    type={"button"}
                                    onClick={ () => {
                                        setToggleDropdown(false)
                                        //signOut()
                                    }}
                                    className={"mt-5 w-full black_btn"}

                                    >
                                    Sign Out

                                </button>
                            </div>
                        )}
                    </div>
                ):(
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                // onClick={() => {}}
                                className={'black_btn'}
                            >
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav