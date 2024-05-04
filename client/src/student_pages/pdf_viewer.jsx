import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer, Document, Page, Text, View, Image, BlobProvider} from '@react-pdf/renderer';
import { styles } from '../assets/pdf_assets/pdf_style';
import logoImage from '../assets/pdf_assets/icon.jpg';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { saveAs } from 'file-saver';

function PdfViewer() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [result, setResult] = useState({});

  useEffect(() => {
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    setUser(user);

    const user_id = user._id;
    const res_id = id;

    axios.post("http://127.0.0.1:3001/result/getcertificate/", { user_id, res_id })
      .then((result) => {
        setResult(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const pdfContent = (
    <Document>
      <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.section}>

          <View style={styles.header}>
            <Image src={logoImage} style={styles.logo} />
          </View>

          <Text style={styles.title}>Certificate of Completion</Text>

          <Text style={styles.subtitle}>This is to certify that</Text>
          <Text style={styles.sname}>{user.name}</Text>

          <Text style={styles.subtitle}>has successfully completed the course</Text>
          <Text style={styles.info}>Course Name: {result.course_name}</Text>
          <Text style={styles.info}>Course ID: {result._id}</Text>

          <Text style={styles.info}>Score: {result.score}%</Text>
          <Text style={styles.info}>Date: {result.timestamp}</Text>
        </View>
      </Page>
    </Document>
  );

  const handleDownloadPdf = () => {
    const handleBlob = (blob) => {
      saveAs(blob, 'certificate.pdf');
    };

    return (
      <BlobProvider document={pdfContent}>
        {({ blob }) => (
          <button onClick={() => handleBlob(blob)} className='btn btn-primary w-25 my-1'>Download PDF</button>
        )}
      </BlobProvider>
    );
  };

  return (
    <div className='bg-white p-3'>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        {pdfContent}
      </PDFViewer>
      {handleDownloadPdf()}
    </div>
  );
}

export default PdfViewer;
