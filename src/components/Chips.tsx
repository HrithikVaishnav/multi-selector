import React, { forwardRef } from 'react';
import Img from '../assets/img.jpg';
import { MdCancel } from 'react-icons/md';

interface ChipsProps {
  label: string;
  onRemove: () => void;
  isLast: boolean;
}

const Chips: React.ForwardRefRenderFunction<HTMLDivElement, ChipsProps> = ({ label, onRemove, isLast }, ref) => (
  <div className={`chip ${isLast ? 'lastChip' : ''}`} ref={ref}>
    <img className='profileImage mg4' src={Img} alt='' />
    <p className='mg4'>{label}</p>
    <MdCancel className='mg4' onClick={onRemove} />
  </div>
);

export default forwardRef(Chips);
