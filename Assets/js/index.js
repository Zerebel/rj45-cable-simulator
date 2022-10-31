const colorSelector = document.querySelectorAll('.color-pick');
const colorChanger = document.querySelectorAll('.color-change');
const selected = document.querySelector('#selected-color');

let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

const dragItem = (e) => {
  selected.style.left = e.pageX + 'px';
  selected.style.top = e.pageY - 60 + 'px';
};

document.addEventListener('mousemove', dragItem, false);
let color = 'bg-white';
const getClickedItem = () =>
  colorSelector.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (button.classList.contains('bg-orange-white'))
        return (
          (color = 'bg-orange-white-repeat') &&
          selected.classList.add('bg-orange-white-repeat')
        );
      if (button.classList.contains('bg-[#ffa500]'))
        return (
          (color = 'bg-[#ffa500]') && selected.classList.add('bg-[#ffa500]')
        );
      if (button.classList.contains('bg-green-white'))
        return (color = 'bg-green-white-repeat');
      if (button.classList.contains('bg-[#008000]'))
        return (color = 'bg-[#008000]');
      if (button.classList.contains('bg-[#0000ff]'))
        return (color = 'bg-[#0000ff]');
      if (button.classList.contains('bg-blue-white'))
        return (color = 'bg-blue-white-repeat');
      if (button.classList.contains('bg-[#9d5f04]'))
        return (color = 'bg-[#9d5f04]');
      if (button.classList.contains('bg-brown-white'))
        return (color = 'bg-brown-white-repeat');
    });
  });
getClickedItem();

const changeItemColor = () =>
  colorChanger.forEach((wire) => {
    wire.addEventListener('click', (e) => {
      color != 'bg-white' ? wire.classList.remove('bg-white') : null;
      wire.classList.remove(...wire.classList);
      wire.classList.add('h-4', 'color-change', 'cursor-pointer');
      return wire.classList.add(color);
    });
  });
changeItemColor();
