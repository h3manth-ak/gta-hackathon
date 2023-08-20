
from fastapi import FastAPI,Depends,HTTPException,status
import schemas
from database import engine,SessionLocal
import model
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import pyqrcode
import png
from tocken1 import create_access_token
from sqlalchemy import desc
import uuid
import oaut2
# from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# Generate QR code



app = FastAPI()
model.Base.metadata.create_all(engine)

origins = [
    "http://localhost",
    "http://localhost:8000"
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from fastapi import FastAPI, WebSocket, WebSocketDisconnect

# app = FastAPI()

# Store WebSocket connections
websockets = []
websocket_clients = set()
        
        
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_clients.add(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        websocket_clients.remove(websocket)
        

         
        




@app.post('/add_employee',tags=['em'])
async def user(request:schemas.User1,db : Session = Depends(get_db)):
    
    userid = str(uuid.uuid4())
    user1 = model.user(name = request.Name,email = request.email,password = request.password,uid =  userid,role = request.role,skillp=request.skillp,skill=request.skill)
    
    db.add(user1)
    db.commit()
    db.refresh(user1) 
    
    
     
    
    return user1

@app.post('/get_emp', tags=['em'])
async def add_job(request: schemas.uid, db: Session = Depends(get_db)):
    jobuser = db.query(model.user).filter(model.user.uid == request.uuid).first()
    return jobuser
    


@app.post('/add_job', tags=['jb'])
async def add_job(request: schemas.job, db: Session = Depends(get_db)):
    if request.difficulty == "easy":
        skill_threshold = 40
        points = 2
    elif request.difficulty == "medium":
        skill_threshold = 70
        points = 3
    elif request.difficulty == "hard":
        skill_threshold = 100  # Adjust the threshold as needed
        points = 5
    else:
        return "Correct difficulty level required"
 
    user1 = db.query(model.user).filter(
        (model.user.skill == request.skill) &
        (model.user.skillp <= skill_threshold) &
        (model.user.epoint < 10)&(model.user.jobassigned == False)
    ).first()
    
    userid = str(uuid.uuid4()) 
    if user1:
        job1 = model.job(
            jname=request.name, 
            skill=request.skill,
            discription=request.discription,
            jobid=userid,
            priority=points,
            value=points, 
            deadline=request.deadline,
            userid=user1.uid,
            status = True,
        ) 
        
        job1.userid = user1.uid
        user1.jobassigned = True
 
        db.add(job1)
        db.commit()
        db.refresh(job1)
 
        return job1
    else:
        
        
        return "No suitable employee found" 
    
    
    
     
    
     
    # user1 = db.query(model.user).filter(model.user.skill == request.skill)&(model.user.skill == request.skill) 
    
    # userid = str(uuid.uuid4())
    # job1 = model.job(jname = request.name,skill = request.skill,discription = request.discription,jobid = userid,priority= priority1,value = points,deadline=request.deadline)
    # job1.userid=user1.uid
    
    
    # db.add(job1)
    # db.commit()
    # db.refresh(job1)  
    
    
     
    
    return user1

@app.put('/sucsess', tags=['jb'])
async def reassign_hjob(request: schemas.job1, db: Session = Depends(get_db)):
    job = db.query(model.job).filter(model.job.jid == request.id1).first()
    job.status = False
    user = db.query(model.user).filter(model.user.uid == job.userid).first()
    user.epoint=job.value
    user.skillp = user.skillp + job.count*5
    show1 = db.query(model.adminjobstatus).filter(model.adminjobstatus.jid==job.jobid)
    show1.status == False
    
    
    return user




@app.put('/reassign', tags=['jb'])
async def reassign_job(request: schemas.job1, db: Session = Depends(get_db)):
    job = db.query(model.job).filter(model.job.jid == request.id1).first()

    if not job:
        return "Job not found"  # Handle the case where the job doesn't exist

    if job.status == True:
        user = db.query(model.user).filter(model.user.uid == job.userid).first()

        if not user:
            return "User not found"  # Handle the case where the user doesn't exist

        job_assign = db.query(model.jobassign).filter(model.jobassign.jobid == request.id1).first()

        if not job_assign:
            job_assign = model.jobassign(jobid=request.id1)
            db.add(job_assign)

        if not job_assign.userid1:
            job_assign.userid1 = user.uid
        elif not job_assign.userid2:
            job_assign.userid2 = user.uid
        elif not job_assign.userid3:
            job_assign.userid3 = user.uid
        else:
            return "All slots for reassignment are filled"
        user.skillp=user.skillp-15
        user.jobassigned = False
        
        
 
        if job.value == 2:
            user1 = db.query(model.user).filter(
                (model.user.skill == request.skill) &
                (model.user.skillp < 40) &
                (model.user.epoint < 10) &
                (model.user.uid != job_assign.userid1) &
                (model.user.uid != job_assign.userid2) &
                (model.user.uid != job_assign.userid3) &
                (model.user.uid != user.uid)
            ).first()
        elif job.value == 3:
            user1 = db.query(model.user).filter(
                (model.user.skill == request.skill) &
                (40 >= model.user.skillp < 70) &
                (model.user.epoint < 10) &
                (model.user.uid != job_assign.userid1) &
                (model.user.uid != job_assign.userid2) &
                (model.user.uid != job_assign.userid3) &
                (model.user.uid != user.uid)
            ).first()
        elif job.value == 5:
            user1 = db.query(model.user).filter(
                (model.user.skill == job.skill) &
                (model.user.skillp >= 70) &
                (model.user.epoint < 10) &
                (model.user.uid != job_assign.userid1) &
                (model.user.uid != job_assign.userid2) &
                (model.user.uid != job_assign.userid3) &
                (model.user.uid != user.uid)
            ).first()
        else:
            return "correct difficulty level"
 
        job.userid = user1.uid
        user1.jobassigned = True
 
        db.commit()
        db.refresh(job) 
 
        return job
 
    return "Job status cannot be reassigned"
        
        


@app.post('/anounce',tags=['jb'])
async def anounce(request:schemas.anounce,db : Session = Depends(get_db)):
    ans = model.anouncement(tittle = request.tittle,desc = request.discription)
    db.add(ans)
    db.commit()
    db.refresh(ans)
    
    return ans

@app.get('/show_anounce',tags=['jb'])
async def user(db : Session = Depends(get_db)): 
    ans = db.query(model.anouncement).all() 
    
    return ans



@app.get('/show_currentuser_jobs',tags=['jb'])
async def showuserjobs(db : Session = Depends(get_db),current_user: schemas.User= Depends(oaut2.get_current_active_user)):
    job = db.query(model.job).filter((model.job.userid ==current_user.uid)&(model.job.status ==True) ).first()
    return job


@app.post('/show_jobdetails',tags=['jb'])
async def anounce(request:schemas.uid,db : Session = Depends(get_db)):
    job = db.query(model.job).filter((model.job.jobid ==request.uuid)).first()
    
    user = db.query(model.user).filter(model.user.uid == job.userid).first()
    
    return {'username':user.name,'jname':job.jname,'discrb':job.discription,'deadline':job.deadline}
    


 
 

@app.put('/admin_confirm',tags=['jb'])
async def user(db : Session = Depends(get_db),current_user: schemas.User= Depends(oaut2.get_current_active_user)):
    job = db.query(model.job).filter((model.job.userid ==current_user.uid)&(model.job.status ==True) ).first()
    show1 = db.query(model.adminjobstatus).filter(model.adminjobstatus.jid==job.jobid)
    if show1:
        show1.status = True
        return show1
    else:

    
    
        adminotification = model.adminjobstatus( jid= job.jobid,uid =current_user.uid)
        
        
        db.add(adminotification)
        db.commit()
        db.refresh(adminotification)
    
    
        return current_user.uid



@app.get('/admin_notifcation',tags=['jb'])
async def user(db : Session = Depends(get_db)):
    show1 = db.query(model.adminjobstatus).filter(model.adminjobstatus.status==True).all()
    return show1





@app.get('/unallocated work',tags=['jb'])
async def user(db : Session = Depends(get_db)): 
    ans = db.query(model.job).filter(model.job.status==False).all() 
    
    return ans
    





@app.put('/reject',tags=['jb'])
async def user(request:schemas.job1,db : Session = Depends(get_db)): 
    

    if job2.count<4:
        job2 = db.query(model.job).filter(model.job.jid == request.id1).first()
        job2.count = job2.count+1
        show1 = db.query(model.adminjobstatus).filter(model.adminjobstatus.jid==request.id1)
        show1.status = False
    else:
        
        return "reassign"
    
    
    db.commit()
    db.refresh(job2) 
    return job2
    




@app.put('/assign_skill',tags=['jb'])
async def user(request:schemas.job1,db : Session = Depends(get_db)):
    

    
    job = db.query(model.job).filter(model.job.id == request.id1).first()
    id1=job.userid
    user1= user1 = db.query(model.user).filter(model.user.id == id1).first()
    user1.skillp= 50
    
    
    db.commit()
    db.refresh(user1) 
    
    
     
    
    return user1



 

@app.get('/employee/{id1}',tags=['user'])
async def user(id1:int,db : Session = Depends(get_db),get_current_user : schemas.User = Depends(oaut2.get_current_user)):
    
    user = db.query(model.user).filter(model.user.id == id1).first()
    return user


@app.get('/users',tags=['user'])
async def user(db : Session = Depends(get_db),get_current_user : schemas.User = Depends(oaut2.adminlogin)):
    
    user1 = db.query(model.user).all()
    return user1



async def send_notification(data):
    notification = f"Data '{data}' assigned"
    for client in websocket_clients:
        await client.send_text(notification)



@app.post('/addnew_employee',tags=['em'])
async def user(request:schemas.User1,db : Session = Depends(get_db),get_current_user : schemas.User = Depends(oaut2.adminlogin)):
    
    user2 = db.query(model.user).filter(model.user.name == request.Name).first()
    
    if user2:
        return {"error":"already exist"}
    
    
    if request.role == "admin":
        userid = "rubbishrevolutionadmin " + str(uuid.uuid4())
    elif request.role == "user":
        userid = "rubbishrevolutionuser " + str(uuid.uuid4()) 
    else:
        return "Invalid role"
    
    user1 = model.user(name = request.Name,email = request.email,password = request.password,uid =  userid,role =request.role)
    
    db.add(user1)
    db.commit()
    db.refresh(user1) 
    
    data = "hii"
    await send_notification(data)
    
    return user 


# @app.put('/pointincrement/{id1}',tags=['user'])
# async def user(id1:int,db : Session = Depends(get_db)):
    
#     user = db.query(model.user).filter(model.user.id == id1).first()
#     user.points=user.points+10
#     db.commit()
#     return "updated 10 points"

#login






@app.post('/login',tags=['authentication'])
def login(request:OAuth2PasswordRequestForm= Depends(),db : Session = Depends(get_db)):
    user = db.query(model.user).filter(model.user.name == request.username).first()
    if not user:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="invalid credential")
    if (user.password != request.password ):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="invalid credential")
    
    access_token = create_access_token(data={"sub": user.name,"id":user.id,"role":user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=None)
async def read_users_me(current_user: schemas.User= Depends(oaut2.get_current_active_user)):
    return current_user

    






# route for the product





# @app.post('/add_product',tags=['product'])
# async def user(request:schemas.product,db : Session = Depends(get_db)):
    
#     prodid = str(uuid.uuid4())
#     product1 = model.Product(pname = request.pname,ppid = prodid)
#     db.add(product1)
#     db.commit()
#     db.refresh(product1) 
#     return product1






