const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const toggle = document.querySelector('.theme__toggle');

const getCSSCustomProp = propKey => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  if (response.length) {
    response = response.replace(/\"/g, '').trim();
  }

  return response;
};

const applySetting = passedSetting => {
  let currentSetting = passedSetting || sessionStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
  }
};

const toggleSetting = () => {
  let currentSetting = sessionStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  sessionStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
};

toggle.addEventListener('click', evt => {
  evt.preventDefault();

  applySetting(toggleSetting());
});

applySetting();