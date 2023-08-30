import { useState, useEffect } from 'react';
import './PreviewImageFrame.scss';

export default function PreviewImageFrame(props) {
    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:9090/image?' + new URLSearchParams({id: props.imageId}))
            .then(response => response.text())
            .then(imageData => setImageData(imageData))
    }, [props.imageId])

    return (
        <div>
            <img alt='' className='preview-recipe-image' src={`data:image/jpeg;base64, ${imageData}`}/>
        </div>
    )
}