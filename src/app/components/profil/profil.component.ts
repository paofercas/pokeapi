import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Persona } from 'src/app/model/persona';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  @Input() pokemonSelected!: any[];
  @Input() personDetail!: Persona;

  ageMore18: boolean;
  photo: string;
  data: any[] = [];
  color: ThemePalette = 'primary';

  constructor(private pokemonService: PokemonService) { 
    this.ageMore18 = false;
    this.photo = '../../../assets/images/blank-profile.jpg';
  }

  ngOnInit(): void {
    console.log("datos", this.pokemonSelected, this.personDetail);
    this.getPokemons();
  }

  getPokemons() {
    if (this.pokemonSelected.length>0){
    this.pokemonSelected.forEach(element=>{
      this.pokemonService.getPokemons(element[0].position).subscribe(
        res => {
          let fistLetra = res.name.charAt(0).toUpperCase();
          let other = res.name.slice(1);
          let name = fistLetra.concat(other);
          let pokemonData = {
            position: element[0].position,
            name: name,
            image: res.sprites.other?.home.front_default,
            isSelected: false,
            types: res.types,
            stats: res.stats
          }
          this.data.push(pokemonData);
          //this.dataPokemons = this.data;
          console.log("Pokemon", this.data, res);
          //this.loading = false;
        },
        err => {
          console.log(err)
        }

      )
    }) 
    }
  }
  

}
