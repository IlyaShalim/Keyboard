export const capsLock = (keys, code, atribute) => {
  keys.forEach((element) => {
    const bigName = element.getAttribute(atribute.keyname);
    const smallName = element.getAttribute(atribute.loverCaseName);
    element.innerHTML = bigName === 'null' ? smallName : bigName;
  });
};

export const lowerCaseName = (keys, atribute) => {
  keys.forEach((element) => {
    const smallName = element.getAttribute(atribute);
    element.innerHTML = smallName;
  });
};
