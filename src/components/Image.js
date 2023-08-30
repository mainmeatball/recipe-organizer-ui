import EmptyImage from './EmptyImage';
import ImageFrame from './ImageFrame';

export default function Image({ imageId }) {

    return (imageId === undefined ? <EmptyImage/> : <ImageFrame imageId={imageId}/>)
}