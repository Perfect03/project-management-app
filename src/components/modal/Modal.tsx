import React, { FC } from 'react';
import './modal.scss';

const Modal: FC<{
  isVisible: boolean;
  title: string;
  content: JSX.Element;
  onClose: () => void;
}> = ({ isVisible = false, title, content, onClose }) => {
  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
};

export { Modal };
