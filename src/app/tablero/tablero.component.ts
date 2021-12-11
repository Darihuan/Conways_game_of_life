import {Component} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {
  tamano = 35;
  tabla: boolean[][] = new Array(35).fill(false).map(() => Array(this.tamano).fill(false));
  tablaCopy: boolean[][] = JSON.parse(JSON.stringify(this.tabla));
  contador = interval(400);
  subscripcion: Subscription = new Subscription();


  iteraciones: number = -1;

  constructor() {


  }


  setCelda(x: number, y: number) {
    this.tabla[x][y] = !this.tabla[x][y]
  }


  runGame() {

    this.subscripcion = this.contador.subscribe((n) => {
      this.tablaCopy = JSON.parse(JSON.stringify(this.tabla));
      this.gameOfLife();
      this.iteraciones = n;
      n++;
    })
  }

  stopGame() {
    this.subscripcion.unsubscribe();
    this.iteraciones = -1;

  }

  gameOfLife() {

    for (let i = 0; i < this.tabla.length; i++) {
      for (let j = 0; j < this.tabla[i].length; j++) {

        this.tabla[i][j] = this.comprobarPos(i, j);
      }
    }

  }

  comprobarPos(i: number, j: number): boolean {
    let vecinos = this.obtenerVecinos(i, j);
    if (vecinos < 2) {
      return false;
    }
    if (this.tablaCopy[i][j] && (vecinos == 2 || vecinos == 3)) {
      return true;
    }
    if (this.tablaCopy[i][j] && vecinos > 3) {
      return false;
    }
    if ((!this.tablaCopy[i][j]) && vecinos == 3) {
      return true;
    }
    return false;

  }

  obtenerVecinos(i: number, j: number): number {
    let vecinos = 0;
    let vecinosPos: [number, number] = [-1, -1]
    if (this.tablaCopy[this.calcularCoordenada(i - 1, "y")][this.calcularCoordenada(j + 1, "x")]) {
      vecinos++
      vecinosPos.push(i - 1, j + 1);
    }

    if (this.tablaCopy[this.calcularCoordenada(i - 1, "y")][this.calcularCoordenada(j - 1, "x")]) {
      vecinos++
      vecinosPos.push(i - 1, j - 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i - 1, "y")][this.calcularCoordenada(j, "x")]) {
      vecinos++
      vecinosPos.push(i - 1, j);
    }
    if (this.tablaCopy[this.calcularCoordenada(i, "y")][this.calcularCoordenada(j - 1, "x")]) {
      vecinos++
      vecinosPos.push(i, j - 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i, "y")][this.calcularCoordenada(j + 1, "x")]) {
      vecinos++
      vecinosPos.push(i, j + 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i + 1, "y")][this.calcularCoordenada(j - 1, "x")]) {
      vecinos++
      vecinosPos.push(i + 1, j - 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i + 1, "y")][this.calcularCoordenada(j, "x")]) {
      vecinos++
      vecinosPos.push(i + 1, j);
    }

    if (this.tablaCopy[this.calcularCoordenada(i + 1, "y")][this.calcularCoordenada(j + 1, "x")]) {
      vecinos++
      vecinosPos.push(i + 1, j + 1);
    }

    return vecinos;

  }

  calcularCoordenada(valor: number, eje: string): number {
    if (eje == 'x') {
      if (valor == -1) {
        return this.tabla.length - 1;
      } else if (valor == this.tabla.length) {
        return 0;
      } else {
        return valor;
      }
    } else {
      if (valor == -1) {
        return 34;
      } else if (valor == 35) {
        return 0;
      } else {
        return valor;
      }
    }
  }

  reset() {
    this.tabla = new Array(35).fill(false).map(() => Array(this.tamano).fill(false));
  }


}
