

import { Transaction } from './Transaction'
import { TypeH } from './TypeH'
import { User } from './User'


export class Housing {
    
        public housingID!: number;
        public typeHousing!: TypeH;
        public descriptionHousing!: string;
        public locationHousing!: string;
        public availabilityHousing!: boolean;
        public images?: string[];
        public priceHousing!: number;
        public owner?: User;
        public renters?: User[];
        public transaction?: Transaction
      
       
}

