function ImageLink({onChangeInput, onClickDetect}) {
    return (
        <div>
            <div className="f4">
                <p>
                    {'This Magic Brain will detect faces in your pictures. Give it a try!'}
                </p>
                <div className="f5 center">
                    <div className="center bg-white-50 pa3 br3" style={{width: '600px'}}>
                        <input onChange={onChangeInput} className="w-100 br3 pa1" type="text"/>
                        <button onClick={onClickDetect} className="w4 br3 pa1 grow ml2 pointer">Detect</button>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default ImageLink;