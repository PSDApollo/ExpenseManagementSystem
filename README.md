# ExpenseManagementSystem

**Overview of the project**
The application is an expense management system for individuals and groups of people. The software will be similar to expense managing apps like Splitwise, Money Manager, 
and SettleUp, which millions of people around the world use to organize group bills for households, trips, and more. But the system we are developing will allow users to input their expenses and split the costs among the group members and enables to share profits among them and provide a graphical representation of the expenses for easy tracking and analysis as well, which are not available in other applications. The splitting of expenses will be done automatically based on predefined rules. The system will simplify the process of splitting expenses and reduce the potential for misunderstandings and conflicts among group members. The software will be usefulfor groups of friends who dine out together, roommates sharing living expenses, or colleagues sharing travel expenses. The system will streamline the process of splitting expenses, reduce administrative effort, and eliminate the need for manual calculations.


**Required Installations for backend**: Java JDK, Springboot, Apache tomcat server, PostgreSQL, PgAdmin(Optional-Just to execute your queries)
1. Install tomcat server from the below url
    https://tomcat.apache.org/download-10.cgi
2. Install PostgreSQL from the below url
    https://www.postgresql.org/download/windows/
3. Install JavaJDK from the below url
   https://www.oracle.com/java/technologies/downloads/
4. Clone the project ExpenseManagementSystem on your local environment
5. Open any IDE for running your project.(IntelliJ or Eclipse is preffered because it automatically adds all the required dependencies).Open the backend folder from the ExpenseManagementSystem in the cloned project.
6. Change the username and password in application.properties file which is located at src->main->java->resources. Change the server port if you want to in the same file.
7. Make sure tomcat server is running on your system since Java Springboot needs a server to run.
8. Run ExpenseManagementApplication.java file. Since it has the main function for our application. 

**Required Installations for frontend**: NodeJs
1. Install NodeJs v16/20.2 version from the below URL
   https://nodejs.org/download/release/v16.20.2/
2. Clone the project ExpenseManagementSystem on your local environment
3. Open any IDE for running your project.(Visual Studio Code is preffered since it has lot of extensions) Open the frontend folder from the ExpenseManagemenrSystem in the cloned project.
4. Open powershell
5. Run the command "npm start". Make sure your backend application is up and running.
6. Application will open in the browser on port 3000.

**Required Installations for Testing**: Katalon Studio, Postman<br>
<br>1.Download Katalon Studio from the below URL<br>
  https://katalon.com/download<br>
2. Download and install postman from the below URL<br>
  https://www.postman.com/downloads/<br>
3. Below is the postman collection for our application. <br>
  https://sluedu-my.sharepoint.com/:u:/g/personal/saiteja_juluru_slu_edu/EY1L1qVYKSZFm7C6NN29XcUBxbQ4Y7lVHgkFCXVv2ByCNQ?e=f9cnKJ<br>


**Steps to Run the application**:
1. Before running the frontend part of the application, we need to make sure the server is up and running. For this purpose go to the Backend directory in the project and run ```mvn spring-boot:run```
2. The server will start running on port 9111
3. Start the frontend server using npm
   install npm: ```npm install```
   <br>run the server: ```npm start```
4. This will run your application on port 3000


**Alternate way to run the application using docker**
1. Install docker desktop from the below URL
   https://www.docker.com/products/docker-desktop/
2. Clone the project to your local using the command:
   ```git clone https://github.com/PSDApollo/ExpenseManagementSystem.git```
3. Start the docker desktop and then navigate to your project directory where docker-compose.yml is located
4. Run ```docker-compose pull```. This will pull the updated docker image to your local and get all the latest changes.
5. Run ```docker-compose up```. This will run the application on port 3000.





