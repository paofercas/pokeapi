export class Persona{
    name: string;
    dui: string;
    hobbie: string;
    birthDate: Date | undefined;
    photo: string;
    edad: number;

    constructor(){
        this.name='';
        this.dui ='';
        this.hobbie='';
        this.birthDate = undefined;
        this.photo = '';
        this.edad=0;
    }
}