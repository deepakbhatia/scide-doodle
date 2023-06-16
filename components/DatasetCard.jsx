"use client";

import { useState } from "react";
import Image from "next/image";
//import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Dataset from "@entities/datasets";

const DatasetCard = ({dataSet , handleTagClick }) => {
    //const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [urlCopied, setUrlCopied] = useState("");

    const handleProfileClick = () => {
        console.log(dataSet);
        const userId = dataSet['user']
        const userName = dataSet['user']
        //if (userId  === session?.user.id) return router.push("/profile");
        //if (post.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${userId}?name=${userName}`);
    };

    const handleCopy = () => {
        setUrlCopied(dataSet['dataSetUrl']);
        navigator.clipboard.writeText(dataSet['dataSetUrl']);
        setTimeout(() => setUrlCopied(false), 3000);
    };

    return (
        <div className='prompt_card'>
            <div className='flex flex-col gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    onClick={handleProfileClick}
                >
                    <Image
                        src={"/assets/images/logo.svg"}
                        alt='user_image'
                        width={15}
                        height={15}
                        className='rounded-full object-contain'
                    />
                    <div className='flex flex-col'>
                        <label className='font-satoshi text-gray-300'>
                            {dataSet['user']}
                        </label>

                    </div>


                </div>
                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {dataSet['dataSetName']}
                    </h3>

                </div>
                <div className={"flex flex-row justify-end"}>
                    <div className='flex flex-col flex-wrap'>
                        <h3 className='font-satoshi font-inter  text-xs text-gray-900'>
                            {dataSet['dataSetUrl']}
                        </h3>

                    </div>
                    <div className='copy_btn mx-3 justify-center' onClick={handleCopy}>
                        <Image
                            src={
                                urlCopied === dataSet.dataSetUrl
                                    ? "/assets/icons/tick.svg"
                                    : "/assets/icons/copy.svg"
                            }
                            //src={"/assets/icons/tick.svg"}
                            alt={"tick_icon"}
                            width={12}
                            height={12}
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label className='font-satoshi text-sm   text-gray-900'>
                        {dataSet['dataSetDescription']}
                    </label>

                </div>

            </div>

            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(dataSet['dataSetName'])}
            >
                #{dataSet['category']}
            </p>

            {/*{session?.user.id === post.creator._id && pathName === "/profile" && (*/}
            {/*    <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>*/}
            {/*        <p*/}
            {/*            className='font-inter text-sm green_gradient cursor-pointer'*/}
            {/*            onClick={handleEdit}*/}
            {/*        >*/}
            {/*            Edit*/}
            {/*        </p>*/}

            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default DatasetCard;