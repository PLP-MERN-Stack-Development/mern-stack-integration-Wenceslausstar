import React from 'react';
import { ring } from 'ldrs'

const Button = ({ variant, disabled, children, onClick, type, block }) => {

    ring.register();
    let className = 'tw-px-4 tw-py-2 tw-rounded-full tw-transition-all tw-duration-200 tw-shadow-md tw-flex tw-justify-center tw-items-center tw-gap-2 ';
    let loaderColor = 'dark';

    switch (variant) {
        case 'dark':
            className += 'tw-bg-dark tw-text-white hover:tw-bg-opacity-90 hover:tw-shadow-lg '
            loaderColor = 'white';
            if (disabled) {
                className += 'tw-bg-dark tw-text-white hover:tw-bg-opacity-50 hover:tw-shadow-lg tw-bg-opacity-50 tw-cursor-not-allowed ';
            }
            break;

        case 'light':
            className += 'tw-bg-white tw-border-[1px] tw-border-dark tw-text-dark hover:tw-bg-opacity-90 hover:tw-shadow-lg ';
            loaderColor = 'black';
            if (disabled) {
                className += 'tw-bg-opacity-50 hover:tw-bg-opacity-50 tw-cursor-not-allowed ';
            }
            break;
    }

    if (block) {
        className += 'tw-w-full';
    }


    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
            type={type}
        >
            <l-ring
                size="17"
                stroke="3"
                bg-opacity="0"
                speed="2"
                color={loaderColor}
                class={
                    disabled
                        ? 'tw-block'
                        : 'tw-hidden'}
            ></l-ring>
            {children}
        </button>
    );
};

export default Button;