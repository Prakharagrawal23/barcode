import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "./BarcodeGenerator.css";

function BarcodeGenerator() {
  const barcodeRef = useRef(null);
  const location = useLocation();
  const [showBarcode, setShowBarcode] = useState(true); // Set default to true if you want the barcode shown initially
  const [isEditing, setIsEditing] = useState(false);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [shipment, setShipment] = useState("");
  const [trackId, setTrackId] = useState("");

  // Initialize state with location data if available
  useEffect(() => {
    const { sender, receiver, shipment, trackId } = location.state || {};
    if (sender) setSender(sender);
    if (receiver) setReceiver(receiver);
    if (shipment) setShipment(shipment);
    if (trackId) setTrackId(trackId);
  }, [location.state]);

  // Update barcode when showBarcode or any of the fields change
  useEffect(() => {
    if (trackId && showBarcode && barcodeRef.current) {
      const barcodeData = `S:${sender},R:${receiver},Sh:${shipment},T:${trackId}`;
      JsBarcode(barcodeRef.current, barcodeData, {
        format: "CODE128",
        displayValue: true,
        fontSize: 18,
        width: 2,
        height: 50,
        margin: 0,
      });
    }
  }, [showBarcode, sender, receiver, shipment, trackId]);

  const handleDownloadPNG = async () => {
    const canvas = await html2canvas(
      document.querySelector(".barcode-container")
    );
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${trackId}-barcode.png`;
    link.click();
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    html2canvas(document.querySelector(".barcode-container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save(`${trackId}-barcode.pdf`);
    });
  };

  const toggleBarcodeVisibility = () => {
    setShowBarcode(!showBarcode);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "sender":
        setSender(value);
        break;
      case "receiver":
        setReceiver(value);
        break;
      case "shipment":
        setShipment(value);
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Any additional logic to save the data can be added here
  };

  if (!trackId) {
    return (
      <div className="error">
        Track ID is missing. Please submit the form first.
      </div>
    );
  }

  return (
    <div className="barcode-container">
      <h3>Shipment Barcode</h3>
      <div className="details">
        <label>
          Sender:
          {isEditing ? (
            <input
              type="text"
              name="sender"
              value={sender}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{sender}</span>
          )}
        </label>
        <label>
          Receiver:
          {isEditing ? (
            <input
              type="text"
              name="receiver"
              value={receiver}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{receiver}</span>
          )}
        </label>
        <label>
          Shipment:
          {isEditing ? (
            <input
              type="text"
              name="shipment"
              value={shipment}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{shipment}</span>
          )}
        </label>
        <label>
          Track ID:
          <span>{trackId}</span>
        </label>
      </div>
      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button onClick={toggleBarcodeVisibility}>
          {showBarcode ? "Hide Barcode and Download Options" : "Show Barcode and Download Options"}
        </button>
      </div>
      {showBarcode && (
        <>
          <svg ref={barcodeRef}></svg>
          <div className="buttons">
            <button onClick={handleDownloadPNG}>Download as PNG</button>
            <button onClick={handleDownloadPDF}>Download as PDF</button>
          </div>
        </>
      )}
    </div>
  );
}

export default BarcodeGenerator;
