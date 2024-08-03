import { useAuthCore, useConnect } from '@particle-network/auth-core-modal';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // Import the Prism theme

// Import code snippets
import { openWalletCode, buildWalletUrlCode, particleIframeCss, iframeLocation } from '../src/utils/codeSnippets';

// Import text content
import {
    buildWalletUrlDescription1,
    buildWalletUrlDescription2,
    openWalletDescription1,
    openWalletDescription2,
} from '../src/utils/textContent';

// UI component to display links to the Particle sites
import LinksGrid from '../src/components/Links';
import Header from '../src/components/Header';
import Tooltip from '../src/components/Tooltip'; // Import the Tooltip component

const Home: NextPage = () => {
    // Connect and wallet hooks
    const { connect, disconnect, connectionStatus } = useConnect();
    const { openWallet, buildWalletUrl } = useAuthCore();

    // State to store the wallet URL and modal visibility
    const [walletUrl, setWalletUrl] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Apply syntax highlighting
    // Can ignore this
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    // Add the message event listener
    // This is required to close the wallet from the 'x' button
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data === 'PARTICLE_WALLET_CLOSE_IFRAME') {
                console.log('Wallet iframe closed.');
                setIsModalOpen(false);
                setWalletUrl(''); // Optionally clear the wallet URL or take other actions
            }
        };

        window.addEventListener('message', handleMessage);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    // Connection handling
    const handleConnect = async () => {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    };

    // Disconnection handling
    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.log(error);
        }
    };

    // Open the wallet modal from a custom button
    // This will open based on the CSS style
    const toggleParticleWallet = async () => {
        openWallet({
            windowSize: 'small',
            topMenuType: 'close',
        });
    };

    // Open the wallet modal from a custom button
    // With this you can plce the iframe where you want
    const generateWalletUrl = async () => {
        const url = buildWalletUrl({
            topMenuType: 'close',
        });

        // Associate the URL in the state and open the modal
        setWalletUrl(url);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
                {connectionStatus !== 'connected' ? (
                    <div className="flex justify-center">
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                            onClick={handleConnect}
                        >
                            {connectionStatus === 'disconnected' ? 'CONNECT' : connectionStatus.toUpperCase()}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
                            {/* Open Wallet Card */}
                            <div className="border border-purple-500 p-8 rounded-lg shadow-xl flex flex-col items-center bg-gray-900 relative">
                                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                                    <pre className="m-0">openWallet</pre>
                                </h3>
                                <p
                                    className="text-gray-300 mb-6 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: openWalletDescription1 }}
                                />
                                <p
                                    className="text-gray-300 mb-6 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: openWalletDescription2 }}
                                />

                                <div className="relative group mb-6 flex items-center">
                                    <p className="text-gray-300 mr-2 leading-relaxed">How it's set up in this app:</p>
                                    <Tooltip code={particleIframeCss} language="css" position="top" />
                                </div>

                                <div className="flex items-center mt-4">
                                    <Tooltip code={openWalletCode} language="javascript" position="left" />
                                    {/* Call  toggleParticleWallet when clicking the button*/}
                                    <button
                                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                        onClick={toggleParticleWallet}
                                    >
                                        Open Wallet
                                    </button>
                                </div>
                            </div>

                            {/* Build Wallet Url Card */}
                            <div className="border border-purple-500 p-8 rounded-lg shadow-xl flex flex-col items-center bg-gray-900 relative">
                                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                                    <pre className="m-0">buildWalletUrl</pre>
                                </h3>
                                <p
                                    className="text-gray-300 mb-6 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: buildWalletUrlDescription1 }}
                                />
                                <p
                                    className="text-gray-300 mb-6 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: buildWalletUrlDescription2 }}
                                />

                                <div className="relative group mb-6 flex items-center">
                                    <p className="text-gray-300 mr-2 leading-relaxed">Example setup:</p>
                                    <Tooltip code={iframeLocation} language="javascript" position="top" />
                                </div>

                                <div className="flex items-center mt-4">
                                    <Tooltip code={buildWalletUrlCode} language="javascript" position="right" />

                                    {/* Call generateWalletUrl when clicking the button*/}
                                    <button
                                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                        onClick={generateWalletUrl}
                                    >
                                        Build Wallet Url
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal for Wallet URL Iframe */}
                        {/* The Wallet URL generate is used in the Iframe here */}
                        {/* The iframe ID must be "particle-auth-core-iframe-wallet" */}
                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                                <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-xl font-bold text-purple-400">Wallet Iframe</h4>
                                        <button
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                    {walletUrl && (
                                        <iframe
                                            id="particle-auth-core-iframe-wallet"
                                            className="w-full h-96 border-0"
                                            src={walletUrl}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Disconnect Button */}
                        <button
                            className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                            onClick={handleDisconnect}
                        >
                            DISCONNECT
                        </button>
                    </div>
                )}
                <LinksGrid />
            </main>
        </div>
    );
};

export default Home;
