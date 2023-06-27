import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postemploye(data:any){
    return this.http.post("http://localhost:3000/posts",data)
    
   };
   getemploye(){
    return this.http.get("http://localhost:3000/posts")
   };
   updateemploye(data:any, id:number){
    return this.http.put("http://localhost:3000/posts/"+id,data)
   };
   deleteemploye(id:number){
    return this.http.delete("http://localhost:3000/posts/"+id)
   }
}
