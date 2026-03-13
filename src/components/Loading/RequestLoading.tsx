import { Root, createRoot } from 'react-dom/client';
import Loading from './index';

let loadingCount = 0;

const div = document.createElement('div');
document.body.appendChild(div);
let root: Root;

export const showLoading = () => {
  if (loadingCount === 0) {
    root = createRoot(div);
    root.render(<Loading mask={true} />);
  }
  loadingCount++;
};

export const hideLoading = () => {
  if (loadingCount <= 0) return;
  loadingCount--;
  if (loadingCount === 0) {
    root?.unmount();
  }
};
