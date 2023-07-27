import './FaceDetection.css'
function FaceDetection({getUrl, Box}) {
    const style = {
        top: Box.top,
        right: Box.right, 
        left: Box.left, 
        bottom: Box.bottom
   }
    return (
        <div className="center mt3">
            <div className="absolute">
                <img id="imageOutput" className="br3" alt="" src={getUrl} width="500px" height="auto"/>
                 <div id="bounding_box" style={style}></div>
            </div>
        </div>
    );
}



export default FaceDetection;