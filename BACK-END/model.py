from database import Base
from sqlalchemy import Column,Integer,String,ForeignKey,Boolean
from sqlalchemy.orm import relationship

class user(Base):
    __tablename__ = "employee"

    id = Column(Integer,primary_key = True,index = True,autoincrement=True)
    name=Column(String) 
    email=Column(String) 
    password=Column(String)
    skill = Column(String,default=0)
    uid = Column(String)
    role = Column(String,default="user")
    epoint = Column(Integer,default=0)
    skillp = Column(Integer,nullable=True)
    jobassigned = Column(Boolean, default=False)
class job(Base):
    __tablename__ = "job"

    jid = Column(Integer, index=True, primary_key=True)
    jname = Column(String)
    jobid = Column(String, nullable=True)
    skill = Column(String,default=0)
    status = Column(Boolean, default=False)
    discription = Column(String)
    priority = Column(String)
    userid = Column(String)
    value = Column(Integer)
    count = Column(Integer)
    deadline = Column(String)
    
class jobassign(Base):
    __tablename__ = "jobreassign"
    
    jobid = Column(String, nullable=True,primary_key=True)
    userid1 = Column(String, nullable=True)
    userid2 = Column(String, nullable=True)
    userid3 = Column(String, nullable=True)
    
    
class anouncement(Base):
    __tablename__ = "anouncement"
    
    aid = Column(Integer, index=True, primary_key=True)
    tittle = Column(String)
    desc = Column(String)
    
class adminjobstatus(Base):
    __tablename__ = "status"
    
    id = Column(Integer, index=True, primary_key=True)
    uid = Column(String)
    jid = Column(String)
    status = Column(Boolean,default=True)
   