import {Component, OnInit} from '@angular/core';
import {interval, Observable, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {
  tabla: boolean[][] = new Array(20).fill(false).map(()=>Array(20).fill(false));
  tablaCopy: boolean[][] = JSON.parse(JSON.stringify(this.tabla));


  iteraciones: number = -1;

  constructor() {
    console.log(this.tabla)

  }


  setCelda(event: MouseEvent) {
    let elementId: string = (event.target as Element).id;
    let coordenadas = elementId.split("-")
    let x = parseInt(coordenadas[0])
    let y = parseInt(coordenadas[1])
    this.tabla[x][y] = !this.tabla[x][y]
  }

  contador = interval(500);
  subscripcion: Subscription = new Subscription();

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
    if (this.tablaCopy[this.calcularCoordenada(i - 1)][this.calcularCoordenada(j + 1)]) {
      vecinos++
      vecinosPos.push(i - 1, j + 1);
    }

    if (this.tablaCopy[this.calcularCoordenada(i - 1)][this.calcularCoordenada(j - 1)]) {
      vecinos++
      vecinosPos.push(i - 1, j - 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i - 1)][this.calcularCoordenada(j)]) {
      vecinos++
      vecinosPos.push(i - 1, j);
    }
    if (this.tablaCopy[this.calcularCoordenada(i)][this.calcularCoordenada(j - 1)]) {
      vecinos++
      vecinosPos.push(i, j - 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i)][this.calcularCoordenada(j + 1)]) {
      vecinos++
      vecinosPos.push(i, j + 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i + 1)][this.calcularCoordenada(j - 1)]) {
      vecinos++
      vecinosPos.push(i + 1, j - 1);
    }
    if (this.tablaCopy[this.calcularCoordenada(i + 1)][this.calcularCoordenada(j)]) {
      vecinos++
      vecinosPos.push(i + 1, j);
    }

    if (this.tablaCopy[this.calcularCoordenada(i + 1)][this.calcularCoordenada(j + 1)]) {
      vecinos++
      vecinosPos.push(i + 1, j + 1);
    }

    return vecinos;

  }

  calcularCoordenada(valor: number): number {

    if (valor == -1) {
      return 19;
    } else if (valor == 20) {
      return 0;
    } else if (valor == 0) {
      return 0;
    } else {
      return valor;
    }
  }

  reset() {
    this.tabla =  new Array(20).fill(false).map(()=>Array(20).fill(false));
  }
}
