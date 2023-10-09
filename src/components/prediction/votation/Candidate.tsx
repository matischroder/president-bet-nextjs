import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Slider from 'rc-slider'; // Replace with a suitable slider component (e.g., rc-slider)
import 'rc-slider/assets/index.css'; // Import the CSS for the slider component

interface Props {
    candidateName: string;
    percentage: number | string;
    image: StaticImageData;
    backgroundColor: string[];
    setPercentage: (value: number | string) => void;
}

const Candidate: React.FC<Props> = ({
    candidateName,
    percentage,
    image,
    backgroundColor,
    setPercentage,
}) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        // Comma fixes
        if (newValue.includes(',')) {
            if (newValue.length === 1) return setPercentage('0.');
            if (newValue.includes('.')) newValue = newValue.slice(0, -1);
            else newValue = newValue.replace(',', '.');
        }

        // Zero fixes
        if (!newValue.includes('.') && !newValue.includes(',') && newValue.includes('0')) {
            if (newValue.length > 2) {
                if (newValue.startsWith('0')) return setPercentage(newValue.slice(1));
            }
        }

        // Limit
        if (Number(newValue) > 100) return setPercentage(newValue.slice(0, -1));

        // Float fixes
        if (newValue.includes('.')) {
            const splitString = newValue.split('.');
            if (splitString[1].length > 2) return setPercentage(splitString[0] + '.' + splitString[1].slice(0, -1));
        }

        newValue === '' ? setPercentage('') : setPercentage(newValue);
    };
    return (
        <div className="my-4 flex flex-row justify-around w-full">
            <div className={`w-[60px] aspect-square z-0 flex rounded-full justify-center`}
                style={{
                    background: `linear-gradient(to bottom, ${backgroundColor.map(color => color).join(', ')})`,
                }}
            >
                <Image src={image} alt={candidateName} className="self-center bg-black w-14 h-14 rounded-full z-10" width={57} height={57} />
            </div>

            <div className='basis-[60%] px-5'>
                <p className='absolute text-xs font-bold ml-2'>{candidateName}</p>
                <div className='relative flex items-center justify-center h-full'>
                    <Slider
                        className=""
                        value={Number(percentage)}
                        onChange={(value) => typeof value === "number" && setPercentage(value.toFixed(1))}
                        min={0}
                        max={100}
                        step={0.1}
                        trackStyle={{ backgroundColor: '#FFFFFF' }}
                        handleStyle={{ borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' }}
                    />
                </div>
            </div>
            <input
                type="number"
                inputMode="decimal"
                className="bg-white text-black w-14 text-center text-base my-4 rounded-md"
                value={percentage.toString()}
                onChange={handleInput}
            />
        </div>
    );
};

export default Candidate;
