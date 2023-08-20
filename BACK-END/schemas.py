from pydantic import BaseModel
from typing import Union


class User(BaseModel):
    id1:int
    
class job1(BaseModel):
    id1:int
    
class job(BaseModel):
    name:str
    skill:str
    discription:str
    # priority:str
    difficulty:str
    deadline:str


class anounce(BaseModel):
    tittle:str
    discription:str

class uid(BaseModel):
    uuid:str
    
    
    
    
    


class User(BaseModel):
    Name:str
    password:str
    email:str
class User1(BaseModel):
    Name:str
    password:str
    email:str
    role:str
    skillp: int
    skill:str
class login(BaseModel):
    Name:str
    password:str
    
class UserInDB(User):
    password: str 
    
class product(BaseModel):
    pname:str

    
class Token(BaseModel):
    access_token: str
    token_type: str


# class TokenData(BaseModel):
#     name: str | None = None

class TokenData(BaseModel):
    name: Union[str, None] = None

    