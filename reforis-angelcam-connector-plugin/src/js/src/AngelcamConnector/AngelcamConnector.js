import React, { createRef, useEffect, useState } from "react";
import { useAPIGet } from "foris";

import API_URLs from "API";

import './style.css';

export default function AngelcamConnector() {
    const [uuid, getUUID] = useAPIGet(API_URLs.uuid);
    const [statusResponse, getStatus] = useAPIGet(API_URLs.status);
    const [logsResponse, getLogs] = useAPIGet(API_URLs.logs);

    const [showLogMessages, setShowLogMessages] = useState(false);
    const [logMessages, setLogMessages] = useState('');
    const [clientStatus, setClientStatus] = useState('N/A');

    const textArea = createRef();

    useEffect(() => {
        getUUID();
        getStatus();
        getLogs();

        setInterval(() => {
            getStatus();
            getLogs();
        }, 1000);
    }, []);

    useEffect(() => {
        if (statusResponse.state === 'success') {
            setClientStatus(statusResponse.data);
        }
    }, [statusResponse]);

    useEffect(() => {
        if (logsResponse.state === 'success') {
            setLogMessages(logsResponse.data);
        }
    }, [logsResponse]);

    useEffect(() => {
        scrollToBottom();
    }, [logMessages]);

    const toggleLogMessages = () => {
        setShowLogMessages(!showLogMessages);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        textArea.current.scrollTop = textArea.current.scrollHeight;
    };

    return (
        <>
            <h1>Angelcam Connector</h1>
            <div className="angelcam-connector__details">
                <div className="angelcam-connector__details-section">
                    <div className="angelcam-connector__details-section--label">
                        {_("Client UUID:")}
                    </div>
                    <div className="angelcam-connector__details-section--value">
                        {uuid.state === 'success' ? uuid.data : 'N/A'}
                    </div>
                </div>
                <div className="angelcam-connector__details-section">
                    <div className="angelcam-connector__details-section--label">
                        {_("Client status:")}
                    </div>
                    <div className="angelcam-connector__details-section--value">
                        {clientStatus}
                    </div>
                </div>
            </div>
            {uuid.state === 'success' && (
                <div className="angelcam-connector__cta">
                    <a href={`https://my.angelcam.com/connect/angelcam-ready-direct/${uuid.data}/`} target="_blank">
                        {_("Connect to Angelcam")}
                    </a>
                </div>
            )}
            <div className="angelcam-connector__logs">
                <h2 onClick={toggleLogMessages}>{showLogMessages ? '▾' : '▸'} {_("Client log messages")}</h2>
                <textarea
                    ref={textArea}
                    className={'angelcam-connector__log-messages' + (showLogMessages ? ' is-visible' : '')}
                    value={logMessages}
                />
            </div>
        </>
    );
}
