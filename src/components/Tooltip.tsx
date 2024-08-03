// src/components/Tooltip.tsx

import { ReactNode, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface TooltipProps {
    code: string;
    language: string;
    children?: ReactNode;
    position?: 'left' | 'right' | 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ code, language, children, position = 'right' }) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code]);

    const positionClasses = {
        left: 'right-full transform mt-2',
        right: 'left-1/2 transform -translate-x-1/2 -mt-1',
        top: 'bottom-full transform mb-2',
        bottom: 'top-full transform mt-2',
    };

    return (
        <span className="relative group">
            <QuestionCircleOutlined className="text-purple-400 hover:text-purple-300 cursor-pointer transition duration-300 mr-4" />
            <div
                className={`absolute ${positionClasses[position]} w-72 p-4 bg-purple-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
            >
                <pre className="whitespace-pre-wrap">
                    <code className={`language-${language}`} ref={codeRef}>
                        {code}
                    </code>
                </pre>
                {children}
            </div>
        </span>
    );
};

export default Tooltip;
