import React from 'react';

export const TextInput = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => (
    <label className="block mb-4">
        <span className="block font-medium mb-1">{label}</span>
        <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    </label>
);

export const Checkbox = ({ name, checked, onChange, label }) => (
    <label className="flex items-center gap-1">
        <input
            className="w-5 h-5 rounded border border-gray-300 cursor-pointer focus:outline-none focus:border-skin-primary"
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        />{' '}
        {label}
    </label>
);

export const TextArea = ({ label, name, value, onChange, placeholder, required = false }) => (
    <label className="block mb-4">
        <span className="block font-medium mb-1">{label}</span>
        <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    </label>
);





