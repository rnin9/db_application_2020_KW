# db_application_2020_KW
2020 Database Application Project
____________________________________________
# How To Run

1. make 'config' folder in 'server' folder
2. make 'config.json' file in config folder with this code

```{
    "development":{
        "username":"DB 사용자 이름",
        "password":"DB 비밀번호",
        "database":"사용할 DB 이름",
        "host":"host 주소",
        "port":"포트 번호",
        "dialect": "mysql",
        "operatorAliases": false
    }
}
```
3. make 'image' folder in '/public' directory 
4. Type 'npm install' in root directory
5. Type 'npm run dev' in root directory to Run This project
____________________________________________
### 2020-11-08 
* create-react-app
* sequelize

### 2020-11-09
* Navigation Design
* Register Page Design

### 2020-11-10
* Registeration UI update
* Login, Logout

### 2020-11-11
* alert message customizing
* Landing page Design (select * from USER)
* add comment

### 2020-11-12
* session -> local storage change ( for friend Page)
* NavBar -> Header , + New Nav(side bar)

### 2020-11-13
* My page, diffrent sidebar By authority

### 2020-11-14
* UI update, My page design, Edit UserData (except Photo)

### 2020-11-15
* oyh
  * Add sequelize db
  * Add Grade page

* rnin9
  * handle userPhoto
  * Add AuthRouter <= prevent access of Not-allowed user

### 2020-11-16
  * remember value when change userInfo
  * friend add page design

### 2020-11-17
  * Friend Search
  * request friend <= not have pk(userID,friendID)

### 2020-11-17
  * FriendPage with Redux (demo)

### 2020-11-19
  * FriendPage request 

## 2020-11-20
  * FriendPage UI update, request
  * get FriendRequest Data

## 2020-11-21
  * FriendRequestPage redux


