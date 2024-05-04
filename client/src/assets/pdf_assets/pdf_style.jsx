import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width:350,
        height: 100,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
    },
    sname: {
        fontSize: 60,
        marginBottom: 20,
        textAlign: 'center',
        color: 'darkblue',
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
});