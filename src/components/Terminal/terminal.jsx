import cx from 'classnames';
import { useEffect, useRef, useState } from "react";
import styles from './terminal.module.css';

export default function Terminal({ onNewInputText = () => {}, texts = [] }) {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.scrollIntoView();
  }, [texts]);

  const renderTexts = () => {
    return texts.map(({from, message}, index) => {
      return (
        <p key={`terminal-text-${index}`} className={cx(!from && styles.systemText)}>
          {from && <b className={cx(styles.hide)}>{from}: </b>}
          {message}
        </p>
      );
    })
  }

  const handleClick = () => {
    inputRef.current.focus();
  }

  const handleMessageClick = (e) => {
    e.stopPropagation();
  }

  const onSubmit = (e) => {
    e.preventDefault();

    onNewInputText(inputText);
    setInputText('');
  }

  const onTextChange = (e) => {
    setInputText(e.target.value);
  }

  return (
    <form className={styles.terminal} onClick={handleClick} onSubmit={onSubmit}>
      <div className={styles.messages} onClick={handleMessageClick}>
        {renderTexts()}
      </div>
      <div className={styles.input}>
        <span className={styles.indicator}>{'>'}</span>
        <input ref={inputRef} autoFocus spellCheck={false} value={inputText} onChange={onTextChange} />
      </div>
    </form>
  )
}