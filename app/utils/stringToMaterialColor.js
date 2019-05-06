import hashString from './hashString';

const materialColors = [
  { name: 'red', style: { background: '#f44336', color: '#fff' } },
  { name: 'pink', style: { background: '#e91e63', color: '#fff' } },
  { name: 'purple', style: { background: '#9c27b0', color: '#fff' } },
  { name: 'deepPurple', style: { background: '#673ab7', color: '#fff' } },
  { name: 'indigo', style: { background: '#3f51b5', color: '#fff' } },
  { name: 'blue', style: { background: '#2196f3', color: '#fff' } },
  { name: 'lightBlue', style: { background: '#03a9f4', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'cyan', style: { background: '#00bcd4', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'teal', style: { background: '#009688', color: '#fff' } },
  { name: 'green', style: { background: '#4caf50', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'lightGreen', style: { background: '#8bc34a', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'lime', style: { background: '#cddc39', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'yellow', style: { background: '#ffeb3b', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'amber', style: { background: '#ffc107', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'orange', style: { background: '#ff9800', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'deepOrange', style: { background: '#ff5722', color: '#fff' } },
  { name: 'brown', style: { background: '#795548', color: '#fff' } },
  { name: 'red', style: { background: '#', color: '#fff' } },
  { name: 'grey', style: { background: '#9e9e9e', color: 'rgba(0, 0, 0, 0.87)' } },
  { name: 'blueGrey', style: { background: '#607d8b', color: '#fff' } },
];

const stringToMaterialColors = (str = '') => materialColors[Math.abs(hashString(str)) % materialColors.length];

export default stringToMaterialColors;
