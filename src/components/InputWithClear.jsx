import React, { useState, useEffect } from 'react';

const InputWithClear = ({ user, updateremarks, initialDescription, placeholderText }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(initialDescription);
  }, [initialDescription]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = async () => {
    setInputValue('');
    await handleUpdateRemarks(''); // Clear button press sends an empty string
  };

  const handleSubmit = async () => {
    if (inputValue) {
      await handleUpdateRemarks(inputValue);
    }
  };

  const handleUpdateRemarks = async (value) => {
    await updateremarks(value);
    alert('備考欄が更新されました'); // Display alert when remarks are updated
  };

  return (
    <div style={styles.inputWithClear}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholderText} // Placeholder text
        style={styles.input}
      />
      {inputValue && (
        <button style={styles.clearButton} onClick={handleClear}>
          ×
        </button>
      )}
      <button style={styles.submitButton} onClick={handleSubmit}>
        送信
      </button>
    </div>
  );
};

const styles = {
  inputWithClear: {
    position: 'relative',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  clearButton: {
    position: 'absolute',
    right: '90px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
  submitButton: {
    marginLeft: '10px',
    padding: '8px 16px',
    background: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default InputWithClear;
