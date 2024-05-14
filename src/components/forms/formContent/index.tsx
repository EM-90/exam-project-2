
import React from 'react';

export const TextInput = ({ name, value, onChange, placeholder, type = 'text', required = false }) => (
    <input
        className="w-full px-3 py-2 my-4 border rounded-md focus:outline-none focus:border-skin-InputBorder"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
    />
);

 export const Checkbox = ({ name, checked, onChange, label }) => (
    <label>
        <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        />{' '}
        {label}
    </label>
);

export const TextArea = ({ name, value, onChange, placeholder, required = false }) => (
    <textarea
        className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
    />
);





