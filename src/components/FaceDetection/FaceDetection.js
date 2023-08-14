import './FaceDetection.css'
function FaceDetection({getUrl, Box}) {
    console.log(Box)
//     const style = {
//         top: Box.top,
//         right: Box.right, 
//         left: Box.left, 
//         bottom: Box.bottom
//    }
    return (
        <div className="center mt3">
            <div className="absolute">
                <img id="imageOutput" className="br3" alt="" src={getUrl} width="500px" height="auto"/>
                {
                    Box.length > 0 
                    ?Box.map((item,i) => {
                        return(<div id="bounding_box" key={i} style={
                            {top: item.top,
                            right: item.right, 
                            left: item.left, 
                            bottom: item.bottom}
                        }></div>)
                    })
                    : <></>
                }
                 
            </div>
        </div>
    );
}



export default FaceDetection;