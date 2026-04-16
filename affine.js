export function solveAffine(landmarks) {
    if (landmarks.length < 3) throw new Error("기준점이 최소 3개 필요합니다");
    const [p0, p1, p2] = landmarks;
    const toXY = (lng, lat) => [lng, lat];
    const [x0, y0] = toXY(p0.lng, p0.lat);
    const [x1, y1] = toXY(p1.lng, p1.lat);
    const [x2, y2] = toXY(p2.lng, p2.lat);
    const [u0, v0] = p0.px;
    const [u1, v1] = p1.px;
    const [u2, v2] = p2.px;

    const det = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
    if (Math.abs(det) < 1e-18) throw new Error("기준점이 일직선 상에 있습니다");

    const a = ((u1 - u0) * (y2 - y0) - (u2 - u0) * (y1 - y0)) / det;
    const b = ((u2 - u0) * (x1 - x0) - (u1 - u0) * (x2 - x0)) / det;
    const c = u0 - a * x0 - b * y0;
    const d = ((v1 - v0) * (y2 - y0) - (v2 - v0) * (y1 - y0)) / det;
    const e = ((v2 - v0) * (x1 - x0) - (v1 - v0) * (x2 - x0)) / det;
    const f = v0 - d * x0 - e * y0;

    return (lat, lng) => [a * lng + b * lat + c, d * lng + e * lat + f];
}
