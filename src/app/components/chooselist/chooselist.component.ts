import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/model/persona';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-chooselist',
  templateUrl: './chooselist.component.html',
  styleUrls: ['./chooselist.component.css']
})
export class ChooselistComponent implements OnInit {

  @Input() personDetail!: Persona;
  loading: boolean;
  ageMore18: boolean;
  photo: string;
  displayedColumns: string[] = ['position', 'name', 'image'];
  dataPokemons: any[] = [];
  data: any[] = [];
  pokemonList: any = [];
  counterPokemon: number;
  idSelected: any[] = [];
  isSave:boolean =false;

  constructor(private pokemonService: PokemonService) {
    this.loading = true;
    this.ageMore18 = false;
    this.counterPokemon = 0;
    this.photo = '../../../assets/images/blank-profile.jpg';
    let select = { id: '' }
    this.idSelected.push(select);
  }

  ngOnInit(): void {
    console.log("Person", this.personDetail);
    if (this.personDetail) {
      if (this.personDetail.edad >= 18)
        this.ageMore18 = true;
    }
    this.getPokemons();
  }

  getPokemons() {
    for (let i = 1; i <= 9; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        res => {
          let fistLetra = res.name.charAt(0).toUpperCase();
          let other = res.name.slice(1);
          let name = fistLetra.concat(other);
          let pokemonData = {
            position: i,
            name: name,
            image: res.sprites.other?.home.front_default,
            isSelected: false
          }
          this.data.push(pokemonData);
          this.dataPokemons = this.data;
          console.log("Pokemon", this.data, res, this.dataPokemons);
          this.loading = false;
        },
        err => {
          console.log(err)
        }

      )
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data = this.dataPokemons;
    let filter = this.data.filter(element => element.position == filterValue || element.name.includes(filterValue));
    console.log("filtro", filter);
    this.data = filter;
  }

  selectPokemon(event: any, id: number) {
    console.log('Evento', event, id);
    let select = { id: id }
    this.idSelected.push(select);
    let find = this.idSelected.filter(elemnt => elemnt.id == id);
    if (find.length > 1) {
      this.data[id - 1].isSelected = false;
      this.counterPokemon--;
      this.idSelected.forEach((i, index)=>{
        if (i.id == id){
          this.idSelected.splice(index,1);
        }
      })
    }
    else {
      if (this.counterPokemon < 3) {
        this.counterPokemon++;
        let filter = this.data.filter(element => element.position == id);
        this.pokemonList.push(filter);
        this.data[id - 1].isSelected = true;
      }
      else {
        console.log("Ya ha escogido 3 pokemones")
      }
    }
    console.log("ListaPokemon", this.pokemonList);

  }
  validateSave(){
    if(this.counterPokemon==3){
      return false;
    }
    else{
      return true;
    }
  }

  gotoNext(){
    this.isSave=true;
  }

}
