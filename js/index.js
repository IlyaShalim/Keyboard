import { capsLock, lowerCaseName } from './handle.js';
import { rowKeyEn } from './keycode.en.js';
import readKey from './keycode.js';
import { rowKeyRu } from './keycode.ru.js';

let key;
let keyboard;
let space;
let shift;
let win;
let ctrlLeft;
let ctrlRight;
let altLeft;
let altRight;
let shiftLeft;
let shiftRight;
let keyCaps;
let languach = rowKeyEn;
const set = new Set();

const initConstant = () => {
  key = [...document.querySelectorAll('.key')];
  keyboard = document.querySelector('.keyboard__keys');
  space = document.querySelector('.key-space');
  shift = document.querySelectorAll('.shift');
  win = document.querySelector('.key-win');
  ctrlLeft = document.querySelector('.ctrl-left');
  ctrlRight = document.querySelector('.ctrl-right');
  altLeft = document.querySelector('.alt-left');
  altRight = document.querySelector('.alt-right');
  shiftLeft = document.querySelector('.shift-left');
  shiftRight = document.querySelector('.shift-right');
  keyCaps = document.querySelector('.key-caps');
};
// for (let i = 0; i < key.length; i++) {
//   key[i].setAttribute('keyname', keycodeEn[i].upperCase);
//   key[i].setAttribute('loverCaseName', keycodeEn[i].lowerCase);
//   key[i].setAttribute('data-code', keycodeEn[i].code);
// }
const creatElement = (tag, className, content, atribute) => {
  const elem = document.createElement(tag);
  elem.className = className;
  elem.innerHTML = content;
  if (atribute) {
    elem.setAttribute('keyname', atribute.upperCase);
    elem.setAttribute('loverCaseName', atribute.lowerCase);
    elem.setAttribute('data-code', atribute.code);
  }
  return elem;
};

const renderKeyBoard = () => {
  const rows = languach.map((rowArr) => {
    const r = document.createElement('div');
    r.classList.add('row');
    const children = rowArr.map((child) =>
      creatElement(
        'div',
        child.class,
        child.lowerCase,
        child.lowerCase === 'CapsLock' ? null : child,
      ),
    );
    r.append(...children);
    return r;
  });
  return rows;
};

const renderContent = () => {
  const body = document.querySelector('body');
  const container = creatElement('div', 'container', '');
  const keyboardWrapp = creatElement('div', 'keyboard__wrapp', '');
  const keyboardLight = creatElement('div', 'keyboard__light', '');
  const keyboardKeys = creatElement('div', 'keyboard__keys', '');
  const keyboardInfo = creatElement(
    'div',
    'keyboard__info',
    'Клавиатура создана в операционной системе Windows',
  );
  const keyboardInfo2 = creatElement(
    'div',
    'keyboard__info2',
    'Для переключения языка комбинация: Shift + Alt',
  );
  const input = document.createElement('textarea');
  input.classList.add('text');
  input.setAttribute('type', 'text');
  input.setAttribute('cols', '20');
  input.setAttribute('rows', '5');
  const keyboardKey = renderKeyBoard();

  keyboardKeys.append(...keyboardKey);
  keyboardWrapp.append(keyboardLight, keyboardKeys);
  container.append(keyboardWrapp, input, keyboardInfo, keyboardInfo2);
  body.prepend(container);
};

const keyDown = (e) => {
  document.querySelector('.text').blur();
  for (let i = 0; i < key.length; i++) {
    if (
      e.key === key[i].getAttribute('keyname') ||
      e.key === key[i].getAttribute('loverCaseName')
    ) {
      key[i].classList.add('active');
    }
    if (e.code === 'Tab') {
      e.preventDefault();
      document.querySelector('.text').value += '  ';
      return;
    }
    if (e.key === 'Alt') {
      e.preventDefault();
      set.add(e.key);
    }
    if (e.key === 'Control') {
      set.add(e.key);
    }
    if (set.size === 2) {
      languach = languach === rowKeyEn ? rowKeyRu : rowKeyEn;
      const keys = renderKeyBoard();
      keyboard.innerHTML = '';
      keyboard.append(...keys);
      key = document.querySelectorAll('.key');
      if (languach === rowKeyEn) {
        localStorage.setItem('lan', 'eng');
      } else {
        localStorage.setItem('lan', 'rus');
      }
      return;
    }
    if (e.code === 'ShiftLeft') {
      shiftRight.classList.remove('active');
      capsLock(key, e.code, { keyname: 'keyname', loverCaseName: 'loverCaseName' });
    }
    if (e.code === 'Enter') {
      document.querySelector('.text').value += '\n';
      return;
    }
    if (e.code === 'Backspace') {
      const position = document.querySelector('.text').selectionStart;
      if (position) document.querySelector('.text').setRangeText('', position - 1, position, 'end');
      return;
    }
    if (e.code === 'ShiftRight') {
      shiftLeft.classList.remove('active');
      capsLock(key, e.code, { keyname: 'keyname', loverCaseName: 'loverCaseName' });
    }
    if (e.code === 'AltLeft') {
      altRight.classList.remove('active');
    }
    if (e.code === 'AltRight') {
      altLeft.classList.remove('active');
    }
    if (e.code === 'ControlLeft') {
      ctrlLeft.classList.add('active');
    }
    if (e.code === 'ControlRight') {
      ctrlRight.classList.add('active');
    }
    if (e.code === 'MetaLeft') {
      win.classList.add('active');
    }
    if (e.code === 'CapsLock') {
      keyCaps.classList.add('active');
      capsLock(key, e.code, { keyname: 'keyname', loverCaseName: 'loverCaseName' });
    }
    if (readKey.readKey.includes(e.code)) {
      document.querySelector('.text').value += e.key;
      return;
    }
    if (e.code === 'Space') {
      document.querySelector('.text').value += ` `;
      return;
    }
  }
};

const keyUp = (e) => {
  for (let i = 0; i < key.length; i++) {
    if (
      e.key === key[i].getAttribute('keyname') ||
      e.key === key[i].getAttribute('loverCaseName')
    ) {
      key[i].classList.remove('active');
      key[i].classList.add('remove');
    }
    if (e.key === 'Alt') {
      e.preventDefault();
      set.delete(e.key);
    }
    if (e.key === 'Control') {
      set.delete(e.key);
    }
    if (e.code === 'Space') {
      space.classList.remove('active');
      space.classList.add('remove');
    }
    if (e.code === 'ShiftLeft') {
      shiftRight.classList.remove('active');
      shiftRight.classList.remove('remove');
      lowerCaseName(key, 'loverCaseName');
    }
    if (e.code === 'ShiftRight') {
      shiftLeft.classList.remove('active');
      shiftLeft.classList.remove('remove');
      lowerCaseName(key, 'loverCaseName');
    }
    if (e.code === 'AltLeft') {
      altRight.classList.remove('active');
      altRight.classList.remove('remove');
    }
    if (e.code === 'CapsLock') {
      keyCaps.classList.remove('active');
      lowerCaseName(key, 'loverCaseName');
    }
    if (e.code === 'AltRight') {
      altLeft.classList.remove('active');
      altLeft.classList.remove('remove');
    }
    if (e.code === 'ControlLeft') {
      ctrlLeft.classList.remove('active');
    }
    if (e.code === 'ControlRight') {
      ctrlRight.classList.remove('active');
    }
    if (e.code === 'MetaLeft') {
      win.classList.remove('active');
    }
    setTimeout(() => {
      key[i].classList.remove('remove');
    }, 200);
  }
};

const onClick = (e) => {
  // console.log(readKey.mod);
  const element = e.target;
  document.querySelector('.text').blur();
  if (e.target.textContent === 'Tab') {
    document.querySelector('.text').value += '  ';
  }
  if (e.target.textContent === ' ') {
    document.querySelector('.text').value += ' ';
  }
  if (e.target.textContent === 'Enter') {
    document.querySelector('.text').value += '\n';
  }
  if (e.target.textContent === 'Backspace') {
    const position = document.querySelector('.text').selectionStart;
    if (position) document.querySelector('.text').setRangeText('', position - 1, position, 'end');
    return;
  }
  if (e.target.textContent === 'Shift') {
    shift.forEach((s) => s.classList.add('active'));
    capsLock(key, e.code, { keyname: 'keyname', loverCaseName: 'loverCaseName' });
    return;
  }
  if (e.target.textContent === 'CapsLock') {
    e.target.classList.add('active');
    capsLock(key, e.code, { keyname: 'keyname', loverCaseName: 'loverCaseName' });
    return;
  }
  if (readKey.readKey.includes(element.dataset.code)) {
    const { textContent } = element;
    document.querySelector('.text').value += textContent;
  }
  e.target.classList.add('active');
};

const offClick = (e) => {
  if (e.target.textContent === 'Shift') {
    shift.forEach((s) => s.classList.remove('active'));
    lowerCaseName(key, 'loverCaseName');
    return;
  }
  if (e.target.textContent === 'CapsLock') {
    e.target.classList.remove('active');
    lowerCaseName(key, 'loverCaseName');
    return;
  }
  e.target.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
  const local = localStorage.getItem('lan');
  if (local) {
    languach = local === 'eng' ? rowKeyEn : rowKeyRu;
  } else {
    languach = rowKeyEn;
  }
  renderContent();
  initConstant();
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  keyboard.addEventListener('mousedown', onClick);
  keyboard.addEventListener('mouseup', offClick);
});
