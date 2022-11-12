const colorSelector = document.querySelectorAll('.color-pick');
const Cables = document.querySelectorAll('.color-change');
const selected = document.querySelector('#selected-color');
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
  selected.classList.add(newColor, 'w-6', 'h-6', 'rounded-full', 'absolute');
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

const cableIndex = {
  left: 0,
  right: 8,
  color: 0,
  l: 0,
  r: 8,
};
const runTest = () => {
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

  const runCheck = () => {
    if (
      cable[cableIndex.left].classList[4] === modifyBgColor[cableIndex.color] &&
      cable[cableIndex.right].classList[4] === modifyBgColor[cableIndex.color]
    ) {
      cable[cableIndex.left].childNodes[0].classList.remove('hidden');
      cable[cableIndex.right].childNodes[0].classList.remove('hidden');
      console.log(cable[0].childNodes[0].classList);
    }
    setTimeout(() => {
      cable[cableIndex.l]?.childNodes[0]?.classList.add('hidden');
      cable[cableIndex.r]?.childNodes[0]?.classList.add('hidden');
      cableIndex.l++;
      cableIndex.r++;
    }, 1000);
    cableIndex.left++;
    cableIndex.right++;
    cableIndex.color++;
    if (cableIndex.left > 8) {
      cableIndex.left = 0;
      cableIndex.right = 8;
      cableIndex.l = 0;
      cableIndex.r = 8;
      cableIndex.color = 0;
      clearInterval(newInterval);
      return;
    }
  };
  const newInterval = setInterval(runCheck, 1000);
  return;
};

const test = document.querySelector('#test');
test.addEventListener('click', runTest, { passive: false });
