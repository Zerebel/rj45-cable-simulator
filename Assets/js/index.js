const colorSelector = document.querySelectorAll('.color-pick');
const colorChanger = document.querySelectorAll('.color-change');
const selected = document.querySelector('#selected-color');

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
        return setSelectedColor('bg-orange-white-repeat');
      if (button.classList.contains('bg-[#ffa500]'))
        return setSelectedColor('bg-[#ffa500]');
      if (button.classList.contains('bg-green-white'))
        return setSelectedColor('bg-green-white-repeat');
      if (button.classList.contains('bg-[#008000]'))
        return setSelectedColor('bg-[#008000]');
      if (button.classList.contains('bg-[#0000ff]'))
        return setSelectedColor('bg-[#0000ff]');
      if (button.classList.contains('bg-blue-white'))
        return setSelectedColor('bg-blue-white-repeat');
      if (button.classList.contains('bg-[#9d5f04]'))
        return setSelectedColor('bg-[#9d5f04]');
      if (button.classList.contains('bg-brown-white'))
        return setSelectedColor('bg-brown-white-repeat');
    });
  });
getClickedItem();

const setSelectedColor = (newColor) => {
  selected.classList.remove(...selected.classList);
  selected.classList.add(newColor, 'w-6', 'h-6', 'rounded-full', 'absolute');
  return (color = newColor);
};
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
