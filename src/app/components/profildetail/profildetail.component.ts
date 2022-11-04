import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profildetail',
  templateUrl: './profildetail.component.html',
  styleUrls: ['./profildetail.component.css']
})
export class ProfildetailComponent implements OnInit {

  photo:string ='';
  photoUpload: string = '';
  hobbySelected:string = '';
  ageMore18: boolean =false;
  formDataDetail: FormGroup;
  person:Persona;
  isNew: boolean;
  //dui= new FormControl('', [Validators.required]);


  hobbies = [
    {id:'1', value:'Jugar Fútbol'},
    {id:'2', value:'Jugar Basquetball'},
    {id:'3', value:'Jugar Tennis'},
    {id:'4', value:'Jugar Voleibol'},
    {id:'5', value:'Jugar Fifa'},
    {id:'6', value:'Jugar Videojuegos'}
  ];

  constructor(private formbuilder: FormBuilder, private router: Router) { 
    this.formDataDetail = new FormGroup({});
    this.person= new Persona();
    this.isNew=true;
    this.photo='../../../assets/images/blank-profile.jpg';
  }

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm() {
    this.formDataDetail = this.formbuilder.group({
      name:[this.person.name, [Validators.required]],
      dui:[this.person.dui],
      hobbies: [this.person.hobbie],
      birthDate: [this.person.birthDate,[Validators.required]],
    })
  }


  uploadPhoto(){
    console.log('Form', this.formDataDetail);
    this.photo = this.photoUpload;

  }

  optionenter(event: any, menuitem: any) {
    console.log(event, menuitem);
    this.formDataDetail.patchValue({hobbies: menuitem.value});
    //this.hobbySelected = menuitem.value;
  }

  getAge(type: string, event: MatDatepickerInputEvent<Date>) {
    this.ageMore18 =false;
    let birthDate = event.value;
    if (birthDate){
      const timeDiff = Math.abs(Date.now() - birthDate.getTime());
      let dif_anios: number = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      this.person.edad= dif_anios;
      if (dif_anios >= 18){
        this.ageMore18 =true;
        this.formDataDetail.controls.dui.addValidators(Validators.required);
      }
    } 
  }

  onSubmit(){
    this.person.name = this.formDataDetail.get('name')?.value;
    this.person.birthDate = this.formDataDetail.get('birthDate')?.value;
    this.person.hobbie = this.formDataDetail.get('hobbies')?.value;
    this.person.dui= this.formDataDetail.get('dui')?.value;
    this.person.photo= this.photo;
    this.isNew= false;
    //this.router.navigateByUrl('/chooseList')
  }
  validateSave() {
    return !this.formDataDetail.valid;
}

}
