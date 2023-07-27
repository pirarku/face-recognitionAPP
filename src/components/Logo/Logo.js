import Tilt from 'react-parallax-tilt';
import icon from './Icon.png'

function logo() {
    return (
        <div className='w4 h4 br4'>
            <Tilt>
                <div className='bg-white-50 pa3 br4'>
                    <img src={icon} alt='logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default logo;