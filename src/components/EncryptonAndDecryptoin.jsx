import React, { useState } from 'react';
import { FiCopy, FiCheck, FiX } from 'react-icons/fi'; // New icons added

function EncryptonAndDecryptoin() {
    const mapping = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6,
        'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12,
        'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18,
        'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24,
        'Y': 25, 'Z': 26, ' ': 0
    };

    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [mode, setMode] = useState('encrypt');
    const [showPopup, setShowPopup] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [isCopying, setIsCopying] = useState(false);

    const handleChange = (e) => {
        const input = e.target.value.toUpperCase();
        setText(e.target.value);
        let output = '';

        for (let i = 0; i < input.length; i++) {
            const char = input[i];

            if (mapping.hasOwnProperty(char)) {
                let value = mapping[char];

                if (mode === 'encrypt') {
                    value = (value + 3) % 27;
                } else {
                    value = (value - 3 + 27) % 27;
                }

                let encryptedChar = Object.keys(mapping).find(key => mapping[key] === value);
                output += encryptedChar !== undefined ? encryptedChar : char;
            } else {
                output += char;
            }
        }
        setResult(output);
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const selectMode = (selectedMode) => {
        setMode(selectedMode);
        closePopup();
        setText('');
        setResult('');
    };

    const handleCopy = async () => {
        if (isCopying) {
            setError('Wait!!!');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        try {
            await navigator.clipboard.writeText(result);
            setCopied(true);
            setIsCopying(true);
            setError('Your text is copied');

            setTimeout(() => {
                setCopied(false);
                setIsCopying(false);
            }, 4000);

            setTimeout(() => {
                setError('');
            }, 2000);
        } catch (err) {
            setError('Failed to copy!');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen border-2  flex flex-col items-center justify-center bg-gradient-to-br from-black to-red-600 p-6">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative border border-white/30">

               
                <h1 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
                    {mode === 'encrypt' ? 'Encrypt Mode' : 'Decrypt Mode'}
                </h1>

                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Type here..."
                    className="w-full mb-6 p-4 bg-white/20 text-white placeholder-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-md"
                />

                <div className="h-60 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Result:</h2>
                         {/* Error Message */}
                <div className=" h-5  ">
                    {error && (
                        <p className="text-center  text-red-400  md:font-semibold ">{error}</p>
                    )}
                </div>
                        <button
                            onClick={handleCopy}
                            disabled={isCopying}
                            className=" cursor-copy border-t border-l rounded-t-xl  border-r p-1 w-10 md:w-20 h-9 border-white/20 bg-white/10 flex items-center justify-center"
                        >
                            {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
                        </button>
                    </div>

                    <div className="bg-white/10 p-4 h-50 overflow-y-auto rounded-b-xl rounded-tl-xl border  border-white/20 mb-6 backdrop-blur-md">
                        <p className="break-words">{result}</p>
                    </div>
                </div>

                <button
                    onClick={openPopup}
                    className="w-full bg-[#EDD377]/60 cursor-pointer hover:bg-[#EDD377]/30 text-white font-bold py-3 rounded-xl transition backdrop-blur-md"
                >
                    Switch Method
                </button>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center w-full justify-center bg-black/40 z-50 rounded-2xl"
                    onClick={closePopup}
                >
                    <div className="bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 space-y-6 h-70 w-80">
                   <div className="absolute top-2 right-2 cursor-pointer" >
                    <button
                                onClick={closePopup}
                                className=" bg-red-400/90 hover:bg-red-400/60 text-white p-1 rounded-2xl transition font-semibold"
                            >
                                <FiX size={20} />
                            </button>
                            </div>
                        <h2 className="text-2xl font-bold text-center text-white">Select Mode</h2>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => selectMode('encrypt')}
                                className=" bg-[#EDD377]/60 hover:bg-[#EDD377]/30 text-white py-2 rounded-xl transition font-semibold"
                            >
                                Encrypt
                            </button>
                            <button
                                onClick={() => selectMode('decrypt')}
                                className=" bg-[#EDD377]/60  hover:bg-[#EDD377]/30 text-white py-2 rounded-xl transition font-semibold"
                            >
                                Decrypt
                            </button>
                         
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EncryptonAndDecryptoin;
