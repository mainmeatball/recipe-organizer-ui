import EmptyImage from './EmptyImage';
import PreviewImageFrame from './PreviewImageFrame';

export default function ImagePreview({ imageId }) {

    return (imageId === undefined ? <EmptyImage/> : <PreviewImageFrame imageId={imageId}/>)
}