// SignatureCanvas.js
import { useEffect, useRef } from "react";

const SignatureCanvas = ({ onSave }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      e.preventDefault(); // Prevent scrolling on touch devices
      canvas.focus(); // Focus on the canvas
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      [lastX, lastY] = [
        e.offsetX || e.touches[0]?.clientX || 0,
        e.offsetY || e.touches[0]?.clientY || 0,
      ];
    };

    const draw = (e) => {
      e.preventDefault(); // Prevent scrolling on touch devices
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.offsetX || (e.touches[0] && e.touches[0].clientX) || 0;
      const offsetY = e.offsetY || (e.touches[0] && e.touches[0].clientY) || 0;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      [lastX, lastY] = [offsetX, offsetY];
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("touchstart", startDrawing);

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchmove", draw);

    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchend", stopDrawing);

    canvas.addEventListener("mouseout", stopDrawing);
    canvas.addEventListener("touchcancel", stopDrawing);
    canvas.addEventListener("touchleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("touchstart", startDrawing);

      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchmove", draw);

      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("touchend", stopDrawing);

      canvas.removeEventListener("mouseout", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
      canvas.removeEventListener("touchleave", stopDrawing);
    };
  }, []);

  const clearCanvas = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.blur(); // Blur the canvas to exit focus
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    onSave(dataURL);
  };

  return (
    <div className="field">
      <canvas
        tabIndex="0"
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid #000" }}
      />
      <button className="button" onClick={clearCanvas}>
        Clear Signature
      </button>
      <button className="button" onClick={saveSignature}>
        Save Signature
      </button>
    </div>
  );
};

export default SignatureCanvas;
