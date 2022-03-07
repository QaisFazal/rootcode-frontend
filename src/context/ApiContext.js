import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export const ApiContext = createContext();

function ApiContextProvider(props){

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    axios.get("http://localhost:9000/posts").then((res) => {
        setState(res.data);
        setLoading(false);
    })
    .catch((e) => {
        console.log(e);
        setLoading(false);
    } );
},[])

    return(
    <ApiContext.Provider value={{setState, state, loading}}>
        {props.children}
    </ApiContext.Provider>

    );
    

}

export default ApiContextProvider;
