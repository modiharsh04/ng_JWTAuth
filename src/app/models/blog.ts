import { User } from './user';

export class Blog {
  constructor(
  	content?:string, 
  	subject?: string, 
  	created?: string, 
  	last_modified?:string,
  	author?: User
  	) {}
}