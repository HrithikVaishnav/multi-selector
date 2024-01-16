import React, { useRef, useState, useEffect } from 'react';
import Chips from './Chips';
import Img from '../assets/img.jpg';
import './style.css';
import peoples from '../assets/peoples.json';

interface Option {
  value: string;
  label: string;
  image: string;
  email: string;
}

const MultiSelectSimple: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [currentInput, setCurrentInput] = useState<string>('');
    const [options, setOptions] = useState<Option[]>(peoples.map(person => ({ ...person, image: Img })));
    const [isOptionsVisible, setOptionsVisible] = useState(false);
    const [lastChipHighLight, setLastChipHighLight] = useState(false);
    const optionsListRef = useRef<HTMLDivElement | null>(null);
    const lastChipRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const focusedElementRef = useRef<HTMLElement | null>(null);

    // to update input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(e.target.value);
        setOptionsVisible(true);
        setLastChipHighLight(false);
    };

    // to update changes in select 
    const handleSelectChange = (selectedValue: string) => {
        if (selectedValue) {
            const selectedOption = options.find(option => option.value === selectedValue);
            setLastChipHighLight(false);
            if (selectedOption) {
                setSelectedOptions([...selectedOptions, selectedOption]);
                setCurrentInput('');
                const updatedOptions = options.filter(option => option.value !== selectedValue);
                setOptions(updatedOptions);
                setOptionsVisible(false);
            }
        }
    };

    // to remove element from list 
    const handleRemoveOption = (value: string) => {
        const removedOption = selectedOptions.find(option => option.value === value);
        if (removedOption) {
            const updatedOptions = selectedOptions.filter(option => option.value !== value);
            setSelectedOptions(updatedOptions);
            setOptions([...options, removedOption]);
        }
    };

    // to handle backspace functionality
    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && currentInput === '' && selectedOptions.length > 0) {
            if (focusedElementRef.current !== inputRef.current && lastChipHighLight) {
                const lastChip = selectedOptions[selectedOptions.length - 1];
                handleRemoveOption(lastChip.value);
                focusedElementRef.current?.focus();
                setLastChipHighLight(false);
            } else {
                setLastChipHighLight(true);
            }
        }
    };

    // handling filtered data changes
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(currentInput.toLowerCase())
    );

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (optionsListRef.current && !optionsListRef.current.contains(event.target as Node)) {
                setOptionsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className='mainContainer'>
            <h1>
                Search Users
            </h1>
            <div className='inputContainer'>
                <div className='chipsContainer'>
                    {selectedOptions.map((selectedOption, index) => (
                    <Chips
                        key={selectedOption.value}
                        label={selectedOption.label}
                        onRemove={() => handleRemoveOption(selectedOption.value)}
                        isLast={index === selectedOptions.length - 1 && lastChipHighLight}
                        ref={index === selectedOptions.length - 1 ? lastChipRef : null}
                    />
                    ))}
                    <div className='customSelectContainer'>
                        <input
                            type='text'
                            value={currentInput}
                            onChange={handleInputChange}
                            onKeyDown={handleBackspace}
                            placeholder='Type to select...'
                            className='customInput'
                            onClick={() => setOptionsVisible(true)}
                            ref={inputRef}
                        />
                        {isOptionsVisible && (
                            <div className='optionsList' ref={optionsListRef}>
                            {filteredOptions.map(option => (
                                <div
                                    key={option.value}
                                    className='customOption'
                                    onClick={() => handleSelectChange(option.value)}
                                >
                                    <img className='profileImage mg4' src={option.image} alt='' />
                                    <div className='optionLabel mg4'>{option.label}</div>
                                    <div className='optionEmail mg4'>{option.email}</div>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default MultiSelectSimple;
