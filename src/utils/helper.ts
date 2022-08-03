import mongoose from 'mongoose';
export const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export function randomInt(min = 1_000_000, max: any = null) {
  if (max == null) return Math.floor(Math.random() * min) + min;
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomFloat(min = 1, max: any = null) {
  if (max == null) return parseFloat((Math.random() * min + min).toFixed(1));
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

export function sortObject(object) {
  const sorted: any = {};
  const array: any = [];
  let key: any = [];
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      array.push(key);
    }
  }
  array.sort();
  for (key = 0; key < array.length; key++) {
    sorted[array[key]] = object[array[key]];
  }
  return sorted;
}

export function exclude(objects, excludeIds) {
  const filterExcludeIds = excludeIds?.filter((e) => e);
  return objects?.filter((object) => !filterExcludeIds.includes(object?.id) && !filterExcludeIds.includes(object?._id));
}

export const ObjectId = mongoose.Types.ObjectId;
