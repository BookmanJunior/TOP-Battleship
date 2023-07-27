export default function parseSquareCoordinates(cell) {
  return cell.dataset.coordinates
    .split(",")
    .map((coordinate) => parseInt(coordinate, 10));
}
