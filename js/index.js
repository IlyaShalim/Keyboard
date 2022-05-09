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

const initConstant = () => {
  key = document.querySelectorAll('.key');
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
alert('пожалуйста проверте мою работу попозже я не успел доделать))');
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
  const rows = rowKeyRu.map((rowArr) => {
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
  for (let i = 0; i < key.length; i++) {
    if (
      e.key === key[i].getAttribute('keyname') ||
      e.key === key[i].getAttribute('loverCaseName')
    ) {
      key[i].classList.add('active');
    }
    if (e.code === 'Tab') {
      e.preventDefault();
    }
    if (e.code === 'ShiftLeft') {
      shiftRight.classList.remove('active');
    }
    if (e.code === 'ShiftRight') {
      shiftLeft.classList.remove('active');
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
      keyCaps.classList.toggle('active');
    }
    if (readKey.readKey.includes(e.code)) {
      document.querySelector('.text').value += e.key;
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

    if (e.code === 'Space') {
      space.classList.remove('active');
      space.classList.add('remove');
    }
    if (e.code === 'ShiftLeft') {
      shiftRight.classList.remove('active');
      shiftRight.classList.remove('remove');
    }
    if (e.code === 'ShiftRight') {
      shiftLeft.classList.remove('active');
      shiftLeft.classList.remove('remove');
    }
    if (e.code === 'AltLeft') {
      altRight.classList.remove('active');
      altRight.classList.remove('remove');
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

  if (e.target.textContent === 'Tab') {
    document.querySelector('.text').value += '  ';
  }
  if (e.target.textContent === ' ') {
    document.querySelector('.text').value += ' ';
  }
  // if (e.target.textContent === 'Enter') {
  //   document.querySelector('.text').value += '<br/>';
  // }
  if (e.target.textContent === 'Shift') {
    shift.forEach((s) => s.classList.toggle('active'));
    return;
  }
  if (e.target.textContent === 'CapsLock') {
    e.target.classList.toggle('active');
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
    return;
  }
  if (e.target.textContent === 'CapsLock') {
    return;
  }
  e.target.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
  renderContent();
  initConstant();
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  keyboard.addEventListener('mousedown', onClick);
  keyboard.addEventListener('mouseup', offClick);
});
