import React from 'react'

const Input = ({ onChange, value, label, type, id, align, ...props }) => {
    return (
        <>
            <div className=''>
                <label
                    htmlFor={id}
                    className={`
                        tw-bg-white
                        tw-text-sm
                        tw-font-sans
                        tw-px-1
                        tw-text-gray-500
                        tw-transition-all
                        tw-duration-300
                        tw-ease-in-out
                        tw-text-${align ?? 'center'}
                        tw-w-full`}
                >
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`
                        tw-w-full
                        tw-py-2
                        tw-px-4
                        tw-text-sm
                        tw-font-sans
                        tw-text-gray-700
                        tw-border
                        tw-border-gray-300
                        tw-rounded-md
                        tw-shadow-sm
                        tw-mb-3
                        tw-focus:tw-outline-none
                        tw-focus:tw-ring-1
                        tw-focus:tw-ring-indigo-500
                        tw-focus:tw-border-indigo-500
                        tw-text-${align ?? 'center'}`}
                    placeholder=''
                    {...props}
                />

            </div>
        </>
    )
}

export default Input