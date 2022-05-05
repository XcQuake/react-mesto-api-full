import { useState } from 'react';
import { useValidation } from '../hooks/useValidation';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';

export default function Register({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const emailValid = useValidation(email, {isEmail: true, isEmpty: true});
  const passwordValid = useValidation(password, {minLength: 6, isPassword: true, isEmpty: true});
  const buttonClassName = `button sign__button ${(!emailValid.validity || !passwordValid.validity) && 'button_inactive'}`

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleOnBlur() {
    setIsTouched(true)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form className="sign" onSubmit={handleSubmit} noValidate>
      <h2 className="sign__title">Регистрация</h2>
      <label className="sign__field">
        <input 
          className="sign__input" 
          name="email"
          id="email"
          type="email"
          value={email}
          minLength="5"
          maxLength="80"
          placeholder="Email"
          onChange={handleChangeEmail}
          onBlur={handleOnBlur}
          required
        />
        {(isTouched && !emailValid.validity) && <span className="input-error">{emailValid.errorMessage}</span>}
      </label>
      <label className="sign__field">
        <input 
          className="sign__input" 
          name="password"
          id="password"
          type="password"
          value={password}
          minLength="6"
          maxLength="80"
          placeholder="Пароль"
          onChange={handleChangePassword}
          onBlur={handleOnBlur}
          required
        />
        {(isTouched && !passwordValid.validity) && <span className="input-error">{passwordValid.errorMessage}</span>}
      </label>
      <button className={buttonClassName} type="submit">Зарегистрироваться</button>
      <p className="sign__text">
        Уже зарегистрированы? <Link to='/sign-in' className='sign__link'>Войти</Link>
      </p>
    </form>
  )
}