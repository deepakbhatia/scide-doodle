import React from "react";
function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
}

export default function TopLists() {

    const data = [
        {name:'Question & Answer model builders', shipped: '20 models', requestsServed:'1.5k Api calls'},
        {name:'Sentence Generators', shipped: '30 models', requestsServed:'5.5k Api calls'},
        {name:'Voice Detection', shipped: '30 models', requestsServed:'2.1k Api calls'},
        {name:'Zero shot Image classification', shipped: '30 models', requestsServed:'7.6k Api calls'},
        {name:'Language builder', shipped: '10 models', requestsServed:'15.8k Api calls'},
        {name:'Text to image medical surgery', shipped: '22 models', requestsServed:'11.9k Api calls'},
        {name:'News summarization', shipped: '30 models', requestsServed:'16.5k Api calls'},
        {name:'Science articles explainers', shipped: '40 models', requestsServed:'13.5k Api calls'}


    ];
    return (
        <div className={"container"}>

            <Header className="m-10" title="Collaborate. Build. Ship. 🚀" />
            <div className="absolute items-center m-10">

                <div className="scroller flex space-y-1 whitespace-nowrap text-xs text-gray-300 ">
                    <ul min-w-full={"true"}>
                        {data.map((stat) => (

                            <li className="mt-10 justify-start " key={stat['name']}>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-full=true">
                                        <p className="text-sm font-mediumtruncate dark:text-gray-600">
                                            {stat['name']}
                                        </p>
                                        <p className="text-sm truncate dark:text-gray-400">
                                            {stat['shipped']}
                                        </p>
                                    </div>
                                    <div className="flex items-end font-semibold text-gray-900 dark:text-gray-400">
                                        {stat['requestsServed']}
                                    </div>
                                </div>

                            </li>

                        ))}


                    </ul>
                </div>
            </div>
        </div>
    );
}
