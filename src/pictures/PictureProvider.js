import React, { createContext, useState } from 'react' 

export const PictureContext = createContext()

export const PictureProvider = props => {

    const [b64, setB64] = useState("")

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setB64(base64ImageString)
        });
    }

    const uploadPicture = picture => {
        debugger
        return fetch(`http://localhost:8000/pictures`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(picture)
        })
            // .then(response => response.json())
    }

    return (
        <PictureContext.Provider value={{ createGameImageString, b64, uploadPicture }} >
            { props.children }
        </PictureContext.Provider>
    )
}