import { Position } from "../entities";

export class ListPositionsResponseDto {
    page: number;
    length: number;
    totalPages: number;
    total: number;
    positions: Position[];
}