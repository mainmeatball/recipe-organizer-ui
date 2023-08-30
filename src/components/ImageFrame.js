import { useState, useEffect } from 'react';
import './ImageFrame.scss';

export default function ImageFrame(props) {
    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:9090/image?' + new URLSearchParams({id: props.imageId}))
            .then(response => response.text())
            .then(imageData => setImageData(imageData))
    }, [props.imageId])

    return (
        <div>
            <img alt='' className='recipe-image' src={`data:image/jpeg;base64, ${imageData}`}/>
        </div>
    )
}