import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function SignUpForm(){
    return (
    <div className='signup'>
        <h1>Inscrivez-vous</h1>
        <form>
            <label for="signup__email" >Mail</label>
            <input name="email" id="signup__email" type="email" />
            <label for="signup__password">Mot de passe</label>
            <div className='signup__password-bloc'>
                <input name="password" id="signup__password" type="password" />
                <FontAwesomeIcon className='signup__password-bloc__icon' icon={faEye} />
            </div>
            <div className='signup__password-strenght'>
                <div className='signup__password-strenght weak'></div>
                <div className='signup__password-strenght average'></div>
                <div className='signup__password-strenght strong'></div>
                <div className='signup__password-strenght stronger'></div>
            </div>
            <label for="signup__confirm">Confirmez votre mot de passe</label>
            <div className='signup__password-bloc'>
                <input name="confirm_password" id="signup__confirm"type="password" />
                <FontAwesomeIcon className='signup__password-bloc__icon' icon={faEye} />
            </div>

            <button>Je m'inscrit</button>
        </form>
        <p>Déjà Inscrit ? <Link to="/connection">Connectez-vous</Link></p>
    </div>)
}

export default SignUpForm