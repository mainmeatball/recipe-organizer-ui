import { useState, useEffect } from 'react';
import './Image.scss';

export default function Image({ imageId }) {

    return (imageId === undefined ? <EmptyImage/> : <ImageFrame imageId={imageId}/>)
}

function EmptyImage() {
    return (<div/>)
}

function ImageFrame(props) {
    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:9090/image?' + new URLSearchParams({id: props.imageId}))
            .then(response => response.text())
            .then(imageData => setImageData(imageData))
    }, [])

    return (
        <div>
            <img className='recipe-image' src={`data:image/jpeg;base64, ${imageData}`}/>
        </div>
    )
}