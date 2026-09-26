import { AIDetection, HazardType } from '../types';

export class AIVisionService {
  // Demo sample detection sets for simulation mode
  public static sampleDetections: AIDetection[] = [
    {
      id: 'DET-001',
      label: 'Pothole',
      type: 'pothole',
      confidence: 94,
      distanceApproxMeters: 40,
      lanePosition: 'YOUR LANE',
      severity: 'HIGH',
      box: { x: 30, y: 55, w: 22, h: 18 }
    },
    {
      id: 'DET-002',
      label: 'Vehicle (Lead Car)',
      type: 'vehicle',
      confidence: 98,
      distanceApproxMeters: 25,
      lanePosition: 'YOUR LANE',
      severity: 'LOW',
      box: { x: 42, y: 35, w: 26, h: 28 }
    },
    {
      id: 'DET-003',
      label: 'Construction Barrier',
      type: 'construction',
      confidence: 91,
      distanceApproxMeters: 65,
      lanePosition: 'RIGHT LANE',
      severity: 'MODERATE',
      box: { x: 75, y: 48, w: 15, h: 22 }
    },
    {
      id: 'DET-004',
      label: 'Motorcycle',
      type: 'motorcycle',
      confidence: 96,
      distanceApproxMeters: 18,
      lanePosition: 'LEFT LANE',
      severity: 'LOW',
      box: { x: 12, y: 42, w: 14, h: 26 }
    },
    {
      id: 'DET-005',
      label: 'Stray Animal',
      type: 'animal',
      confidence: 89,
      distanceApproxMeters: 50,
      lanePosition: 'SHOULDER',
      severity: 'MODERATE',
      box: { x: 84, y: 52, w: 12, h: 16 }
    }
  ];

  // Draw bounding boxes on Canvas element
  public static drawDetections(
    canvas: HTMLCanvasElement,
    detections: AIDetection[],
    videoOrImageWidth: number,
    videoOrImageHeight: number
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det) => {
      const x = (det.box.x / 100) * canvas.width;
      const y = (det.box.y / 100) * canvas.height;
      const w = (det.box.w / 100) * canvas.width;
      const h = (det.box.h / 100) * canvas.height;

      // Color coding based on severity
      let color = '#10B981'; // GREEN
      if (det.severity === 'MODERATE') color = '#F59E0B'; // YELLOW
      if (det.severity === 'HIGH') color = '#EF4444'; // RED
      if (det.severity === 'CRITICAL') color = '#DC2626'; // DARK RED

      // Bounding box rectangle
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.strokeRect(x, y, w, h);
      ctx.shadowBlur = 0; // reset

      // Corner accents for high-tech look
      const cornerLength = Math.min(w, h) * 0.25;
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Top-Left corner
      ctx.moveTo(x, y + cornerLength); ctx.lineTo(x, y); ctx.lineTo(x + cornerLength, y);
      // Top-Right corner
      ctx.moveTo(x + w - cornerLength, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + cornerLength);
      // Bottom-Left corner
      ctx.moveTo(x, y + h - cornerLength); ctx.lineTo(x, y + h); ctx.lineTo(x + cornerLength, y + h);
      // Bottom-Right corner
      ctx.moveTo(x + w - cornerLength, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - cornerLength);
      ctx.stroke();

      // Label badge
      const labelText = `${det.label} (${det.confidence}%) ~${det.distanceApproxMeters}m | ${det.lanePosition}`;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      const textWidth = ctx.measureText(labelText).width;
      
      // Badge background
      ctx.fillStyle = color;
      ctx.fillRect(x, y > 24 ? y - 24 : y + h + 4, textWidth + 16, 22);

      // Badge text
      ctx.fillStyle = '#000000';
      ctx.fillText(labelText, x + 8, y > 24 ? y - 9 : y + h + 19);
    });
  }
}
