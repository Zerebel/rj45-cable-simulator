const colorSelector = document.querySelectorAll('.color-pick');
const Cables = document.querySelectorAll('.color-change');
const selected = document.querySelector('#selected-color');
const blinker = document.querySelector('#blinker');
const logs = document.querySelector('#logs');
const backgroundColors = [
  'bg-orange-white',
  'bg-[#ffa500]',
  'bg-green-white',
  'bg-[#008000]',
  'bg-[#0000ff]',
  'bg-blue-white',
  'bg-[#9d5f04]',
  'bg-brown-white',
];

// global color variable
let color = 'bg-white';

// change wire color
const getClickedItem = () =>
  colorSelector.forEach((button) => {
    button.addEventListener('click', (e) => {
      for (let i = 0; i < backgroundColors.length; i++) {
        if (button.classList.contains(backgroundColors[i])) {
          if (backgroundColors[i].includes('white')) {
            return setSelectedColor(`${backgroundColors[i]}-repeat`);
          }
          return setSelectedColor(backgroundColors[i]);
        }
      }
    });
  });
getClickedItem();

const setSelectedColor = (newColor) => {
  selected.classList.remove(...selected.classList);
  blinker.classList.remove(...blinker.classList);
  selected.classList.add(newColor, 'w-6', 'h-6', 'rounded-full', 'absolute');
  blinker.classList.add(
    newColor,
    'self-center',
    'w-6',
    'h-6',
    'rounded-full',
    'animate-pulse'
  );
  return (color = newColor);
};
// change cursor color
const dragItem = (e) => {
  selected.style.left = e.pageX + 'px';
  selected.style.top = e.pageY - 60 + 'px';
};
document.addEventListener('mousemove', dragItem, false);

const changeItemColor = () =>
  Cables.forEach((wire) => {
    wire.addEventListener('click', (e) => {
      color != 'bg-white' ? wire.classList.remove('bg-white') : null;
      wire.classList.remove(...wire.classList);
      wire.classList.add('h-4', 'color-change', 'cursor-pointer', 'relative');
      const checker = document.createElement('div');
      checker.classList.add(
        'w-2',
        'h-full',
        'bg-green-500',
        'absolute',
        'top-0',
        'hidden'
      );
      wire.dataset?.pos
        ? checker.classList.add('left-0')
        : checker.classList.add('right-0');
      wire.appendChild(checker);
      return wire.classList.add(color);
    });
  });
changeItemColor();

let cableIndex = {
  left: 0,
  right: 8,
  color: 0,
  l: 0,
};
const defaultCableIndex = { ...cableIndex };

let newInterval;

const runTest = () => {
  if (cableIndex.left > 0) test.disabled = true;

  const modifyBgColor = [
    'bg-orange-white-repeat',
    'bg-[#ffa500]',
    'bg-green-white-repeat',
    'bg-[#0000ff]',
    'bg-blue-white-repeat',
    'bg-[#008000]',
    'bg-[#9d5f04]',
    'bg-brown-white-repeat',
  ];

  const cable = [];

  Cables.forEach((wire) => {
    cable.push(wire);
  });

  if (!newInterval) newInterval = setInterval(runTest, 800);

  if (cableIndex.l === 8) {
    cableIndex = { ...defaultCableIndex };
    clearInterval(newInterval);
    newInterval = null;
    return (test.disabled = false);
  }

  const runCheck = () => {
    if (
      cable[cableIndex.left]?.classList[4] === modifyBgColor[cableIndex.left] &&
      cable[cableIndex.right]?.classList[4] === modifyBgColor[cableIndex.left]
    ) {
      return runAnimation({
        passed: [cable[cableIndex.left], cable[cableIndex.right], cableIndex.l],
      });
    }
    return runAnimation({ failed: [cableIndex.l] });
  };
  runCheck();
  for (const key in cableIndex) {
    if (Object.hasOwnProperty.call(cableIndex, key)) {
      cableIndex[key]++;
    }
  }
  return;
};

const runAnimation = ({ passed, failed }) => {
  if (passed) {
    passed[0]['childNodes'][0]?.classList.remove('hidden');
    passed[1]['childNodes'][0]?.classList.remove('hidden');
    return setTimeout(() => {
      passed[0]['childNodes'][0]?.classList.add('hidden');
      passed[1]['childNodes'][0]?.classList.add('hidden');
      logMessage({ text: `Cable ${passed[2] + 1} Passed` });
    }, 800);
  }

  return logMessage({ text: `Cable ${failed[0] + 1} Failed` });
};

const logMessage = ({ text }) => {
  const logText = document.createElement('p');
  logText.textContent = text;
  return logs.prepend(logText);
};

const test = document.querySelector('#test');
test.addEventListener('click', runTest, false);
//TODO: add selected to local storage
