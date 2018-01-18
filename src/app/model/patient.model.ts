import { BaseEntity } from '../model/baseEntity.model';
import { Comment } from '../model/comment.model';
import { Diagnosis } from '../model/diagnosis.model';

export class Patient extends BaseEntity{
  
  phone: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  fileNumber: string;
  address: string;
  comments: Comment[];
  diagnosis: Diagnosis[];
}