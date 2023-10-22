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

    const isAccessAllowed = () => {
        const currentTime = new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }); // Obtén la hora actual de Argentina
        const accessTime = new Date('2023-10-22T10:00:00Z').toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });

        const currentTimeTimestamp = new Date(currentTime).getTime();
        const accessTimeTimestamp = new Date(accessTime).getTime();

        return currentTimeTimestamp <= accessTimeTimestamp;
    }

    const isAllowed = isAccessAllowed(); // Asegúrate de tener esta función en tu código
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        let newValue = inputValue.replace(/[^0-9,\.]/g, "");

        // Check for multiple decimal points
        if (newValue.split('.').length > 2) {
            return;
        }

        if (newValue === '.') {
            newValue = '0.';
        }

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

        // Zero fixes
        if (/^0[0-9]+$/.test(newValue)) {
            newValue = newValue.slice(1);
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
        <div className="my-4 flex flex-row justify-around w-full select-none">
            <div className={`w-[60px] aspect-square z-0 flex rounded-full justify-center`}
                style={{
                    background: `linear-gradient(to bottom, ${backgroundColor.map(color => color).join(', ')})`,
                }}
            >
                <Image src={image} alt={candidateName} className="self-center bg-black w-14 h-14 rounded-full z-10" width={57} height={57} />
            </div>

            <div className="w-3/5 px-5 select-none">
                <p className="absolute select-none text-sm font-bold ml-2">{candidateName}</p>
                <div className="relative flex items-center justify-center h-full">
                    <Slider
                        className="w-full min-h-[20px] flex items-center justify-center"
                        value={Number(percentage)}
                        disabled={!isAllowed}
                        onChange={(value) => typeof value === "number" && setPercentage(value.toFixed(1))}
                        min={0}
                        max={100}
                        step={0.1}
                        trackStyle={{ backgroundColor: '#FFFFFF' }}
                        handleStyle={{ borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', height: '18px', width: '18px', margin: '0' }}
                    />
                </div>
            </div>
            <input
                type="text"
                inputMode="decimal"
                pattern="[0-9,.]*"
                disabled={!isAllowed}
                className={`w-16 text-center text-base my-4 rounded-md ${isAllowed
                    ? 'bg-white text-black'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`} value={percentage.toString()}
                onChange={handleInput}
            />
        </div>
    );
};

export default Candidate;
