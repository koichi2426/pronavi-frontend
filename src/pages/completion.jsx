import React, { useEffect, useRef } from 'react';

const Completion = () => {
  const downloadRef = useRef(null);

  useEffect(() => {
    // Scroll to the download section after 2 seconds
    const timer = setTimeout(() => {
      downloadRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.messageContainer}>
        <h1 style={styles.title}>登録完了</h1>
      </div>
      <div ref={downloadRef} style={styles.downloadSection}>
        <p style={styles.instruction}>こちらからこのサービスの使い方を説明したPDFをダウンロードできます:</p>
        <a href="/path/to/guide.pdf" download style={styles.downloadButton}>
          PDFをダウンロード
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    width: '100%',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#007bff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  downloadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  instruction: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    textAlign: 'center',
  },
};

export default Completion;
