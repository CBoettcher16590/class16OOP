type Constructor = new (...args: any[]) => {};


function weldHull<TBase extends Constructor>(baseSubmarine: TBase, hull:string, diameter:string) {
  return class basedSubmarine extends baseSubmarine {
    hullThickness:string = hull;
    diameter:string = diameter;
  };
}

//how do you mix in a variable propeller. Is it possible to target it. second, parameter?
function addPropeller<TBase extends Constructor>(baseSubmarine: TBase, size:string) {
    return class basedSubmarine extends baseSubmarine {
      EnergyRequred:string = '20 mw';
      PropellerDiameter:string = size;
    };
  }

  function addpowerGeneratorNuclear<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      noise:string = 'silent';
      powerGenerated:string = '350 mw';
      fuelDuration:string = 'Crew Limited';
      airbreathing:false;
    };
  }

  function addpowerGeneratorDiesel<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      noise:string = 'Low Noise';
      powerGenerated:string = '100 mw';
      fuelDuration:string = '2 months';
      airbreathing:true;

    };
  }

  function addVLtubesCUSTOM<TBase extends Constructor>(baseSubmarine: TBase, VLtubes:number) {
    return class basedSubmarine extends baseSubmarine {
      VL16:number = VLtubes;  
    };
  }

  function addVLtubes16<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      VL16:number = 16;  
    };
  }
  function addVLtubes32<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      VL32:number = 32;  
    };
  }
  function addVLtubes64<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      VL64:number = 64;  
    };
  }

  function addTorpedoTubes4<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      tubes:number = 4;  
    };
  }

  function addTorpedoTubes8<TBase extends Constructor>(baseSubmarine: TBase) {
    return class basedSubmarine extends baseSubmarine {
      tubes:number = 8;  
    };
  }

  function addSonar<TBase extends Constructor>(baseSubmarine: TBase, sonar:number) {
    return class basedSubmarine extends baseSubmarine {
      sonarPower:number = sonar 
    };
  }

// realized I could add more params into mixins a little too late, to derive the new class.


function addDiveVehicleHangar<TBase extends Constructor>(baseSubmarine: TBase, submersible:boolean ) {
    return class basedSubmarine extends baseSubmarine {
        submersible:boolean = submersible;
    };
  }





class Submarine{


}




class submarineBuilder {

    basesubmarineInstance:submarineBuilder|null

    private newSub = Submarine;

    get BUILDsubmarine(){
        if(this.basesubmarineInstance == null){
            return new this.newSub
        }

        return this.basesubmarineInstance
    }

    hull(hull:string,diamater:string){
        this.newSub = weldHull(this.newSub, hull, diamater);
    }

    propellor(size:string){
        this.newSub = addPropeller(this.newSub, size);

    }

    powerGenerator( type:string){
        if( type === 'nuclear'){

            this.newSub = addpowerGeneratorNuclear(this.newSub);
        }

        else {this.newSub = addpowerGeneratorDiesel(this.newSub);}
        
    
    }

    verticalLaunchTubes16(){

        this.newSub = addVLtubes16(this.newSub);
    }

    verticalLaunchTubes32(){

        this.newSub = addVLtubes32(this.newSub);


    }
    verticalLaunchTubes64(){

        this.newSub = addVLtubes64(this.newSub);

    }

   addVLtubesCUSTOM(customTubes:number){

        this.newSub = addVLtubesCUSTOM(this.newSub, customTubes);

   }


    torpedoTubes4(){
        this.newSub = addTorpedoTubes4(this.newSub)
    }

    torpedoTubes8(){
        this.newSub = addTorpedoTubes8(this.newSub)

    }

    addSonar(sonar:number){
        this.newSub = addSonar(this.newSub, sonar)
            
    }

    addSubmersible(hangar:boolean){

        this.newSub = addDiveVehicleHangar(this.newSub, hangar)

    }

}


const builder1 = new submarineBuilder;
builder1.hull('3meters', '95 meters');
builder1.powerGenerator('nuclear');
builder1.propellor('30meters');
builder1.torpedoTubes4();
builder1.verticalLaunchTubes64();
builder1.addSonar(450)

const submarineA = builder1.BUILDsubmarine
console.log(submarineA);
//kinda bummed out it worked.


const builder2 = new submarineBuilder;
builder2.hull('2meters', '125 meters');
builder2.powerGenerator('');
builder2.propellor('20meters');
builder2.addVLtubesCUSTOM(128);
builder2.addSonar(250)


const submarineB = builder2.BUILDsubmarine

console.log(submarineB);



class submarineShipYard{
    
    // private _shipyard:submarineBuilder
    
     constructor( private shipyard:typeof submarineBuilder){

    }
    
    submerssibleSubmarine(){
        //so you can basically have a smaller scale template. Like for a really basic sub.
        //then extend that functionality. Becuase it returns a builder.
        //it's slicing the total template into more delecate chunks.
        const builder = new this.shipyard();
        builder.addSubmersible(true) 
        builder.powerGenerator('nuclear');
        return builder;

    }


    submarineClassA(){

        const builder = new this.shipyard();
        builder.hull('2meters', '125 meters');
        builder.powerGenerator('');
        builder.propellor('20meters');
        builder.addVLtubesCUSTOM(24);
        builder.addSonar(250)
        return builder;

    }

    submarineClassB(){

        const builder = new this.shipyard();
        builder.hull('2meters', '125 meters');
        builder.powerGenerator('');
        builder.propellor('20meters');
        builder.addVLtubesCUSTOM(24);
        builder.addSonar(250)
        return builder;

    }


    submarineRETROFITClassC(){
        //then you can start from a basic submarine which has a submermislble
        const builder =  this.submerssibleSubmarine();
        builder.hull('4meters', '90 meters');
        builder.propellor('18.5meters');
        builder.addVLtubesCUSTOM(48);
        builder.addSonar(300)
               
        return builder;

    }

}

const shipyardOmega = new submarineShipYard(submarineBuilder)
const AlphaOne = shipyardOmega.submarineClassA();
console.log(AlphaOne.BUILDsubmarine)
const CharlieOne = shipyardOmega.submarineRETROFITClassC();
console.log(CharlieOne.BUILDsubmarine)

//that makes more sense, we create a new shipyard, and slot it in with some specific templates for submarines.
