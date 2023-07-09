import { useState, useEffect } from 'react';

export default function Image({ imageId }) {
    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/image?' + new URLSearchParams({id: imageId}))
            .then(response => response.text())
            .then(imageData => setImageData(imageData))
    }, [])

    return (
        <img src={`data:image/jpeg;base64, ${imageData}`}/>
    )
}