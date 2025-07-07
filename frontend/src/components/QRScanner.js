import React, { useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let lastResult = '';

    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length === 0) {
          console.warn('No video input devices found');
          return;
        }

        const selectedDeviceId = videoInputDevices[0].deviceId;

        codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
          if (result && result.text !== lastResult) {
            lastResult = result.text;
            console.log('QR Code Content:', result.text);
            onScan(result.text);
          }

          if (error && !(error instanceof NotFoundException)) {
            console.error('QR Reader Error:', error);
          }
        });
      })
      .catch((err) => {
        console.error('Camera access error:', err);
      });

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f0f4f8',
  };

  const videoStyle = {
    width: '60%',
    maxWidth: '500px',
    borderRadius: '16px',
    transform: 'scaleX(-1)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    border: '4px solid white',
  };

  const titleStyle = {
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>📷 Scan QR Code</div>
      <video ref={videoRef} style={videoStyle} />
    </div>
  );
};

export default QRScanner;
