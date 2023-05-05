import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import axios from "axios";

import classes from "./PdfReader.module.css";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const utterance = new SpeechSynthesisUtterance();
utterance.rate = 0.8;

const PdfReader = () => {
    const params = useParams();

    const [pageNum, setPageNum] = useState(
        parseInt(localStorage.getItem(params.bookId)) || 1
    );
    const [numPages, setNumPages] = useState(null);
    const [speed, setSpeed] = useState(1);
    const [pendingElements, setPendingElements] = useState([]);
    const [currentElement, setCurrentElement] = useState(null);
    const [meanings, setMeanings] = useState([]);
    const [word, setWord] = useState(null);

    console.log({ pageNum });

    useEffect(() => {
        localStorage.setItem(params.bookId, pageNum);
    }, [params, pageNum]);

    useEffect(() => {
        if (!currentElement) return;

        utterance.addEventListener("end", () => {
            setPendingElements((prev) => {
                const newE = prev.filter(
                    (data) => data.innerText !== currentElement.innerText
                );

                console.log({ newE, prev });

                return newE;
            });
        });
    }, [currentElement]);

    useEffect(() => {
        if (!pendingElements || pendingElements.length === 0) return;

        setCurrentElement(pendingElements[0]);
    }, [pendingElements]);

    useEffect(() => {
        if (!currentElement) return;

        const text = currentElement.textContent;

        currentElement.classList.add(classes.highlight);

        playText(text, speed);

        return () => currentElement.classList.remove(classes.highlight);
    }, [currentElement, speed]);

    const playText = (text, rate) => {
        if (window.speechSynthesis.speaking) return;

        utterance.text = text;
        utterance.rate = rate || 1;

        window.speechSynthesis.speak(utterance);
    };

    const pauseText = () => {
        window.speechSynthesis.pause();
    };

    const stopText = () => {
        speechSynthesis.resume();
        speechSynthesis.cancel();
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => {
        setPageNum(pageNum - 1);
    };

    const goToNextPage = () => {
        setPageNum(pageNum + 1);
    };

    const readPage = () => {
        if (!window?.speechSynthesis) return;

        if (!numPages) return;

        if (window.speechSynthesis.speaking) return;

        const pdf = document?.querySelectorAll(
            `.react-pdf__Page__textContent span`
        );

        const children = [...pdf];

        setPendingElements(children);
    };

    const handleFindMeaning = async () => {
        const selectedText = window.getSelection().toString();

        if (selectedText.split(" ").length > 1)
            return alert("Select a single work to get meaning");

        const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`
        );

        setMeanings(response.data[0].meanings);
        setWord(selectedText);
    };

    return (
        <div className={classes.main}>
            <div className={classes.reader}>
                <Document
                    file="/book.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className={classes.document}
                >
                    <Page pageNumber={pageNum} />
                </Document>
                <div>
                    <Button disabled={pageNum <= 1} onClick={goToPrevPage}>
                        Previous
                    </Button>
                    <Button
                        disabled={pageNum >= numPages}
                        onClick={goToNextPage}
                    >
                        Next
                    </Button>
                    <Button onClick={readPage}>Read Page</Button>
                    <Button onClick={stopText}>Stop</Button>
                    <Button onClick={handleFindMeaning}>Find Meaning</Button>
                </div>
            </div>
            <div className={classes.dictionary}>
                <h1>
                    Select a word and click "Find Meaning" to get the meaning
                </h1>

                <div className={classes.meanings}>
                    <h2 style={{ marginTop: 20 }}>Word - {word}</h2>
                    {meanings.map((pos) => (
                        <div>
                            <h3 style={{ marginTop: 20 }}>
                                {pos.partOfSpeech}
                            </h3>
                            {pos.definitions[0].definition && (
                                <div>
                                    Meaning - {pos.definitions[0].definition}
                                </div>
                            )}
                            {pos.definitions[0].example && (
                                <div>
                                    Example - {pos.definitions[0].example}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PdfReader;
