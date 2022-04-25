/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */


//A PersistentMap is probably near-sdk-as library its essentially a storage wrapper that makes our data structure act like a map
// So mapping any other language which is a key value pair , pyhton key value pair 
import {  logging, PersistentMap } from 'near-sdk-as'

const CandidateURL=new PersistentMap<string,string>("CandidateURL");
const CandidatePair=new PersistentMap<string,string[]>("Candidate Pair");
const PromptArray= new PersistentMap<string,string[]>("array of prompts ");
const VoteArray=new PersistentMap<string,i32[]>("stores votes ");
const userParticipation = new PersistentMap<string,string[]>('user Participation Record')





// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!

//this getgreeting function which have string parameter is expecting to return a string or a null value
// export function getGreeting(accountId: string): string | null {
//   // This uses raw `storage.get`, a low-level way to interact with on-chain
//   // storage for simple contracts.
//   // If you have something more complex, check out persistent collections:
//   // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
//   return storage.get<string>(accountId, DEFAULT_MESSAGE)
// }



// View Methods
//doesnot changes state of the Blockchain 
//Does not incur a fee


export function getUrl(name:string):string{
  if(CandidateURL.contains(name)){
    return CandidateURL.getSome(name)
  }else{
    logging.log(`can't find that user`)
    return ''
  }
}

export function didParticipate(prompt:string, user:string):bool{
  if(userParticipation.contains(prompt)){
    let getArray=userParticipation.getSome(prompt);
    return getArray.includes(user)
  }else{
    logging.log('prompt not found')
    return false
  }
}

export function getAllPrompts():string[]{
  if(PromptArray.contains('AllArrays')){
    return PromptArray.getSome("AllArrays")
  }else{
    logging.log('no prompts found');
    return []
  }
}

export function getVotes(prompt:string):i32[]{
  if(VoteArray.contains(prompt)){
    return VoteArray.getSome(prompt)
  }else{
    
    logging.log('prompt not found for this vote')
    return[0,0]
  }
}

export function getCandidatePair(prompt:string):string[]{
  if(CandidatePair.contains(prompt)){
    return CandidatePair.getSome(prompt)
  }else{
    logging.log('prompt not found')
    return []
  }
}


//Change Methods
//changes state of Blockchain 
//Costs a transaction fee to do so
//adds or modifies information to blockchain
//:void = returning void


export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url);
  logging.log('added url for '+ name);
}

export function addCandidatePair(prompt:string,name1:string,name2:string):void{
  CandidatePair.set(prompt,[name1,name2])
}


export function addToPromptArray(prompt:string):void{
  logging.log('added to prompt array')
  if(PromptArray.contains("AllArrays")){
    logging.log('add addition to prompt array')
    let tempArray=PromptArray.getSome("AllArrays")
    tempArray.push(prompt)
    PromptArray.set("AllArrays",tempArray);
  }else{
    PromptArray.set("AllArrays",[prompt])
  }
}

export function clearPromptArray():void{
  logging.log('clearing prompt array');
  PromptArray.delete("AllArrays")
}

export function addVote(prompt:string,index:i32):void{
  if(VoteArray.contains(prompt)){
    let tempArray=VoteArray.getSome(prompt)
    let tempVal=tempArray[index];
    let newVal=tempVal+1;
    tempArray[index]=newVal;
    VoteArray.set(prompt,tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    VoteArray.set(prompt,newArray);
  }
}

export function recordUser(prompt:string,user:string):void{
  if(userParticipation.contains(prompt)){
    let tempArray=userParticipation.getSome(prompt);
    tempArray.push(user);
    userParticipation.set(prompt,tempArray)
  }else{
    userParticipation.set(prompt,[user]);
  }
}