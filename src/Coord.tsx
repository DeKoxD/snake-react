export class Coord {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(x: number, y: number): Coord {
    return new Coord(this.x + x, this.y + y);
  }
  incrementX(): Coord {
    return this.add(1, 0);
  }
  decrementX(): Coord {
    return this.add(-1, 0);
  }
  incrementY(): Coord {
    return this.add(0, 1);
  }
  decrementY(): Coord {
    return this.add(0, -1);
  }
  addCoord(coord: Coord, limit?: Coord): Coord {
    if (limit) {
      return new Coord(
        (limit.x + this.x + coord.x) % limit.x,
        (limit.y + this.y + coord.y) % limit.y
      );
    }
    return new Coord(this.x + coord.x, this.y + coord.y);
  }

  clone() {
    return new Coord(this.x, this.y);
  }

  equals(other: Coord): boolean {
    return this.x == other.x && this.y == other.y;
  }
}
