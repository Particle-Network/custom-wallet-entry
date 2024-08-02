import { useAuthCore, useConnect } from '@particle-network/auth-core-modal';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const { connect, disconnect, connectionStatus } = useConnect();
    const { openWallet, buildWalletUrl } = useAuthCore();
    const [walletUrl, setWalletUrl] = useState<string>('');
    const handleConnect = async () => {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {connectionStatus !== 'connected' && (
                    <>
                        <button className={styles.btn} onClick={handleConnect}>
                            {connectionStatus === 'disconnected' ? 'CONNECT' : connectionStatus.toUpperCase()}
                        </button>
                    </>
                )}

                {connectionStatus === 'connected' && (
                    <>
                        <button
                            className={styles.btn}
                            style={{ backgroundColor: 'green' }}
                            onClick={() => {
                                openWallet({
                                    windowSize: 'small',
                                    topMenuType: 'close',
                                });
                            }}
                        >
                            Open Wallet
                        </button>
                        <button
                            className={styles.btn}
                            style={{ backgroundColor: 'blue' }}
                            onClick={() => {
                                setWalletUrl(
                                    buildWalletUrl({
                                        topMenuType: 'close',
                                    })
                                );
                            }}
                        >
                            Build Wallet Url
                        </button>
                        {walletUrl && (
                            <iframe
                                id="particle-auth-core-iframe-wallet"
                                style={{
                                    width: '400px',
                                    height: '700px',
                                }}
                                src={walletUrl}
                            />
                        )}
                        <button className={styles.btn} onClick={handleDisconnect}>
                            DISCONNECT
                        </button>
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
