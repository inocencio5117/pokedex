function createItem(pageUrl, valueToBeStored) {
  const url = localStorage.getItem(pageUrl.split('?'));
  if (url) {
    localStorage.setItem(url, JSON.stringify(valueToBeStored));
  }
}

function getItem(itemKey) {
  const item = localStorage.getItem(itemKey);
  return item;
}

function removeItem(itemKey) {
  localStorage.removeItem(itemKey);
}

export { createItem, getItem, removeItem };
