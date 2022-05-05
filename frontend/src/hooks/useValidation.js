import { useState, useEffect } from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [validity, setValidity] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const urlValidRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
  const emailValidRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  const passValidRegExp = /^[a-zA-Z0-9]+$/;

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          if (value.length < validations.minLength) {
            setMinLengthError(true);
            setErrorMessage(`Минимальное количество символов: ${validations.minLength}`)
          } else {
            setMinLengthError(false);
          }
          break;
        case 'isEmpty':
          if(value) {
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
            setErrorMessage('Необходимо заполнить поле');
          }
          break;
        case 'isUrl':
          if (urlValidRegExp.test(value)) {
            setUrlError(false);
          } else {
            setUrlError(true);
            setErrorMessage('Введите ссылку на изображение');
          }
          break;
        case 'isEmail':
          if (emailValidRegExp.test(value)) {
            setEmailError(false);
          } else {
            setEmailError(true);
            setErrorMessage('Некорректный Email-адрес')
          }
          break;
        case 'isPassword':
          if (passValidRegExp.test(value)) {
            setPasswordError(false);        
          } else {
            setPasswordError(true);
            setErrorMessage('Пароль должен состоять из латинских букв');
          }
          break;
      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty || minLengthError || urlError || emailError || passwordError) {
      setValidity(false)
    } else {
      setValidity(true)
    }
  }, [isEmpty, minLengthError, urlError, emailError, passwordError])

  return {
    validity,
    errorMessage
  }
}